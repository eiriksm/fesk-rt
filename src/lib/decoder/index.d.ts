export interface PipelineDefinition {
  key: string;
  label: string;
  shortLabel?: string;
  baseBankIndex: number;
  micGain: number;
  sampleGain: number;
}

export interface DecoderStateStatusEvent {
  kind: "status";
  status?: string | null;
}

export interface DecoderStatePipelineStatusEvent {
  kind: "pipeline-status";
  pipelineKey?: string | null;
  status?: string | null;
}

export interface DecoderStateFrequencyEvent {
  kind: "freq";
  pipelineKey?: string | null;
  freqHz?: number | null;
}

export interface DecoderStateSampleRateEvent {
  kind: "sample-rate";
  sampleRate?: number | null;
}

export interface DecoderStateBufferEndedEvent {
  kind: "buffer-ended";
  label?: string | null;
}

export type DecoderStateEvent =
  | DecoderStateStatusEvent
  | DecoderStatePipelineStatusEvent
  | DecoderStateFrequencyEvent
  | DecoderStateSampleRateEvent
  | DecoderStateBufferEndedEvent
  | { kind: string; [key: string]: unknown };

export interface DecoderPreviewEvent {
  pipelineKey?: string | null;
  text?: string | null;
  provisional?: boolean | null;
  confidence?: number | null;
  updatedAt?: number | null;
  crcOk?: boolean | null;
}

export interface DecoderFrameResult {
  ok?: boolean;
  crcOk?: boolean;
  text?: string | null;
  confidence?: number | null;
  updatedAt?: number | null;
  status?: string | null;
}

export interface DecoderFrameEvent {
  pipelineKey?: string | null;
  label?: string | null;
  result?: DecoderFrameResult | null;
}

export interface DecoderEvents {
  state: DecoderStateEvent;
  preview: DecoderPreviewEvent;
  frame: DecoderFrameEvent;
}

export interface DecoderEventEmitter {
  on<K extends keyof DecoderEvents>(
    event: K,
    handler: (payload: DecoderEvents[K]) => void,
  ): () => void;
}

export interface FeskDecoderConfig {
  pipelineDefs: PipelineDefinition[];
  pipelineThresholds: Map<string, number>;
  detectorConfig: unknown;
  freqSets: number[][];
  bitsPerSymbol: number;
  modulation: "bfsk" | "4fsk";
  energy: {
    floor: number;
    on: number;
    off: number;
    minToneMs: number;
    minGapMs: number;
    ignoreHeadMs: number;
    envelopeMs: number;
    hpCutoffHz: number;
  };
  scoreMin: number;
  scoreMinBank: number[];
  workletUrl: string | URL | (() => URL);
}

export interface FeskDecoder {
  config: FeskDecoderConfig;
  events: DecoderEventEmitter;
  prepare(options?: {
    suppressReadyStatus?: boolean;
    sampleRate?: number;
  }): Promise<void>;
  waitForReady(): Promise<void>;
  attachStream(stream: MediaStream): Promise<MediaStreamAudioSourceNode>;
  attachBuffer(
    buffer: AudioBuffer,
    options?: { label?: string; suppressReadyStatus?: boolean },
  ): Promise<AudioBufferSourceNode>;
  stop(options?: { status?: string | null }): Promise<void>;
  drainToneLog(): Map<string, number[]>;
  getAudioContext(): AudioContext | null;
}

export declare function createFeskDecoder(overrides?: {
  modulation?: "bfsk" | "4fsk";
  freqSets?: number[][];
  detectorConfig?: unknown;
  gainConfig?: unknown;
  pipelineDefs?: PipelineDefinition[];
  pipelineOptions?: unknown;
  scoreMin?: number;
  scoreMinBank?: number[];
  pipelineThresholds?: Map<string, number>;
  bitsPerSymbol?: number;
  energy?: unknown;
  workletUrl?: string | URL | (() => URL);
}): FeskDecoder;

export declare const DEFAULT_FESK_DECODER_CONFIG: FeskDecoderConfig;
export declare const DEFAULT_FREQS_SETS_BFSK: number[][];
export declare const DEFAULT_FREQS_SETS_4FSK: number[][];
