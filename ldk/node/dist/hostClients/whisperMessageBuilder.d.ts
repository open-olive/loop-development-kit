import { Whisper, WhisperConfirmConfig, WhisperFormConfig, WhisperFormInput, WhisperFormInputs } from './whisperService';
import * as messages from '../grpc/whisper_pb';
export declare const generateWhisperInput: (input: WhisperFormInputs) => messages.WhisperFormInput;
export declare const generateWhisperMeta: (whisper: Whisper) => messages.WhisperMeta;
export declare const generateWhisperForm: (config: WhisperFormConfig) => messages.WhisperFormRequest;
export declare const buildWhisperMarkdownRequest: (whisper: Whisper) => messages.WhisperMarkdownRequest;
export declare const buildWhisperConfirmMessage: (whisper: WhisperConfirmConfig) => messages.WhisperConfirmRequest;
