import { createFeskDecoder } from "../src/lib/decoder";

async function main() {
  const decoder = createFeskDecoder();

  decoder.on("preview", ({ text }) => {
    if (text) console.log(`preview: ${text.trim()}`);
  });

  decoder.on("frame", ({ result }) => {
    const text = result?.text?.trim();
    if (text) console.log(`frame: ${text}`);
  });

  await decoder.listenToMic();

  console.log("decoder listening — speak the control tones to start decoding");
}

void main();

export {};
