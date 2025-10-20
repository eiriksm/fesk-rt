import { mountPipelineDebugMetrics } from "./build/react-app.js";

const pipelineTones = new Map();
// =================== CONFIG ===================
const FREQS_SETS = [
  [2560.0, 3072.0],
  [7394.0, 9313.0],
];
const DETECTOR_CONFIG = FREQS_SETS.map((base, idx) => {
  const config = {
    base,
    harmonicMultipliers: [1, 2, 3, 4],
    detuneFactors: [0.99, 1, 1.01],
  };
  if (idx === 1) {
    config.detuneFactors = [0.97, 0.985, 1, 1.015, 1.03];
  }
  if (idx === 3) {
    config.detuneFactors = [0.985, 0.995, 1, 1.005, 1.015];
    config.extra = [[11040.0], [11040.0]];
  }
  return config;
});
const ENERGY_FLOOR = 5e-7; // raise a bit if your room is noisy
// Streaming tone detector parameters
const ENERGY_ON = 6e-4;
const ENERGY_OFF = 2e-4;
const MIN_GAP_MS = 5;
const IGNORE_HEAD_MS = 6;
const ENERGY_ENVELOPE_MS = 6;
const MIN_TONE_MS = 40;
const HP_CUTOFF_HZ = 600;
const SCORE_MIN = 0.2;
const SCORE_MIN_BANK = FREQS_SETS.map((_, idx) => (idx === 0 ? 0.28 : 0.18));
const BANK_LABEL_OVERRIDES = new Map([[3, "HW"]]);
const BOOST_GAIN_MULTIPLIER = 10; // softer default boost
const MIC_BASE_GAIN = 1;
const SAMPLE_BASE_GAIN = 1;
const MIC_BOOST_GAIN = BOOST_GAIN_MULTIPLIER;
const SAMPLE_BOOST_GAIN = BOOST_GAIN_MULTIPLIER;
const EXTRA_GAIN_MULTIPLIER = BOOST_GAIN_MULTIPLIER * 2; // matches the old boost level (~20×)
const MIC_EXTRA_GAIN = EXTRA_GAIN_MULTIPLIER;
const SAMPLE_EXTRA_GAIN = EXTRA_GAIN_MULTIPLIER;
const PIPELINE_BASE_DEFS = [];
const PIPELINE_BOOST_DEFS = [];
const PIPELINE_EXTRA_DEFS = [];
FREQS_SETS.forEach((_, idx) => {
  const baseLabel = bankLabel(idx);
  PIPELINE_BASE_DEFS.push({
    key: `bank-${idx}`,
    baseBankIndex: idx,
    label: `Bank ${baseLabel}`,
    shortLabel: `${baseLabel}`,
    micGain: MIC_BASE_GAIN,
    sampleGain: SAMPLE_BASE_GAIN,
  });
  PIPELINE_BOOST_DEFS.push({
    key: `bank-${idx}-boost`,
    baseBankIndex: idx,
    label: `Bank ${baseLabel} boost`,
    shortLabel: `${baseLabel}+`,
    micGain: MIC_BOOST_GAIN,
    sampleGain: SAMPLE_BOOST_GAIN,
  });
  PIPELINE_EXTRA_DEFS.push({
    key: `bank-${idx}-extra`,
    baseBankIndex: idx,
    label: `Bank ${baseLabel} extra boost`,
    shortLabel: `${baseLabel}++`,
    micGain: MIC_EXTRA_GAIN,
    sampleGain: SAMPLE_EXTRA_GAIN,
  });
});
const PIPELINE_DEFS = [
  ...PIPELINE_BASE_DEFS,
  ...PIPELINE_BOOST_DEFS,
  ...PIPELINE_EXTRA_DEFS,
];
const PIPELINE_BY_KEY = new Map(PIPELINE_DEFS.map((def) => [def.key, def]));
const PIPELINE_THRESHOLD = new Map(
  PIPELINE_DEFS.map((def) => [
    def.key,
    SCORE_MIN_BANK[def.baseBankIndex] ?? SCORE_MIN,
  ]),
);
const SAMPLE_WAV_CONFIG = [
  { id: "sample1Btn", url: "sample.wav", label: "1" },
  { id: "sample2Btn", url: "sample2.wav", label: "2" },
  { id: "sample3Btn", url: "sample32.wav", label: "3" },
  {
    id: "sample4Btn",
    url: "sample4.wav",
    label: "4",
  },
  { id: "sample5Btn", url: "sample-clock-on-laptop.wav", label: "5" },
  { id: "sample6Btn", url: "sample-clock-recorder-on-phone.wav", label: "6" },
];
const CODE_BITS = 6;
const CRC_BITS = 8;
const START_CODE = 62;
const END_CODE = 63;
const START_END_MASK = (1 << CODE_BITS) - 1;
const END_MARK_BITS = Array.from(
  { length: CODE_BITS },
  (_, i) => (END_CODE >> (CODE_BITS - 1 - i)) & 1,
);

