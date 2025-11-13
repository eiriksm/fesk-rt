/**
 * AudioWorklet wrapper for FeskCore
 * This is a thin wrapper that adapts the shared FeskCore algorithm
 * for use in the Web Audio API AudioWorklet context.
 */

import { FeskCore } from "/lib/fesk-core.js";

class MultiBankFESK extends AudioWorkletProcessor {
  constructor() {
    super();
    this.core = new FeskCore(sampleRate);

    // Set up callbacks to forward results to main thread
    this.core.onCandidates = (data) => {
      this.port.postMessage({
        t: "candidates",
        pipeline: data.pipeline,
        results: data.results,
      });
    };

    this.core.onReady = (data) => {
      this.port.postMessage({
        t: "ready",
        sr: data.sampleRate,
        pipeline: data.pipeline,
      });
    };

    // Listen for configuration messages
    this.port.onmessage = (e) => {
      this.core.configure(e.data);
    };
  }

  process(inputs) {
    const x = inputs[0]?.[0];
    if (!x) return true;
    this.core.processBlock(x);
    return true;
  }
}

registerProcessor("mb-fesk", MultiBankFESK);
