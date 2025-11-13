# FESK Batch Processing

This document explains how to use the FESK decoder for batch/offline audio processing in Node.js, separate from real-time recording.

## Architecture

The FESK processor now uses a **shared core algorithm** that works in both browser and Node.js contexts:

```
┌─────────────────────────────────────────────────┐
│          public/lib/fesk-core.js                │
│                                                 │
│  Core DSP Algorithm (shared code):             │
│  - High-pass filtering                         │
│  - Energy envelope tracking                    │
│  - Goertzel frequency detection                │
│  - Tone detection with timing                  │
└─────────────┬───────────────────────────────────┘
              │
      ┌───────┴────────┐
      │                │
      ▼                ▼
┌──────────┐    ┌─────────────────┐
│ Browser  │    │     Node.js     │
│          │    │                 │
│ Worklet  │    │ Batch Processor │
│ (Real-   │    │ (Offline        │
│  time)   │    │  processing)    │
└──────────┘    └─────────────────┘
```

### File Organization

- **`public/lib/fesk-core.js`** - Core DSP algorithm (shared)
- **`public/mb-fesk-worklet.js`** - AudioWorklet wrapper (browser, real-time)
- **`src/lib/fesk-batch-processor.js`** - Node.js API (offline processing)
- **`src/lib/fesk-batch-processor.test.js`** - Test suite

## Why Batch Processing?

Real-time processing with AudioWorklet is great for live microphone input, but has limitations:

- ❌ Must process at exactly real-time speed
- ❌ Requires browser environment
- ❌ Can't easily process multiple files
- ❌ Hard to test systematically

Batch processing solves these issues:

- ✅ Process faster (or slower) than real-time
- ✅ Works in Node.js (servers, scripts, tests)
- ✅ Process entire files at once
- ✅ Easy to automate and test

## Usage

### Installation

The batch processor uses only Node.js built-ins, but you may want a WAV decoder:

```bash
npm install wav-decoder  # optional, for WAV file support
```

### Quick Example

```javascript
import { processAudio } from './src/lib/fesk-batch-processor.js';

// Load your audio data (Float32Array)
const audioData = /* ... */;
const sampleRate = 48000;

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
  pipelineKey: 'my-pipeline',
};

const results = await processAudio(audioData, sampleRate, config);
console.log('Detected tones:', results);
```

### Full API Example

```javascript
import { FeskBatchProcessor } from './src/lib/fesk-batch-processor.js';

const processor = new FeskBatchProcessor(48000);

// Listen for events
processor.on('ready', (data) => {
  console.log('Ready:', data.sampleRate, data.pipeline);
});

processor.on('candidates', (data) => {
  console.log('Detection:', data.pipeline, data.results);
});

// Configure
processor.configure({
  freqSets: [[2490.2, 3134.8]],
  energyOn: 6e-4,
  energyOff: 2e-4,
  // ... other config
});

// Process audio
processor.processBuffer(audioData);  // entire buffer
// OR
processor.processChunk(chunk1);      // streaming chunks
processor.processChunk(chunk2);
processor.processChunk(chunk3);

// Finalize
processor.flush();  // emit any pending tones
```

### Processing WAV Files

```javascript
import { FeskBatchProcessor, stereoToMono } from './src/lib/fesk-batch-processor.js';
import { decode } from 'wav-decoder';
import fs from 'fs';

const wavBuffer = fs.readFileSync('audio.wav');
const audioData = await decode(wavBuffer);

const processor = new FeskBatchProcessor(audioData.sampleRate);

processor.on('candidates', (data) => {
  console.log('Found tone:', data);
});

processor.configure({ /* config */ });

// Handle mono/stereo
let audioSamples;
if (audioData.numberOfChannels === 2) {
  audioSamples = stereoToMono(
    audioData.channelData[0],
    audioData.channelData[1]
  );
} else {
  audioSamples = audioData.channelData[0];
}

processor.processBuffer(audioSamples);
processor.flush();
```