const CODE_MAP = new Array(64).fill(null);
[
  [0, "a"],
  [1, "b"],
  [2, "c"],
  [3, "d"],
  [4, "e"],
  [5, "f"],
  [6, "g"],
  [7, "h"],
  [8, "i"],
  [9, "j"],
  [10, "k"],
  [11, "l"],
  [12, "m"],
  [13, "n"],
  [14, "o"],
  [15, "p"],
  [16, "q"],
  [17, "r"],
  [18, "s"],
  [19, "t"],
  [20, "u"],
  [21, "v"],
  [22, "w"],
  [23, "x"],
  [24, "y"],
  [25, "z"],
  [26, "0"],
  [27, "1"],
  [28, "2"],
  [29, "3"],
  [30, "4"],
  [31, "5"],
  [32, "6"],
  [33, "7"],
  [34, "8"],
  [35, "9"],
  [36, " "],
  [37, ","],
  [38, ":"],
  [39, "'"],
  [40, '"'],
].forEach(([code, ch]) => {
  CODE_MAP[code] = ch;
});

function bitsToCodes(bits, length = bits.length) {
  const codes = [];
  for (let offset = 0; offset + CODE_BITS <= length; offset += CODE_BITS) {
    let value = 0;
    for (let i = 0; i < CODE_BITS; i++) {
      value = (value << 1) | bits[offset + i];
    }
    codes.push(value);
  }
  return codes;
}

function decodeCodes(codes) {
  const chars = [];
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    const ch = CODE_MAP[code];
    if (typeof ch !== "string") {
      return {
        ok: false,
        text: null,
        err: `unsupported code ${code} at index ${i}`,
      };
    }
    chars.push(ch);
  }
  return { ok: true, text: chars.join("") };
}

function crc8ATM(codes) {
  let crc = 0x00;
  for (const code of codes) {
    for (let bit = CODE_BITS - 1; bit >= 0; bit--) {
      const inputBit = (code >> bit) & 1;
      const mix = ((crc >> 7) & 1) ^ inputBit;
      crc = (crc << 1) & 0xff;
      if (mix) crc ^= 0x07;
    }
  }
  return crc;
}

function bitsToByte(bits) {
  let value = 0;
  for (let i = 0; i < bits.length; i++) {
    value = (value << 1) | bits[i];
  }
  return value;
}

// =================== UI helpers ===================
const outEl = document.getElementById("out");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const downloadBtn = document.getElementById("downloadBtn");
const DOWNLOAD_LABEL = "Download WAV ⬇️";
const debugMetricsRoot = document.getElementById("debugMetrics");
const pipelineMetrics =
  debugMetricsRoot instanceof HTMLElement
    ? mountPipelineDebugMetrics({
        container: debugMetricsRoot,
        pipelines: PIPELINE_DEFS.map(({ key, label }) => ({ key, label })),
        initialStatus: "idle",
        initialSampleRate: "—",
      })
    : null;
const pipelineOutputEls = new Map();
const sampleButtons = SAMPLE_WAV_CONFIG.map(({ id, url, label }) => {
  const button = document.getElementById(id);
  return button ? { button, url, label } : null;
}).filter(Boolean);

function setSampleButtonsDisabled(disabled) {
  for (const entry of sampleButtons) entry.button.disabled = disabled;
}

setupOutputContainers();

let recorder = null;
let recordedChunks = [];
let recordedWavBlob = null;

function clearRecording() {
  recordedWavBlob = null;
  recordedChunks = [];
  downloadBtn.disabled = true;
  downloadBtn.textContent = DOWNLOAD_LABEL;
}

if (typeof MediaRecorder === "undefined") {
  downloadBtn.disabled = true;
  downloadBtn.title = "Recording download requires MediaRecorder support.";
}

function setStatus(s) {
  pipelineMetrics?.setGlobalStatus(s);
}
function setSampleRateDisplay(text) {
  pipelineMetrics?.setSampleRate(text);
}
function bankLabel(idx) {
  if (BANK_LABEL_OVERRIDES.has(idx)) return BANK_LABEL_OVERRIDES.get(idx);
  if (idx >= 0 && idx < 26) return String.fromCharCode(65 + idx);
  return String(idx + 1);
}

