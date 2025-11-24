import { describe, it, expect } from "vitest";
import { DEFAULT_FESK_DECODER_CONFIG, __testUtils } from "./index.js";

const {
  bitsToCodes,
  decodeCodes,
  crc8ATM,
  buildPipelineDefs,
  buildPipelineThresholds,
} = __testUtils;

function codesToBits(codes) {
  return codes.flatMap((code) => {
    const bits = [];
    for (let shift = 5; shift >= 0; shift -= 1) {
      bits.push((code >> shift) & 1);
    }
    return bits;
  });
}

describe("decoder internals", () => {
  it("preserves the historical default configuration constants", () => {
    const config = DEFAULT_FESK_DECODER_CONFIG;

    expect(config.freqSets).toEqual([
      [2093, 2217, 2349, 2489, 2637, 2794, 2960, 3136],
      [2093, 2217, 2349, 2489, 2637, 2794, 2960, 3136],
    ]);

    expect(config.detectorConfig).toHaveLength(2);
    expect(config.detectorConfig[0]).toMatchObject({
      harmonicMultipliers: [1, 2, 3, 4],
      detuneFactors: [0.99, 1, 1.01],
    });
    expect(config.detectorConfig[1]).toMatchObject({
      harmonicMultipliers: [1, 2, 3, 4],
      detuneFactors: [0.97, 0.985, 1, 1.015, 1.03],
    });

    expect(config.energy).toMatchObject({
      floor: 5e-7,
      on: 6e-4,
      off: 2e-4,
      minToneMs: 40,
      minGapMs: 5,
      ignoreHeadMs: 6,
      envelopeMs: 6,
      hpCutoffHz: 600,
    });

    expect(config.scoreMin).toBeCloseTo(0.2, 5);
    expect(config.scoreMinBank).toEqual([0.28, 0.18]);

    const gain0 = config.pipelineDefs.find((def) => def.key === "bank-0-gain0");
    const gain1 = config.pipelineDefs.find((def) => def.key === "bank-0-gain1");
    const gain2 = config.pipelineDefs.find((def) => def.key === "bank-0-gain2");
    const gain3 = config.pipelineDefs.find((def) => def.key === "bank-0-gain3");
    const gain4 = config.pipelineDefs.find((def) => def.key === "bank-0-gain4");

    expect(gain0).toMatchObject({
      label: "Bank A",
      micGain: 1,
      sampleGain: 1,
    });
    expect(gain1).toMatchObject({
      label: "Bank A ×2",
      micGain: 2,
      sampleGain: 2,
    });
    expect(gain2).toMatchObject({
      label: "Bank A ×4",
      micGain: 4,
      sampleGain: 4,
    });
    expect(gain3).toMatchObject({
      label: "Bank A ×8",
      micGain: 8,
      sampleGain: 8,
    });
    expect(gain4).toMatchObject({
      label: "Bank A ×16",
      micGain: 16,
      sampleGain: 16,
    });

    const thresholds = config.pipelineThresholds;
    expect(thresholds.get("bank-0-gain0")).toBeCloseTo(0.28, 5);
    expect(thresholds.get("bank-1-gain0")).toBeCloseTo(0.18, 5);
    expect(thresholds.get("bank-1-gain4")).toBeCloseTo(0.18, 5);
  });

  it("converts bit streams into codes and decoded text", () => {
    const codes = [0, 1, 2, 41, 26, 35];
    const bits = codesToBits(codes);

    const parsedCodes = bitsToCodes(bits);
    expect(parsedCodes).toEqual(codes);

    const decoded = decodeCodes(parsedCodes);
    const expectedText = `abc
09`;
    expect(decoded).toEqual({ ok: true, text: expectedText });

    // CRC-8 ATM checksum over the code stream remains stable.
    expect(crc8ATM(parsedCodes)).toBe(110);
  });

  it("decodes newline codes into literal line breaks", () => {
    const decoded = decodeCodes([0, 41, 1]);

    expect(decoded.ok).toBe(true);
    expect(decoded.text).toMatchInlineSnapshot(`
      "a
      b"
    `);
  });

  it("builds pipeline thresholds with per-bank overrides", () => {
    const freqSets = [
      [100, 200],
      [300, 400],
    ];
    const defs = buildPipelineDefs(freqSets, {
      micBase: 2,
      sampleBase: 3,
      gainMultipliers: [1, 4, 5],
    });

    expect(defs).toHaveLength(6);
    expect(defs[0]).toMatchObject({
      key: "bank-0-gain0",
      micGain: 2,
      sampleGain: 3,
    });
    expect(defs[1]).toMatchObject({
      key: "bank-0-gain1",
      micGain: 8,
      sampleGain: 12,
    });
    expect(defs[2]).toMatchObject({
      key: "bank-0-gain2",
      micGain: 10,
      sampleGain: 15,
    });

    const thresholds = buildPipelineThresholds(defs, [0.9], 0.25);
    expect(thresholds.get("bank-0-gain0")).toBeCloseTo(0.9, 5);
    expect(thresholds.get("bank-0-gain1")).toBeCloseTo(0.9, 5);
    expect(thresholds.get("bank-1-gain0")).toBeCloseTo(0.25, 5);
  });

  it("decodes tone sequence: 7 6 2 3 0 4 2 2 2 3 4 0 6 7 7", () => {
    // Tone sequence from transmission: [start] [payload+CRC] [end]
    // Start marker: 7 6 = tribits 111 110 = code 62
    // End marker: 7 7 = tribits 111 111 = code 63
    // Payload + CRC: 2 3 0 4 2 2 2 3 4 0 6 = 11 tribits

    // Convert tribits to bits
    const tribitsToBits = (tribits) => {
      return tribits.flatMap(t => [
        (t >> 2) & 1, // MSB
        (t >> 1) & 1, // Middle
        t & 1,        // LSB
      ]);
    };

    // Payload tribits (first 8 tribits = 4 codes of 6 bits each)
    const payloadTribits = [2, 3, 0, 4, 2, 2, 2, 3];
    const payloadBits = tribitsToBits(payloadTribits);
    const payloadCodes = bitsToCodes(payloadBits);

    // Should decode to valid text
    const decoded = decodeCodes(payloadCodes);
    expect(decoded.ok).toBe(true);
    expect(decoded.text).toBeTruthy();

    // CRC tribits (last 3 tribits encode 8-bit CRC)
    const crcTribits = [4, 0, 6];
    // Tribit 1 (4 = 100): CRC bits 7-5
    // Tribit 2 (0 = 000): CRC bits 4-2
    // Tribit 3 (6 = 110): CRC bits 1-0 left-shifted (b1 b0 0)
    const expectedCrc = (4 << 5) | (0 << 2) | (6 >> 1);

    // Verify CRC matches
    const actualCrc = crc8ATM(payloadCodes);
    expect(actualCrc).toBe(expectedCrc);

    console.log('Decoded text:', decoded.text);
    console.log('Payload codes:', payloadCodes);
    console.log('Expected CRC:', expectedCrc, 'Actual CRC:', actualCrc);
  });
});
