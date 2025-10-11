class MultiBankFESK extends AudioWorkletProcessor {
  constructor() {
    super();
    this.ready = false;
    this.buf = [];
    this.Nsym = 0;
    this.Ngap = 0;
    this.banks = [];
    this.energyFloor = 0;
    this.port.onmessage = (e) => {
      const { freqSets, toneSamples, restSamples, energyFloor } = e.data;
      this.Nsym = Math.max(32, toneSamples | 0);
      this.Ngap = Math.max(0, restSamples | 0);
      this.energyFloor = Number.isFinite(energyFloor) ? energyFloor : 0;
      this.banks = freqSets.map((freqs) => {
        const coeffs = new Float32Array(4);
        for (let i = 0; i < 4; i++) {
          const k = Math.round((this.Nsym * freqs[i]) / sampleRate);
          const omega = (2 * Math.PI * k) / this.Nsym;
          coeffs[i] = 2 * Math.cos(omega);
        }
        return { coeffs };
      });
      this.ready = true;
      this.port.postMessage({ t: 'ready', sr: sampleRate });
    };
  }

  _goertzel(block, coeffs) {
    const N = block.length;
    const out = new Float32Array(4);
    let s0, s1, s2;
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

  process(inputs) {
    if (!this.ready) return true;
    const x = inputs[0]?.[0];
    if (!x) return true;
    for (let i = 0; i < x.length; i++) this.buf.push(x[i]);
    while (this.buf.length >= this.Nsym) {
      const block = this.buf.splice(0, this.Nsym);
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
      this.port.postMessage({ t: 'candidates', results });
      if (this.Ngap > 0 && this.buf.length >= this.Ngap) this.buf.splice(0, this.Ngap);
    }
    return true;
  }
}

registerProcessor('mb-fesk', MultiBankFESK);
