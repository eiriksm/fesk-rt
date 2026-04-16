import { createFeskDecoder as _createFeskDecoder } from "./decoder/index.js";
import type { FeskDecoder } from "./decoder/index.js";
import workletSource from "../../public/mb-fesk-worklet.js?raw";

export {
  DEFAULT_FESK_DECODER_CONFIG,
  FREQS_SETS_4FSK,
  BFSK_FREQS_SETS,
  HYBRID_FREQS_SETS,
} from "./decoder/index.js";

export type {
  PipelineDefinition,
  DecoderStateStatusEvent,
  DecoderStatePipelineStatusEvent,
  DecoderStateFrequencyEvent,
  DecoderStateSampleRateEvent,
  DecoderStateBufferEndedEvent,
  DecoderStateEvent,
  DecoderPreviewEvent,
  DecoderFrameResult,
  DecoderFrameEvent,
  DecoderEvents,
  DecoderEventEmitter,
  FeskDecoderConfig,
  FeskDecoder,
} from "./decoder/index.js";

export {
  decodeBase32ToBytes,
  hasKnownImageSignature,
  tryDecodeBase32Text,
  tryDecodeAsBase32Image,
} from "./base32.js";

function createWorkletUrl(): URL {
  const blob = new Blob([workletSource], { type: "text/javascript" });
  return new URL(URL.createObjectURL(blob));
}

export function createFeskDecoder(overrides?: unknown): FeskDecoder {
  return _createFeskDecoder({
    workletUrl: createWorkletUrl,
    ...(overrides as object),
  });
}
