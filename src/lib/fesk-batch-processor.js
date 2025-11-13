/**
 * Node.js batch processor for FESK audio decoding
 * This module provides a non-real-time interface for processing
 * audio files or buffers using the shared FeskCore algorithm.
 *
 * Unlike the AudioWorklet version which processes in real-time,
 * this can process audio at any speed and is suitable for:
 * - Batch processing of audio files
 * - Server-side audio analysis
 * - Unit testing
 * - Offline analysis
 */

import { EventEmitter } from "events";
import { FeskCore } from "../../public/lib/fesk-core.js";

export class FeskBatchProcessor extends EventEmitter {
  /**
   * Create a batch processor
   * @param {number} sampleRate - Sample rate of the audio to process
   */
  constructor(sampleRate) {
    super();
    this.core = new FeskCore(sampleRate);
    this.sampleRate = sampleRate;

    // Wire up core callbacks to EventEmitter
    this.core.onCandidates = (data) => {
      this.emit("candidates", data);
    };

    this.core.onReady = (data) => {
      this.emit("ready", data);
    };
  }

  /**
   * Configure the processor with detection parameters
   * @param {Object} config - Configuration object (same format as worklet)
   */
  configure(config) {
    this.core.configure(config);
    return this;
  }

  /**
   * Process a complete audio buffer
   * @param {Float32Array|Array|Buffer} audioData - Audio samples (mono, normalized -1 to 1)
   */
  processBuffer(audioData) {
    // Convert Buffer to Float32Array if needed
    if (Buffer.isBuffer(audioData)) {
      // Assume 16-bit PCM if Buffer
      const samples = new Float32Array(audioData.length / 2);
      for (let i = 0; i < samples.length; i++) {
        const sample = audioData.readInt16LE(i * 2);
        samples[i] = sample / 32768.0; // Normalize to -1 to 1
      }
      audioData = samples;
    }

    this.core.processBlock(audioData);
    return this;
  }

  /**
   * Process audio in chunks (useful for streaming)
   * @param {Float32Array|Array} chunk - Audio sample chunk
   */
  processChunk(chunk) {
    this.core.processBlock(chunk);
    return this;
  }

  /**
   * Finalize processing and emit any pending tones
   * Call this when you've finished feeding audio data
   */
  flush() {
    this.core.flush();
    return this;
  }

  /**
   * Reset the processor state
   */
  reset() {
    this.core.reset();
    return this;
  }

  /**
   * Check if processor is configured and ready
   */
  isReady() {
    return this.core.ready;
  }

  /**
   * Get current pipeline key
   */
  getPipelineKey() {
    return this.core.pipelineKey;
  }
}

/**
 * Convenience function to process an entire audio buffer and collect all results
 * @param {Float32Array|Array|Buffer} audioData - Audio samples
 * @param {number} sampleRate - Sample rate of the audio
 * @param {Object} config - Processor configuration
 * @returns {Promise<Array>} Promise that resolves with array of all candidate results
 */
export async function processAudio(audioData, sampleRate, config) {
  return new Promise((resolve, reject) => {
    const processor = new FeskBatchProcessor(sampleRate);
    const results = [];

    processor.on("candidates", (data) => {
      results.push(data);
    });

    processor.on("error", (err) => {
      reject(err);
    });

    try {
      processor.configure(config);
      processor.processBuffer(audioData);
      processor.flush();
      resolve(results);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Helper to convert stereo to mono by averaging channels
 * @param {Float32Array} left - Left channel
 * @param {Float32Array} right - Right channel
 * @returns {Float32Array} Mono audio
 */
export function stereoToMono(left, right) {
  const mono = new Float32Array(left.length);
  for (let i = 0; i < left.length; i++) {
    mono[i] = (left[i] + right[i]) / 2;
  }
  return mono;
}
