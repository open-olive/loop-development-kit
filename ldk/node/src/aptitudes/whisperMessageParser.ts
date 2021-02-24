/* eslint-disable @typescript-eslint/no-non-null-assertion,jsdoc/require-param */
import * as jspb from 'google-protobuf';
import * as messages from '../grpc/whisper_pb';
import {
  WhisperDisambiguationEvent,
  WhisperFormOutputTypes,
  WhisperFormSubmitEvent,
  WhisperFormUpdateEvent,
} from './whisper';
import { StreamTransformer } from './transformingStream';

/**
 * @internal
 */
const transformOutput = (
  message: messages.WhisperFormOutput,
): WhisperFormOutputTypes => {
  const messageObj = message.toObject();
  switch (message.getOutputOneofCase()) {
    case messages.WhisperFormOutput.OutputOneofCase.CHECKBOX:
      return messageObj.checkbox!.value;
    case messages.WhisperFormOutput.OutputOneofCase.EMAIL:
      return messageObj.email!.value;
    case messages.WhisperFormOutput.OutputOneofCase.MARKDOWN:
      return messageObj.markdown!.value;
    case messages.WhisperFormOutput.OutputOneofCase.NUMBER:
      return messageObj.number!.value;
    case messages.WhisperFormOutput.OutputOneofCase.PASSWORD:
      return messageObj.password!.value;
    case messages.WhisperFormOutput.OutputOneofCase.RADIO:
      return messageObj.radio!.value;
    case messages.WhisperFormOutput.OutputOneofCase.SELECT:
      return messageObj.select!.value;
    case messages.WhisperFormOutput.OutputOneofCase.TEL:
      return messageObj.tel!.value;
    case messages.WhisperFormOutput.OutputOneofCase.TEXT:
      return messageObj.text!.value;
    case messages.WhisperFormOutput.OutputOneofCase.TIME:
      return message.getTime()!.getValue()!.toDate();
    case messages.WhisperFormOutput.OutputOneofCase.OUTPUT_ONEOF_NOT_SET:
    default:
      return '';
  }
};

/**
 * @internal
 */
const transformUpdate = (
  message: messages.WhisperFormUpdate,
): WhisperFormUpdateEvent => ({
  key: message.getKey(),
  value: transformOutput(message.getOutput()!),
  type: 'update',
});

/**
 * @internal
 */
const transformOutputMap = (
  map: jspb.Map<string, messages.WhisperFormOutput>,
): { [name: string]: WhisperFormOutputTypes } => {
  const results: { [name: string]: WhisperFormOutputTypes } = {};
  map.forEach((entry, key) => {
    results[key] = transformOutput(entry);
  });
  return results;
};

/**
 * @internal
 */
const transformResult = (
  message: messages.WhisperFormResult,
): WhisperFormSubmitEvent => ({
  submitted: message.getSubmitted(),
  outputs: transformOutputMap(message.getOutputsMap()),
  type: 'submit',
});

/**
 * @internal
 */
export const transformDisambiguationResponse: StreamTransformer<
  messages.WhisperDisambiguationStreamResponse,
  WhisperDisambiguationEvent
> = (response) => ({ key: response.getKey() });

/**
 * @internal
 */
export const transformResponse: StreamTransformer<
  messages.WhisperFormStreamResponse,
  WhisperFormSubmitEvent | WhisperFormUpdateEvent
> = (response) => {
  const update = response.getUpdate();
  const result = response.getResult();
  try {
    if (update) {
      return transformUpdate(update);
    }
    if (result) {
      return transformResult(result);
    }
    return {
      key: '',
      value: '',
      type: 'update',
    };
  } catch (e) {
    return {
      key: '',
      value: '',
      type: 'update',
    };
  }
};
