const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function decodeBase32ToBytes(text: string): Uint8Array | null {
  const normalized = text.toUpperCase().replace(/[=\s]/g, "");
  if (normalized.length === 0) return null;

  for (let i = 0; i < normalized.length; i++) {
    if (!BASE32_ALPHABET.includes(normalized[i])) {
      return null;
    }
  }

  const bytes: number[] = [];
  let bits = 0;
  let value = 0;

  for (let i = 0; i < normalized.length; i++) {
    const index = BASE32_ALPHABET.indexOf(normalized[i]);
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }

  if (bytes.length === 0) return null;
  return new Uint8Array(bytes);
}

export function hasKnownImageSignature(bytes: Uint8Array): boolean {
  const hasPNGSignature =
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a;

  const hasWebPSignature =
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50;

  return hasPNGSignature || hasWebPSignature;
}

function isPrintableCodePoint(codePoint: number): boolean {
  if (codePoint === 0x09 || codePoint === 0x0a || codePoint === 0x0d) {
    return true;
  }
  if (codePoint < 0x20 || (codePoint >= 0x7f && codePoint <= 0x9f)) {
    return false;
  }
  return true;
}

function isMostlyPrintable(text: string): boolean {
  const chars = Array.from(text);
  if (chars.length === 0) return true;

  let printableCount = 0;
  for (const char of chars) {
    const codePoint = char.codePointAt(0);
    if (codePoint != null && isPrintableCodePoint(codePoint)) {
      printableCount += 1;
    }
  }

  return printableCount / chars.length >= 0.95;
}

export function tryDecodeBase32Text(text: string): string | null {
  try {
    const bytes = decodeBase32ToBytes(text);
    if (!bytes || hasKnownImageSignature(bytes)) return null;

    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return isMostlyPrintable(decoded) ? decoded : null;
  } catch {
    return null;
  }
}

export function tryDecodeAsBase32Image(
  text: string,
): { bytes: Uint8Array; format: "PNG" | "WebP"; mimeType: string } | null {
  const bytes = decodeBase32ToBytes(text);
  if (!bytes) return null;

  const hasPNGSignature =
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a;

  const hasWebPSignature =
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50;

  if (!hasPNGSignature && !hasWebPSignature) return null;

  return {
    bytes,
    format: hasPNGSignature ? "PNG" : "WebP",
    mimeType: hasPNGSignature ? "image/png" : "image/webp",
  };
}
