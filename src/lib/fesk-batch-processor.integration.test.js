/**
 * Integration tests for FeskBatchProcessor with real audio samples
 * Tests that the batch processor can decode actual recorded audio files
 */

import { describe, it, expect } from 'vitest';
import { FeskBatchProcessor } from './fesk-batch-processor.js';
import { DEFAULT_FESK_DECODER_CONFIG, __testUtils } from './decoder/index.js';
import { decode as decodeWav } from 'wav-decoder';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { bitsToCodes, decodeCodes } = __testUtils;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to convert stereo to mono
function stereoToMono(audioData) {
  if (audioData.numberOfChannels === 1) {
    return audioData.channelData[0];
  }
  const left = audioData.channelData[0];
  const right = audioData.channelData[1];
  const mono = new Float32Array(left.length);
  for (let i = 0; i < left.length; i++) {
    mono[i] = (left[i] + right[i]) / 2;
  }
  return mono;
}

// Simple decoder state machine to convert candidates to decoded text
// Focuses on bank 0 (low frequency set) for decoding
class SimpleFeskDecoder {
  constructor(config) {
    this.config = config;
    this.state = 'hunt'; // 'hunt' or 'payload'
    this.markerBits = [];
    this.MARKER = [1, 1, 0, 1, 0, 1, 0, 0, 1, 0]; // Start marker pattern
    this.MARKER_BITS = this.MARKER.length;
    this.frameBits = [];
    this.targetBank = 0; // Focus on bank 0
  }

  processCandidate(candidate) {
    // Only process bank 0 (low frequency set)
    if (candidate.bank !== this.targetBank) return null;
    if (!candidate.active) return null;

    // Convert frequency detection to bit
    // In the default config, first freq (low) = 0, second freq (high) = 1
    const bit = candidate.idx;

    // Debug: log first 20 bits
    if (!this.bitCount) this.bitCount = 0;
    this.bitCount++;
    if (this.bitCount <= 50) {
      console.log(`Bit ${this.bitCount}: ${bit} (score: ${candidate.score.toFixed(3)}, freq: ${candidate.freqHz.toFixed(1)}Hz)`);
    }

    if (this.state === 'hunt') {
      this.markerBits.push(bit);
      if (this.markerBits.length > this.MARKER_BITS) {
        this.markerBits.shift();
      }

      // Debug: check marker matching periodically
      if (this.markerBits.length === this.MARKER_BITS && this.bitCount % 100 === 0) {
        console.log(`Checking marker at bit ${this.bitCount}: [${this.markerBits.join(',')}] vs [${this.MARKER.join(',')}]`);
      }

      // Check if we have the start marker
      if (this.markerBits.length === this.MARKER_BITS) {
        let match = true;
        for (let i = 0; i < this.MARKER_BITS; i++) {
          if (this.markerBits[i] !== this.MARKER[i]) {
            match = false;
            break;
          }
        }

        if (match) {
          console.log('✅ Found start marker! Switching to payload mode');
          this.state = 'payload';
          this.frameBits = [];
          this.markerBits = [];
        }
      }
    } else if (this.state === 'payload') {
      this.frameBits.push(bit);

      // Full frame: 90 payload bits + 8 CRC bits
      if (this.frameBits.length >= 98) {
        const result = this.decodeFrame();
        this.state = 'hunt';
        this.markerBits = [];
        this.frameBits = [];
        return result;
      }
    }

    return null;
  }

  decodeFrame() {
    if (this.frameBits.length < 98) return null;

    console.log('Decoding frame with', this.frameBits.length, 'bits');

    // Extract payload bits (first 90 bits)
    const payloadBits = this.frameBits.slice(0, 90);

    // Convert bits to codes (6 bits per code = 15 codes)
    const codes = bitsToCodes(payloadBits);
    console.log('Decoded codes:', codes);

    // Decode codes to text
    const decoded = decodeCodes(codes);
    console.log('Decoded result:', decoded);

    if (decoded.ok) {
      return decoded.text;
    }

    return null;
  }
}