function setupOutputContainers() {
  pipelineOutputEls.clear();
  outEl.textContent = "";
  PIPELINE_DEFS.forEach((def) => {
    const wrapper = document.createElement("div");
    wrapper.className = "out-bank";
    const title = document.createElement("div");
    title.className = "out-bank-title";
    title.textContent = def.label;
    const body = document.createElement("div");
    body.className = "out-bank-body";
    wrapper.append(title, body);
    outEl.append(wrapper);
    pipelineOutputEls.set(def.key, body);
  });
}

function appendResult(pipelineKey, text) {
  if (!text) return;
  const target = pipelineOutputEls.get(pipelineKey);
  if (!target) return;
  const span = document.createElement("span");
  span.className = "decoded-ok";
  span.textContent = text;
  target.append(span);
}
function formatFreq(f) {
  const txt = f.toFixed(1);
  return (txt.endsWith(".0") ? txt.slice(0, -2) : txt) + " Hz";
}
function resetFreqDisplays() {
  pipelineMetrics?.resetPipelineFrequencies();
}
function resetPipelineStatuses() {
  pipelineMetrics?.resetPipelineStatuses();
}
function setPipelineStatus(pipelineKey, text) {
  pipelineMetrics?.setPipelineStatus(pipelineKey, text);
}
function setPipelineFrequency(pipelineKey, text) {
  pipelineMetrics?.setPipelineFrequency(pipelineKey, text);
}

resetFreqDisplays();
resetPipelineStatuses();

function getRecorderMimeType() {
  if (typeof MediaRecorder === "undefined") return null;
  const preferred = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus",
  ];
  for (const type of preferred) {
    if (MediaRecorder.isTypeSupported?.(type)) return type;
  }
  return null;
}

function setupRecorder(stream) {
  if (typeof MediaRecorder === "undefined") return;
  const type = getRecorderMimeType();
  const options = type ? { mimeType: type } : undefined;
  try {
    recorder = new MediaRecorder(stream, options);
  } catch (err) {
    console.warn("MediaRecorder unavailable", err);
    recorder = null;
    return;
  }
  recordedChunks = [];
  recorder.addEventListener("dataavailable", (e) => {
    if (e.data && e.data.size > 0) recordedChunks.push(e.data);
  });
  try {
    recorder.start();
  } catch (err) {
    console.warn("MediaRecorder start failed", err);
    recorder = null;
  }
}

async function stopRecording({ finalize = true } = {}) {
  if (!recorder) {
    if (!finalize) recordedChunks = [];
    return { hadError: false };
  }
  if (recorder.state === "inactive") {
    recorder = null;
    if (!finalize) recordedChunks = [];
    return { hadError: false };
  }
  const rec = recorder;
  return new Promise((resolve) => {
    let settled = false;
    const finish = (hadError) => {
      if (settled) return;
      settled = true;
      recorder = null;
      recordedChunks = [];
      resolve({ hadError });
    };
    rec.addEventListener(
      "stop",
      async () => {
        let hadError = false;
        try {
          if (finalize && recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
              type: rec.mimeType || "audio/webm",
            });
            await prepareDownload(blob);
          } else if (finalize) {
            clearRecording();
          } else {
            recordedChunks = [];
          }
        } catch (err) {
          console.error("Failed to prepare recording", err);
          clearRecording();
          hadError = true;
        } finally {
          finish(hadError);
        }
      },
      { once: true },
    );
    try {
      rec.stop();
    } catch (err) {
      console.warn("MediaRecorder stop failed", err);
      if (finalize) clearRecording();
      else recordedChunks = [];
      finish(true);
    }
  });
}

async function prepareDownload(blob) {
  if (!blob || blob.size === 0) {
    clearRecording();
    return;
  }
  downloadBtn.disabled = true;
  downloadBtn.textContent = "Preparing WAV…";
  try {
    const wavBlob = await convertBlobToWav(blob);
    recordedWavBlob = wavBlob;
    downloadBtn.disabled = false;
  } catch (err) {
    console.error("Unable to convert recording", err);
    clearRecording();
    setStatus("error preparing WAV");
  } finally {
    downloadBtn.textContent = DOWNLOAD_LABEL;
  }
}

async function convertBlobToWav(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const tmpCtx = new (window.AudioContext || window.webkitAudioContext)();
  try {
    const audioBuffer = await new Promise((resolve, reject) => {
      tmpCtx.decodeAudioData(arrayBuffer.slice(0), resolve, reject);
    });
    const wavBuffer = audioBufferToWav(audioBuffer);
    return new Blob([wavBuffer], { type: "audio/wav" });
  } finally {
    try {
      await tmpCtx.close();
    } catch (_) {}
  }
}