### Processing Node.js Buffers (16-bit PCM)

The batch processor automatically converts Node.js Buffers (16-bit signed PCM) to Float32Array:

```javascript
const buffer = fs.readFileSync('audio.raw'); // 16-bit PCM
processor.processBuffer(buffer);  // auto-converts to Float32Array
```

## API Reference

### `FeskBatchProcessor`

**Constructor:**
```javascript
new FeskBatchProcessor(sampleRate)
```

**Methods:**
- `configure(config)` - Configure detection parameters (same as worklet config)
- `processBuffer(audioData)` - Process entire buffer (Float32Array, Array, or Buffer)
- `processChunk(chunk)` - Process a chunk (useful for streaming)
- `flush()` - Finalize and emit any pending tones
- `reset()` - Reset processor state
- `isReady()` - Check if configured
- `getPipelineKey()` - Get current pipeline key

**Events:**
- `'ready'` - Emitted when configured, receives `{ sampleRate, pipeline }`
- `'candidates'` - Emitted on detection, receives `{ pipeline, results }`

**Returns:** All methods return `this` for chaining (except getters)

### `processAudio(audioData, sampleRate, config)`

Convenience function that processes audio and collects all results:

```javascript
const results = await processAudio(audioData, 48000, config);
// results is an array of all candidate detections
```

### `stereoToMono(left, right)`

Helper to convert stereo to mono by averaging channels:

```javascript
const mono = stereoToMono(leftChannel, rightChannel);
```

## Configuration

The config object is identical to the AudioWorklet configuration:

```javascript
{
  freqSets: [[freq1, freq2], ...],  // Frequency banks to detect
  energyFloor: 5e-7,                // Minimum total energy
  energyOn: 6e-4,                   // Energy threshold to start tone
  energyOff: 2e-4,                  // Energy threshold to end tone
  minToneMs: 40,                    // Minimum tone duration (ms)
  minGapMs: 5,                      // Minimum gap to finalize (ms)
  ignoreHeadMs: 6,                  // Ignore start of tone (ms)
  envelopeMs: 6,                    // Energy envelope smoothing (ms)
  hpCutoffHz: 600,                  // High-pass filter cutoff (Hz)
  pipelineKey: 'string',            // Pipeline identifier
}
```

## Performance

Batch processing is **not constrained by real-time**:

- A 10-second audio file can be processed in ~100ms (100x faster)
- Memory usage is proportional to audio buffer size
- CPU usage spikes during processing, then drops to zero

For very large files, consider chunked processing:

```javascript
const chunkSize = 48000;  // 1 second at 48kHz
for (let i = 0; i < audioData.length; i += chunkSize) {
  const chunk = audioData.slice(i, i + chunkSize);
  processor.processChunk(chunk);
}
processor.flush();
```

## Testing

Run the test suite:

```bash
npm run unit
```

The test suite includes:
- Configuration tests
- Buffer processing tests
- Chunk processing tests
- Event emission tests
- Node.js Buffer conversion tests
- Stereo-to-mono conversion tests

## Examples

See `examples/batch-processing-example.js` for complete working examples:

```bash
node examples/batch-processing-example.js
```

## Production Builds

The core algorithm is in `public/lib/fesk-core.js` so it's automatically copied to `dist/lib/fesk-core.js` during production builds. Both the worklet and batch processor can import it correctly in development and production.

## Comparison: Real-time vs Batch

| Feature | Real-time (Worklet) | Batch Processing |
|---------|---------------------|------------------|
| **Speed** | Exactly real-time | As fast as CPU allows |
| **Environment** | Browser only | Node.js (+ browser) |
| **Use case** | Live microphone | File processing |
| **API** | AudioWorklet message passing | EventEmitter |
| **Testing** | Requires browser | Easy unit testing |
| **Algorithm** | ✅ **Shared FeskCore** | ✅ **Shared FeskCore** |

Both use the **exact same algorithm** - just different wrappers!
