import * as messages from '../grpc/whisper_pb';
import { WhisperDisambiguationEvent, WhisperFormSubmitEvent, WhisperFormUpdateEvent } from './whisperService';
import { StreamTransformer } from './transformingStream';
/**
 * @internal
 */
export declare const transformDisambiguationResponse: StreamTransformer<messages.WhisperDisambiguationStreamResponse, WhisperDisambiguationEvent>;
/**
 * @internal
 */
export declare const transformResponse: StreamTransformer<messages.WhisperFormStreamResponse, WhisperFormSubmitEvent | WhisperFormUpdateEvent>;
