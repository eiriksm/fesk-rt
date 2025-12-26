import { describe, it, expect } from "vitest";
import {
  DEFAULT_FESK_DECODER_CONFIG,
  FREQS_SETS_4FSK,
  BFSK_FREQS_SETS,
  HYBRID_FREQS_SETS,
  __testUtils,
} from "./index.js";

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
  it("default configuration is hybrid (4FSK + BFSK)", () => {
    const config = DEFAULT_FESK_DECODER_CONFIG;

    // Default is now hybrid: 2 4FSK banks + 2 BFSK banks
    expect(config.freqSets).toEqual([
      [2349.32, 2637.02, 2959.96, 3322.44], // Bank A - 4FSK
      [2349.32, 2637.02, 2959.96, 3322.44], // Bank B - 4FSK
      [2349.32, 2637.02],                    // Bank C - BFSK
      [2349.32, 2637.02],                    // Bank D - BFSK
    ]);

    expect(config.detectorConfig).toHaveLength(4);
    expect(config.detectorConfig[0]).toMatchObject({
      harmonicMultipliers: [1, 2, 3, 4],
      detuneFactors: [0.99, 1, 1.01],
    });
    expect(config.detectorConfig[1]).toMatchObject({
      harmonicMultipliers: [1, 2, 3, 4],
      detuneFactors: [0.97, 0.985, 1, 1.015, 1.03],
    });
    expect(config.detectorConfig[2]).toMatchObject({
      harmonicMultipliers: [1, 2, 3, 4],
      detuneFactors: [0.99, 1, 1.01],
    });
    expect(config.detectorConfig[3]).toMatchObject({
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
    expect(config.scoreMinBank).toEqual([0.28, 0.18, 0.28, 0.18]);

    // Check 4FSK bank
    const gain0 = config.pipelineDefs.find((def) => def.key === "bank-0-gain0");
    expect(gain0).toMatchObject({
      label: "Bank A (4FSK)",
      modulationType: "4FSK",
      micGain: 1,
      sampleGain: 1,
    });

    // Check BFSK bank
    const bfskGain0 = config.pipelineDefs.find((def) => def.key === "bank-2-gain0");
    expect(bfskGain0).toMatchObject({
      label: "Bank C (BFSK)",
      modulationType: "BFSK",
      micGain: 1,
      sampleGain: 1,
    });

    const thresholds = config.pipelineThresholds;
    expect(thresholds.get("bank-0-gain0")).toBeCloseTo(0.28, 5);
    expect(thresholds.get("bank-1-gain0")).toBeCloseTo(0.18, 5);
    expect(thresholds.get("bank-2-gain0")).toBeCloseTo(0.28, 5);
    expect(thresholds.get("bank-3-gain0")).toBeCloseTo(0.18, 5);
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

  it("supports 4FSK, BFSK, and hybrid frequency configurations", () => {
    // 4FSK configuration
    expect(FREQS_SETS_4FSK).toHaveLength(2);
    expect(FREQS_SETS_4FSK[0]).toEqual([2349.32, 2637.02, 2959.96, 3322.44]);
    expect(FREQS_SETS_4FSK[1]).toEqual([2349.32, 2637.02, 2959.96, 3322.44]);

    const fourFskDefs = buildPipelineDefs(FREQS_SETS_4FSK);
    expect(fourFskDefs[0]).toMatchObject({
      modulationType: "4FSK",
      label: "Bank A (4FSK)",
    });

    // BFSK configuration (derived from 4FSK - first 2 frequencies)
    expect(BFSK_FREQS_SETS).toHaveLength(2);
    expect(BFSK_FREQS_SETS[0]).toEqual([2349.32, 2637.02]);
    expect(BFSK_FREQS_SETS[1]).toEqual([2349.32, 2637.02]);

    const bfskDefs = buildPipelineDefs(BFSK_FREQS_SETS);
    expect(bfskDefs[0]).toMatchObject({
      modulationType: "BFSK",
      label: "Bank A (BFSK)",
    });

    // Hybrid configuration (2 4FSK banks + 2 BFSK banks)
    expect(HYBRID_FREQS_SETS).toHaveLength(4);
    expect(HYBRID_FREQS_SETS[0]).toEqual([2349.32, 2637.02, 2959.96, 3322.44]); // 4FSK
    expect(HYBRID_FREQS_SETS[1]).toEqual([2349.32, 2637.02, 2959.96, 3322.44]); // 4FSK
    expect(HYBRID_FREQS_SETS[2]).toEqual([2349.32, 2637.02]); // BFSK
    expect(HYBRID_FREQS_SETS[3]).toEqual([2349.32, 2637.02]); // BFSK

    const hybridDefs = buildPipelineDefs(HYBRID_FREQS_SETS);
    expect(hybridDefs[0]).toMatchObject({
      modulationType: "4FSK",
      label: "Bank A (4FSK)",
    });
    expect(hybridDefs[10]).toMatchObject({
      modulationType: "BFSK",
      label: "Bank C (BFSK)",
    });
  });
});
