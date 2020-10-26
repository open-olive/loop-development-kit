import messages from '../grpc/whisper_pb';
import { WhisperFormSubmitEvent, WhisperFormUpdateEvent } from './whisperService';
import { StreamTransformer } from './transformingStream';
export declare const transformResponse: StreamTransformer<messages.WhisperFormStreamResponse, WhisperFormSubmitEvent | WhisperFormUpdateEvent>;
