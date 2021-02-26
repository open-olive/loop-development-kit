import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import {
  Whisper,
  WhisperConfirmConfig,
  WhisperDisambiguationConfig,
  WhisperDisambiguationElements,
  WhisperFormConfig,
  WhisperFormInput,
  WhisperFormInputs,
  WhisperListAlign,
  WhisperListConfig,
  WhisperListElement,
  WhisperListElements,
  WhisperListStyle,
} from './whisperService';
import * as messages from '../grpc/whisper_pb';

type FormMessage<T> = {
  setLabel(value: string): T;
  setTooltip(value: string): T;
  setOrder(value: number): T;
};

/**
 * @internal
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

/**
 * @internal
 * @param input - Whisper input to build
 */
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
 * @internal
 * @param msg - The message.
 * @param input - The whisper list element.
 */
function setListMessages<T>(
  msg: ListMessage<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: WhisperListElement<any>,
): void {
  if (input.extra) {
    msg.setExtra(input.extra);
  }
  if (input.order && input.order > 0) {
    msg.setOrder(input.order);
  }
}

/**
 * @param style
 * @internal
 */
export const generateWhisperListStyle = (
  style: WhisperListStyle,
): messages.WhisperListElement.Style => {
  switch (style) {
    case WhisperListStyle.NONE: {
      return messages.WhisperListElement.Style.STYLE_NONE;
    }
    case WhisperListStyle.SUCCESS: {
      return messages.WhisperListElement.Style.STYLE_SUCCESS;
    }
    case WhisperListStyle.WARN: {
      return messages.WhisperListElement.Style.STYLE_WARN;
    }
    case WhisperListStyle.ERROR: {
      return messages.WhisperListElement.Style.STYLE_ERROR;
    }
    default: {
      return messages.WhisperListElement.Style.STYLE_NONE;
    }
  }
};

/**
 * @param align
 * @internal
 */
export const generateWhisperListAlign = (
  align: WhisperListAlign,
): messages.WhisperListElement.Align => {
  switch (align) {
    case WhisperListAlign.LEFT: {
      return messages.WhisperListElement.Align.ALIGN_LEFT;
    }
    case WhisperListAlign.CENTER: {
      return messages.WhisperListElement.Align.ALIGN_CENTER;
    }
    case WhisperListAlign.RIGHT: {
      return messages.WhisperListElement.Align.ALIGN_RIGHT;
    }
    default: {
      return messages.WhisperListElement.Align.ALIGN_LEFT;
    }
  }
};

/**
 * @internal
 * @param element - element to build
 */
export const generateWhisperListElement = (
  element: WhisperListElements,
): messages.WhisperListElement => {
  const WLE = messages.WhisperListElement;
  const msg = new WLE();
  switch (element.type) {
    case 'pair': {
      const inputMsg = new WLE.Pair();
      if (element.copyable) {
        inputMsg.setCopyable(element.copyable);
      }
      inputMsg.setLabel(element.label);
      if (element.style) {
        inputMsg.setStyle(generateWhisperListStyle(element.style));
      } else {
        inputMsg.setStyle(generateWhisperListStyle(WhisperListStyle.NONE));
      }
      inputMsg.setValue(element.value);
      msg.setPair(inputMsg);
      break;
    }
    case 'message': {
      const inputMsg = new WLE.Message();
      if (element.align) {
        inputMsg.setAlign(generateWhisperListAlign(element.align));
      } else {
        inputMsg.setAlign(generateWhisperListAlign(WhisperListAlign.LEFT));
      }
      if (element.body) {
        inputMsg.setBody(element.body);
      }
      if (element.header) {
        inputMsg.setBody(element.header);
      }
      if (element.style) {
        inputMsg.setStyle(generateWhisperListStyle(element.style));
      } else {
        inputMsg.setStyle(generateWhisperListStyle(WhisperListStyle.NONE));
      }
      msg.setMessage(inputMsg);
      break;
    }
    case 'divider': {
      const inputMsg = new WLE.Divider();
      if (element.style) {
        inputMsg.setStyle(generateWhisperListStyle(element.style));
      } else {
        inputMsg.setStyle(generateWhisperListStyle(WhisperListStyle.NONE));
      }
      msg.setDivider(inputMsg);
      break;
    }
    case 'link': {
      const inputMsg = new WLE.Link();
      if (element.align) {
        inputMsg.setAlign(generateWhisperListAlign(element.align));
      } else {
        inputMsg.setAlign(generateWhisperListAlign(WhisperListAlign.LEFT));
      }
      if (element.href) {
        inputMsg.setHref(element.href);
      }
      if (element.style) {
        inputMsg.setStyle(generateWhisperListStyle(element.style));
      } else {
        inputMsg.setStyle(generateWhisperListStyle(WhisperListStyle.NONE));
      }
      if (element.text) {
        inputMsg.setText(element.text);
      }
      msg.setLink(inputMsg);
      break;
    }
    default: {
      throw new Error('Unexpected Input Type');
    }
  }
  setListMessages(msg, element);
  return msg;
};

