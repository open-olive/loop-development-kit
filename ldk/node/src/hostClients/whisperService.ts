import {
  StoppableMessage,
  StoppableStream,
  StreamListener,
} from './stoppables';

/**
 *
 * @example
 * ```
 * {
 *   markdown: '# Markdown\nThis is markdown',
 *   label: 'Whisper!',
 *   icon: 'bathtub',
 * }
 * ```
 */
export interface Whisper {
  /**
   * The content of the Whisper in markdown.
   */
  markdown: string;
  /**
   * The icon displayed at the top of the Whisper card.
   */
  icon: string;
  /**
   * The title displayed at the top of the Whisper card.
   */
  label: string;
}

export interface WhisperFormInput<T extends string> {
  label: string;
  tooltip: string;
  type: T;
  /**
   *  Value the UI uses to order the form inputs.
   *  Value must be greater than 0
   *  If this value is ommited it will deafult to 0
   */
  order?: number;
}

export interface WhisperFormInputWithValue<T, TType extends string>
  extends WhisperFormInput<TType> {
  value: T;
}

export type WhisperFormEmail = WhisperFormInputWithValue<string, 'email'>;

export type WhisperFormCheckbox = WhisperFormInputWithValue<
  boolean,
  'checkbox'
>;

export type WhisperFormMarkdown = WhisperFormInputWithValue<string, 'markdown'>;

export type WhisperFormNumber = WhisperFormInputWithValue<number, 'number'> & {
  min: number;
  max: number;
};

export type WhisperFormPassword = WhisperFormInput<'password'>;

export type WhisperFormRadio = WhisperFormInput<'radio'> & {
  options: string[];
};

export type WhisperFormSelect = WhisperFormInput<'select'> & {
  options: string[];
};

export type WhisperFormTelephoneNumber = WhisperFormInputWithValue<
  string,
  'telephone'
> & {
  pattern: string;
};

export type WhisperFormText = WhisperFormInputWithValue<string, 'text'>;

export type WhisperFormTime = WhisperFormInputWithValue<Date, 'date'>;

export type WhisperFormInputs =
  | WhisperFormPassword
  | WhisperFormEmail
  | WhisperFormCheckbox
  | WhisperFormMarkdown
  | WhisperFormNumber
  | WhisperFormRadio
  | WhisperFormSelect
  | WhisperFormTelephoneNumber
  | WhisperFormText
  | WhisperFormTime;

export interface WhisperConfirmConfig extends Whisper {
  rejectButton: string;

  resolveButton: string;
}

export interface WhisperFormConfig extends Whisper {
  submitButton: string;

  cancelButton: string;

  inputs: { [name: string]: WhisperFormInputs };
}

export interface WhisperListElement<T extends string> {
  type: T;
  extra: boolean;
  /**
   *  Value the UI uses to order the form inputs.
   *  Value must be greater than 0
   *  If this value is ommited it will deafult to 0
   */
  order?: number;
}

// eslint-disable-next-line no-shadow
export enum WhisperListStyle {
  NONE = 0,
  SUCCESS,
  WARN,
  ERROR,
}

// eslint-disable-next-line no-shadow
export enum WhisperListAlign {
  LEFT = 0,
  CENTER,
  RIGHT,
}

export type WhisperListPair = WhisperListElement<'pair'> & {
  copyable: boolean;
  label: string;
  style: WhisperListStyle;
  value: string;
};

export type WhisperListMessage = WhisperListElement<'message'> & {
  align: WhisperListAlign;
  body: string;
  header: string;
  style: WhisperListStyle;
};

export type WhisperListDivider = WhisperListElement<'divider'> & {
  style: WhisperListStyle;
};

export type WhisperListElements =
  | WhisperListMessage
  | WhisperListPair
  | WhisperListDivider;

export interface WhisperListConfig extends Whisper {
  elements: { [name: string]: WhisperListElements };
}

export type WhisperFormOutputTypes = string | number | boolean | Date;

export interface WhisperFormUpdateEvent {
  key: string;
  value: WhisperFormOutputTypes;
  type: 'update';
}

export interface WhisperFormSubmitEvent {
  submitted: boolean;
  outputs: { [name: string]: WhisperFormOutputTypes };
  type: 'submit';
}

/**
 * The WhisperService lets consumers emit new whispers and update existing whispers.
 */
export interface WhisperService {
  /**
   * @returns - A StoppableMessage object containing a promise resolving when the whisper has been closed. Stopping the message with {StoppableMessage.stop} will close the whisper.
   */
  markdownWhisper(whisper: Whisper): StoppableMessage<void>;
  /**
   * @returns - A StoppableMessage object containing a promise resolving with the answer when the whisper has been closed. Stopping the message with {StoppableMessage.stop} will close the whisper.
   */
  confirmWhisper(whisper: WhisperConfirmConfig): StoppableMessage<boolean>;
  /**
   * @returns - A StoppableMessage object containing a promise resolving with the answer when the whisper has been closed. Stopping the message with {StoppableMessage.stop} will close the whisper.
   */
  listWhisper(whisper: WhisperListConfig): StoppableMessage<void>;

  formWhisper(
    whisper: WhisperFormConfig,
    listener: StreamListener<WhisperFormUpdateEvent | WhisperFormSubmitEvent>,
  ): StoppableStream<WhisperFormUpdateEvent | WhisperFormSubmitEvent>;
}
