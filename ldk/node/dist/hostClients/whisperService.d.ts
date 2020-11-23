import { StoppableMessage, StoppableStream, StreamListener } from './stoppables';
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
     *  If this value is ommited it will default to 0
     */
    order?: number;
}
export interface WhisperFormInputWithValue<T, TType extends string> extends WhisperFormInput<TType> {
    value: T;
}
export declare type WhisperFormEmail = WhisperFormInputWithValue<string, 'email'>;
export declare type WhisperFormCheckbox = WhisperFormInputWithValue<boolean, 'checkbox'>;
export declare type WhisperFormMarkdown = WhisperFormInputWithValue<string, 'markdown'>;
export declare type WhisperFormNumber = WhisperFormInputWithValue<number, 'number'> & {
    min: number;
    max: number;
};
export declare type WhisperFormPassword = WhisperFormInput<'password'>;
export declare type WhisperFormRadio = WhisperFormInput<'radio'> & {
    options: string[];
};
export declare type WhisperFormSelect = WhisperFormInput<'select'> & {
    options: string[];
};
export declare type WhisperFormTelephoneNumber = WhisperFormInputWithValue<string, 'telephone'> & {
    pattern: string;
};
export declare type WhisperFormText = WhisperFormInputWithValue<string, 'text'>;
export declare type WhisperFormTime = WhisperFormInputWithValue<Date, 'date'>;
export declare type WhisperFormInputs = WhisperFormPassword | WhisperFormEmail | WhisperFormCheckbox | WhisperFormMarkdown | WhisperFormNumber | WhisperFormRadio | WhisperFormSelect | WhisperFormTelephoneNumber | WhisperFormText | WhisperFormTime;
export interface WhisperConfirmConfig extends Whisper {
    rejectButton: string;
    resolveButton: string;
}
export interface WhisperFormConfig extends Whisper {
    submitButton: string;
    cancelButton: string;
    inputs: {
        [name: string]: WhisperFormInputs;
    };
}
export interface WhisperListElement<T extends string> {
    type: T;
    /**
     *  Value the UI uses to determine if the element is shown
     *  in the condensed whisper view. Extra being false means
     *  the element will always be shown. Extra being true means
     *  the element will only show in the expanded view.
     *  If this value is ommited it will default to false.
     */
    extra?: boolean;
    /**
     *  Value the UI uses to order the form inputs.
     *  Value must be greater than 0
     *  If this value is ommited it will default to 0
     */
    order?: number;
}
export declare enum WhisperListStyle {
    NONE = 0,
    SUCCESS = 1,
    WARN = 2,
    ERROR = 3
}
export declare enum WhisperListAlign {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2
}
export declare type WhisperListPair = WhisperListElement<'pair'> & {
    /**
     *  Value the UI uses to determine if if should copy the
     *  value field to the clipboard when the user clicks it.
     *  True means that clicking will copy to clipboard.
     *  If this value is ommited it will default to false.
     */
    copyable?: boolean;
    label: string;
    /**
     *  Value the UI uses to determine how to style the element.
     *  If this value is ommited it will default to NONE.
     */
    style?: WhisperListStyle;
    value: string;
};
export declare type WhisperListMessage = WhisperListElement<'message'> & {
    align: WhisperListAlign;
    body: string;
    header: string;
    /**
     *  Value the UI uses to determine how to style the element.
     *  If this value is ommited it will default to NONE.
     */
    style?: WhisperListStyle;
};
export declare type WhisperListDivider = WhisperListElement<'divider'> & {
    /**
     *  Value the UI uses to determine how to style the element.
     *  If this value is ommited it will default to NONE.
     */
    style?: WhisperListStyle;
};
export declare type WhisperListElements = WhisperListMessage | WhisperListPair | WhisperListDivider;
export interface WhisperListConfig extends Whisper {
    elements: {
        [name: string]: WhisperListElements;
    };
}
export declare type WhisperFormOutputTypes = string | number | boolean | Date;
export interface WhisperFormUpdateEvent {
    key: string;
    value: WhisperFormOutputTypes;
    type: 'update';
}
export interface WhisperFormSubmitEvent {
    submitted: boolean;
    outputs: {
        [name: string]: WhisperFormOutputTypes;
    };
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
    formWhisper(whisper: WhisperFormConfig, listener: StreamListener<WhisperFormUpdateEvent | WhisperFormSubmitEvent>): StoppableStream<WhisperFormUpdateEvent | WhisperFormSubmitEvent>;
}