function audioBufferToWav(buffer) {
  const numChannels = buffer.numberOfChannels || 1;
  const sampleRate = buffer.sampleRate;
  const numFrames = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numFrames * blockAlign;
  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);
  let offset = 0;

  function writeString(str) {
    for (let i = 0; i < str.length; i++)
      view.setUint8(offset++, str.charCodeAt(i));
  }

  writeString("RIFF");
  view.setUint32(offset, 36 + dataSize, true);
  offset += 4;
  writeString("WAVE");
  writeString("fmt ");
  view.setUint32(offset, 16, true);
  offset += 4;
  view.setUint16(offset, 1, true);
  offset += 2;
  view.setUint16(offset, numChannels, true);
  offset += 2;
  view.setUint32(offset, sampleRate, true);
  offset += 4;
  view.setUint32(offset, byteRate, true);
  offset += 4;
  view.setUint16(offset, blockAlign, true);
  offset += 2;
  view.setUint16(offset, bytesPerSample * 8, true);
  offset += 2;
  writeString("data");
  view.setUint32(offset, dataSize, true);
  offset += 4;

  const channels = [];
  for (let ch = 0; ch < numChannels; ch++)
    channels.push(buffer.getChannelData(ch));
  for (let i = 0; i < numFrames; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = channels[ch][i] || 0;
      sample = Math.max(-1, Math.min(1, sample));
      const intSample =
        sample < 0 ? Math.round(sample * 0x8000) : Math.round(sample * 0x7fff);
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }
  return arrayBuffer;
}

// =================== Dual decoder state ===================
function mkDec(pipelineKey, label) {
  return {
    state: "hunt",
    frameBits: [],
    bitScores: [],
    markerBits: [],
    markerScores: [],
    recentBits: 0,
    recentCount: 0,
    previewNode: null,
    previewText: "",
    previewConsumedBits: 0,
    pipelineKey,
    label,
  };
}
const DEC = new Map();
PIPELINE_DEFS.forEach((def) => {
  DEC.set(def.key, mkDec(def.key, def.label));
});

function ensurePreview(dec) {
  if (dec.previewNode) return;
  const target = pipelineOutputEls.get(dec.pipelineKey);
  if (!target) return;
  const span = document.createElement("span");
  span.className = "provisional";
  dec.previewNode = span;
  dec.previewText = "";
  dec.previewConsumedBits = 0;
  target.append(span);
}

function updatePreview(dec) {
  if (!dec.frameBits.length) return;
  const usableBits = dec.frameBits.length - (dec.frameBits.length % CODE_BITS);
  if (!usableBits || usableBits <= dec.previewConsumedBits) return;
  const codes = bitsToCodes(dec.frameBits, usableBits);
  const res = decodeCodes(codes);
  if (!res.ok) return;
  ensurePreview(dec);
  const text = res.text;
  const newText = text.slice(dec.previewText.length);
  if (newText) {
    dec.previewText += newText;
    dec.previewNode.textContent = dec.previewText;
  }
  dec.previewConsumedBits = usableBits;
}

function commitPreview(dec, result) {
  const shouldKeep = result.ok && result.okCRC && result.text;
  if (dec.previewNode) {
    if (shouldKeep) {
      dec.previewNode.classList.remove("provisional");
      dec.previewNode.classList.add("decoded-ok");
      dec.previewNode.textContent = result.text;
    } else {
      dec.previewNode.remove();
    }
    dec.previewNode = null;
  } else if (shouldKeep) {
    appendResult(dec.pipelineKey, result.text);
  }
  dec.previewText = "";
  dec.previewConsumedBits = 0;
}

function resetDec(d) {
  d.state = "hunt";
  d.frameBits.length = 0;
  d.bitScores.length = 0;
  d.markerBits.length = 0;
  d.markerScores.length = 0;
  d.recentBits = 0;
  d.recentCount = 0;
  if (d.previewNode) {
    d.previewNode.remove();
    d.previewNode = null;
  }
  d.previewText = "";
  d.previewConsumedBits = 0;
}
function resetAllDecoders() {
  for (const dec of DEC.values()) resetDec(dec);
}

function allPipelinesReady() {
  if (!pipelineStates.size) return false;
  for (const state of pipelineStates.values()) {
    if (!state.ready) return false;
  }
  return true;
}

