import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import {
  Whisper,
  WhisperConfirmConfig,
  WhisperFormConfig,
  WhisperFormInput,
  WhisperFormInputs,
  WhisperListAlertHighlight,
  WhisperListConfig,
  WhisperListElement,
  WhisperListElements,
  WhisperListPairHighlight,
} from './whisperService';
import * as messages from '../grpc/whisper_pb';

type FormMessage<T> = {
  setLabel(value: string): T;
  setTooltip(value: string): T;
  setOrder(value: number): T;
};

/**
 * @param msg - The message.
 * @param input - The whisper form input.
 */
function setFormMessages<T>(
  msg: FormMessage<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: WhisperFormInput<any>,
): void {
  msg.setLabel(input.label);
  msg.setTooltip(input.tooltip);
  if (input.order && input.order > 0) {
    msg.setOrder(input.order);
  }
}

export const generateWhisperInput = (
  input: WhisperFormInputs,
): messages.WhisperFormInput => {
  const WFI = messages.WhisperFormInput;
  const msg = new WFI();
  let inputMsg;
  switch (input.type) {
    case 'password': {
      inputMsg = new WFI.Password();
      msg.setPassword(inputMsg);
      break;
    }
    case 'email': {
      inputMsg = new WFI.Email();
      inputMsg.setValue(input.value);
      msg.setEmail(inputMsg);
      break;
    }
    case 'checkbox': {
      inputMsg = new WFI.Checkbox();
      inputMsg.setValue(input.value);
      msg.setCheckbox(inputMsg);
      break;
    }
    case 'markdown': {
      inputMsg = new WFI.Markdown();
      inputMsg.setValue(input.value);
      msg.setMarkdown(inputMsg);
      break;
    }
    case 'number': {
      inputMsg = new WFI.Number();
      inputMsg.setValue(input.value);
      inputMsg.setMax(input.max);
      inputMsg.setMin(input.min);
      msg.setNumber(inputMsg);
      break;
    }
    case 'radio': {
      inputMsg = new WFI.Radio();
      inputMsg.setOptionsList(input.options);
      msg.setRadio(inputMsg);
      break;
    }
    case 'select': {
      inputMsg = new WFI.Select();
      inputMsg.setOptionsList(input.options);
      msg.setSelect(inputMsg);
      break;
    }
    case 'telephone': {
      inputMsg = new WFI.Tel();
      inputMsg.setValue(input.value);
      msg.setTel(inputMsg);
      break;
    }
    case 'text': {
      inputMsg = new WFI.Text();
      inputMsg.setValue(input.value);
      msg.setText(inputMsg);
      break;
    }
    case 'date': {
      const date = new Timestamp();
      date.fromDate(input.value);
      inputMsg = new WFI.Time();
      inputMsg.setValue(date);
      msg.setTime(inputMsg);
      break;
    }
    default: {
      throw new Error('Unexpected Input Type');
    }
  }
  setFormMessages(inputMsg, input);
  return msg;
};

type ListMessage<T> = {
  setExtra(value: boolean): T;
  setOrder(value: number): T;
};

/**
 * @param msg - The message.
 * @param input - The whisper list element.
 */
function setListMessages<T>(
  msg: ListMessage<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: WhisperListElement<any>,
): void {
  msg.setExtra(input.extra);
  if (input.order && input.order > 0) {
    msg.setOrder(input.order);
  }
}

export const generateWhisperListElementPairHighlight = (
  highlight: WhisperListPairHighlight,
): messages.WhisperListElement.Pair.Highlight => {
  switch (highlight) {
    case WhisperListPairHighlight.NONE: {
      return messages.WhisperListElement.Pair.Highlight.NONE
    }
    case WhisperListPairHighlight.YELLOW: {
      return messages.WhisperListElement.Pair.Highlight.YELLOW
    }
    default: {
      throw new Error('Unexpected Input Type');
    }
  }
}

export const generateWhisperListElementAlertHighlight = (
  highlight: WhisperListAlertHighlight,
): messages.WhisperListElement.Alert.Highlight => {
  switch (highlight) {
    case WhisperListAlertHighlight.NONE: {
      return messages.WhisperListElement.Alert.Highlight.NONE
    }
    case WhisperListAlertHighlight.GREEN: {
      return messages.WhisperListElement.Alert.Highlight.GREEN
    }
    case WhisperListAlertHighlight.RED: {
      return messages.WhisperListElement.Alert.Highlight.RED
    }
    default: {
      throw new Error('Unexpected Input Type');
    }
  }
}

export const generateWhisperListElement = (
  element: WhisperListElements,
): messages.WhisperListElement => {
  const WLE = messages.WhisperListElement;
  const msg = new WLE();
  switch (element.type) {
    case 'pair': {
      const inputMsg = new WLE.Pair();
      inputMsg.setCopyable(element.copyable);
      inputMsg.setHighlight(generateWhisperListElementPairHighlight(element.highlight));
      inputMsg.setKey(element.key);
      inputMsg.setValue(element.value);
      msg.setPair(inputMsg);
      break;
    }
    case 'alert': {
      const inputMsg = new WLE.Alert();
      inputMsg.setBody(element.body);
      inputMsg.setHighlight(generateWhisperListElementAlertHighlight(element.highlight));
      msg.setAlert(inputMsg);
      break;
    }
    default: {
      throw new Error('Unexpected Input Type');
    }
  }
  setListMessages(msg, element);
  return msg;
};

export const generateWhisperMeta = (whisper: Whisper): messages.WhisperMeta => {
  const whisperMsg = new messages.WhisperMeta();
  whisperMsg.setLabel(whisper.label);
  whisperMsg.setIcon(whisper.icon);
  return whisperMsg;
};
export const generateWhisperForm = (
  config: WhisperFormConfig,
): messages.WhisperFormRequest => {
  const msg = new messages.WhisperFormRequest();
  msg.setMeta(generateWhisperMeta(config));
  msg.setMarkdown(config.markdown);
  msg.setCancellabel(config.cancelButton);
  msg.setSubmitlabel(config.submitButton);
  const map = msg.getInputsMap();
  Object.keys(config.inputs).forEach((key) => {
    const value = config.inputs[key];
    const input = generateWhisperInput(value);
    map.set(key, input);
  });
  return msg;
};
export const buildWhisperMarkdownRequest = (
  whisper: Whisper,
): messages.WhisperMarkdownRequest => {
  const meta = generateWhisperMeta(whisper);
  const result = new messages.WhisperMarkdownRequest().setMeta(meta);
  result.setMarkdown(whisper.markdown);
  return result;
};
export const buildWhisperListRequest = (
  config: WhisperListConfig,
): messages.WhisperListRequest => {
  const meta = generateWhisperMeta(config);
  const request = new messages.WhisperListRequest().setMeta(meta);
  const elements = request.getElementsMap();
  Object.keys(config.elements).forEach((key) => {
    const value = config.elements[key];
    const input = generateWhisperListElement(value);
    elements.set(key, input);
  });
  return request;
};
export const buildWhisperConfirmMessage = (
  whisper: WhisperConfirmConfig,
): messages.WhisperConfirmRequest => {
  const msg = new messages.WhisperConfirmRequest();
  msg.setRejectlabel(whisper.rejectButton);
  msg.setResolvelabel(whisper.resolveButton);
  msg.setMarkdown(whisper.markdown);
  msg.setMeta();
  return msg;
};
