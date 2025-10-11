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
    this.toneActive = false;
    this.toneBuffer = [];
    this.toneSamples = 0;
    this.gapSamples = 0;
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
      } = e.data;
      this.energyFloor = Number.isFinite(energyFloor) ? energyFloor : 0;
      this.energyOn = Number.isFinite(energyOn) ? energyOn : 0;
      this.energyOff = Number.isFinite(energyOff) ? energyOff : 0;
      if (this.energyOn < this.energyOff) this.energyOn = this.energyOff;
      this.minToneSamples = Math.max(1, Math.round((Number.isFinite(minToneMs) ? minToneMs : 0) * sampleRate / 1000));
      this.minGapSamples = Math.max(1, Math.round((Number.isFinite(minGapMs) ? minGapMs : 0) * sampleRate / 1000));
      this.ignoreHeadSamples = Math.max(0, Math.round((Number.isFinite(ignoreHeadMs) ? ignoreHeadMs : 0) * sampleRate / 1000));
      const envMs = Math.max(1, Math.round(Number.isFinite(envelopeMs) ? envelopeMs : 8));
      const envSamples = Math.max(1, (envMs * sampleRate) / 1000);
      this.energyDecay = Math.exp(-1 / envSamples);
      this.energyRise = 1 - this.energyDecay;
      this.energyEnv = 0;
      this.resetToneState();
      this.banks = Array.isArray(freqSets) ? freqSets.map((freqs) => {
        const coeffs = new Float32Array(4);
        for (let i = 0; i < 4; i++) {
          const omega = (2 * Math.PI * freqs[i]) / sampleRate;
          coeffs[i] = 2 * Math.cos(omega);
        }
        return { coeffs };
      }) : [];
      this.ready = true;
      this.port.postMessage({ t: 'ready', sr: sampleRate });
    };
  }

  emitInactive() {
    if (!this.banks.length) return;
    const results = [];
    for (let b = 0; b < this.banks.length; b++) results.push({ bank: b, active: false });
    this.port.postMessage({ t: 'candidates', results });
  }

  resetToneState() {
    this.toneActive = false;
    this.toneBuffer = [];
    this.toneSamples = 0;
    this.gapSamples = 0;
  }

  _goertzel(block, coeffs) {
    const N = block.length;
    const out = new Float32Array(4);
    let s0 = 0;
    let s1 = 0;
    let s2 = 0;
    for (let i = 0; i < 4; i++) {
      const c = coeffs[i];
      s0 = 0;
      s1 = 0;
      s2 = 0;
      for (let n = 0; n < N; n++) {
        s0 = block[n] + c * s1 - s2;
        s2 = s1;
        s1 = s0;
      }
      out[i] = s1 * s1 + s2 * s2 - c * s1 * s2;
    }
    return out;
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
      const P = this._goertzel(block, this.banks[b].coeffs);
      const energy = P[0] + P[1] + P[2] + P[3];
      if (energy <= this.energyFloor) {
        results.push({ bank: b, active: false });
        continue;
      }
      let iMax = 0;
      let vMax = P[0];
      let i2 = 1;
      let v2 = P[1];
      for (let i = 1; i < 4; i++) {
        if (P[i] > vMax) {
          i2 = iMax;
          v2 = vMax;
          iMax = i;
          vMax = P[i];
        } else if (P[i] > v2) {
          i2 = i;
          v2 = P[i];
        }
      }
      const score = (vMax - v2) / Math.max(1e-12, energy);
      results.push({ bank: b, active: true, idx: iMax, score });
    }
    if (results.length) this.port.postMessage({ t: 'candidates', results });
    this.resetToneState();
  }

  process(inputs) {
    if (!this.ready) return true;
    const x = inputs[0]?.[0];
    if (!x) return true;
    for (let i = 0; i < x.length; i++) {
      const sample = x[i];
      const energyInst = sample * sample;
      this.energyEnv = this.energyEnv * this.energyDecay + energyInst * this.energyRise;
      if (!this.toneActive) {
        if (this.energyEnv >= this.energyOn) {
          this.toneActive = true;
          this.toneBuffer = [];
          this.toneSamples = 0;
          this.gapSamples = 0;
        }
      }
      if (this.toneActive) {
        this.toneBuffer.push(sample);
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

registerProcessor('mb-fesk', MultiBankFESK);