function flushPipelineReadyWaiters() {
  if (!pipelineReadyWaiters.size) return;
  if (!allPipelinesReady()) return;
  for (const resolve of pipelineReadyWaiters) resolve();
  pipelineReadyWaiters.clear();
}

function waitForPipelinesReady() {
  if (allPipelinesReady()) return Promise.resolve();
  return new Promise((resolve) => {
    pipelineReadyWaiters.add(resolve);
  });
}

function connectNodeToPipelines(node, type) {
  for (const state of pipelineStates.values()) {
    try {
      const target =
        type === "sample" ? state.sampleGainNode : state.micGainNode;
      node.connect(target);
    } catch (err) {
      console.warn(`[${state.def.label}] connect failed`, err?.message || err);
    }
  }
}

function disconnectNodeFromPipelines(node, type) {
  for (const state of pipelineStates.values()) {
    try {
      const target =
        type === "sample" ? state.sampleGainNode : state.micGainNode;
      node.disconnect(target);
    } catch (_) {}
  }
}

function triggerAutoStop(label) {
  if (autoStopTriggered) return;
  if (stopBtn.disabled) return;
  autoStopTriggered = true;
  console.info(`[${label}] auto stop after CRC OK`);
  queueMicrotask(() => {
    if (!stopBtn.disabled) stopBtn.click();
  });
}

async function cleanup(nextStatus, opts = {}) {
  const { skipRecorderStop = false } = opts;
  if (!skipRecorderStop) {
    await stopRecording({ finalize: false });
  }
  if (bufferSrc) {
    bufferSrc.onended = null;
    try {
      bufferSrc.stop();
    } catch (_) {}
    disconnectNodeFromPipelines(bufferSrc, "sample");
    try {
      bufferSrc.disconnect();
    } catch (_) {}
    bufferSrc = null;
  }
  if (mediaSrc) {
    disconnectNodeFromPipelines(mediaSrc, "mic");
    try {
      mediaSrc.disconnect();
    } catch (_) {}
    mediaSrc = null;
  }
  if (mediaStream) {
    for (const track of mediaStream.getTracks()) track.stop();
    mediaStream = null;
  }
  for (const state of pipelineStates.values()) {
    state.ready = false;
    try {
      state.micGainNode.disconnect();
    } catch (_) {}
    try {
      state.sampleGainNode.disconnect();
    } catch (_) {}
    try {
      state.workletNode.disconnect();
    } catch (_) {}
    state.workletNode.port.onmessage = null;
  }
  pipelineStates.clear();
  for (const resolve of pipelineReadyWaiters) resolve();
  pipelineReadyWaiters.clear();
  if (audioCtx) {
    try {
      await audioCtx.close();
    } catch (_) {}
    audioCtx = null;
  }
  setSampleRateDisplay("—");
  resetAllDecoders();
  resetFreqDisplays();
  resetPipelineStatuses();
  pipelineTones.clear();
  suppressReadyStatus = false;
  autoStopTriggered = false;
  if (typeof nextStatus === "string") setStatus(nextStatus);
}

async function initProcessingChain() {
  resetAllDecoders();
  resetFreqDisplays();
  resetPipelineStatuses();
  pipelineTones.clear();
  pipelineReadyWaiters.clear();
  setStatus("initializing audio…");
  audioCtx = new (window.AudioContext || window.webkitAudioContext)({
    latencyHint: "interactive",
  });
  setSampleRateDisplay(audioCtx.sampleRate.toFixed(0) + " Hz");
  const workletModuleUrl = new URL("./mb-fesk-worklet.js", import.meta.url);
  await audioCtx.audioWorklet.addModule(workletModuleUrl);
  pipelineStates.clear();
  for (const def of PIPELINE_DEFS) {
    const workletNode = new AudioWorkletNode(audioCtx, "mb-fesk", {
      numberOfInputs: 1,
      numberOfOutputs: 0,
    });
    const micGainNode = audioCtx.createGain();
    const micGainValue =
      Number.isFinite(def.micGain) && def.micGain > 0
        ? def.micGain
        : MIC_BASE_GAIN;
    micGainNode.gain.value = micGainValue;
    micGainNode.connect(workletNode);
    const sampleGainNode = audioCtx.createGain();
    const sampleGainValue =
      Number.isFinite(def.sampleGain) && def.sampleGain > 0
        ? def.sampleGain
        : SAMPLE_BASE_GAIN;
    sampleGainNode.gain.value = sampleGainValue;
    sampleGainNode.connect(workletNode);
    setPipelineStatus(def.key, "initializing…");
    const state = {
      def,
      workletNode,
      micGainNode,
      sampleGainNode,
      micGainValue,
      sampleGainValue,
      ready: false,
    };
    pipelineStates.set(def.key, state);
    workletNode.port.onmessage = (e) => handleWorkletMessage(state, e.data);
    workletNode.port.postMessage({
      pipelineKey: def.key,
      freqSets: [DETECTOR_CONFIG[def.baseBankIndex]],
      energyFloor: ENERGY_FLOOR,
      energyOn: ENERGY_ON,
      energyOff: ENERGY_OFF,
      minToneMs: MIN_TONE_MS,
      minGapMs: MIN_GAP_MS,
      ignoreHeadMs: IGNORE_HEAD_MS,
      envelopeMs: ENERGY_ENVELOPE_MS,
      hpCutoffHz: HP_CUTOFF_HZ,
    });
    console.info(
      `[${def.label}] pipeline init (mic gain ×${micGainValue.toFixed(
        2,
      )}, sample gain ×${sampleGainValue.toFixed(2)})`,
    );
  }
}

