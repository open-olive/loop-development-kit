import { WhisperConfig, WhisperConfirmConfig, WhisperDisambiguationConfig, WhisperDisambiguationElements, WhisperFormConfig, WhisperFormInput, WhisperFormInputs, WhisperListAlign, WhisperListConfig, WhisperListElement, WhisperListElements, WhisperListStyle } from './whisper';
import * as messages from '../grpc/whisper_pb';
/**
 * @internal
 * @param input - Whisper input to build
 */
export declare const generateWhisperInput: (input: WhisperFormInputs) => messages.WhisperFormInput;
/**
 * @param style
 * @internal
 */
export declare const generateWhisperListStyle: (style: WhisperListStyle) => messages.WhisperListElement.Style;
/**
 * @param align
 * @internal
 */
export declare const generateWhisperListAlign: (align: WhisperListAlign) => messages.WhisperListElement.Align;
/**
 * @internal
 * @param element - element to build
 */
export declare const generateWhisperListElement: (element: WhisperListElements) => messages.WhisperListElement;
/**
 * @param element
 * @internal
 */
export declare const generateWhisperDisambiguationElement: (element: WhisperDisambiguationElements) => messages.WhisperDisambiguationElement;
/**
 * @internal
 * @param whisper - whisper to build
 */
export declare const generateWhisperMeta: (whisper: WhisperConfig) => messages.WhisperMeta;
/**
 * @internal
 * @param config - whisper to build
 */
export declare const generateWhisperDisambiguation: (config: WhisperDisambiguationConfig) => messages.WhisperDisambiguationRequest;
/**
 * @internal
 * @param config - whisper to build
 */
export declare const generateWhisperForm: (config: WhisperFormConfig) => messages.WhisperFormRequest;
/**
 * @internal
 * @param whisper - whisper to build
 */
export declare const buildWhisperMarkdownRequest: (whisper: WhisperConfig) => messages.WhisperMarkdownRequest;
/**
 * @internal
 * @param config - whisper to build
 */
export declare const buildWhisperListRequest: (config: WhisperListConfig) => messages.WhisperListRequest;
/**
 * @internal
 * @param whisper - whisper to build
 */
export declare const buildWhisperConfirmMessage: (whisper: WhisperConfirmConfig) => messages.WhisperConfirmRequest;
