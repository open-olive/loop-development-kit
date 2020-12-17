import * as messages from '../grpc/whisper_pb';
import { WhisperDisambiguationEvent, WhisperFormSubmitEvent, WhisperFormUpdateEvent } from './whisperService';
import { StreamTransformer } from './transformingStream';
export declare const transformDisambiguationResponse: StreamTransformer<messages.WhisperDisambiguationStreamResponse, WhisperDisambiguationEvent>;
export declare const transformResponse: StreamTransformer<messages.WhisperFormStreamResponse, WhisperFormSubmitEvent | WhisperFormUpdateEvent>;
