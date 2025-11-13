/**
 * Example: Using FeskBatchProcessor to decode audio files in Node.js
 *
 * This example shows how to use the same FESK algorithm that powers
 * the real-time AudioWorklet decoder for offline batch processing.
 */

import { FeskBatchProcessor, processAudio } from '../src/lib/fesk-batch-processor.js';

// Example 1: Quick one-liner for processing a complete audio buffer
async function quickExample() {
  console.log('Example 1: Quick processing with processAudio helper\n');

  // Simulate audio data (in real use, load from file)
  const sampleRate = 48000;
  const duration = 0.1; // 100ms
  const samples = Math.floor(sampleRate * duration);
  const audioData = new Float32Array(samples);

  // Generate a test tone at 2490.2 Hz
  for (let i = 0; i < samples; i++) {
    audioData[i] = 0.5 * Math.sin((2 * Math.PI * 2490.2 * i) / sampleRate);
  }

  const config = {
    freqSets: [
      [2490.2, 3134.8],  // Low frequency set
      [7394, 9313],       // High frequency set
    ],
    energyFloor: 5e-7,
    energyOn: 6e-4,
    energyOff: 2e-4,
    minToneMs: 40,
    minGapMs: 5,
    ignoreHeadMs: 6,
    envelopeMs: 6,
    hpCutoffHz: 600,
    pipelineKey: 'batch-pipeline',
  };

  try {
    const results = await processAudio(audioData, sampleRate, config);
    console.log(`Found ${results.length} tone detections`);
    results.forEach((detection, i) => {
      console.log(`Detection ${i + 1}:`, detection);
    });
  } catch (err) {
    console.error('Processing failed:', err);
  }
}

// Example 2: Full EventEmitter API with streaming chunks
function streamingExample() {
  console.log('\nExample 2: Streaming processing with events\n');

  const processor = new FeskBatchProcessor(48000);

  // Listen for results
  processor.on('candidates', (data) => {
    console.log('Candidates detected:', {
      pipeline: data.pipeline,
      activeResults: data.results.filter(r => r.active).length,
      results: data.results,
    });
  });

  processor.on('ready', (data) => {
    console.log('Processor ready:', {
      sampleRate: data.sampleRate,
      pipeline: data.pipeline,
    });
  });

  // Configure
  processor.configure({
    freqSets: [[2490.2, 3134.8]],
    energyFloor: 5e-7,
    energyOn: 6e-4,
    energyOff: 2e-4,
    minToneMs: 40,
    minGapMs: 5,
    ignoreHeadMs: 6,
    envelopeMs: 6,
    hpCutoffHz: 600,
    pipelineKey: 'streaming-example',
  });

  // Process in chunks (useful for large files)
  const chunkSize = 4800; // 100ms chunks at 48kHz
  const freq = 2490.2;

  for (let chunk = 0; chunk < 5; chunk++) {
    const audioChunk = new Float32Array(chunkSize);
    const offset = chunk * chunkSize;

    for (let i = 0; i < chunkSize; i++) {
      const t = offset + i;
      audioChunk[i] = 0.5 * Math.sin((2 * Math.PI * freq * t) / 48000);
    }

    processor.processChunk(audioChunk);
  }

  // Flush any pending detections
  processor.flush();

  console.log('\nProcessing complete!');
}

// Example 3: Processing WAV file (requires wav decoder library)
async function wavFileExample() {
  console.log('\nExample 3: Processing a WAV file\n');

  // This is pseudocode - you'd need a WAV decoder library like 'node-wav' or 'wav-decoder'
  /*
  import { decode } from 'wav-decoder';
  import fs from 'fs';

  const wavBuffer = fs.readFileSync('path/to/audio.wav');
  const audioData = await decode(wavBuffer);

  const processor = new FeskBatchProcessor(audioData.sampleRate);

  processor.on('candidates', (data) => {
    console.log('Detected tones in WAV file:', data);
  });

  processor.configure({
    freqSets: [[2490.2, 3134.8], [7394, 9313]],
    energyFloor: 5e-7,
    energyOn: 6e-4,
    energyOff: 2e-4,
    minToneMs: 40,
    minGapMs: 5,
    ignoreHeadMs: 6,
    envelopeMs: 6,
    hpCutoffHz: 600,
    pipelineKey: 'wav-file',
  });

  // Convert stereo to mono if needed
  if (audioData.numberOfChannels === 2) {
    import { stereoToMono } from '../src/lib/fesk-batch-processor.js';
    const mono = stereoToMono(
      audioData.channelData[0],
      audioData.channelData[1]
    );
    processor.processBuffer(mono);
  } else {
    processor.processBuffer(audioData.channelData[0]);
  }

  processor.flush();
  */

  console.log('(This example requires a WAV decoder library like "wav-decoder")');
}

// Example 4: Buffer input (16-bit PCM)
function bufferInputExample() {
  console.log('\nExample 4: Processing from Node.js Buffer (16-bit PCM)\n');

  const processor = new FeskBatchProcessor(48000);

  processor.on('candidates', (data) => {
    console.log('Results:', data);
  });

  processor.configure({
    freqSets: [[2490.2, 3134.8]],
    energyFloor: 5e-7,
    energyOn: 6e-4,
    energyOff: 2e-4,
    minToneMs: 40,
    minGapMs: 5,
    ignoreHeadMs: 6,
    envelopeMs: 6,
    hpCutoffHz: 600,
    pipelineKey: 'buffer-example',
  });

  // Create a Buffer with 16-bit PCM data
  const numSamples = 4800;
  const buffer = Buffer.alloc(numSamples * 2); // 2 bytes per sample

  for (let i = 0; i < numSamples; i++) {
    // Generate test tone
    const sample = Math.floor(
      Math.sin((2 * Math.PI * 2490.2 * i) / 48000) * 16384
    );
    buffer.writeInt16LE(sample, i * 2);
  }

  // processBuffer automatically converts Buffer to Float32Array
  processor.processBuffer(buffer);
  processor.flush();
}

// Run examples
console.log('=== FESK Batch Processor Examples ===\n');

await quickExample();
streamingExample();
await wavFileExample();
bufferInputExample();

console.log('\n=== All examples complete ===');
