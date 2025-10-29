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
      [2560, 3072],
      [7394, 9313],
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

    const bank0Defs = config.pipelineDefs.filter(
      (def) => def.baseBankIndex === 0,
    );
    expect(bank0Defs).toHaveLength(30);

    const baseDef = bank0Defs.find((def) => def.key === "bank-0");
    expect(baseDef).toMatchObject({
      key: "bank-0",
      label: "Bank A",
      micGain: 1,
      sampleGain: 1,
    });

    const zeroDef = bank0Defs.find((def) => def.key === "bank-0-x0");
    expect(zeroDef).toMatchObject({
      key: "bank-0-x0",
      label: "Bank A ×0",
      micGain: 0,
      sampleGain: 0,
    });

    const fineDef = bank0Defs.find((def) => def.key === "bank-0-x0-1");
    expect(fineDef).toMatchObject({
      key: "bank-0-x0-1",
      label: "Bank A ×0.1",
      micGain: 0.1,
      sampleGain: 0.1,
    });

    const maxDef = bank0Defs.find((def) => def.key === "bank-0-x20");
    expect(maxDef).toMatchObject({
      key: "bank-0-x20",
      label: "Bank A ×20",
      micGain: 20,
      sampleGain: 20,
    });

    const thresholds = config.pipelineThresholds;
    expect(thresholds.get("bank-0")).toBeCloseTo(0.28, 5);
    expect(thresholds.get("bank-1")).toBeCloseTo(0.18, 5);
    expect(thresholds.get("bank-1-x20")).toBeCloseTo(0.18, 5);
  });

  it("converts bit streams into codes and decoded text", () => {
    const codes = [0, 1, 2, 26, 35];
    const bits = codesToBits(codes);

    const parsedCodes = bitsToCodes(bits);
    expect(parsedCodes).toEqual(codes);

    const decoded = decodeCodes(parsedCodes);
    expect(decoded).toEqual({ ok: true, text: "abc09" });

    // CRC-8 ATM checksum over the code stream remains stable.
    expect(crc8ATM(parsedCodes)).toBe(27);
  });

  it("builds pipeline thresholds with per-bank overrides", () => {
    const freqSets = [
      [100, 200],
      [300, 400],
    ];
    const defs = buildPipelineDefs(freqSets, {
      micBase: 2,
      sampleBase: 3,
      gainMultipliers: [1, 2, 5],
    });

    expect(defs).toHaveLength(6);
    expect(defs[0]).toMatchObject({
      key: "bank-0",
      micGain: 2,
      sampleGain: 3,
    });
    expect(defs[1]).toMatchObject({
      key: "bank-0-x2",
      micGain: 4,
      sampleGain: 6,
    });
    expect(defs[2]).toMatchObject({
      key: "bank-0-x5",
      micGain: 10,
      sampleGain: 15,
    });

    const thresholds = buildPipelineThresholds(defs, [0.9], 0.25);
    expect(thresholds.get("bank-0")).toBeCloseTo(0.9, 5);
    expect(thresholds.get("bank-0-x2")).toBeCloseTo(0.9, 5);
    expect(thresholds.get("bank-1")).toBeCloseTo(0.25, 5);
  });
});
