import { createFeskDecoder as _createFeskDecoder } from "./decoder/index.js";
import type { FeskDecoder } from "./decoder/index.js";

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

export function createFeskDecoder(overrides?: unknown): FeskDecoder {
  return _createFeskDecoder({
    /* @vite-ignore */
    workletUrl: () => new URL("./mb-fesk-worklet.js", import.meta.url),
    ...(overrides as object),
  });
}
