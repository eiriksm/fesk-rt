class MultiBankFESK extends AudioWorkletProcessor {
  constructor() {
    super();
    this.ready = false;
    this.banks = [];
    this.energyFloor = 0;
    this.energyOn = 0;
    this.energyOff = 0;
    this.minToneSamples = 0;
    this.minGapSamples = 0;
    this.ignoreHeadSamples = 0;
    this.energyEnv = 0;
    this.energyDecay = 0.99;
    this.energyRise = 1 - this.energyDecay;
    this.hpAlpha = 0;
    this.hpLastX = 0;
    this.hpLastY = 0;
    this.toneActive = false;
    this.toneBuffer = [];
    this.toneSamples = 0;
    this.gapSamples = 0;
    this.sampleRate = sampleRate;
    this.port.onmessage = (e) => {
      const {
        freqSets,
        energyFloor,
        energyOn,
        energyOff,
        minToneMs,
        minGapMs,
        ignoreHeadMs,
        envelopeMs,
        hpCutoffHz,
      } = e.data;
      this.energyFloor = Number.isFinite(energyFloor) ? energyFloor : 0;
      this.energyOn = Number.isFinite(energyOn) ? energyOn : 0;
      this.energyOff = Number.isFinite(energyOff) ? energyOff : 0;
      if (this.energyOn < this.energyOff) this.energyOn = this.energyOff;
      this.minToneSamples = Math.max(
        1,
        Math.round(
          ((Number.isFinite(minToneMs) ? minToneMs : 0) * sampleRate) / 1000,
        ),
      );
      this.minGapSamples = Math.max(
        1,
        Math.round(
          ((Number.isFinite(minGapMs) ? minGapMs : 0) * sampleRate) / 1000,
        ),
      );
      this.ignoreHeadSamples = Math.max(
        0,
        Math.round(
          ((Number.isFinite(ignoreHeadMs) ? ignoreHeadMs : 0) * sampleRate) /
            1000,
        ),
      );
      const envMs = Math.max(
        1,
        Math.round(Number.isFinite(envelopeMs) ? envelopeMs : 8),
      );
      const envSamples = Math.max(1, (envMs * sampleRate) / 1000);
      this.energyDecay = Math.exp(-1 / envSamples);
      this.energyRise = 1 - this.energyDecay;
      this.energyEnv = 0;
      const hpHz = Number.isFinite(hpCutoffHz) ? hpCutoffHz : 600;
      this.hpAlpha = Math.exp((-2 * Math.PI * hpHz) / sampleRate);
      this.hpLastX = 0;
      this.hpLastY = 0;
      this.resetToneState();
      this.banks = this._buildBanks(freqSets);
      this.ready = true;
      this.port.postMessage({ t: "ready", sr: sampleRate });
    };
  }

  _buildBanks(freqSets) {
    if (!Array.isArray(freqSets)) return [];
    const banks = [];
    for (const cfg of freqSets) {
      banks.push(this._buildBank(cfg));
    }
    return banks;
  }

  _buildBank(cfg) {
    const norm = this._normalizeConfig(cfg);
    const digitCount = norm.digitCount;
    const digits = new Array(digitCount);
    for (let d = 0; d < digitCount; d++) {
      const freqMap = new Map();
      const baseFreq = Number(norm.base[d]);
      if (Number.isFinite(baseFreq) && baseFreq > 0) {
        for (const mult of norm.harmonicMultipliers) {
          const target = baseFreq * mult;
          for (const det of norm.detuneFactors) {
            this._addFreq(freqMap, target * det);
          }
        }
      }
      const extraList = norm.extra[d];
      if (Array.isArray(extraList)) {
        for (const f of extraList) this._addFreq(freqMap, f);
      }
      let freqArr = Array.from(freqMap.values())
        .filter(
          (f) => Number.isFinite(f) && f > 0 && f < this.sampleRate * 0.49,
        )
        .sort((a, b) => a - b);
      if (
        !freqArr.length &&
        Number.isFinite(baseFreq) &&
        baseFreq > 0 &&
        baseFreq < this.sampleRate * 0.49
      ) {
        freqArr = [baseFreq];
      }
      const coeffs = new Float32Array(freqArr.length);
      for (let i = 0; i < freqArr.length; i++) {
        const omega = (2 * Math.PI * freqArr[i]) / this.sampleRate;
        coeffs[i] = 2 * Math.cos(omega);
      }
      digits[d] = {
        freqs: freqArr,
        coeffs,
        primary: freqArr[0] ?? 0,
      };
    }
    return { digits };
  }

  _normalizeConfig(cfg) {
    if (Array.isArray(cfg)) {
      const digitCount = cfg.length;
      return {
        base: cfg,
        harmonicMultipliers: [1],
        detuneFactors: [1],
        extra: Array.from({ length: digitCount }, () => []),
        digitCount,
      };
    }
    const base = Array.isArray(cfg?.base) ? cfg.base : [];
    const harmonics =
      Array.isArray(cfg?.harmonicMultipliers) && cfg.harmonicMultipliers.length
        ? cfg.harmonicMultipliers
        : [1];
    const detune =
      Array.isArray(cfg?.detuneFactors) && cfg.detuneFactors.length
        ? cfg.detuneFactors
        : [1];
    const extra = Array.isArray(cfg?.extra) ? cfg.extra : [];
    const digitCount = Math.max(base.length, extra.length);
    const extras = new Array(digitCount);
    for (let i = 0; i < digitCount; i++)
      extras[i] = Array.isArray(extra[i]) ? extra[i] : [];
    return {
      base,
      harmonicMultipliers: harmonics,
      detuneFactors: detune,
      extra: extras,
      digitCount,
    };
  }

  _addFreq(freqMap, freq) {
    if (!Number.isFinite(freq)) return;
    if (freq <= 0 || freq >= this.sampleRate * 0.49) return;
    const key = Math.round(freq * 10); // ~0.1 Hz resolution dedupe
    if (!freqMap.has(key)) freqMap.set(key, freq);
  }

  emitInactive() {
    if (!this.banks.length) return;
    const results = [];
    for (let b = 0; b < this.banks.length; b++)
      results.push({ bank: b, active: false });
    this.port.postMessage({ t: "candidates", results });
  }

  resetToneState() {
    this.toneActive = false;
    this.toneBuffer = [];
    this.toneSamples = 0;
    this.gapSamples = 0;
  }

  _digitEnergy(block, digit) {
    if (!digit || !digit.coeffs || !digit.coeffs.length) {
      if (digit) digit.lastBestFreq = 0;
      return 0;
    }
    let energy = 0;
    let bestEnergy = -Infinity;
    let bestFreq = digit.primary ?? 0;
    const coeffs = digit.coeffs;
    const freqs = digit.freqs || [];
    for (let i = 0; i < coeffs.length; i++) {
      const c = coeffs[i];
      let s0 = 0;
      let s1 = 0;
      let s2 = 0;
      for (let n = 0; n < block.length; n++) {
        s0 = block[n] + c * s1 - s2;
        s2 = s1;
        s1 = s0;
      }
      const part = s1 * s1 + s2 * s2 - c * s1 * s2;
      energy += part;
      if (part > bestEnergy) {
        bestEnergy = part;
        bestFreq = freqs[i] ?? bestFreq;
      }
    }
    digit.lastBestFreq = bestFreq;
    return energy;
  }

  finalizeTone() {
    if (!this.toneSamples) return;
    const totalSamples = this.toneSamples;
    const effectiveSamples = Math.max(0, totalSamples - this.ignoreHeadSamples);
    if (totalSamples < this.minToneSamples || effectiveSamples <= 0) {
      this.emitInactive();
      this.resetToneState();
      return;
    }
    const start = Math.min(this.ignoreHeadSamples, this.toneBuffer.length);
    const length = this.toneBuffer.length - start;
    if (length <= 0) {
      this.emitInactive();
      this.resetToneState();
      return;
    }
    const block = new Float32Array(length);
    for (let i = 0; i < length; i++) block[i] = this.toneBuffer[start + i];
    const w = Math.min(Math.floor(0.005 * sampleRate), block.length >> 2);
    if (w > 0) {
      for (let i = 0; i < w; i++) {
        const r = 0.5 - 0.5 * Math.cos((Math.PI * i) / (w - 1));
        block[i] *= r;
        block[block.length - 1 - i] *= r;
      }
    }
    const results = [];
    for (let b = 0; b < this.banks.length; b++) {
      const bank = this.banks[b];
      if (!bank || !bank.digits) {
        results.push({ bank: b, active: false });
        continue;
      }
      const digitCount = bank.digits.length;
      if (!digitCount) {
        results.push({ bank: b, active: false });
        continue;
      }
      const energies = new Float32Array(digitCount);
      let totalEnergy = 0;
      for (let i = 0; i < digitCount; i++) {
        const energy = this._digitEnergy(block, bank.digits[i]);
        energies[i] = energy;
        totalEnergy += energy;
      }
      if (totalEnergy <= this.energyFloor) {
        results.push({ bank: b, active: false });
        continue;
      }
      let iMax = 0;
      let vMax = energies[0];
      let v2 = 0;
      for (let i = 1; i < digitCount; i++) {
        const val = energies[i];
        if (val > vMax) {
          v2 = vMax;
          vMax = val;
          iMax = i;
        } else if (val > v2) {
          v2 = val;
        }
      }
      const score = (vMax - v2) / Math.max(1e-12, totalEnergy);
      const digitInfo = bank.digits[iMax];
      const bestFreq = digitInfo?.lastBestFreq;
      results.push({
        bank: b,
        active: true,
        idx: iMax,
        score,
        freqHz:
          Number.isFinite(bestFreq) && bestFreq > 0
            ? bestFreq
            : (digitInfo?.primary ?? 0),
        powers: Array.from(energies),
      });
    }
    if (results.length) this.port.postMessage({ t: "candidates", results });
    this.resetToneState();
  }

  process(inputs) {
    if (!this.ready) return true;
    const x = inputs[0]?.[0];
    if (!x) return true;
    for (let i = 0; i < x.length; i++) {
      const sample = x[i];
      const filtered = sample - this.hpLastX + this.hpAlpha * this.hpLastY;
      this.hpLastX = sample;
      this.hpLastY = filtered;
      const energy = filtered * filtered;
      this.energyEnv =
        this.energyEnv * this.energyDecay + energy * this.energyRise;
      if (!this.toneActive) {
        if (this.energyEnv >= this.energyOn) {
          this.toneActive = true;
          this.toneBuffer = [];
          this.toneSamples = 0;
          this.gapSamples = 0;
        }
      }
      if (this.toneActive) {
        this.toneBuffer.push(filtered);
        this.toneSamples++;
        if (this.energyEnv <= this.energyOff) {
          this.gapSamples++;
          if (this.gapSamples >= this.minGapSamples) {
            this.finalizeTone();
          }
        } else {
          this.gapSamples = 0;
        }
      }
    }
    return true;
  }
}

registerProcessor("mb-fesk", MultiBankFESK);
