const CODE_BITS = 6;
const CRC_BITS = 8;
const START_CODE = 62;
const END_CODE = 63;
const START_END_MASK = (1 << CODE_BITS) - 1;
const END_MARK_BITS = Array.from(
  { length: CODE_BITS },
  (_, i) => (END_CODE >> (CODE_BITS - 1 - i)) & 1,
);

// Default: 4FSK only (for backward compatibility)
const DEFAULT_FREQS_SETS = [
  [2349.32, 2637.02, 2959.96, 3322.44], // Bank A - 4FSK
  [2349.32, 2637.02, 2959.96, 3322.44], // Bank B - 4FSK
];

// BFSK frequency sets (can be used instead of 4FSK)
export const BFSK_FREQS_SETS = [
  [2205.00, 3150.00], // Bank A - BFSK
  [2205.00, 3150.00], // Bank B - BFSK
];

// Hybrid: Both 4FSK and BFSK simultaneously
export const HYBRID_FREQS_SETS = [
  [2349.32, 2637.02, 2959.96, 3322.44], // Bank A - 4FSK
  [2349.32, 2637.02, 2959.96, 3322.44], // Bank B - 4FSK
  [2205.00, 3150.00],                    // Bank C - BFSK
  [2205.00, 3150.00],                    // Bank D - BFSK
];

const DEFAULT_ENERGY = {
  floor: 5e-7,
  on: 6e-4,
  off: 2e-4,
  minToneMs: 40,
  minGapMs: 5,
  ignoreHeadMs: 6,
  envelopeMs: 6,
  hpCutoffHz: 600,
};

const DEFAULT_GAIN_CONFIG = {
  micBase: 1,
  sampleBase: 1,
  gainMultipliers: [1, 2, 4, 8, 16],
};

const DEFAULT_SCORE_MIN = 0.2;
const DEFAULT_SCORE_MIN_BANK = DEFAULT_FREQS_SETS.map((_, idx) =>
  idx === 0 ? 0.28 : 0.18,
);

const DEFAULT_WORKLET_URL = "/mb-fesk-worklet.js";

function createEmitter() {
  const handlers = new Map();
  return {
    on(event, handler) {
      if (!handlers.has(event)) handlers.set(event, new Set());
      handlers.get(event).add(handler);
      return () => this.off(event, handler);
    },
    off(event, handler) {
      const set = handlers.get(event);
      if (!set) return;
      set.delete(handler);
      if (!set.size) handlers.delete(event);
    },
    once(event, handler) {
      const off = this.on(event, (...args) => {
        off();
        handler(...args);
      });
      return off;
    },
    emit(event, payload) {
      const set = handlers.get(event);
      if (!set) return;
      for (const handler of Array.from(set)) handler(payload);
    },
  };
}

function bankLabel(idx) {
  if (idx >= 0 && idx < 26) return String.fromCharCode(65 + idx);
  return String(idx + 1);
}

function buildDetectorConfig(freqSets) {
  return freqSets.map((base, idx) => {
    const config = {
      base,
      harmonicMultipliers: [1, 2, 3, 4],
      detuneFactors: [0.99, 1, 1.01],
    };
    // Every second bank (B, D, etc.) uses wider detuning
    if (idx % 2 === 1) {
      config.detuneFactors = [0.97, 0.985, 1, 1.015, 1.03];
    }
    return config;
  });
}