function handleWorkletMessage(state, message) {
  if (!message) return;
  const def = state.def;
  if (message.pipeline && message.pipeline !== def.key) {
    console.warn(`[${def.label}] ignoring message for ${message.pipeline}`);
    return;
  }
  if (message.t === "ready") {
    state.ready = true;
    const sr =
      Number.isFinite(message.sr) && message.sr > 0
        ? `${Math.round(message.sr)} Hz`
        : "";
    setPipelineStatus(def.key, sr ? `ready (${sr})` : "ready");
    console.info(
      `[${def.label}] worklet ready (mic gain ×${state.micGainValue.toFixed(
        2,
      )}, sample gain ×${state.sampleGainValue.toFixed(2)})`,
    );
    if (!suppressReadyStatus && allPipelinesReady()) {
      setStatus("ready");
    }
    flushPipelineReadyWaiters();
    return;
  }
  if (message.t === "candidates") {
    handlePipelineCandidates(def, message.results);
  }
}

function finalizeFrame(dec) {
  const totalBits = dec.frameBits.length;
  if (totalBits < CRC_BITS) {
    const r = {
      ok: false,
      okCRC: false,
      text: null,
      avgScore: 0,
      why: "short",
    };
    commitPreview(dec, r);
    return r;
  }
  const payloadBitLength = totalBits - CRC_BITS;
  if (payloadBitLength < 0 || payloadBitLength % CODE_BITS !== 0) {
    const r = {
      ok: false,
      okCRC: false,
      text: null,
      avgScore: 0,
      why: "misaligned",
    };
    commitPreview(dec, r);
    return r;
  }
  const payloadCodes = bitsToCodes(dec.frameBits, payloadBitLength);
  const recvCrc = bitsToByte(
    dec.frameBits.slice(payloadBitLength, payloadBitLength + CRC_BITS),
  );
  const wantCrc = crc8ATM(payloadCodes);
  const okCRC = recvCrc === wantCrc;

  let ok = false;
  let text = null;
  if (okCRC) {
    const res = decodeCodes(payloadCodes);
    ok = res.ok;
    text = res.text;
  }

  const payloadScores = dec.bitScores.slice(0, payloadBitLength);
  const avgScore = payloadScores.length
    ? payloadScores.reduce((a, b) => a + b, 0) / payloadScores.length
    : 0;

  dec.markerBits.length = 0;
  dec.markerScores.length = 0;

  const result = { ok, okCRC, text, avgScore };
  commitPreview(dec, result);
  return result;
}

