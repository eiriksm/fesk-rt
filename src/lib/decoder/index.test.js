import { describe, it, expect } from "vitest";
import { __testUtils } from "./index.js";

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
      boostMultiplier: 4,
      extraMultiplier: 5,
    });

    expect(defs).toHaveLength(6);
    expect(defs[0]).toMatchObject({
      key: "bank-0",
      micGain: 2,
      sampleGain: 3,
    });
    expect(defs[1]).toMatchObject({
      key: "bank-0-boost",
      micGain: 8,
      sampleGain: 12,
    });
    expect(defs[2]).toMatchObject({
      key: "bank-0-extra",
      micGain: 10,
      sampleGain: 15,
    });

    const thresholds = buildPipelineThresholds(defs, [0.9], 0.25);
    expect(thresholds.get("bank-0")).toBeCloseTo(0.9, 5);
    expect(thresholds.get("bank-0-boost")).toBeCloseTo(0.9, 5);
    expect(thresholds.get("bank-1")).toBeCloseTo(0.25, 5);
  });
});
