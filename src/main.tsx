// @ts-nocheck
import { createRoot } from "react-dom/client";

import { DebugMetrics } from "./components/DebugMetrics";
import { createFeskDecoder } from "./lib/decoder";

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
  { id: "sample7Btn", url: "sample-fast.wav", label: "7" },
  { id: "sample8Btn", url: "sample-phone-recording-fast.wav", label: "8" },
];
const decoder = createFeskDecoder();
const PIPELINE_DEFS = decoder.config.pipelineDefs;
const PIPELINE_BY_KEY = new Map(PIPELINE_DEFS.map((def) => [def.key, def]));

// =================== UI helpers ===================
const statusEl = document.getElementById("status");
const outEl = document.getElementById("out");
const srEl = document.getElementById("sr");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const downloadBtn = document.getElementById("downloadBtn");
const DOWNLOAD_LABEL = "Download WAV ⬇️";
const freqEls = new Map();
const pipelineStatusEls = new Map();
const pipelineOutputEls = new Map();
const pipelinePreviewEls = new Map();
const pipelineCandidates = new Map();

let displayedCandidateKey = null;

const CANDIDATE_INACTIVITY_MS = 2200;
const CRC_LEADER_HOLD_MS = 4500;
const CURRENT_LEADER_STICKINESS = 0.0025;
const sampleButtons = SAMPLE_WAV_CONFIG.map(({ id, url, label }) => {
  const button = document.getElementById(id);
  return button ? { button, url, label } : null;
}).filter(Boolean);

const pipelineDebugMetricsContainer = document.getElementById(
  "pipelineDebugMetrics",
);

if (pipelineDebugMetricsContainer) {
  const definitions = PIPELINE_DEFS.map((def) => ({
    key: def.key,
    label: def.label,
  }));
  const root = createRoot(pipelineDebugMetricsContainer);
  root.render(
    <DebugMetrics
      definitions={definitions}
      onReady={hydratePipelineDebugMetricRefs}
    />,
  );
}

function hydratePipelineDebugMetricRefs() {
  freqEls.clear();
  pipelineStatusEls.clear();

  let found = false;

  PIPELINE_DEFS.forEach((def) => {
    const freqEl = document.getElementById(`freq-${def.key}`);
    if (freqEl) {
      freqEls.set(def.key, freqEl);
      found = true;
    }

    const statusEl = document.getElementById(`status-${def.key}`);
    if (statusEl) {
      pipelineStatusEls.set(def.key, statusEl);
      found = true;
    }
  });

  if (found) {
    resetFreqDisplays();
    resetPipelineStatuses();
  }
}

function setSampleButtonsDisabled(disabled) {
  for (const entry of sampleButtons) entry.button.disabled = disabled;
}

