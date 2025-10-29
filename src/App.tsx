import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { DebugMetrics } from "./components/DebugMetrics";
import {
  createFeskDecoder,
  type DecoderFrameEvent,
  type DecoderPreviewEvent,
  type DecoderStateEvent,
  type FeskDecoder,
  type PipelineDefinition,
} from "./lib/decoder";

import "./App.css";

const SAMPLE_WAV_CONFIG = [
  { id: "sample1Btn", url: "sample.wav", label: "1" },
  { id: "sample2Btn", url: "sample2.wav", label: "2" },
  { id: "sample3Btn", url: "sample32.wav", label: "3" },
  { id: "sample4Btn", url: "sample4.wav", label: "4" },
  { id: "sample5Btn", url: "sample-clock-on-laptop.wav", label: "5" },
  {
    id: "sample6Btn",
    url: "sample-clock-recorder-on-phone.wav",
    label: "6",
  },
  { id: "sample7Btn", url: "sample-fast.wav", label: "7" },
  {
    id: "sample8Btn",
    url: "sample-phone-recording-fast.wav",
    label: "8",
  },
  { id: "sample9Btn", url: "sample-uptime-sim.wav", label: "9" },
] as const;

const DOWNLOAD_LABEL = "Download WAV ⬇️";
const CANDIDATE_INACTIVITY_MS = 2200;
const CRC_LEADER_HOLD_MS = 4500;
const CURRENT_LEADER_STICKINESS = 0.0025;

interface Candidate {
  pipelineKey: string;
  text: string;
  provisional: boolean;
  confidence: number;
  crcOk: boolean;
  lastCrcOkAt: number | null;
  updatedAt: number;
}

interface CandidateState {
  candidates: Map<string, Candidate>;
  displayedKey: string | null;
}

interface CandidatePatch {
  text?: string;
  provisional?: boolean;
  confidence?: number;
  updatedAt?: number;
  crcOk?: boolean;
  lastCrcOkAt?: number | null;
}

type CandidateAction =
  | { type: "reset" }
  | { type: "update"; pipelineKey: string; patch: CandidatePatch }
  | { type: "remove"; pipelineKey: string };

function createCandidate(pipelineKey: string): Candidate {
  return {
    pipelineKey,
    text: "",
    provisional: true,
    confidence: Number.NEGATIVE_INFINITY,
    crcOk: false,
    lastCrcOkAt: null,
    updatedAt: 0,
  };
}

function createInitialCandidateState(): CandidateState {
  return { candidates: new Map(), displayedKey: null };
}

function selectDisplayedCandidate(
  map: Map<string, Candidate>,
  previousKey: string | null,
  now = Date.now(),
): CandidateState {
  let displayedKey = previousKey;
  let bestKey: string | null = null;
  let bestScore = Number.NEGATIVE_INFINITY;
  const toRemove: string[] = [];

  for (const [key, candidate] of map.entries()) {
    if (!candidate) continue;
    const text = typeof candidate.text === "string" ? candidate.text : "";
    const hasText = text.length > 0;
    const updatedAt = Number.isFinite(candidate.updatedAt)
      ? candidate.updatedAt
      : 0;
    const age = now - updatedAt;
    const isDisplayed = key === displayedKey;

    let inactivityLimit = CANDIDATE_INACTIVITY_MS;
    if (candidate.lastCrcOkAt != null) {
      const crcAge = now - candidate.lastCrcOkAt;
      if (crcAge < CRC_LEADER_HOLD_MS) {
        inactivityLimit = Math.max(inactivityLimit, CRC_LEADER_HOLD_MS);
      }
    }

    if (age > inactivityLimit) {
      if (isDisplayed) displayedKey = null;
      toRemove.push(key);
      continue;
    }

    if (!hasText) {
      if (isDisplayed) displayedKey = null;
      continue;
    }

    if (!candidate.provisional && !candidate.crcOk) {
      if (isDisplayed) displayedKey = null;
      continue;
    }

    let score = Number.isFinite(candidate.confidence)
      ? candidate.confidence
      : Number.NEGATIVE_INFINITY;

    if (candidate.crcOk) {
      score += 2;
    } else if (candidate.lastCrcOkAt != null) {
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
      bestKey = key;
    }
  }

  toRemove.forEach((key) => map.delete(key));

  if (bestKey) {
    displayedKey = bestKey;
  } else if (displayedKey && !map.has(displayedKey)) {
    displayedKey = null;
  }

  return { candidates: map, displayedKey };
}

