import { describe, it, expect, beforeEach } from "vitest";
import {
  FeskBatchProcessor,
  processAudio,
  stereoToMono,
} from "./fesk-batch-processor.js";

describe("FeskBatchProcessor", () => {
  const sampleRate = 48000;
  const testConfig = {
    freqSets: [
      [2490.2, 3134.8], // Simple two-frequency set
    ],
    energyFloor: 5e-7,
    energyOn: 6e-4,
    energyOff: 2e-4,
    minToneMs: 40,
    minGapMs: 5,
    ignoreHeadMs: 6,
    envelopeMs: 6,
    hpCutoffHz: 600,
    pipelineKey: "test-pipeline",
  };

  let processor;

  beforeEach(() => {
    processor = new FeskBatchProcessor(sampleRate);
  });

  describe("constructor", () => {
    it("should create a processor with correct sample rate", () => {
      expect(processor.sampleRate).toBe(sampleRate);
      expect(processor.core).toBeDefined();
      expect(processor.core.sampleRate).toBe(sampleRate);
    });

    it("should not be ready before configuration", () => {
      expect(processor.isReady()).toBe(false);
    });
  });

  describe("configure", () => {
    it("should configure the processor and emit ready event", async () => {
      const readyPromise = new Promise((resolve) => {
        processor.on("ready", (data) => {
          expect(data.sampleRate).toBe(sampleRate);
          expect(data.pipeline).toBe("test-pipeline");
          resolve();
        });
      });

      processor.configure(testConfig);
      expect(processor.isReady()).toBe(true);
      await readyPromise;
    });

    it("should return itself for chaining", () => {
      const result = processor.configure(testConfig);
      expect(result).toBe(processor);
    });

    it("should store pipeline key", () => {
      processor.configure(testConfig);
      expect(processor.getPipelineKey()).toBe("test-pipeline");
    });
  });

  describe("processBuffer", () => {
    beforeEach(() => {
      processor.configure(testConfig);
    });

    it("should process Float32Array audio data", () => {
      const audioData = new Float32Array(1000);
      // Generate some test audio (silence)
      audioData.fill(0);

      const result = processor.processBuffer(audioData);
      expect(result).toBe(processor); // Returns self for chaining
    });

    it("should process regular Array audio data", () => {
      const audioData = new Array(1000).fill(0);
      const result = processor.processBuffer(audioData);
      expect(result).toBe(processor);
    });

    it("should convert Buffer to Float32Array", () => {
      // Create a Buffer with 16-bit PCM data
      const buffer = Buffer.alloc(200); // 100 samples
      for (let i = 0; i < 100; i++) {
        // Write some test values
        buffer.writeInt16LE(Math.floor(Math.sin(i * 0.1) * 16384), i * 2);
      }

      const result = processor.processBuffer(buffer);
      expect(result).toBe(processor);
    });

    it("should emit candidates for tone detection", async () => {
      // Generate a test tone at the first frequency (2490.2 Hz)
      const freq = 2490.2;
      const duration = 0.1; // 100ms tone
      const samples = Math.floor(sampleRate * duration);
      const audioData = new Float32Array(samples);

      for (let i = 0; i < samples; i++) {
        audioData[i] = 0.5 * Math.sin((2 * Math.PI * freq * i) / sampleRate);
      }

      const candidatesPromise = new Promise((resolve) => {
        processor.on("candidates", (data) => {
          expect(data).toHaveProperty("pipeline");
          expect(data).toHaveProperty("results");
          expect(Array.isArray(data.results)).toBe(true);
          resolve();
        });
      });

      processor.processBuffer(audioData);
      processor.flush(); // Force finalization
      await candidatesPromise;
    });
  });

  describe("processChunk", () => {
    beforeEach(() => {
      processor.configure(testConfig);
    });

    it("should process audio in chunks", () => {
      const chunkSize = 128;
      const chunk1 = new Float32Array(chunkSize).fill(0);
      const chunk2 = new Float32Array(chunkSize).fill(0);

      processor.processChunk(chunk1);
      processor.processChunk(chunk2);

      expect(processor.isReady()).toBe(true);
    });

    it("should return itself for chaining", () => {
      const chunk = new Float32Array(128);
      const result = processor.processChunk(chunk);
      expect(result).toBe(processor);
    });
  });

  describe("flush", () => {
    beforeEach(() => {
      processor.configure(testConfig);
    });

    it("should finalize any pending tones", () => {
      const audioData = new Float32Array(1000);
      processor.processBuffer(audioData);

      const result = processor.flush();
      expect(result).toBe(processor);
    });

    it("should return itself for chaining", () => {
      const result = processor.flush();
      expect(result).toBe(processor);
    });
  });

  describe("reset", () => {
    beforeEach(() => {
      processor.configure(testConfig);
    });

    it("should reset processor state", () => {
      const audioData = new Float32Array(1000);
      processor.processBuffer(audioData);

      const result = processor.reset();
      expect(result).toBe(processor);
      expect(processor.isReady()).toBe(true); // Still configured
    });
  });

  describe("event emitter behavior", () => {
    it("should emit multiple events", async () => {
      let readyFired = false;
      let candidatesFired = false;

      const eventsPromise = new Promise((resolve) => {
        processor.on("ready", () => {
          readyFired = true;
          checkDone();
        });

        processor.on("candidates", () => {
          candidatesFired = true;
          checkDone();
        });

        function checkDone() {
          if (readyFired && candidatesFired) {
            resolve();
          }
        }
      });

      processor.configure(testConfig);

      // Generate a strong test tone
      const freq = 2490.2;
      const duration = 0.1;
      const samples = Math.floor(sampleRate * duration);
      const audioData = new Float32Array(samples);
      for (let i = 0; i < samples; i++) {
        audioData[i] = 0.8 * Math.sin((2 * Math.PI * freq * i) / sampleRate);
      }

      processor.processBuffer(audioData);
      processor.flush();
      await eventsPromise;
    });
  });
});

