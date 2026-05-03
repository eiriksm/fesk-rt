import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createFeskDecoder, RECOMMENDED_MIC_CONSTRAINTS } from "./index.js";

function createMockTrack() {
  return {
    stop: vi.fn(),
    getSettings: () => ({
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
      sampleRate: 48000,
      channelCount: 1,
    }),
  };
}

function createMockStream() {
  const track = createMockTrack();
  return {
    _track: track,
    getTracks: () => [track],
    getAudioTracks: () => [track],
  };
}

function createMockAudioNode(extra = {}) {
  return {
    connect: vi.fn(),
    disconnect: vi.fn(),
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    ...extra,
  };
}

function installWebAudioMocks() {
  const workletNodes = [];

  class MockAudioWorkletNode {
    constructor() {
      this.port = {
        onmessage: null,
        postMessage: vi.fn(),
      };
      this.connect = vi.fn();
      this.disconnect = vi.fn();
      workletNodes.push(this);
    }
  }

  class MockAudioContext {
    constructor(opts = {}) {
      this.sampleRate = opts.sampleRate ?? 48000;
      this.audioWorklet = {
        addModule: vi.fn(() => Promise.resolve()),
      };
      this.close = vi.fn(() => Promise.resolve());
    }
    createGain() {
      return createMockAudioNode({ gain: { value: 1 } });
    }
    createMediaStreamSource(stream) {
      return createMockAudioNode({ _stream: stream });
    }
  }

  globalThis.AudioContext = MockAudioContext;
  globalThis.AudioWorkletNode = MockAudioWorkletNode;
  globalThis.window = { AudioContext: MockAudioContext };

  return { workletNodes };
}

function signalWorkletsReady(workletNodes) {
  for (const node of workletNodes) {
    node.port.onmessage?.({ data: { t: "ready", sr: 48000 } });
  }
}

let getUserMediaMock;
let webAudio;

beforeEach(() => {
  webAudio = installWebAudioMocks();
  getUserMediaMock = vi.fn();
  vi.stubGlobal("navigator", {
    mediaDevices: { getUserMedia: getUserMediaMock },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete globalThis.window;
  delete globalThis.AudioContext;
  delete globalThis.AudioWorkletNode;
  vi.restoreAllMocks();
});

function makeDecoder() {
  return createFeskDecoder({
    workletUrl: () => new URL("file:///fake-worklet.js"),
    // Reduce pipeline count to keep the test lightweight but still exercise
    // the full ready flow.
    freqSets: [[2490.2, 3134.8]],
    gainConfig: { gainMultipliers: [1] },
  });
}

async function startAndReady(decoder) {
  const promise = decoder.startMicrophone();
  // Let prepare() create the worklet nodes and register message handlers.
  await Promise.resolve();
  await Promise.resolve();
  signalWorkletsReady(webAudio.workletNodes);
  return promise;
}

describe("startMicrophone", () => {
  it("requests the microphone with RECOMMENDED_MIC_CONSTRAINTS by default", async () => {
    const stream = createMockStream();
    getUserMediaMock.mockResolvedValue(stream);
    const decoder = makeDecoder();

    await startAndReady(decoder);

    expect(getUserMediaMock).toHaveBeenCalledTimes(1);
    expect(getUserMediaMock).toHaveBeenCalledWith({
      audio: RECOMMENDED_MIC_CONSTRAINTS,
    });
  });

  it("passes through custom audio constraints when provided", async () => {
    const stream = createMockStream();
    getUserMediaMock.mockResolvedValue(stream);
    const decoder = makeDecoder();

    const promise = decoder.startMicrophone({ audio: true });
    await Promise.resolve();
    await Promise.resolve();
    signalWorkletsReady(webAudio.workletNodes);
    await promise;

    expect(getUserMediaMock).toHaveBeenCalledWith({ audio: true });
  });

  it("returns the acquired stream and attaches it as a MediaStream source", async () => {
    const stream = createMockStream();
    getUserMediaMock.mockResolvedValue(stream);
    const decoder = makeDecoder();

    const result = await startAndReady(decoder);

    expect(result.stream).toBe(stream);
    expect(result.source._stream).toBe(stream);
    expect(stream._track.stop).not.toHaveBeenCalled();
  });

  it("stops the stream tracks and throws if attaching fails", async () => {
    const stream = createMockStream();
    getUserMediaMock.mockResolvedValue(stream);
    const decoder = makeDecoder();
    // Break createMediaStreamSource so attachStream throws after we already
    // own the stream.
    const ctxProto = globalThis.AudioContext.prototype;
    const originalCreate = ctxProto.createMediaStreamSource;
    ctxProto.createMediaStreamSource = () => {
      throw new Error("boom");
    };

    const promise = decoder.startMicrophone();
    await Promise.resolve();
    await Promise.resolve();
    signalWorkletsReady(webAudio.workletNodes);
    await expect(promise).rejects.toThrow("boom");

    expect(stream._track.stop).toHaveBeenCalledTimes(1);

    ctxProto.createMediaStreamSource = originalCreate;
  });

  it("stops the owned stream tracks when stop() is called", async () => {
    const stream = createMockStream();
    getUserMediaMock.mockResolvedValue(stream);
    const decoder = makeDecoder();

    await startAndReady(decoder);
    expect(stream._track.stop).not.toHaveBeenCalled();

    await decoder.stop();
    expect(stream._track.stop).toHaveBeenCalledTimes(1);
  });

  it("stops the previous stream tracks when startMicrophone is called again", async () => {
    const first = createMockStream();
    const second = createMockStream();
    getUserMediaMock.mockResolvedValueOnce(first);
    getUserMediaMock.mockResolvedValueOnce(second);
    const decoder = makeDecoder();

    await startAndReady(decoder);
    expect(first._track.stop).not.toHaveBeenCalled();

    // Second call reuses the existing audio context, so no new ready signal
    // is needed.
    await decoder.startMicrophone();

    expect(first._track.stop).toHaveBeenCalledTimes(1);
    expect(second._track.stop).not.toHaveBeenCalled();
  });
});