function feedOne(dec, symIdx, score) {
  const s = score ?? 0;
  if (symIdx !== 0 && symIdx !== 1) return null;
  const bit = symIdx & 1;

  if (dec.state === "hunt") {
    dec.recentBits = ((dec.recentBits << 1) | bit) & START_END_MASK;
    dec.recentCount = Math.min(dec.recentCount + 1, CODE_BITS);
    if (dec.recentCount === CODE_BITS && dec.recentBits === START_CODE) {
      dec.state = "payload";
      dec.frameBits.length = 0;
      dec.bitScores.length = 0;
      dec.previewText = "";
      dec.previewConsumedBits = 0;
      if (dec.previewNode) {
        dec.previewNode.remove();
        dec.previewNode = null;
      }
      dec.recentBits = 0;
      dec.recentCount = 0;
    }
    return null;
  }

  if (dec.state !== "payload") return null;

  dec.markerBits.push(bit);
  dec.markerScores.push(s);

  let flushedAny = false;
  while (dec.markerBits.length) {
    let matchesPrefix = true;
    for (let i = 0; i < dec.markerBits.length; i += 1) {
      if (dec.markerBits[i] !== END_MARK_BITS[i]) {
        matchesPrefix = false;
        break;
      }
    }
    if (matchesPrefix) break;
    const flushed = dec.markerBits.shift();
    const flushedScore = dec.markerScores.shift();
    dec.frameBits.push(flushed);
    dec.bitScores.push(flushedScore);
    updatePreview(dec);
    flushedAny = true;
  }

  while (dec.markerBits.length >= CODE_BITS) {
    const totalBits = dec.frameBits.length;
    const payloadBitLength = totalBits - CRC_BITS;
    if (payloadBitLength < 0 || payloadBitLength % CODE_BITS !== 0) {
      const flushed = dec.markerBits.shift();
      const flushedScore = dec.markerScores.shift();
      dec.frameBits.push(flushed);
      dec.bitScores.push(flushedScore);
      updatePreview(dec);
      continue;
    }
    const result = finalizeFrame(dec);
    resetDec(dec);
    return result;
  }

  dec.recentBits = ((dec.recentBits << 1) | bit) & START_END_MASK;
  dec.recentCount = Math.min(dec.recentCount + 1, CODE_BITS);

  if (!dec.markerBits.length && !flushedAny) updatePreview(dec);
  return null;
}

// =================== Boot & wire-up ===================
let audioCtx = null;
let mediaStream = null;
let mediaSrc = null;
let bufferSrc = null;
let suppressReadyStatus = false;
const pipelineStates = new Map();
const pipelineReadyWaiters = new Set();
let autoStopTriggered = false;

startBtn.addEventListener("click", async () => {
  startBtn.disabled = true;
  stopBtn.disabled = true;
  setSampleButtonsDisabled(true);
  try {
    await cleanup(null);
    setupOutputContainers();
    await initProcessingChain();
    await waitForPipelinesReady();
    setStatus("requesting microphone…");
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 1,
      },
    });
    mediaSrc = audioCtx.createMediaStreamSource(mediaStream);
    connectNodeToPipelines(mediaSrc, "mic");
    for (const state of pipelineStates.values()) {
      console.info(`[${state.def.label}] microphone connected`);
      setPipelineStatus(state.def.key, "listening…");
    }
    clearRecording();
    setupRecorder(mediaStream);
    setStatus("listening… wait for 111110 start marker");
    stopBtn.disabled = false;
  } catch (err) {
    setStatus("error: " + ((err && err.message) || err));
    await cleanup(null);
    startBtn.disabled = false;
    setSampleButtonsDisabled(false);
    stopBtn.disabled = true;
  }
});

function logTones() {
  for (const [key, tones] of pipelineTones.entries()) {
    if (!tones || !tones.length) continue;
    const def = PIPELINE_BY_KEY.get(key);
    const label = def ? def.label : key;
    console.log(`[${label}] tones: ${tones.join(" ")}`);
  }
  pipelineTones.clear();
}

stopBtn.addEventListener("click", async () => {
  stopBtn.disabled = true;
  try {
    const result = await stopRecording({ finalize: true });
    await cleanup(result && result.hadError ? undefined : "stopped", {
      skipRecorderStop: true,
    });
  } finally {
    startBtn.disabled = false;
    setSampleButtonsDisabled(false);
  }
  logTones();
});

for (const entry of sampleButtons) {
  entry.button.addEventListener("click", async () => {
    await playSample(entry);
  });
}