function candidateReducer(
  state: CandidateState,
  action: CandidateAction,
): CandidateState {
  switch (action.type) {
    case "reset":
      return createInitialCandidateState();
    case "remove": {
      const nextMap = new Map(state.candidates);
      nextMap.delete(action.pipelineKey);
      return selectDisplayedCandidate(nextMap, state.displayedKey);
    }
    case "update": {
      const nextMap = new Map(state.candidates);
      const existing =
        nextMap.get(action.pipelineKey) ?? createCandidate(action.pipelineKey);
      const candidate: Candidate = { ...existing };

      if (action.patch.text !== undefined) {
        candidate.text = action.patch.text ?? "";
      }

      if (action.patch.provisional !== undefined) {
        candidate.provisional = Boolean(action.patch.provisional);
      }

      if (Number.isFinite(action.patch.confidence)) {
        candidate.confidence = Number(action.patch.confidence);
      }

      if (action.patch.updatedAt !== undefined) {
        const updatedAt = Number.isFinite(action.patch.updatedAt)
          ? Number(action.patch.updatedAt)
          : Date.now();
        candidate.updatedAt = updatedAt;
        if (action.patch.crcOk === true) {
          candidate.lastCrcOkAt = updatedAt;
        }
      }

      if (action.patch.lastCrcOkAt !== undefined) {
        if (Number.isFinite(action.patch.lastCrcOkAt)) {
          candidate.lastCrcOkAt = Number(action.patch.lastCrcOkAt);
        }
      }

      if (action.patch.crcOk === true) {
        candidate.crcOk = true;
        if (candidate.lastCrcOkAt == null) {
          candidate.lastCrcOkAt = Number.isFinite(candidate.updatedAt)
            ? candidate.updatedAt
            : Date.now();
        }
      } else if (action.patch.crcOk === false) {
        candidate.crcOk = false;
      }

      nextMap.set(action.pipelineKey, candidate);
      return selectDisplayedCandidate(nextMap, state.displayedKey);
    }
    default:
      return state;
  }
}

function createInitialDisplayMap(
  defs: { key: string }[],
): Record<string, string> {
  const map: Record<string, string> = {};
  defs.forEach((def) => {
    map[def.key] = "—";
  });
  return map;
}

function formatFrequency(freq: number): string {
  const text = freq.toFixed(1);
  return (text.endsWith(".0") ? text.slice(0, -2) : text) + " Hz";
}

function decodeAudioDataBuffer(
  audioCtx: AudioContext,
  arrayBuffer: ArrayBuffer,
): Promise<AudioBuffer> {
  return new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(arrayBuffer.slice(0), resolve, reject);
  });
}

function toMonoBuffer(
  audioCtx: AudioContext,
  buffer: AudioBuffer,
): AudioBuffer {
  if (buffer.numberOfChannels <= 1) return buffer;
  const length = buffer.length;
  const mono = audioCtx.createBuffer(1, length, buffer.sampleRate);
  const out = mono.getChannelData(0);
  for (let ch = 0; ch < buffer.numberOfChannels; ch += 1) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i += 1) {
      out[i] += data[i];
    }
  }
  for (let i = 0; i < out.length; i += 1) {
    out[i] /= buffer.numberOfChannels;
  }
  return mono;
}

async function convertBlobToWav(blob: Blob): Promise<Blob> {
  const arrayBuffer = await blob.arrayBuffer();
  const AudioContextCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextCtor) {
    throw new Error("AudioContext not supported");
  }
  const ctx = new AudioContextCtor();
  try {
    const audioBuffer = await decodeAudioDataBuffer(ctx, arrayBuffer);
    const wavBuffer = audioBufferToWav(audioBuffer);
    return new Blob([wavBuffer], { type: "audio/wav" });
  } finally {
    try {
      await ctx.close();
    } catch {
      // ignore
    }
  }
}

