import { createFeskDecoder as _createFeskDecoder } from "./decoder/index.js";
import type { FeskDecoder } from "./decoder/index.js";

export {
  DEFAULT_FESK_DECODER_CONFIG,
  FREQS_SETS_4FSK,
  BFSK_FREQS_SETS,
  HYBRID_FREQS_SETS,
  RECOMMENDED_MIC_CONSTRAINTS,
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
  StartMicrophoneOptions,
  StartMicrophoneResult,
} from "./decoder/index.js";

export {
  decodeBase32ToBytes,
  hasKnownImageSignature,
  tryDecodeBase32Text,
  tryDecodeAsBase32Image,
} from "./base32.js";

export interface CreateFeskDecoderOptions {
  workletUrl: string | URL | (() => URL);
  [key: string]: unknown;
}

export function createFeskDecoder(
  options: CreateFeskDecoderOptions,
): FeskDecoder {
  if (!options || options.workletUrl == null) {
    throw new Error(
      "createFeskDecoder: `workletUrl` is required. Copy " +
        "`mb-fesk-worklet.js` from the package into a location served by " +
        "your app and pass its URL (string, URL, or `() => URL`).",
    );
  }
  return _createFeskDecoder(options);
}