function buildPipelineDefs(freqSets, options = {}) {
  const {
    micBase = DEFAULT_GAIN_CONFIG.micBase,
    sampleBase = DEFAULT_GAIN_CONFIG.sampleBase,
    gainMultipliers = DEFAULT_GAIN_CONFIG.gainMultipliers,
  } = options;

  const defs = [];
  freqSets.forEach((freqs, idx) => {
    const baseLabel = bankLabel(idx);
    // Detect modulation type based on frequency count
    const modulationType = freqs.length === 2 ? "BFSK" : "4FSK";
    gainMultipliers.forEach((multiplier, gainIdx) => {
      const isBase = multiplier === 1;
      const gainLabel = isBase ? "" : ` ×${multiplier}`;
      const shortGainLabel = isBase ? "" : `×${multiplier}`;
      defs.push({
        key: `bank-${idx}-gain${gainIdx}`,
        baseBankIndex: idx,
        modulationType,
        label: `Bank ${baseLabel} (${modulationType})${gainLabel}`,
        shortLabel: `${baseLabel}${shortGainLabel}`,
        micGain: micBase * multiplier,
        sampleGain: sampleBase * multiplier,
      });
    });
  });
  return defs;
}

function buildPipelineThresholds(defs, scoreMinBank, scoreMin) {
  const thresholds = new Map();
  defs.forEach((def) => {
    const bankIdx = def.baseBankIndex;
    const value = scoreMinBank?.[bankIdx];
    thresholds.set(def.key, Number.isFinite(value) ? value : scoreMin);
  });
  return thresholds;
}

function bitsToCodes(bits, length = bits.length) {
  const codes = [];
  for (let offset = 0; offset + CODE_BITS <= length; offset += CODE_BITS) {
    let value = 0;
    for (let i = 0; i < CODE_BITS; i += 1) {
      value = (value << 1) | bits[offset + i];
    }
    codes.push(value);
  }
  return codes;
}

