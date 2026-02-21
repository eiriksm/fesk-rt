import { describe, expect, it } from "vitest";

import {
  decodeBase32ToBytes,
  tryDecodeAsBase32Image,
  tryDecodeBase32Text,
} from "./base32";

describe("base32 helpers", () => {
  it("decodes valid base32 text into bytes", () => {
    const bytes = decodeBase32ToBytes("MZXW6===");
    expect(bytes).toEqual(new Uint8Array([0x66, 0x6f, 0x6f]));
  });

  it("returns null for invalid base32 alphabet input", () => {
    expect(decodeBase32ToBytes("abc-")).toBeNull();
  });

  it("decodes sample 13 base32 text into emoji", () => {
    expect(tryDecodeBase32Text("4koiz35yr7yj7evk564i6")).toBe("✌️💪️");
  });

  it("does not decode image payloads as base32 text", () => {
    const imagePayload =
      "kjeumrr2aaaaav2fijifmubyeaxaaaaa2aaqbhibfiaqaaiaajadqjnaaj2luapyaab3aah65ohf77ec4wc5ovs77vhd6jy7soh6wkaaaa";

    expect(tryDecodeBase32Text(imagePayload)).toBeNull();

    const imageResult = tryDecodeAsBase32Image(imagePayload);
    expect(imageResult?.format).toBe("WebP");
  });

  it("rejects invalid utf-8 payloads", () => {
    expect(tryDecodeBase32Text("74======")).toBeNull();
  });
});
