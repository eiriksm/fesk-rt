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
    this.CODE_BITS = 6;
    this.START_CODE = 62; // 111110 in binary
    this.END_CODE = 63;   // 111111 in binary
    this.START_END_MASK = (1 << this.CODE_BITS) - 1; // 0x3F
    this.recentBits = 0;
    this.recentCount = 0;
    this.frameBits = [];
    this.bitScores = [];
    this.targetBank = 0; // Focus on bank 0
  }

  processCandidate(candidate) {
    // Only process bank 0 (low frequency set)
    if (candidate.bank !== this.targetBank) return null;
    if (!candidate.active) return null;

    // Convert frequency detection to bit
    // In the default config, first freq (low) = 0, second freq (high) = 1
    const bit = candidate.idx;
    const score = candidate.score;


    if (this.state === 'hunt') {
      // Look for start code (111110 = 62)
      this.recentBits = ((this.recentBits << 1) | bit) & this.START_END_MASK;
      this.recentCount = Math.min(this.recentCount + 1, this.CODE_BITS);

      if (this.recentCount === this.CODE_BITS && this.recentBits === this.START_CODE) {
        this.state = 'payload';
        this.frameBits = [];
        this.bitScores = [];
      }
    } else if (this.state === 'payload') {
      this.frameBits.push(bit);
      this.bitScores.push(score);

      // Check for end marker or max payload length
      this.recentBits = ((this.recentBits << 1) | bit) & this.START_END_MASK;
      this.recentCount = Math.min(this.recentCount + 1, this.CODE_BITS);

      if (this.recentCount === this.CODE_BITS && this.recentBits === this.END_CODE) {
        // Found end marker - decode the frame
        const result = this.decodeFrame();
        this.state = 'hunt';
        this.recentBits = 0;
        this.recentCount = 0;
        return result;
      }

      // Safety limit: max 200 bits
      if (this.frameBits.length >= 200) {
        this.state = 'hunt';
        this.recentBits = 0;
        this.recentCount = 0;
      }
    }

    return null;
  }

  decodeFrame() {
    if (this.frameBits.length < this.CODE_BITS) {
      return null;
    }

    // Remove the end marker (last 6 bits)
    const payloadBits = this.frameBits.slice(0, -this.CODE_BITS);

    // Payload should be multiple of 6 bits
    const payloadBitLength = payloadBits.length - (payloadBits.length % this.CODE_BITS);
    if (payloadBitLength <= 0) {
      return null;
    }

    const dataWithCRC = payloadBits.slice(0, payloadBitLength);
    const codes = bitsToCodes(dataWithCRC);
    const decoded = decodeCodes(codes);

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

      // Process each bank's result
      for (const candidate of data.results) {
        if (candidate.active) {
          const decodedText = decoder.processCandidate(candidate);
          if (decodedText) {
            results.push(decodedText);
          }
        }
      }
    });

    processor.on('error', reject);

    try {
      // Configure with default FESK config
      const config = DEFAULT_FESK_DECODER_CONFIG;

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

  // TODO: Add test for sample-with-c32-long.wav
  // This longer sample requires more sophisticated decoding that matches
  // the full decoder implementation including CRC validation
  it.skip('should decode sample-with-c32-long.wav to long base32 string', async () => {
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