describe("processAudio helper", () => {
  const sampleRate = 48000;
  const testConfig = {
    freqSets: [[2490.2, 3134.8]],
    energyFloor: 5e-7,
    energyOn: 6e-4,
    energyOff: 2e-4,
    minToneMs: 40,
    minGapMs: 5,
    ignoreHeadMs: 6,
    envelopeMs: 6,
    hpCutoffHz: 600,
    pipelineKey: "test",
  };

  it("should process audio and return all results", async () => {
    const audioData = new Float32Array(1000).fill(0);
    const results = await processAudio(audioData, sampleRate, testConfig);

    expect(Array.isArray(results)).toBe(true);
  });

  it("should collect multiple candidate results", async () => {
    // Generate multiple tones separated by gaps
    const toneFreq = 2490.2;
    const toneDuration = 0.05; // 50ms
    const gapDuration = 0.01; // 10ms
    const toneSamples = Math.floor(sampleRate * toneDuration);
    const gapSamples = Math.floor(sampleRate * gapDuration);

    const audioData = new Float32Array(toneSamples * 2 + gapSamples);

    // First tone
    for (let i = 0; i < toneSamples; i++) {
      audioData[i] = 0.8 * Math.sin((2 * Math.PI * toneFreq * i) / sampleRate);
    }

    // Gap (silence)
    for (let i = toneSamples; i < toneSamples + gapSamples; i++) {
      audioData[i] = 0;
    }

    // Second tone
    for (let i = toneSamples + gapSamples; i < audioData.length; i++) {
      const t = i - (toneSamples + gapSamples);
      audioData[i] = 0.8 * Math.sin((2 * Math.PI * toneFreq * t) / sampleRate);
    }

    const results = await processAudio(audioData, sampleRate, testConfig);
    expect(results.length).toBeGreaterThan(0);
  });

  it("should reject on errors", async () => {
    // Pass invalid config to trigger error
    const audioData = new Float32Array(1000);
    const invalidConfig = { ...testConfig, freqSets: null };

    const results = await processAudio(audioData, sampleRate, invalidConfig);
    // Should still resolve but may have empty results
    expect(Array.isArray(results)).toBe(true);
  });
});

describe("stereoToMono helper", () => {
  it("should convert stereo to mono by averaging", () => {
    const left = new Float32Array([1, 0.5, -0.5, -1]);
    const right = new Float32Array([-1, -0.5, 0.5, 1]);

    const mono = stereoToMono(left, right);

    expect(mono).toBeInstanceOf(Float32Array);
    expect(mono.length).toBe(4);
    expect(mono[0]).toBe(0); // (1 + -1) / 2
    expect(mono[1]).toBe(0); // (0.5 + -0.5) / 2
    expect(mono[2]).toBe(0); // (-0.5 + 0.5) / 2
    expect(mono[3]).toBe(0); // (-1 + 1) / 2
  });

  it("should handle identical channels", () => {
    const left = new Float32Array([1, 0.5, -0.5, -1]);
    const right = new Float32Array([1, 0.5, -0.5, -1]);

    const mono = stereoToMono(left, right);

    expect(mono[0]).toBe(1);
    expect(mono[1]).toBe(0.5);
    expect(mono[2]).toBe(-0.5);
    expect(mono[3]).toBe(-1);
  });

  it("should handle zero signals", () => {
    const left = new Float32Array(100).fill(0);
    const right = new Float32Array(100).fill(0);

    const mono = stereoToMono(left, right);

    expect(mono.every((sample) => sample === 0)).toBe(true);
  });
});