/**
 * @param element
 * @internal
 */
export const generateWhisperDisambiguationElement = (
  element: WhisperDisambiguationElements,
): messages.WhisperDisambiguationElement => {
  const WDE = messages.WhisperDisambiguationElement;
  const msg = new WDE();
  switch (element.type) {
    case 'option': {
      const inputMsg = new WDE.Option();
      if (element.label) {
        inputMsg.setLabel(element.label);
      }
      msg.setOption(inputMsg);
      break;
    }
    case 'text': {
      const inputMsg = new WDE.Text();
      if (element.body) {
        inputMsg.setBody(element.body);
      }
      msg.setText(inputMsg);
      break;
    }
    default: {
      throw new Error('Unexpected Input Type');
    }
  }
  if (element.order && element.order > 0) {
    msg.setOrder(element.order);
  }
  return msg;
};

/**
 * @internal
 * @param whisper - whisper to build
 */
export const generateWhisperMeta = (whisper: Whisper): messages.WhisperMeta => {
  const whisperMsg = new messages.WhisperMeta();
  whisperMsg.setLabel(whisper.label);
  return whisperMsg;
};

/**
 * @internal
 * @param config - whisper to build
 */
export const generateWhisperDisambiguation = (
  config: WhisperDisambiguationConfig,
): messages.WhisperDisambiguationRequest => {
  const meta = generateWhisperMeta(config);
  const request = new messages.WhisperDisambiguationRequest().setMeta(meta);
  request.setMarkdown(config.markdown);
  const elements = request.getElementsMap();
  Object.keys(config.elements).forEach((key) => {
    const value = config.elements[key];
    const input = generateWhisperDisambiguationElement(value);
    elements.set(key, input);
  });
  return request;
};

/**
 * @internal
 * @param config - whisper to build
 */
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
/**
 * @internal
 * @param whisper - whisper to build
 */
export const buildWhisperMarkdownRequest = (
  whisper: Whisper,
): messages.WhisperMarkdownRequest => {
  const meta = generateWhisperMeta(whisper);
  const result = new messages.WhisperMarkdownRequest().setMeta(meta);
  result.setMarkdown(whisper.markdown);
  return result;
};
/**
 * @internal
 * @param config - whisper to build
 */
export const buildWhisperListRequest = (
  config: WhisperListConfig,
): messages.WhisperListRequest => {
  const meta = generateWhisperMeta(config);
  const request = new messages.WhisperListRequest().setMeta(meta);
  request.setMarkdown(config.markdown);
  const elements = request.getElementsMap();
  Object.keys(config.elements).forEach((key) => {
    const value = config.elements[key];
    const input = generateWhisperListElement(value);
    elements.set(key, input);
  });
  return request;
};

/**
 * @internal
 * @param config - whisper to build
 */
export const buildWhisperConfirmMessage = (
  config: WhisperConfirmConfig,
): messages.WhisperConfirmRequest => {
  const msg = new messages.WhisperConfirmRequest();
  const meta = generateWhisperMeta(config);
  msg.setRejectlabel(config.rejectButton);
  msg.setResolvelabel(config.resolveButton);
  msg.setMarkdown(config.markdown);
  msg.setMeta(meta);
  return msg;
};
