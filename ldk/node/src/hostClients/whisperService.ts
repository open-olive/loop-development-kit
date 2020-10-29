/**
 * Style configuration for the whisper.
 *
 * ```
 * {
 *   backgroundColor: '#fff',
 *   highlightColor: '#651fff',
 *   primaryColor: '#666',
 * }
 * ```
 */
import { StoppableStream, StreamListener } from './stoppableStream';

export interface WhisperStyle {
  /**
   * The background color of the Whisper card as a RGB hex color code.
   */
  backgroundColor: string;
  /**
   * The color of important text in the Whisper card as a RGB hex color code.
   */
  highlightColor: string;
  /**
   * The color of normal text in the Whisper card as a RGB hex color code.
   */
  primaryColor: string;
}

/**
 *
 * @example
 * ```
 * {
 *   markdown: '# Markdown\nThis is markdown',
 *   label: 'Whisper!',
 *   icon: 'bathtub',
 *   style: {
 *     backgroundColor: '#fff',
 *     highlightColor: '#651fff',
 *     primaryColor: '#666',
 *   },
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
  /**
   * An object for specifying the styling of the Whisper card.
   */
  style?: WhisperStyle;
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
   * @returns - Promise resolving with the unique ID of the generated whisper.
   */
  markdownWhisper(whisper: Whisper): Promise<void>;

  confirmWhisper(whisper: WhisperConfirmConfig): Promise<boolean>;

  formWhisper(
    whisper: WhisperFormConfig,
    listener: StreamListener<WhisperFormUpdateEvent | WhisperFormSubmitEvent>,
  ): StoppableStream<WhisperFormUpdateEvent | WhisperFormSubmitEvent>;
}