hydratePipelineDebugMetricRefs();
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
  statusEl.textContent = s;
}
function setupOutputContainers() {
  pipelineOutputEls.clear();
  pipelinePreviewEls.clear();
  pipelineCandidates.clear();
  displayedCandidateKey = null;
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

function renderDecodedLine(pipelineKey, text) {
  if (!text) return;
  const target = pipelineOutputEls.get(pipelineKey);
  if (!target) return;
  const span = document.createElement("span");
  span.className = "decoded-ok";
  span.textContent = text;
  target.append(span);
}

function setPreview(pipelineKey, text, options = {}) {
  const target = pipelineOutputEls.get(pipelineKey);
  if (!target) return;
  const existing = pipelinePreviewEls.get(pipelineKey) || null;
  const { provisional = true, crcOk = false } = options;

  if (text == null) {
    if (existing) {
      existing.remove();
      pipelinePreviewEls.delete(pipelineKey);
    }
    return;
  }

  let span = existing;
  if (!span || !target.contains(span)) {
    if (span) span.remove();
    span = document.createElement("span");
    pipelinePreviewEls.set(pipelineKey, span);
    target.append(span);
  }

  span.textContent = text;
  if (!provisional && crcOk) {
    span.className = "decoded-ok";
  } else if (provisional) {
    span.className = "provisional";
  } else {
    span.className = "provisional";
  }
}

function clearPreview(pipelineKey) {
  const existing = pipelinePreviewEls.get(pipelineKey);
  if (existing) existing.remove();
  pipelinePreviewEls.delete(pipelineKey);
}

function updateCandidate(pipelineKey, data) {
  if (!pipelineKey || !data) return;
  if (data.clear) {
    pipelineCandidates.delete(pipelineKey);
    if (displayedCandidateKey === pipelineKey) {
      clearPreview(pipelineKey);
      displayedCandidateKey = null;
    }
    return;
  }

  const now = Date.now();
  const candidate = pipelineCandidates.get(pipelineKey) || {
    pipelineKey,
    text: "",
    confidence: Number.NEGATIVE_INFINITY,
    provisional: true,
    crcOk: false,
    lastCrcOkAt: null,
    updatedAt: 0,
  };

  if (Object.prototype.hasOwnProperty.call(data, "text")) {
    candidate.text = data.text ?? "";
  }

  if (Object.prototype.hasOwnProperty.call(data, "provisional")) {
    candidate.provisional = Boolean(data.provisional);
  }

  if (Object.prototype.hasOwnProperty.call(data, "confidence")) {
    const { confidence } = data;
    if (Number.isFinite(confidence)) {
      candidate.confidence = confidence;
    }
  }

  const updatedAt = Number.isFinite(data.updatedAt) ? data.updatedAt : now;
  candidate.updatedAt = updatedAt;

  if (Object.prototype.hasOwnProperty.call(data, "crcOk")) {
    if (data.crcOk === true) {
      candidate.crcOk = true;
      candidate.lastCrcOkAt = updatedAt;
    } else if (data.crcOk === false) {
      candidate.crcOk = false;
    }
  }

  if (
    Object.prototype.hasOwnProperty.call(data, "lastCrcOkAt") &&
    Number.isFinite(data.lastCrcOkAt)
  ) {
    candidate.lastCrcOkAt = data.lastCrcOkAt;
  }

  pipelineCandidates.set(pipelineKey, candidate);
}

function chooseDisplayedCandidate() {
  const now = Date.now();
  let bestKey = null;
  let bestScore = Number.NEGATIVE_INFINITY;
  const toRemove = [];

  for (const [pipelineKey, candidate] of pipelineCandidates.entries()) {
    if (!candidate) continue;
    const text = typeof candidate.text === "string" ? candidate.text : "";
    const hasText = text && text.length > 0;
    const age = now - (Number.isFinite(candidate.updatedAt) ? candidate.updatedAt : 0);
    const isDisplayed = pipelineKey === displayedCandidateKey;

    let inactivityLimit = CANDIDATE_INACTIVITY_MS;
    if (candidate.lastCrcOkAt) {
      const crcAge = now - candidate.lastCrcOkAt;
      if (crcAge < CRC_LEADER_HOLD_MS) {
        inactivityLimit = Math.max(inactivityLimit, CRC_LEADER_HOLD_MS);
      }
    }

    if (age > inactivityLimit) {
      if (isDisplayed) {
        clearPreview(pipelineKey);
        displayedCandidateKey = null;
      }
      toRemove.push(pipelineKey);
      continue;
    }

    if (!hasText) {
      if (isDisplayed) {
        clearPreview(pipelineKey);
        displayedCandidateKey = null;
      }
      continue;
    }
    if (!candidate.provisional && !candidate.crcOk) {
      if (isDisplayed) {
        clearPreview(pipelineKey);
        displayedCandidateKey = null;
      }
      continue;
    }

    let score = Number.isFinite(candidate.confidence)
      ? candidate.confidence
      : Number.NEGATIVE_INFINITY;

    if (candidate.crcOk) {
      score += 2;
    } else if (candidate.lastCrcOkAt) {
      const crcAge = now - candidate.lastCrcOkAt;
      if (crcAge < CRC_LEADER_HOLD_MS) {
        const recency = 1 - crcAge / CRC_LEADER_HOLD_MS;
        score += recency;
      }
    }

    const agePenalty = age / 2000;
    score -= agePenalty;

    if (!candidate.provisional && candidate.crcOk) {
      score += 0.25;
    }

    if (isDisplayed) {
      score += CURRENT_LEADER_STICKINESS;
    }

    if (score > bestScore) {
      bestScore = score;
      bestKey = pipelineKey;
    }
  }

  for (const key of toRemove) pipelineCandidates.delete(key);

  if (bestKey === displayedCandidateKey) {
    if (bestKey) {
      const candidate = pipelineCandidates.get(bestKey);
      if (candidate) {
        setPreview(bestKey, candidate.text, {
          provisional: candidate.provisional,
          crcOk: Boolean(candidate.crcOk),
        });
      }
    }
    return;
  }

  if (displayedCandidateKey && displayedCandidateKey !== bestKey) {
    clearPreview(displayedCandidateKey);
  }

  displayedCandidateKey = bestKey || null;

  if (bestKey) {
    const candidate = pipelineCandidates.get(bestKey);
    if (candidate) {
      setPreview(bestKey, candidate.text, {
        provisional: candidate.provisional,
        crcOk: Boolean(candidate.crcOk),
      });
    }
  }
}

function clearPreviews() {
  for (const span of pipelinePreviewEls.values()) {
    if (span) span.remove();
  }
  pipelinePreviewEls.clear();
  pipelineCandidates.clear();
  displayedCandidateKey = null;
}
function formatFreq(f) {
  const txt = f.toFixed(1);
  return (txt.endsWith(".0") ? txt.slice(0, -2) : txt) + " Hz";
}
function resetFreqDisplays() {
  for (const el of freqEls.values()) el.textContent = "—";
}
function resetPipelineStatuses() {
  for (const el of pipelineStatusEls.values()) el.textContent = "—";
}
function setPipelineStatus(pipelineKey, text) {
  const el = pipelineStatusEls.get(pipelineKey);
  if (el) el.textContent = text;
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
    } catch {}
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

// =================== Decoder wiring ===================
let mediaStream = null;
let autoStopTriggered = false;

decoder.events.on("state", handleDecoderState);
decoder.events.on("preview", handleDecoderPreview);
decoder.events.on("frame", handleDecoderFrame);

function handleDecoderState(payload) {
  if (!payload) return;
  switch (payload.kind) {
    case "status":
      if (typeof payload.status === "string") setStatus(payload.status);
      break;
    case "pipeline-status":
      if (payload.pipelineKey)
        setPipelineStatus(payload.pipelineKey, payload.status ?? "—");
      break;
    case "freq": {
      const freqEl = payload.pipelineKey
        ? freqEls.get(payload.pipelineKey)
        : null;
      if (freqEl) {
        if (Number.isFinite(payload.freqHz) && payload.freqHz > 0) {
          freqEl.textContent = formatFreq(Number(payload.freqHz));
        } else {
          freqEl.textContent = "—";
        }
      }
      break;
    }
    case "sample-rate":
      if (Number.isFinite(payload.sampleRate) && payload.sampleRate > 0) {
        srEl.textContent = `${payload.sampleRate.toFixed(0)} Hz`;
      } else {
        srEl.textContent = "—";
      }
      break;
    case "buffer-ended":
      handleSamplePlaybackEnded();
      break;
    default:
      break;
  }
}

function handleDecoderPreview(payload) {
  if (!payload || !payload.pipelineKey) return;
  const pipelineKey = payload.pipelineKey;

  if (payload.text === null) {
    clearPreview(pipelineKey);
    updateCandidate(pipelineKey, { clear: true });
    chooseDisplayedCandidate();
    return;
  }

  if (typeof payload.text === "string") {
    const update = {
      text: payload.text,
      provisional: Boolean(payload.provisional),
      confidence: payload.confidence,
      updatedAt: payload.updatedAt,
    };
    if (payload.crcOk === true) update.crcOk = true;
    else if (payload.crcOk === false) update.crcOk = false;
    updateCandidate(pipelineKey, update);
    chooseDisplayedCandidate();
  }
}

function handleDecoderFrame(payload) {
  if (!payload) return;
  const pipelineKey = payload.pipelineKey;
  const def = PIPELINE_BY_KEY.get(payload.pipelineKey);
  const label = def ? def.label : payload.label || payload.pipelineKey;
  const { result } = payload;
  if (!result) return;
  if (pipelineKey && result.ok && result.crcOk && result.text) {
    renderDecodedLine(pipelineKey, result.text);
    updateCandidate(pipelineKey, {
      text: result.text,
      provisional: false,
      confidence: result.confidence,
      crcOk: true,
      updatedAt: result.updatedAt,
    });
    chooseDisplayedCandidate();
  } else if (pipelineKey) {
    const update = {
      provisional: true,
      updatedAt: result.updatedAt,
    };
    if (result.crcOk === false) update.crcOk = false;
    if (Number.isFinite(result.confidence)) update.confidence = result.confidence;
    updateCandidate(pipelineKey, update);
    chooseDisplayedCandidate();
  }
  if (result.ok && result.crcOk && result.text) {
    const avgScore = Number.isFinite(result.confidence)
      ? result.confidence.toFixed(3)
      : "n/a";
    console.info(
      `[${label}] frame OK: "${result.text}" (avg confidence ${avgScore})`,
    );
    const shouldAutoStop = !autoStopTriggered && !stopBtn.disabled;
    if (shouldAutoStop) {
      setStatus(`frame OK (${label}) — stopping…`);
      triggerAutoStop(label);
    }
  } else if (!result.crcOk) {
    console.warn(`[${label}] frame CRC fail`);
  } else if (!result.ok) {
    console.warn(`[${label}] frame decode fail`);
  }
}

function handleSamplePlaybackEnded() {
  stopBtn.disabled = true;
  (async () => {
    try {
      await cleanup("sample finished");
      logTones();
    } finally {
      startBtn.disabled = false;
      setSampleButtonsDisabled(false);
    }
  })();
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
  if (mediaStream) {
    for (const track of mediaStream.getTracks()) track.stop();
    mediaStream = null;
  }
  await decoder.stop({ status: nextStatus });
  clearPreviews();
  resetFreqDisplays();
  resetPipelineStatuses();
  autoStopTriggered = false;
}

function logTones() {
  const tones = decoder.drainToneLog();
  for (const [key, entries] of tones.entries()) {
    if (!entries || !entries.length) continue;
    const def = PIPELINE_BY_KEY.get(key);
    const label = def ? def.label : key;
    console.log(`[${label}] tones: ${entries.join(" ")}`);
  }
}

// =================== Boot & wire-up ===================

startBtn.addEventListener("click", async () => {
  startBtn.disabled = true;
  stopBtn.disabled = true;
  setSampleButtonsDisabled(true);
  try {
    await cleanup(null);
    setupOutputContainers();
    await decoder.prepare();
    await decoder.waitForReady();
    setStatus("requesting microphone…");
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 1,
      },
    });
    await decoder.attachStream(mediaStream);
    for (const def of PIPELINE_DEFS) {
      console.info(`[${def.label}] microphone connected`);
    }
    clearRecording();
    setupRecorder(mediaStream);
    stopBtn.disabled = false;
  } catch (err) {
    setStatus("error: " + ((err && err.message) || err));
    await cleanup(null);
    startBtn.disabled = false;
    setSampleButtonsDisabled(false);
    stopBtn.disabled = true;
  }
});

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
    await decoder.prepare({ suppressReadyStatus: true });
    await decoder.waitForReady();
    const labelSuffix = label ? ` ${label}` : "";
    setStatus(`loading sample${labelSuffix}…`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`fetch failed (${response.status})`);
    const arrayBuffer = await response.arrayBuffer();
    const audioCtxInstance = decoder.getAudioContext();
    if (!audioCtxInstance) throw new Error("audio context not ready");
    const audioBuffer = await new Promise((resolve, reject) => {
      audioCtxInstance.decodeAudioData(arrayBuffer, resolve, reject);
    });
    if (!audioBuffer || audioBuffer.numberOfChannels === 0) {
      throw new Error("empty or unsupported WAV payload");
    }
    let playbackBuffer = audioBuffer;
    if (audioBuffer.numberOfChannels > 1) {
      const length = audioBuffer.length;
      const mono = audioCtxInstance.createBuffer(
        1,
        length,
        audioBuffer.sampleRate,
      );
      const out = mono.getChannelData(0);
      for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
        const data = audioBuffer.getChannelData(ch);
        for (let i = 0; i < length; i++) out[i] += data[i];
      }
      for (let i = 0; i < out.length; i++)
        out[i] /= audioBuffer.numberOfChannels;
      playbackBuffer = mono;
    }
    await decoder.attachBuffer(playbackBuffer, { label });
    for (const def of PIPELINE_DEFS) {
      console.info(`[${def.label}] sample input connected`);
    }
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
