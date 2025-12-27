#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { createFeskDecoder, BFSK_FREQS_SETS, FREQS_SETS_4FSK, HYBRID_FREQS_SETS } from './src/lib/decoder/index.js';

async function decodeWavFile(filePath, config) {
  console.log(`\nTrying to decode ${filePath} with config:`, config.name);

  const decoder = createFeskDecoder(config.freqSets ? { freqSets: config.freqSets } : {});

  let decodedText = null;
  let pipelineUsed = null;
  let decodeCount = 0;

  decoder.events.on('frame', (event) => {
    console.log(`[${config.name}] Frame event from ${event.label}:`, {
      ok: event.result.ok,
      crcOk: event.result.crcOk,
      text: event.result.text,
      confidence: event.result.confidence?.toFixed(3),
      status: event.result.status,
    });

    if (event.result.ok && event.result.crcOk && event.result.text) {
      decodedText = event.result.text;
      pipelineUsed = event.label;
      decodeCount++;
    }
  });

  decoder.events.on('preview', (event) => {
    if (event.text && event.provisional) {
      console.log(`[${config.name}] Preview from ${event.pipelineKey}:`, event.text.substring(0, 50));
    }
  });

  try {
    // Read WAV file
    const wavBuffer = await readFile(filePath);

    // Parse WAV header
    const dataView = new DataView(wavBuffer.buffer, wavBuffer.byteOffset, wavBuffer.byteLength);

    // Find "data" chunk
    let offset = 12; // Skip RIFF header
    while (offset < wavBuffer.length) {
      const chunkId = String.fromCharCode(...wavBuffer.slice(offset, offset + 4));
      const chunkSize = dataView.getUint32(offset + 4, true);

      if (chunkId === 'data') {
        // Found data chunk
        const audioData = wavBuffer.slice(offset + 8, offset + 8 + chunkSize);

        // Convert to AudioBuffer format
        const sampleRate = dataView.getUint32(24, true);
        const numChannels = dataView.getUint16(22, true);
        const bitsPerSample = dataView.getUint16(34, true);

        console.log(`WAV info: ${sampleRate}Hz, ${numChannels}ch, ${bitsPerSample}bit`);

        // Create Web Audio API compatible buffer (requires actual Web Audio API)
        // For now, just report what we found
        console.log(`Audio data size: ${audioData.length} bytes`);
        console.log('Note: Full decoding requires Web Audio API (browser environment)');

        break;
      }

      offset += 8 + chunkSize;
    }

  } catch (error) {
    console.error(`Error decoding with ${config.name}:`, error.message);
  }

  await decoder.stop();

  return { decodedText, pipelineUsed, decodeCount };
}

async function main() {
  const samplePath = process.argv[2] || 'public/samples/sample5.wav';

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Analyzing: ${samplePath}`);
  console.log('='.repeat(60));

  const configs = [
    { name: '4FSK (default)', freqSets: FREQS_SETS_4FSK },
    { name: 'BFSK', freqSets: BFSK_FREQS_SETS },
    { name: 'HYBRID', freqSets: HYBRID_FREQS_SETS },
  ];

  for (const config of configs) {
    const result = await decodeWavFile(samplePath, config);

    if (result.decodedText) {
      console.log(`\n✅ SUCCESS with ${config.name}!`);
      console.log(`   Text: "${result.decodedText}"`);
      console.log(`   Pipeline: ${result.pipelineUsed}`);
      console.log(`   Decode count: ${result.decodeCount}`);
    } else {
      console.log(`\n❌ FAILED with ${config.name}`);
    }
  }
}

main().catch(console.error);