function decodeCodes(codes) {
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
    [41, "\n"],
  ].forEach(([code, ch]) => {
    CODE_MAP[code] = ch;
  });

  const chars = [];
  for (let i = 0; i < codes.length; i += 1) {
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
    for (let bit = CODE_BITS - 1; bit >= 0; bit -= 1) {
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
  for (let i = 0; i < bits.length; i += 1) {
    value = (value << 1) | bits[i];
  }
  return value;
}

function resolveConfig(overrides = {}) {
  const freqSets = overrides.freqSets ?? DEFAULT_FREQS_SETS;
  const detectorConfig = overrides.detectorConfig ?? buildDetectorConfig(freqSets);
  const gainConfig = { ...DEFAULT_GAIN_CONFIG, ...(overrides.gainConfig || {}) };
  const pipelineDefs =
    overrides.pipelineDefs ?? buildPipelineDefs(freqSets, { ...overrides.pipelineOptions, ...gainConfig });
  const scoreMin = overrides.scoreMin ?? DEFAULT_SCORE_MIN;
  const scoreMinBank = overrides.scoreMinBank ?? DEFAULT_SCORE_MIN_BANK;
  const pipelineThresholds =
    overrides.pipelineThresholds ?? buildPipelineThresholds(pipelineDefs, scoreMinBank, scoreMin);
  return {
    freqSets,
    detectorConfig,
    energy: { ...DEFAULT_ENERGY, ...(overrides.energy || {}) },
    pipelineDefs,
    pipelineThresholds,
    scoreMin,
    scoreMinBank,
    workletUrl: overrides.workletUrl ?? DEFAULT_WORKLET_URL,
  };
}

export function createFeskDecoder(overrides = {}) {
  const config = resolveConfig(overrides);
  const events = createEmitter();
  const pipelineStates = new Map();
  const pipelineReadyWaiters = new Set();
  const toneLog = new Map();
  let audioCtx = null;
  let mediaSrc = null;
  let bufferSrc = null;
  let suppressReadyStatus = false;

  const decoderStates = new Map();

  function mkDec(pipelineKey, label) {
    return {
      state: "hunt",
      frameBits: [],
      bitScores: [],
      frameScoreSum: 0,
      frameScoreCount: 0,
      avgConfidence: 0,
      lastUpdatedAt: null,
      markerBits: [],
      markerScores: [],
      recentBits: 0,
      recentCount: 0,
      previewText: "",
      previewConfidence: 0,
      previewUpdatedAt: null,
      previewConsumedBits: 0,
      previewActive: false,
      pipelineKey,
      label,
    };
  }

  function emitPreview(pipelineKey, payload) {
    events.emit("preview", { pipelineKey, ...payload });
  }

  function ensurePreview(dec) {
    if (dec.previewActive) return;
    dec.previewActive = true;
    dec.previewText = "";
    dec.previewConfidence = 0;
    dec.previewUpdatedAt = null;
    dec.previewConsumedBits = 0;
    emitPreview(dec.pipelineKey, { text: "", provisional: true });
  }

  function updatePreview(dec) {
    if (!dec.frameBits.length) return null;
    const usableBits = dec.frameBits.length - (dec.frameBits.length % CODE_BITS);
    if (!usableBits || usableBits <= dec.previewConsumedBits) return null;
    const codes = bitsToCodes(dec.frameBits, usableBits);
    const res = decodeCodes(codes);
    if (!res.ok) return null;
    const text = res.text;
    const candidate = {
      text,
      confidence: dec.avgConfidence,
      crcOk: null,
      updatedAt: dec.lastUpdatedAt,
      consumedBits: usableBits,
    };
    return candidate;
  }

  function publishPreviewCandidate(dec, candidate) {
    if (!candidate || typeof candidate.text !== "string") return;
    ensurePreview(dec);
    const changedText = candidate.text !== dec.previewText;
    const changedConfidence = candidate.confidence !== dec.previewConfidence;
    const changedTimestamp = candidate.updatedAt !== dec.previewUpdatedAt;
    dec.previewText = candidate.text;
    dec.previewConfidence = candidate.confidence;
    dec.previewUpdatedAt = candidate.updatedAt ?? null;
    if (changedText || changedConfidence || changedTimestamp) {
      emitPreview(dec.pipelineKey, {
        text: dec.previewText,
        provisional: true,
        confidence: dec.previewConfidence,
        crcOk: candidate.crcOk,
        updatedAt: dec.previewUpdatedAt,
      });
    }
    if (Number.isFinite(candidate.consumedBits)) {
      dec.previewConsumedBits = candidate.consumedBits;
    }
  }

  function recordFrameBit(dec, score) {
    const s = Number.isFinite(score) ? score : 0;
    dec.frameScoreSum += s;
    dec.frameScoreCount += 1;
    dec.avgConfidence = dec.frameScoreCount
      ? dec.frameScoreSum / dec.frameScoreCount
      : 0;
    dec.lastUpdatedAt = Date.now();
  }

  function commitPreview(dec, result) {
    const shouldKeep = Boolean(result?.text) && result?.crcOk === true;
    if (dec.previewActive) {
      if (shouldKeep) {
        emitPreview(dec.pipelineKey, {
          text: result.text,
          provisional: false,
          confidence: result.confidence,
          crcOk: result.crcOk,
          updatedAt: result.updatedAt,
        });
      } else {
        emitPreview(dec.pipelineKey, { text: null, provisional: false });
      }
    } else if (shouldKeep) {
      emitPreview(dec.pipelineKey, {
        text: result.text,
        provisional: false,
        confidence: result.confidence,
        crcOk: result.crcOk,
        updatedAt: result.updatedAt,
      });
    }
    dec.previewActive = false;
    dec.previewText = "";
    dec.previewConsumedBits = 0;
  }

  function resetDec(dec) {
    dec.state = "hunt";
    dec.frameBits.length = 0;
    dec.bitScores.length = 0;
    dec.frameScoreSum = 0;
    dec.frameScoreCount = 0;
    dec.avgConfidence = 0;
    dec.lastUpdatedAt = null;
    dec.markerBits.length = 0;
    dec.markerScores.length = 0;
    dec.recentBits = 0;
    dec.recentCount = 0;
    dec.previewText = "";
    dec.previewConfidence = 0;
    dec.previewUpdatedAt = null;
    dec.previewConsumedBits = 0;
    if (dec.previewActive) {
      emitPreview(dec.pipelineKey, { text: null, provisional: false });
    }
    dec.previewActive = false;
  }

  function resetAllDecoders() {
    for (const dec of decoderStates.values()) resetDec(dec);
  }

  function finalizeFrame(dec) {
    const totalBits = dec.frameBits.length;
    const baseConfidence = dec.avgConfidence;
    if (totalBits < CRC_BITS) {
      const r = {
        ok: false,
        crcOk: false,
        text: null,
        confidence: baseConfidence,
        status: "short",
        updatedAt: dec.lastUpdatedAt,
      };
      commitPreview(dec, r);
      return r;
    }
    const payloadBitLength = totalBits - CRC_BITS;
    if (payloadBitLength < 0 || payloadBitLength % CODE_BITS !== 0) {
      const r = {
        ok: false,
        crcOk: false,
        text: null,
        confidence: baseConfidence,
        status: "misaligned",
        updatedAt: dec.lastUpdatedAt,
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
    const confidence = payloadScores.length
      ? payloadScores.reduce((a, b) => a + b, 0) / payloadScores.length
      : baseConfidence;

    dec.markerBits.length = 0;
    dec.markerScores.length = 0;

    const result = {
      ok,
      crcOk: okCRC,
      text,
      confidence,
      status: okCRC ? (ok ? "ok" : "decode-fail") : "crc-fail",
      updatedAt: dec.lastUpdatedAt,
    };
    commitPreview(dec, result);
    return result;
  }

  function feedBit(dec, bit, score) {
    const s = score ?? 0;

    if (dec.state === "hunt") {
      dec.recentBits = ((dec.recentBits << 1) | bit) & START_END_MASK;
      dec.recentCount = Math.min(dec.recentCount + 1, CODE_BITS);
      if (dec.recentCount === CODE_BITS && dec.recentBits === START_CODE) {
        dec.state = "payload";
        dec.frameBits.length = 0;
        dec.bitScores.length = 0;
        dec.frameScoreSum = 0;
        dec.frameScoreCount = 0;
        dec.avgConfidence = 0;
        dec.lastUpdatedAt = null;
        dec.previewText = "";
        dec.previewConfidence = 0;
        dec.previewUpdatedAt = null;
        dec.previewConsumedBits = 0;
        dec.previewActive = false;
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
      recordFrameBit(dec, flushedScore);
      const candidate = updatePreview(dec);
      if (candidate) publishPreviewCandidate(dec, candidate);
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
        recordFrameBit(dec, flushedScore);
        const candidate = updatePreview(dec);
        if (candidate) publishPreviewCandidate(dec, candidate);
        continue;
      }
      const result = finalizeFrame(dec);
      resetDec(dec);
      return result;
    }

    dec.recentBits = ((dec.recentBits << 1) | bit) & START_END_MASK;
    dec.recentCount = Math.min(dec.recentCount + 1, CODE_BITS);

    if (!dec.markerBits.length && !flushedAny) {
      const candidate = updatePreview(dec);
      if (candidate) publishPreviewCandidate(dec, candidate);
    }
    return null;
  }

  function feedOne(dec, symIdx, score, modulationType) {
    if (modulationType === "BFSK") {
      // BFSK: symbol index 0-1 encodes 1 bit
      if (symIdx < 0 || symIdx > 1) return null;
      return feedBit(dec, symIdx, score);
    } else {
      // 4FSK: symbol index 0-3 encodes 2 bits
      if (symIdx < 0 || symIdx > 3) return null;
      const bit0 = (symIdx >> 1) & 1;  // MSB
      const bit1 = symIdx & 1;          // LSB
      // Feed both bits in sequence
      const result0 = feedBit(dec, bit0, score);
      if (result0) return result0;
      return feedBit(dec, bit1, score);
    }
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
        const target = type === "sample" ? state.sampleGainNode : state.micGainNode;
        node.connect(target);
      } catch (err) {
        console.warn(
          `[${state.def.label}] connect failed`,
          err?.message || err,
        );
      }
    }
  }

  function disconnectNodeFromPipelines(node, type) {
    for (const state of pipelineStates.values()) {
      try {
        const target = type === "sample" ? state.sampleGainNode : state.micGainNode;
        node.disconnect(target);
      } catch {}
    }
  }

  function emitState(payload) {
    events.emit("state", payload);
  }

  function handlePipelineCandidates(def, results) {
    const freqSets = config.freqSets;
    const threshold = config.pipelineThresholds.get(def.key) ?? DEFAULT_SCORE_MIN;
    const dec = decoderStates.get(def.key);
    if (!dec) return;

    if (!Array.isArray(results) || !results.length) {
      emitState({ kind: "freq", pipelineKey: def.key, freqHz: null });
      emitState({ kind: "pipeline-status", pipelineKey: def.key, status: "idle" });
      return;
    }

    let hadActive = false;
    let hadFrameOk = false;
    let pendingStatus = null;
    const baseFreqs = freqSets[def.baseBankIndex] || [];

    for (const r of results) {
      if (!r || !r.active) continue;
      hadActive = true;

      if (Number.isFinite(r.idx)) {
        let tones = toneLog.get(def.key);
        if (!tones) {
          tones = [];
          toneLog.set(def.key, tones);
        }
        tones.push(r.idx);
      }

      const displayFreq =
        Number.isFinite(r.freqHz) && r.freqHz > 0
          ? r.freqHz
          : Number.isFinite(baseFreqs[r.idx])
            ? baseFreqs[r.idx]
            : null;
      emitState({ kind: "freq", pipelineKey: def.key, freqHz: displayFreq });

      if ((r.score ?? 0) < threshold) continue;
      const out = Number.isFinite(r.idx) ? feedOne(dec, r.idx, r.score, def.modulationType) : null;
      if (!out) continue;

      events.emit("frame", {
        pipelineKey: def.key,
        label: def.label,
        result: out,
      });

      if (out.ok && out.crcOk && out.text) {
        emitState({
          kind: "pipeline-status",
          pipelineKey: def.key,
          status: "frame OK",
        });
        if (!suppressReadyStatus) {
          emitState({ kind: "status", status: `frame OK (${def.label})` });
        }
        hadFrameOk = true;
        pendingStatus = null;
      } else if (!out.crcOk) {
        emitState({
          kind: "pipeline-status",
          pipelineKey: def.key,
          status: "CRC fail",
        });
        if (!hadFrameOk && !pendingStatus) {
          pendingStatus = `frame CRC fail (${def.label})`;
        }
      } else if (!out.ok) {
        emitState({
          kind: "pipeline-status",
          pipelineKey: def.key,
          status: "decode fail",
        });
        if (!hadFrameOk && !pendingStatus) {
          pendingStatus = `frame decode fail (${def.label})`;
        }
      }
    }

    if (!hadActive) {
      emitState({ kind: "freq", pipelineKey: def.key, freqHz: null });
      emitState({
        kind: "pipeline-status",
        pipelineKey: def.key,
        status: "idle",
      });
    } else if (!hadFrameOk && typeof pendingStatus === "string") {
      emitState({ kind: "status", status: pendingStatus });
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
      emitState({
        kind: "pipeline-status",
        pipelineKey: def.key,
        status: sr ? `ready (${sr})` : "ready",
      });
      if (!suppressReadyStatus && allPipelinesReady()) {
        emitState({ kind: "status", status: "ready" });
      }
      flushPipelineReadyWaiters();
      return;
    }
    if (message.t === "candidates") {
      handlePipelineCandidates(def, message.results);
      return;
    }
  }

  function resolveWorkletModuleUrl(baseUrl) {
    if (baseUrl instanceof URL) return baseUrl;
    if (typeof baseUrl === "function") return baseUrl();
    return new URL(baseUrl, import.meta.url);
  }

  async function prepare(options = {}) {
    suppressReadyStatus = Boolean(options?.suppressReadyStatus);
    resetAllDecoders();
    pipelineReadyWaiters.clear();
    toneLog.clear();
    emitState({ kind: "status", status: "initializing audio…" });

    const sampleRate = options?.sampleRate;
    const audioCtxOptions = { latencyHint: "interactive" };
    if (sampleRate) {
      audioCtxOptions.sampleRate = sampleRate;
      console.info(`Creating AudioContext with requested sample rate: ${sampleRate} Hz`);
    } else {
      console.info("Creating AudioContext with browser default sample rate");
    }
    audioCtx = new (window.AudioContext || window.webkitAudioContext)(audioCtxOptions);
    console.info(`AudioContext created - actual sample rate: ${audioCtx.sampleRate} Hz`);
    if (sampleRate && sampleRate !== audioCtx.sampleRate) {
      console.warn(`AudioContext sample rate mismatch! Requested ${sampleRate} Hz but got ${audioCtx.sampleRate} Hz`);
    }
    emitState({ kind: "sample-rate", sampleRate: audioCtx.sampleRate });

    const workletModuleUrl = resolveWorkletModuleUrl(config.workletUrl);
    await audioCtx.audioWorklet.addModule(workletModuleUrl);

    pipelineStates.clear();
    decoderStates.clear();

    for (const def of config.pipelineDefs) {
      const workletNode = new AudioWorkletNode(audioCtx, "mb-fesk", {
        numberOfInputs: 1,
        numberOfOutputs: 0,
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "speakers",
      });
      const micGainNode = audioCtx.createGain();
      const sampleGainNode = audioCtx.createGain();
      // Force mono processing for Chrome mobile compatibility
      micGainNode.channelCount = 1;
      micGainNode.channelCountMode = "explicit";
      micGainNode.channelInterpretation = "speakers";
      sampleGainNode.channelCount = 1;
      sampleGainNode.channelCountMode = "explicit";
      sampleGainNode.channelInterpretation = "speakers";
      micGainNode.gain.value = Number.isFinite(def.micGain) && def.micGain > 0 ? def.micGain : 1;
      sampleGainNode.gain.value =
        Number.isFinite(def.sampleGain) && def.sampleGain > 0 ? def.sampleGain : 1;
      micGainNode.connect(workletNode);
      sampleGainNode.connect(workletNode);
      const state = {
        def,
        workletNode,
        micGainNode,
        sampleGainNode,
        ready: false,
      };
      pipelineStates.set(def.key, state);
      decoderStates.set(def.key, mkDec(def.key, def.label));
      workletNode.port.onmessage = (e) => handleWorkletMessage(state, e.data);
      workletNode.port.postMessage({
        pipelineKey: def.key,
        freqSets: [config.detectorConfig[def.baseBankIndex]],
        energyFloor: config.energy.floor,
        energyOn: config.energy.on,
        energyOff: config.energy.off,
        minToneMs: config.energy.minToneMs,
        minGapMs: config.energy.minGapMs,
        ignoreHeadMs: config.energy.ignoreHeadMs,
        envelopeMs: config.energy.envelopeMs,
        hpCutoffHz: config.energy.hpCutoffHz,
      });
      emitState({
        kind: "pipeline-status",
        pipelineKey: def.key,
        status: "initializing…",
      });
    }
  }

  async function attachStream(stream) {
    if (!audioCtx) {
      await prepare();
      await waitForPipelinesReady();
    }
    if (mediaSrc) {
      disconnectNodeFromPipelines(mediaSrc, "mic");
      try {
        mediaSrc.disconnect();
      } catch {}
    }
    console.info(`Creating MediaStreamSource - AudioContext sample rate: ${audioCtx.sampleRate} Hz`);
    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length > 0) {
      const trackSettings = audioTracks[0].getSettings();
      console.info(`Stream audio track sample rate: ${trackSettings.sampleRate} Hz`);
    }
    mediaSrc = audioCtx.createMediaStreamSource(stream);
    // Force mono output for Chrome mobile compatibility
    mediaSrc.channelCount = 1;
    mediaSrc.channelCountMode = "explicit";
    mediaSrc.channelInterpretation = "speakers";
    console.info(`MediaStreamSource created successfully`);
    connectNodeToPipelines(mediaSrc, "mic");
    for (const state of pipelineStates.values()) {
      emitState({
        kind: "pipeline-status",
        pipelineKey: state.def.key,
        status: "listening…",
      });
    }
    emitState({
      kind: "status",
      status: "listening… wait for 111110 start marker",
    });
    return mediaSrc;
  }

  async function attachBuffer(audioBuffer, options = {}) {
    if (!audioCtx) {
      await prepare({ suppressReadyStatus: options?.suppressReadyStatus });
      await waitForPipelinesReady();
    }
    if (bufferSrc) {
      bufferSrc.onended = null;
      try {
        bufferSrc.stop();
      } catch {}
      disconnectNodeFromPipelines(bufferSrc, "sample");
      try {
        bufferSrc.disconnect();
      } catch {}
    }
    bufferSrc = audioCtx.createBufferSource();
    bufferSrc.buffer = audioBuffer;
    connectNodeToPipelines(bufferSrc, "sample");
    const labelSuffix = options?.label ? ` ${options.label}` : "";
    for (const state of pipelineStates.values()) {
      emitState({
        kind: "pipeline-status",
        pipelineKey: state.def.key,
        status: `sample${labelSuffix}…`.trim(),
      });
    }
    emitState({ kind: "status", status: `playing sample${labelSuffix}…` });
    bufferSrc.onended = () => {
      disconnectNodeFromPipelines(bufferSrc, "sample");
      bufferSrc = null;
      emitState({ kind: "buffer-ended", label: options?.label || "" });
    };
    bufferSrc.start();
    return bufferSrc;
  }

  async function stop(options = {}) {
    const { status } = options || {};
    pipelineReadyWaiters.forEach((resolve) => resolve());
    pipelineReadyWaiters.clear();

    if (bufferSrc) {
      bufferSrc.onended = null;
      try {
        bufferSrc.stop();
      } catch {}
      disconnectNodeFromPipelines(bufferSrc, "sample");
      try {
        bufferSrc.disconnect();
      } catch {}
      bufferSrc = null;
    }

    if (mediaSrc) {
      disconnectNodeFromPipelines(mediaSrc, "mic");
      try {
        mediaSrc.disconnect();
      } catch {}
      mediaSrc = null;
    }

    for (const state of pipelineStates.values()) {
      state.ready = false;
      try {
        state.micGainNode.disconnect();
      } catch {}
      try {
        state.sampleGainNode.disconnect();
      } catch {}
      try {
        state.workletNode.disconnect();
      } catch {}
      state.workletNode.port.onmessage = null;
    }
    pipelineStates.clear();

    if (audioCtx) {
      try {
        await audioCtx.close();
      } catch {}
      audioCtx = null;
    }

    resetAllDecoders();
    suppressReadyStatus = false;
    emitState({ kind: "sample-rate", sampleRate: null });
    if (typeof status === "string") emitState({ kind: "status", status });
  }

  function drainToneLog() {
    const copy = new Map();
    for (const [key, tones] of toneLog.entries()) {
      copy.set(key, [...tones]);
    }
    toneLog.clear();
    return copy;
  }

  return {
    config,
    events,
    prepare,
    attachStream,
    attachBuffer,
    waitForReady: waitForPipelinesReady,
    stop,
    drainToneLog,
    getAudioContext: () => audioCtx,
  };
}

export const DEFAULT_FESK_DECODER_CONFIG = resolveConfig();

export const __testUtils = {
  bitsToCodes,
  decodeCodes,
  crc8ATM,
  buildPipelineDefs,
  buildPipelineThresholds,
};