// Helper to process a sample file
async function processSample(filename, expectedText) {
  const samplePath = path.join(__dirname, '../../public', filename);
  const wavBuffer = fs.readFileSync(samplePath);
  const audioData = await decodeWav(wavBuffer);

  const mono = stereoToMono(audioData);

  return new Promise((resolve, reject) => {
    const processor = new FeskBatchProcessor(audioData.sampleRate);
    const decoder = new SimpleFeskDecoder(DEFAULT_FESK_DECODER_CONFIG);

    const results = [];
    let candidateCount = 0;

    processor.on('candidates', (data) => {
      candidateCount++;

      // Log for debugging
      const activeCount = data.results.filter(r => r.active).length;
      if (candidateCount <= 5 || activeCount > 0) {
        console.log(`Candidate ${candidateCount}: ${activeCount} active of ${data.results.length} total`);
        if (activeCount > 0) {
          console.log('  Active candidates:', data.results.filter(r => r.active));
        }
      }

      // Process each bank's result
      for (const candidate of data.results) {
        if (candidate.active) {
          const decodedText = decoder.processCandidate(candidate);
          if (decodedText) {
            console.log('Decoded text:', decodedText);
            results.push(decodedText);
          }
        }
      }
    });

    processor.on('error', reject);

    try {
      // Configure with default FESK config
      const config = DEFAULT_FESK_DECODER_CONFIG;

      console.log('Configuring processor with:', {
        sampleRate: audioData.sampleRate,
        freqSets: config.freqSets,
        detectorConfig: config.detectorConfig,
        energy: config.energy,
      });

      // Need to pass detectorConfig to freqSets
      const freqSetsWithConfig = config.freqSets.map((freqSet, i) => {
        const detectorCfg = config.detectorConfig[i];
        if (detectorCfg) {
          return {
            base: freqSet,
            harmonicMultipliers: detectorCfg.harmonicMultipliers,
            detuneFactors: detectorCfg.detuneFactors,
          };
        }
        return freqSet;
      });

      processor.configure({
        freqSets: freqSetsWithConfig,
        energyFloor: config.energy.floor,
        energyOn: config.energy.on,
        energyOff: config.energy.off,
        minToneMs: config.energy.minToneMs,
        minGapMs: config.energy.minGapMs,
        ignoreHeadMs: config.energy.ignoreHeadMs,
        envelopeMs: config.energy.envelopeMs,
        hpCutoffHz: config.energy.hpCutoffHz,
        pipelineKey: 'integration-test',
      });

      processor.processBuffer(mono);
      processor.flush();

      resolve({
        decodedTexts: results,
        candidateCount,
        filename,
        expectedText,
      });
    } catch (err) {
      reject(err);
    }
  });
}

describe('FeskBatchProcessor Integration Tests', () => {
  it('should decode sample2.wav to "abc9012"', async () => {
    const result = await processSample('sample2.wav', 'abc9012');

    expect(result.candidateCount).toBeGreaterThan(0);
    expect(result.decodedTexts.length).toBeGreaterThan(0);

    // Should contain the expected text
    const allText = result.decodedTexts.join('');
    expect(allText).toContain('abc9012');
  }, 30000);

  it('should decode sample-with-c32-long.wav to long base32 string', async () => {
    const expectedStart = 'rfie4rynbinauaaaaagusscekiaaaaacaaaaaaqcamaaaaap3ds3oaaaaaaxgushiia5tsjmp4aaaaajobefs4yaaafrgaaabmjqcae2tqmaaaaabrieyvcfuk737777777vww2skjjduqzpdaaaaaamjfcecvdytrrriyg4aaaab2qaynvjxuloaaaaaacjivhejlscmcba';

    const result = await processSample(
      'sample-with-c32-long.wav',
      expectedStart
    );

    expect(result.candidateCount).toBeGreaterThan(0);
    expect(result.decodedTexts.length).toBeGreaterThan(0);

    // Should contain the expected text
    const allText = result.decodedTexts.join('');
    expect(allText).toContain(expectedStart);
  }, 120000); // Long sample needs more time
});
