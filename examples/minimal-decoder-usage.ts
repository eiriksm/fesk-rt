import { createFeskDecoder } from "../src/lib/decoder";

async function main(sampleUrl: string) {
  const decoder = createFeskDecoder();

  decoder.on("preview", ({ text }) => {
    if (text) console.log(`preview: ${text.trim()}`);
  });

  decoder.on("frame", ({ result, label }) => {
    const text = result?.text?.trim();
    if (text) console.log(`${label ?? "frame"}: ${text}`);
  });

  await decoder.decodeSampleUrl(sampleUrl);
}

void main("/samples/fesk-demo.wav");