async function playSample(entry) {
  const { url, label } = entry;
  startBtn.disabled = true;
  setSampleButtonsDisabled(true);
  stopBtn.disabled = true;
  try {
    await cleanup(null);
    setupOutputContainers();
    suppressReadyStatus = true;
    await initProcessingChain();
    await waitForPipelinesReady();
    const labelSuffix = label ? ` ${label}` : "";
    setStatus(`loading sample${labelSuffix}…`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`fetch failed (${response.status})`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await new Promise((resolve, reject) => {
      audioCtx.decodeAudioData(arrayBuffer, resolve, reject);
    });
    if (!audioBuffer || audioBuffer.numberOfChannels === 0) {
      throw new Error("empty or unsupported WAV payload");
    }
    let playbackBuffer = audioBuffer;
    if (audioBuffer.numberOfChannels > 1) {
      const length = audioBuffer.length;
      const mono = audioCtx.createBuffer(1, length, audioBuffer.sampleRate);
      const out = mono.getChannelData(0);
      for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
        const data = audioBuffer.getChannelData(ch);
        for (let i = 0; i < length; i++) out[i] += data[i];
      }
      for (let i = 0; i < out.length; i++)
        out[i] /= audioBuffer.numberOfChannels;
      playbackBuffer = mono;
    }
    bufferSrc = audioCtx.createBufferSource();
    bufferSrc.buffer = playbackBuffer;
    connectNodeToPipelines(bufferSrc, "sample");
    for (const state of pipelineStates.values()) {
      console.info(`[${state.def.label}] sample input connected`);
      setPipelineStatus(state.def.key, `sample ${label || ""}…`.trim());
    }
    bufferSrc.start();
    bufferSrc.onended = async () => {
      const finished = bufferSrc;
      if (finished) {
        finished.onended = null;
        disconnectNodeFromPipelines(finished, "sample");
        try {
          finished.disconnect();
        } catch (_) {}
      }
      bufferSrc = null;
      stopBtn.disabled = true;
      await cleanup("sample finished");
      logTones();
      startBtn.disabled = false;
      setSampleButtonsDisabled(false);
    };
    setStatus(`playing sample${labelSuffix}…`);
    stopBtn.disabled = false;
  } catch (err) {
    setStatus("error: " + ((err && err.message) || err));
    await cleanup(null);
    startBtn.disabled = false;
    setSampleButtonsDisabled(false);
    stopBtn.disabled = true;
  }
}

downloadBtn.addEventListener("click", () => {
  if (!recordedWavBlob) return;
  const url = URL.createObjectURL(recordedWavBlob);
  const a = document.createElement("a");
  a.href = url;
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  a.download = `fesk-recording-${stamp}.wav`;
  document.body.appendChild(a);
  a.click();
  requestAnimationFrame(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});

function handlePipelineCandidates(def, results) {
  const dec = DEC.get(def.key);
  if (!dec) return;

  if (!Array.isArray(results) || !results.length) {
    setPipelineFrequency(def.key, null);
    setPipelineStatus(def.key, "idle");
    return;
  }

  let tones = pipelineTones.get(def.key);
  if (!tones) {
    tones = [];
    pipelineTones.set(def.key, tones);
  }

  let hadActive = false;
  let hadFrameOk = false;
  let pendingStatus = null;
  const baseFreqs = FREQS_SETS[def.baseBankIndex] || [];

  for (const r of results) {
    if (!r || !r.active) continue;
    hadActive = true;
    if (Number.isFinite(r.idx)) tones.push(r.idx);

    const displayFreq =
      Number.isFinite(r.freqHz) && r.freqHz > 0
        ? r.freqHz
        : Number.isFinite(baseFreqs[r.idx])
          ? baseFreqs[r.idx]
          : null;
    if (Number.isFinite(displayFreq)) {
      setPipelineFrequency(def.key, formatFreq(Number(displayFreq)));
    }

    const threshold =
      PIPELINE_THRESHOLD.get(def.key) ?? SCORE_MIN_BANK[0] ?? SCORE_MIN;
    if ((r.score ?? 0) < threshold) continue;

    const out = Number.isFinite(r.idx) ? feedOne(dec, r.idx, r.score) : null;
    if (!out) continue;

    if (out.ok && out.okCRC && out.text) {
      const shouldAutoStop = !autoStopTriggered && !stopBtn.disabled;
      setStatus(
        shouldAutoStop
          ? `frame OK (${def.label}) — stopping…`
          : `frame OK (${def.label})`,
      );
      setPipelineStatus(def.key, "frame OK");
      const avgScore = Number.isFinite(out.avgScore)
        ? out.avgScore.toFixed(3)
        : "n/a";
      console.info(
        `[${def.label}] frame OK: "${out.text}" (avg score ${avgScore})`,
      );
      if (shouldAutoStop) triggerAutoStop(def.label);
      hadFrameOk = true;
      pendingStatus = null;
    } else if (!out.okCRC) {
      setPipelineStatus(def.key, "CRC fail");
      if (!hadFrameOk && !pendingStatus)
        pendingStatus = `frame CRC fail (${def.label})`;
      console.warn(`[${def.label}] frame CRC fail`);
    } else if (!out.ok) {
      setPipelineStatus(def.key, "decode fail");
      if (!hadFrameOk && !pendingStatus)
        pendingStatus = `frame decode fail (${def.label})`;
      console.warn(`[${def.label}] frame decode fail`);
    }
  }

  if (!hadActive) {
    setPipelineFrequency(def.key, null);
    setPipelineStatus(def.key, "idle");
  } else if (!hadFrameOk && typeof pendingStatus === "string") {
    setStatus(pendingStatus);
  }
}