function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
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

  function writeString(str: string) {
    for (let i = 0; i < str.length; i += 1) {
      view.setUint8(offset, str.charCodeAt(i));
      offset += 1;
    }
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

  const channels: Float32Array[] = [];
  for (let ch = 0; ch < numChannels; ch += 1) {
    channels.push(buffer.getChannelData(ch));
  }

  for (let i = 0; i < numFrames; i += 1) {
    for (let ch = 0; ch < numChannels; ch += 1) {
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

export function App() {
  const decoderRef = useRef<FeskDecoder>(createFeskDecoder());
  const decoder = decoderRef.current;
  const pipelineDefs = useMemo<PipelineDefinition[]>(
    () => decoder.config.pipelineDefs,
    [decoder],
  );
  const pipelineByKey = useMemo(
    () => new Map(pipelineDefs.map((def) => [def.key, def] as const)),
    [pipelineDefs],
  );
  const metricDefinitions = useMemo(
    () => pipelineDefs.map((def) => ({ key: def.key, label: def.label })),
    [pipelineDefs],
  );
  const debugMode = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("debug") === "1";
  }, []);

  const [status, setStatus] = useState<string>("idle");
  const [sampleRateText, setSampleRateText] = useState<string>("—");
  const [frequencies, setFrequencies] = useState<Record<string, string>>(() =>
    createInitialDisplayMap(pipelineDefs),
  );
  const [pipelineStatuses, setPipelineStatuses] = useState<
    Record<string, string>
  >(() => createInitialDisplayMap(pipelineDefs));
  const [finalResult, setFinalResult] = useState<{
    pipelineKey: string | null;
    text: string;
  }>({ pipelineKey: null, text: "" });
  const [recordedWavBlob, setRecordedWavBlob] = useState<Blob | null>(null);
  const [downloadPreparing, setDownloadPreparing] = useState(false);
  const [runMode, setRunMode] = useState<"idle" | "microphone" | "sample">(
    "idle",
  );
  const [isBusy, setIsBusy] = useState(false);
  const [candidateState, dispatchCandidates] = useReducer(
    candidateReducer,
    undefined,
    createInitialCandidateState,
  );

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const autoStopTriggeredRef = useRef(false);

  const mediaRecorderSupported = typeof MediaRecorder !== "undefined";

  useEffect(() => {
    setFrequencies(createInitialDisplayMap(pipelineDefs));
    setPipelineStatuses(createInitialDisplayMap(pipelineDefs));
  }, [pipelineDefs]);

  const startDisabled = isBusy || runMode !== "idle";
  const stopDisabled = isBusy || runMode === "idle";
  const sampleButtonsDisabled = isBusy || runMode !== "idle";
  const downloadDisabled =
    downloadPreparing || !recordedWavBlob || !mediaRecorderSupported;
  const downloadLabel = downloadPreparing ? "Preparing WAV…" : DOWNLOAD_LABEL;

  const previewCandidate =
    candidateState.displayedKey &&
    candidateState.candidates.get(candidateState.displayedKey || "");
  const previewText = previewCandidate?.text ?? "";
  const previewLabel =
    debugMode && previewCandidate
      ? pipelineByKey.get(previewCandidate.pipelineKey)?.label ||
        previewCandidate.pipelineKey
      : "";
  const previewIsProvisional = previewCandidate
    ? previewCandidate.provisional || !previewCandidate.crcOk
    : false;

  const finalLabel =
    debugMode && finalResult.pipelineKey
      ? pipelineByKey.get(finalResult.pipelineKey)?.label ||
        finalResult.pipelineKey
      : "";

  const clearRecording = useCallback(() => {
    setRecordedWavBlob(null);
    setDownloadPreparing(false);
    recordedChunksRef.current = [];
  }, []);

  const getRecorderMimeType = useCallback(() => {
    if (!mediaRecorderSupported) return null;
    const preferred = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
    ];
    for (const type of preferred) {
      if (MediaRecorder.isTypeSupported?.(type)) return type;
    }
    return null;
  }, [mediaRecorderSupported]);

  const setupRecorder = useCallback(
    (stream: MediaStream) => {
      if (!mediaRecorderSupported) return;
      const type = getRecorderMimeType();
      const options = type ? { mimeType: type } : undefined;
      try {
        const recorder = new MediaRecorder(stream, options);
        recorderRef.current = recorder;
        recordedChunksRef.current = [];
        recorder.addEventListener("dataavailable", (event) => {
          if (event.data && event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        });
        try {
          recorder.start();
        } catch (err) {
          console.warn("MediaRecorder start failed", err);
          recorderRef.current = null;
        }
      } catch (err) {
        console.warn("MediaRecorder unavailable", err);
        recorderRef.current = null;
      }
    },
    [getRecorderMimeType, mediaRecorderSupported],
  );

  const prepareDownload = useCallback(
    async (blob: Blob) => {
      if (!blob || blob.size === 0) {
        clearRecording();
        return;
      }
      setDownloadPreparing(true);
      try {
        const wavBlob = await convertBlobToWav(blob);
        setRecordedWavBlob(wavBlob);
      } catch (err) {
        console.error("Unable to convert recording", err);
        clearRecording();
        setStatus("error preparing WAV");
      } finally {
        setDownloadPreparing(false);
      }
    },
    [clearRecording],
  );

  const stopRecording = useCallback(
    ({ finalize }: { finalize: boolean }) => {
      const recorder = recorderRef.current;
      if (!recorder) {
        if (!finalize) recordedChunksRef.current = [];
        return Promise.resolve({ hadError: false });
      }
      if (recorder.state === "inactive") {
        recorderRef.current = null;
        if (!finalize) recordedChunksRef.current = [];
        return Promise.resolve({ hadError: false });
      }
      return new Promise<{ hadError: boolean }>((resolve) => {
        let settled = false;
        const finish = (hadError: boolean) => {
          if (settled) return;
          settled = true;
          recorderRef.current = null;
          if (!finalize) recordedChunksRef.current = [];
          resolve({ hadError });
        };
        recorder.addEventListener(
          "stop",
          async () => {
            let hadError = false;
            try {
              if (finalize && recordedChunksRef.current.length) {
                const blob = new Blob(recordedChunksRef.current, {
                  type: recorder.mimeType || "audio/webm",
                });
                await prepareDownload(blob);
              } else if (finalize) {
                clearRecording();
              } else {
                recordedChunksRef.current = [];
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
        recorder.addEventListener(
          "error",
          () => {
            clearRecording();
            finish(true);
          },
          { once: true },
        );
        try {
          recorder.stop();
        } catch (err) {
          console.warn("MediaRecorder stop failed", err);
          if (finalize) {
            clearRecording();
          } else {
            recordedChunksRef.current = [];
          }
          finish(true);
        }
      });
    },
    [clearRecording, prepareDownload],
  );

  const resetDisplays = useCallback(() => {
    setFrequencies(createInitialDisplayMap(pipelineDefs));
    setPipelineStatuses(createInitialDisplayMap(pipelineDefs));
  }, [pipelineDefs]);

  const cleanup = useCallback(
    async (
      nextStatus?: string | null,
      options?: { skipRecorderStop?: boolean; resetFinalResult?: boolean },
    ) => {
      const { skipRecorderStop = false, resetFinalResult = false } =
        options ?? {};
      if (!skipRecorderStop) {
        await stopRecording({ finalize: false });
      }
      const stream = mediaStreamRef.current;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      await decoder.stop({ status: nextStatus ?? undefined });
      resetDisplays();
      setSampleRateText("—");
      dispatchCandidates({ type: "reset" });
      if (resetFinalResult) {
        setFinalResult({ pipelineKey: null, text: "" });
      }
      autoStopTriggeredRef.current = false;
      setRunMode("idle");
      setStatus(nextStatus ?? "idle");
    },
    [decoder, dispatchCandidates, resetDisplays, setFinalResult, stopRecording],
  );

  const logTones = useCallback(() => {
    const tones = decoder.drainToneLog();
    for (const [key, entries] of tones.entries()) {
      if (!entries || !entries.length) continue;
      const def = pipelineByKey.get(key);
      const label = def ? def.label : key;
      console.log(`[${label}] tones: ${entries.join(" ")}`);
    }
  }, [decoder, pipelineByKey]);

  const handleSamplePlaybackEnded = useCallback(() => {
    setIsBusy(true);
    (async () => {
      try {
        await cleanup("sample finished");
        logTones();
      } finally {
        setIsBusy(false);
      }
    })();
  }, [cleanup, logTones]);

  const handleStop = useCallback(async () => {
    if (runMode === "idle" || isBusy) return;
    setIsBusy(true);
    try {
      const result = await stopRecording({ finalize: true });
      await cleanup(result?.hadError ? undefined : "stopped", {
        skipRecorderStop: true,
      });
    } finally {
      setIsBusy(false);
    }
    logTones();
  }, [cleanup, isBusy, logTones, runMode, stopRecording]);

  const triggerAutoStop = useCallback(
    (label: string) => {
      if (autoStopTriggeredRef.current) return;
      if (runMode === "idle" || isBusy) return;
      autoStopTriggeredRef.current = true;
      console.info(`[${label}] auto stop after CRC OK`);
      queueMicrotask(() => {
        void handleStop();
      });
    },
    [handleStop, isBusy, runMode],
  );

  const handleStateEvent = useCallback(
    (payload: DecoderStateEvent) => {
      if (!payload) return;
      switch (payload.kind) {
        case "status":
          if (typeof payload.status === "string") setStatus(payload.status);
          break;
        case "pipeline-status": {
          const pipelineKey = payload.pipelineKey;
          if (typeof pipelineKey === "string" && pipelineKey.length > 0) {
            const status =
              typeof payload.status === "string" ? payload.status : "—";
            setPipelineStatuses((prev) => ({
              ...prev,
              [pipelineKey]: status,
            }));
          }
          break;
        }
        case "freq": {
          const pipelineKey = payload.pipelineKey;
          if (typeof pipelineKey === "string" && pipelineKey.length > 0) {
            const { freqHz } = payload;
            const freq =
              typeof freqHz === "number" &&
              Number.isFinite(freqHz) &&
              freqHz > 0
                ? formatFrequency(freqHz)
                : "—";
            setFrequencies((prev) => ({
              ...prev,
              [pipelineKey]: freq,
            }));
          }
          break;
        }
        case "sample-rate": {
          const { sampleRate } = payload;
          if (
            typeof sampleRate === "number" &&
            Number.isFinite(sampleRate) &&
            sampleRate > 0
          ) {
            setSampleRateText(`${sampleRate.toFixed(0)} Hz`);
          } else {
            setSampleRateText("—");
          }
          break;
        }
        case "buffer-ended":
          handleSamplePlaybackEnded();
          break;
        default:
          break;
      }
    },
    [handleSamplePlaybackEnded],
  );

  const handlePreviewEvent = useCallback((payload: DecoderPreviewEvent) => {
    if (!payload?.pipelineKey) return;
    const pipelineKey: string = payload.pipelineKey;
    if (payload.text === null) {
      dispatchCandidates({ type: "remove", pipelineKey });
      return;
    }
    if (typeof payload.text === "string") {
      const patch: CandidatePatch = {
        text: payload.text,
        provisional: Boolean(payload.provisional),
      };
      if (Number.isFinite(payload.updatedAt)) {
        patch.updatedAt = Number(payload.updatedAt);
      }
      if (Number.isFinite(payload.confidence)) {
        patch.confidence = Number(payload.confidence);
      }
      if (payload.crcOk === true) patch.crcOk = true;
      else if (payload.crcOk === false) patch.crcOk = false;
      dispatchCandidates({ type: "update", pipelineKey, patch });
    }
  }, []);

  const handleFrameEvent = useCallback(
    (payload: DecoderFrameEvent) => {
      if (!payload) return;
      const pipelineKey: string | undefined = payload.pipelineKey;
      const result = payload.result;
      const def = pipelineKey ? pipelineByKey.get(pipelineKey) : undefined;
      const label = def ? def.label : payload.label || pipelineKey || "";
      if (!result) return;

      if (pipelineKey && result.ok && result.crcOk && result.text) {
        const patch: CandidatePatch = {
          text: result.text,
          provisional: false,
          crcOk: true,
        };
        if (Number.isFinite(result.confidence)) {
          patch.confidence = Number(result.confidence);
        }
        if (Number.isFinite(result.updatedAt)) {
          patch.updatedAt = Number(result.updatedAt);
        }
        dispatchCandidates({ type: "update", pipelineKey, patch });
        setFinalResult({ pipelineKey, text: result.text });
      } else if (pipelineKey) {
        const patch: CandidatePatch = {
          provisional: true,
        };
        if (result.crcOk === false) patch.crcOk = false;
        if (Number.isFinite(result.confidence)) {
          patch.confidence = Number(result.confidence);
        }
        if (Number.isFinite(result.updatedAt)) {
          patch.updatedAt = Number(result.updatedAt);
        }
        dispatchCandidates({ type: "update", pipelineKey, patch });
      }

      if (result.ok && result.crcOk && result.text) {
        const avgScore = Number.isFinite(result.confidence)
          ? Number(result.confidence).toFixed(3)
          : "n/a";
        console.info(
          `[${label}] frame OK: "${result.text}" (avg confidence ${avgScore})`,
        );
        const stopAvailable = runMode !== "idle" && !isBusy;
        if (!autoStopTriggeredRef.current && stopAvailable) {
          setStatus(`frame OK (${label}) — stopping…`);
          triggerAutoStop(label);
        }
      } else if (!result.crcOk) {
        console.warn(`[${label}] frame CRC fail`);
      } else if (!result.ok) {
        console.warn(`[${label}] frame decode fail`);
      }
    },
    [dispatchCandidates, isBusy, pipelineByKey, runMode, triggerAutoStop],
  );

  const handleStart = useCallback(async () => {
    if (isBusy || runMode !== "idle") return;
    setIsBusy(true);
    try {
      await cleanup(null, { resetFinalResult: true });
      await decoder.prepare();
      await decoder.waitForReady();
      setStatus("requesting microphone…");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: { ideal: false, exact: false } as any,
          noiseSuppression: { ideal: false, exact: false } as any,
          autoGainControl: { ideal: false, exact: false } as any,
          channelCount: 1,
          sampleRate: { ideal: 48000 },
          // Chrome-specific flags to disable processing
          googEchoCancellation: false,
          googNoiseSuppression: false,
          googAutoGainControl: false,
          googHighpassFilter: false,
        } as MediaTrackConstraints,
      });
      mediaStreamRef.current = stream;

      // Log actual audio constraints applied (useful for debugging Chrome mobile)
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        const settings = audioTrack.getSettings();
        console.info("Audio track settings:", {
          echoCancellation: settings.echoCancellation,
          noiseSuppression: settings.noiseSuppression,
          autoGainControl: settings.autoGainControl,
          sampleRate: settings.sampleRate,
          channelCount: settings.channelCount,
        });
      }

      await decoder.attachStream(stream);
      pipelineDefs.forEach((def) => {
        console.info(`[${def.label}] microphone connected`);
      });
      clearRecording();
      setupRecorder(stream);
      setRunMode("microphone");
    } catch (err) {
      await cleanup(null);
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`error: ${message}`);
    } finally {
      setIsBusy(false);
    }
  }, [
    cleanup,
    clearRecording,
    decoder,
    isBusy,
    pipelineDefs,
    runMode,
    setupRecorder,
  ]);

  const handlePlaySample = useCallback(
    async (entry: (typeof SAMPLE_WAV_CONFIG)[number]) => {
      if (isBusy || runMode !== "idle") return;
      setIsBusy(true);
      try {
        await cleanup(null, { resetFinalResult: true });
        await decoder.prepare({ suppressReadyStatus: true });
        await decoder.waitForReady();
        const labelSuffix = entry.label ? ` ${entry.label}` : "";
        setStatus(`loading sample${labelSuffix}…`);
        const response = await fetch(entry.url);
        if (!response.ok) {
          throw new Error(`fetch failed (${response.status})`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioCtxInstance = decoder.getAudioContext();
        if (!audioCtxInstance) {
          throw new Error("audio context not ready");
        }
        const audioBuffer = await decodeAudioDataBuffer(
          audioCtxInstance,
          arrayBuffer,
        );
        if (!audioBuffer || audioBuffer.numberOfChannels === 0) {
          throw new Error("empty or unsupported WAV payload");
        }
        const playbackBuffer = toMonoBuffer(audioCtxInstance, audioBuffer);
        await decoder.attachBuffer(playbackBuffer, { label: entry.label });
        pipelineDefs.forEach((def) => {
          console.info(`[${def.label}] sample input connected`);
        });
        setRunMode("sample");
      } catch (err) {
        await cleanup(null, { resetFinalResult: true });
        const message = err instanceof Error ? err.message : String(err);
        setStatus(`error: ${message}`);
      } finally {
        setIsBusy(false);
      }
    },
    [cleanup, decoder, isBusy, pipelineDefs, runMode],
  );

  const handleDownload = useCallback(() => {
    if (!recordedWavBlob) return;
    const url = URL.createObjectURL(recordedWavBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    anchor.download = `fesk-recording-${stamp}.wav`;
    document.body.appendChild(anchor);
    anchor.click();
    requestAnimationFrame(() => {
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    });
  }, [recordedWavBlob]);

  useEffect(() => {
    const offState = decoder.events.on("state", handleStateEvent);
    const offPreview = decoder.events.on("preview", handlePreviewEvent);
    const offFrame = decoder.events.on("frame", handleFrameEvent);
    return () => {
      offState?.();
      offPreview?.();
      offFrame?.();
    };
  }, [decoder, handleFrameEvent, handlePreviewEvent, handleStateEvent]);

  useEffect(() => {
    const decoderInstance = decoderRef.current;
    return () => {
      const recorder = recorderRef.current;
      try {
        recorder?.stop();
      } catch {
        // ignore
      }
      const stream = mediaStreamRef.current;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      decoderInstance?.stop().catch(() => undefined);
    };
  }, []);

  const previewClassNames = ["out-row-text"];
  if (previewCandidate) {
    previewClassNames.push(previewIsProvisional ? "provisional" : "decoded-ok");
  }

  const previewLabelHidden = !debugMode || !previewLabel;
  const finalLabelHidden = !debugMode || !finalLabel;

  const downloadTitle = mediaRecorderSupported
    ? undefined
    : "Recording download requires MediaRecorder support.";

  return (
    <div className="app">
      <h1>FESK Real-Time Decoder</h1>
      <div className="row controls">
        <button id="startBtn" onClick={handleStart} disabled={startDisabled}>
          Start 🎙️
        </button>
        <button id="stopBtn" onClick={handleStop} disabled={stopDisabled}>
          Stop 🚫
        </button>
        <button
          id="downloadBtn"
          onClick={handleDownload}
          disabled={downloadDisabled}
          title={downloadTitle}
        >
          {downloadLabel}
        </button>
      </div>
      <details className="debug-panel" hidden={!debugMode}>
        <summary>Debug</summary>
        <div className="debug-panel-content">
          <div className="debug-controls">
            {SAMPLE_WAV_CONFIG.map((entry) => (
              <button
                id={entry.id}
                key={entry.url}
                onClick={() => handlePlaySample(entry)}
                disabled={sampleButtonsDisabled}
              >
                Play Sample {entry.label} 🔊
              </button>
            ))}
          </div>
          <div className="debug-metrics">
            <div className="debug-metric">
              <strong>Overall status:</strong> <span>{status}</span>
            </div>
            <div className="debug-metric">
              <strong>SR:</strong> <span>{sampleRateText}</span>
            </div>
            <DebugMetrics
              definitions={metricDefinitions}
              frequencies={frequencies}
              statuses={pipelineStatuses}
            />
          </div>
        </div>
      </details>
      <div className="row">
        <strong>Decoded output:</strong>
      </div>
      <div id="out">
        <div className="out-row preview-row">
          <div className="out-row-header">Real time</div>
          <div className="out-row-content">
            <div className="out-row-label" hidden={previewLabelHidden}>
              {previewLabel}
            </div>
            <div className={previewClassNames.join(" ")}>{previewText}</div>
          </div>
        </div>
        <div className="out-row result-row">
          <div className="out-row-header">Final result</div>
          <div className="out-row-content">
            <div className="out-row-label" hidden={finalLabelHidden}>
              {finalLabel}
            </div>
            <span className="out-row-text decoded-ok">{finalResult.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
