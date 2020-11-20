// package: proto
// file: whisper.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as session_pb from "./session_pb";

export class WhisperMeta extends jspb.Message { 
    getLabel(): string;
    setLabel(value: string): WhisperMeta;

    getIcon(): string;
    setIcon(value: string): WhisperMeta;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperMeta.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperMeta): WhisperMeta.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperMeta, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperMeta;
    static deserializeBinaryFromReader(message: WhisperMeta, reader: jspb.BinaryReader): WhisperMeta;
}

export namespace WhisperMeta {
    export type AsObject = {
        label: string,
        icon: string,
    }
}

export class WhisperMarkdownRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): WhisperMarkdownRequest;


    hasMeta(): boolean;
    clearMeta(): void;
    getMeta(): WhisperMeta | undefined;
    setMeta(value?: WhisperMeta): WhisperMarkdownRequest;

    getMarkdown(): string;
    setMarkdown(value: string): WhisperMarkdownRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperMarkdownRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperMarkdownRequest): WhisperMarkdownRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperMarkdownRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperMarkdownRequest;
    static deserializeBinaryFromReader(message: WhisperMarkdownRequest, reader: jspb.BinaryReader): WhisperMarkdownRequest;
}

export namespace WhisperMarkdownRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        meta?: WhisperMeta.AsObject,
        markdown: string,
    }
}

export class WhisperConfirmRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): WhisperConfirmRequest;


    hasMeta(): boolean;
    clearMeta(): void;
    getMeta(): WhisperMeta | undefined;
    setMeta(value?: WhisperMeta): WhisperConfirmRequest;

    getMarkdown(): string;
    setMarkdown(value: string): WhisperConfirmRequest;

    getRejectlabel(): string;
    setRejectlabel(value: string): WhisperConfirmRequest;

    getResolvelabel(): string;
    setResolvelabel(value: string): WhisperConfirmRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperConfirmRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperConfirmRequest): WhisperConfirmRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperConfirmRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperConfirmRequest;
    static deserializeBinaryFromReader(message: WhisperConfirmRequest, reader: jspb.BinaryReader): WhisperConfirmRequest;
}

export namespace WhisperConfirmRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        meta?: WhisperMeta.AsObject,
        markdown: string,
        rejectlabel: string,
        resolvelabel: string,
    }
}

export class WhisperConfirmResponse extends jspb.Message { 
    getResponse(): boolean;
    setResponse(value: boolean): WhisperConfirmResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperConfirmResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperConfirmResponse): WhisperConfirmResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperConfirmResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperConfirmResponse;
    static deserializeBinaryFromReader(message: WhisperConfirmResponse, reader: jspb.BinaryReader): WhisperConfirmResponse;
}

export namespace WhisperConfirmResponse {
    export type AsObject = {
        response: boolean,
    }
}

export class WhisperFormRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): WhisperFormRequest;


    hasMeta(): boolean;
    clearMeta(): void;
    getMeta(): WhisperMeta | undefined;
    setMeta(value?: WhisperMeta): WhisperFormRequest;

    getMarkdown(): string;
    setMarkdown(value: string): WhisperFormRequest;

    getSubmitlabel(): string;
    setSubmitlabel(value: string): WhisperFormRequest;

    getCancellabel(): string;
    setCancellabel(value: string): WhisperFormRequest;


    getInputsMap(): jspb.Map<string, WhisperFormInput>;
    clearInputsMap(): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperFormRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperFormRequest): WhisperFormRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperFormRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperFormRequest;
    static deserializeBinaryFromReader(message: WhisperFormRequest, reader: jspb.BinaryReader): WhisperFormRequest;
}

export namespace WhisperFormRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        meta?: WhisperMeta.AsObject,
        markdown: string,
        submitlabel: string,
        cancellabel: string,

        inputsMap: Array<[string, WhisperFormInput.AsObject]>,
    }
}

export class WhisperFormInput extends jspb.Message { 

    hasCheckbox(): boolean;
    clearCheckbox(): void;
    getCheckbox(): WhisperFormInput.Checkbox | undefined;
    setCheckbox(value?: WhisperFormInput.Checkbox): WhisperFormInput;


    hasEmail(): boolean;
    clearEmail(): void;
    getEmail(): WhisperFormInput.Email | undefined;
    setEmail(value?: WhisperFormInput.Email): WhisperFormInput;


    hasMarkdown(): boolean;
    clearMarkdown(): void;
    getMarkdown(): WhisperFormInput.Markdown | undefined;
    setMarkdown(value?: WhisperFormInput.Markdown): WhisperFormInput;


    hasNumber(): boolean;
    clearNumber(): void;
    getNumber(): WhisperFormInput.Number | undefined;
    setNumber(value?: WhisperFormInput.Number): WhisperFormInput;


    hasPassword(): boolean;
    clearPassword(): void;
    getPassword(): WhisperFormInput.Password | undefined;
    setPassword(value?: WhisperFormInput.Password): WhisperFormInput;


    hasRadio(): boolean;
    clearRadio(): void;
    getRadio(): WhisperFormInput.Radio | undefined;
    setRadio(value?: WhisperFormInput.Radio): WhisperFormInput;


    hasSelect(): boolean;
    clearSelect(): void;
    getSelect(): WhisperFormInput.Select | undefined;
    setSelect(value?: WhisperFormInput.Select): WhisperFormInput;


    hasTel(): boolean;
    clearTel(): void;
    getTel(): WhisperFormInput.Tel | undefined;
    setTel(value?: WhisperFormInput.Tel): WhisperFormInput;


    hasText(): boolean;
    clearText(): void;
    getText(): WhisperFormInput.Text | undefined;
    setText(value?: WhisperFormInput.Text): WhisperFormInput;


    hasTime(): boolean;
    clearTime(): void;
    getTime(): WhisperFormInput.Time | undefined;
    setTime(value?: WhisperFormInput.Time): WhisperFormInput;


    getInputOneofCase(): WhisperFormInput.InputOneofCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperFormInput.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperFormInput): WhisperFormInput.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperFormInput, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperFormInput;
    static deserializeBinaryFromReader(message: WhisperFormInput, reader: jspb.BinaryReader): WhisperFormInput;
}

export namespace WhisperFormInput {
    export type AsObject = {
        checkbox?: WhisperFormInput.Checkbox.AsObject,
        email?: WhisperFormInput.Email.AsObject,
        markdown?: WhisperFormInput.Markdown.AsObject,
        number?: WhisperFormInput.Number.AsObject,
        password?: WhisperFormInput.Password.AsObject,
        radio?: WhisperFormInput.Radio.AsObject,
        select?: WhisperFormInput.Select.AsObject,
        tel?: WhisperFormInput.Tel.AsObject,
        text?: WhisperFormInput.Text.AsObject,
        time?: WhisperFormInput.Time.AsObject,
    }


    export class Checkbox extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Checkbox;

        getTooltip(): string;
        setTooltip(value: string): Checkbox;

        getValue(): boolean;
        setValue(value: boolean): Checkbox;

        getOrder(): number;
        setOrder(value: number): Checkbox;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Checkbox.AsObject;
        static toObject(includeInstance: boolean, msg: Checkbox): Checkbox.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Checkbox, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Checkbox;
        static deserializeBinaryFromReader(message: Checkbox, reader: jspb.BinaryReader): Checkbox;
    }

    export namespace Checkbox {
        export type AsObject = {
            label: string,
            tooltip: string,
            value: boolean,
            order: number,
        }
    }

    export class Email extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Email;

        getTooltip(): string;
        setTooltip(value: string): Email;

        getValue(): string;
        setValue(value: string): Email;

        getOrder(): number;
        setOrder(value: number): Email;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Email.AsObject;
        static toObject(includeInstance: boolean, msg: Email): Email.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Email, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Email;
        static deserializeBinaryFromReader(message: Email, reader: jspb.BinaryReader): Email;
    }

    export namespace Email {
        export type AsObject = {
            label: string,
            tooltip: string,
            value: string,
            order: number,
        }
    }

    export class Markdown extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Markdown;

        getTooltip(): string;
        setTooltip(value: string): Markdown;

        getValue(): string;
        setValue(value: string): Markdown;

        getOrder(): number;
        setOrder(value: number): Markdown;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Markdown.AsObject;
        static toObject(includeInstance: boolean, msg: Markdown): Markdown.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Markdown, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Markdown;
        static deserializeBinaryFromReader(message: Markdown, reader: jspb.BinaryReader): Markdown;
    }

    export namespace Markdown {
        export type AsObject = {
            label: string,
            tooltip: string,
            value: string,
            order: number,
        }
    }

    export class Number extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Number;

        getTooltip(): string;
        setTooltip(value: string): Number;

        getValue(): number;
        setValue(value: number): Number;

        getMin(): number;
        setMin(value: number): Number;

        getMax(): number;
        setMax(value: number): Number;

        getOrder(): number;
        setOrder(value: number): Number;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Number.AsObject;
        static toObject(includeInstance: boolean, msg: Number): Number.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Number, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Number;
        static deserializeBinaryFromReader(message: Number, reader: jspb.BinaryReader): Number;
    }

    export namespace Number {
        export type AsObject = {
            label: string,
            tooltip: string,
            value: number,
            min: number,
            max: number,
            order: number,
        }
    }

    export class Password extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Password;

        getTooltip(): string;
        setTooltip(value: string): Password;

        getOrder(): number;
        setOrder(value: number): Password;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Password.AsObject;
        static toObject(includeInstance: boolean, msg: Password): Password.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Password, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Password;
        static deserializeBinaryFromReader(message: Password, reader: jspb.BinaryReader): Password;
    }

    export namespace Password {
        export type AsObject = {
            label: string,
            tooltip: string,
            order: number,
        }
    }

    export class Radio extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Radio;

        getTooltip(): string;
        setTooltip(value: string): Radio;

        clearOptionsList(): void;
        getOptionsList(): Array<string>;
        setOptionsList(value: Array<string>): Radio;
        addOptions(value: string, index?: number): string;

        getOrder(): number;
        setOrder(value: number): Radio;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Radio.AsObject;
        static toObject(includeInstance: boolean, msg: Radio): Radio.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Radio, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Radio;
        static deserializeBinaryFromReader(message: Radio, reader: jspb.BinaryReader): Radio;
    }

    export namespace Radio {
        export type AsObject = {
            label: string,
            tooltip: string,
            optionsList: Array<string>,
            order: number,
        }
    }

    export class Select extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Select;

        getTooltip(): string;
        setTooltip(value: string): Select;

        clearOptionsList(): void;
        getOptionsList(): Array<string>;
        setOptionsList(value: Array<string>): Select;
        addOptions(value: string, index?: number): string;

        getOrder(): number;
        setOrder(value: number): Select;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Select.AsObject;
        static toObject(includeInstance: boolean, msg: Select): Select.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Select, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Select;
        static deserializeBinaryFromReader(message: Select, reader: jspb.BinaryReader): Select;
    }

    export namespace Select {
        export type AsObject = {
            label: string,
            tooltip: string,
            optionsList: Array<string>,
            order: number,
        }
    }

    export class Tel extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Tel;

        getTooltip(): string;
        setTooltip(value: string): Tel;

        getValue(): string;
        setValue(value: string): Tel;

        getPattern(): string;
        setPattern(value: string): Tel;

        getOrder(): number;
        setOrder(value: number): Tel;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Tel.AsObject;
        static toObject(includeInstance: boolean, msg: Tel): Tel.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Tel, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Tel;
        static deserializeBinaryFromReader(message: Tel, reader: jspb.BinaryReader): Tel;
    }

    export namespace Tel {
        export type AsObject = {
            label: string,
            tooltip: string,
            value: string,
            pattern: string,
            order: number,
        }
    }

    export class Text extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Text;

        getTooltip(): string;
        setTooltip(value: string): Text;

        getValue(): string;
        setValue(value: string): Text;

        getOrder(): number;
        setOrder(value: number): Text;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Text.AsObject;
        static toObject(includeInstance: boolean, msg: Text): Text.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Text, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Text;
        static deserializeBinaryFromReader(message: Text, reader: jspb.BinaryReader): Text;
    }

    export namespace Text {
        export type AsObject = {
            label: string,
            tooltip: string,
            value: string,
            order: number,
        }
    }

    export class Time extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Time;

        getTooltip(): string;
        setTooltip(value: string): Time;


        hasValue(): boolean;
        clearValue(): void;
        getValue(): google_protobuf_timestamp_pb.Timestamp | undefined;
        setValue(value?: google_protobuf_timestamp_pb.Timestamp): Time;

        getOrder(): number;
        setOrder(value: number): Time;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Time.AsObject;
        static toObject(includeInstance: boolean, msg: Time): Time.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Time, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Time;
        static deserializeBinaryFromReader(message: Time, reader: jspb.BinaryReader): Time;
    }

    export namespace Time {
        export type AsObject = {
            label: string,
            tooltip: string,
            value?: google_protobuf_timestamp_pb.Timestamp.AsObject,
            order: number,
        }
    }


    export enum InputOneofCase {
        INPUTONEOF_NOT_SET = 0,
    
    CHECKBOX = 1,

    EMAIL = 2,

    MARKDOWN = 3,

    NUMBER = 4,

    PASSWORD = 5,

    RADIO = 6,

    SELECT = 7,

    TEL = 8,

    TEXT = 9,

    TIME = 10,

    }

}

export class WhisperFormOutput extends jspb.Message { 

    hasCheckbox(): boolean;
    clearCheckbox(): void;
    getCheckbox(): WhisperFormOutput.Checkbox | undefined;
    setCheckbox(value?: WhisperFormOutput.Checkbox): WhisperFormOutput;


    hasEmail(): boolean;
    clearEmail(): void;
    getEmail(): WhisperFormOutput.Email | undefined;
    setEmail(value?: WhisperFormOutput.Email): WhisperFormOutput;


    hasMarkdown(): boolean;
    clearMarkdown(): void;
    getMarkdown(): WhisperFormOutput.Markdown | undefined;
    setMarkdown(value?: WhisperFormOutput.Markdown): WhisperFormOutput;


    hasNumber(): boolean;
    clearNumber(): void;
    getNumber(): WhisperFormOutput.Number | undefined;
    setNumber(value?: WhisperFormOutput.Number): WhisperFormOutput;


    hasPassword(): boolean;
    clearPassword(): void;
    getPassword(): WhisperFormOutput.Password | undefined;
    setPassword(value?: WhisperFormOutput.Password): WhisperFormOutput;


    hasRadio(): boolean;
    clearRadio(): void;
    getRadio(): WhisperFormOutput.Radio | undefined;
    setRadio(value?: WhisperFormOutput.Radio): WhisperFormOutput;


    hasSelect(): boolean;
    clearSelect(): void;
    getSelect(): WhisperFormOutput.Select | undefined;
    setSelect(value?: WhisperFormOutput.Select): WhisperFormOutput;


    hasTel(): boolean;
    clearTel(): void;
    getTel(): WhisperFormOutput.Tel | undefined;
    setTel(value?: WhisperFormOutput.Tel): WhisperFormOutput;


    hasText(): boolean;
    clearText(): void;
    getText(): WhisperFormOutput.Text | undefined;
    setText(value?: WhisperFormOutput.Text): WhisperFormOutput;


    hasTime(): boolean;
    clearTime(): void;
    getTime(): WhisperFormOutput.Time | undefined;
    setTime(value?: WhisperFormOutput.Time): WhisperFormOutput;


    getOutputOneofCase(): WhisperFormOutput.OutputOneofCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperFormOutput.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperFormOutput): WhisperFormOutput.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperFormOutput, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperFormOutput;
    static deserializeBinaryFromReader(message: WhisperFormOutput, reader: jspb.BinaryReader): WhisperFormOutput;
}

export namespace WhisperFormOutput {
    export type AsObject = {
        checkbox?: WhisperFormOutput.Checkbox.AsObject,
        email?: WhisperFormOutput.Email.AsObject,
        markdown?: WhisperFormOutput.Markdown.AsObject,
        number?: WhisperFormOutput.Number.AsObject,
        password?: WhisperFormOutput.Password.AsObject,
        radio?: WhisperFormOutput.Radio.AsObject,
        select?: WhisperFormOutput.Select.AsObject,
        tel?: WhisperFormOutput.Tel.AsObject,
        text?: WhisperFormOutput.Text.AsObject,
        time?: WhisperFormOutput.Time.AsObject,
    }


    export class Checkbox extends jspb.Message { 
        getValue(): boolean;
        setValue(value: boolean): Checkbox;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Checkbox.AsObject;
        static toObject(includeInstance: boolean, msg: Checkbox): Checkbox.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Checkbox, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Checkbox;
        static deserializeBinaryFromReader(message: Checkbox, reader: jspb.BinaryReader): Checkbox;
    }

    export namespace Checkbox {
        export type AsObject = {
            value: boolean,
        }
    }

    export class Email extends jspb.Message { 
        getValue(): string;
        setValue(value: string): Email;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Email.AsObject;
        static toObject(includeInstance: boolean, msg: Email): Email.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Email, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Email;
        static deserializeBinaryFromReader(message: Email, reader: jspb.BinaryReader): Email;
    }

    export namespace Email {
        export type AsObject = {
            value: string,
        }
    }

    export class Markdown extends jspb.Message { 
        getValue(): string;
        setValue(value: string): Markdown;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Markdown.AsObject;
        static toObject(includeInstance: boolean, msg: Markdown): Markdown.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Markdown, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Markdown;
        static deserializeBinaryFromReader(message: Markdown, reader: jspb.BinaryReader): Markdown;
    }

    export namespace Markdown {
        export type AsObject = {
            value: string,
        }
    }

    export class Number extends jspb.Message { 
        getValue(): number;
        setValue(value: number): Number;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Number.AsObject;
        static toObject(includeInstance: boolean, msg: Number): Number.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Number, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Number;
        static deserializeBinaryFromReader(message: Number, reader: jspb.BinaryReader): Number;
    }

    export namespace Number {
        export type AsObject = {
            value: number,
        }
    }

    export class Password extends jspb.Message { 
        getValue(): string;
        setValue(value: string): Password;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Password.AsObject;
        static toObject(includeInstance: boolean, msg: Password): Password.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Password, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Password;
        static deserializeBinaryFromReader(message: Password, reader: jspb.BinaryReader): Password;
    }

    export namespace Password {
        export type AsObject = {
            value: string,
        }
    }

    export class Radio extends jspb.Message { 
        getValue(): string;
        setValue(value: string): Radio;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Radio.AsObject;
        static toObject(includeInstance: boolean, msg: Radio): Radio.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Radio, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Radio;
        static deserializeBinaryFromReader(message: Radio, reader: jspb.BinaryReader): Radio;
    }

    export namespace Radio {
        export type AsObject = {
            value: string,
        }
    }

    export class Select extends jspb.Message { 
        getValue(): string;
        setValue(value: string): Select;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Select.AsObject;
        static toObject(includeInstance: boolean, msg: Select): Select.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Select, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Select;
        static deserializeBinaryFromReader(message: Select, reader: jspb.BinaryReader): Select;
    }

    export namespace Select {
        export type AsObject = {
            value: string,
        }
    }

    export class Tel extends jspb.Message { 
        getValue(): string;
        setValue(value: string): Tel;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Tel.AsObject;
        static toObject(includeInstance: boolean, msg: Tel): Tel.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Tel, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Tel;
        static deserializeBinaryFromReader(message: Tel, reader: jspb.BinaryReader): Tel;
    }

    export namespace Tel {
        export type AsObject = {
            value: string,
        }
    }

    export class Text extends jspb.Message { 
        getValue(): string;
        setValue(value: string): Text;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Text.AsObject;
        static toObject(includeInstance: boolean, msg: Text): Text.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Text, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Text;
        static deserializeBinaryFromReader(message: Text, reader: jspb.BinaryReader): Text;
    }

    export namespace Text {
        export type AsObject = {
            value: string,
        }
    }

    export class Time extends jspb.Message { 

        hasValue(): boolean;
        clearValue(): void;
        getValue(): google_protobuf_timestamp_pb.Timestamp | undefined;
        setValue(value?: google_protobuf_timestamp_pb.Timestamp): Time;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Time.AsObject;
        static toObject(includeInstance: boolean, msg: Time): Time.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Time, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Time;
        static deserializeBinaryFromReader(message: Time, reader: jspb.BinaryReader): Time;
    }

    export namespace Time {
        export type AsObject = {
            value?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        }
    }


    export enum OutputOneofCase {
        OUTPUTONEOF_NOT_SET = 0,
    
    CHECKBOX = 1,

    EMAIL = 2,

    MARKDOWN = 3,

    NUMBER = 4,

    PASSWORD = 5,

    RADIO = 6,

    SELECT = 7,

    TEL = 8,

    TEXT = 9,

    TIME = 10,

    }

}

export class WhisperFormResult extends jspb.Message { 
    getSubmitted(): boolean;
    setSubmitted(value: boolean): WhisperFormResult;


    getOutputsMap(): jspb.Map<string, WhisperFormOutput>;
    clearOutputsMap(): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperFormResult.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperFormResult): WhisperFormResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperFormResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperFormResult;
    static deserializeBinaryFromReader(message: WhisperFormResult, reader: jspb.BinaryReader): WhisperFormResult;
}

export namespace WhisperFormResult {
    export type AsObject = {
        submitted: boolean,

        outputsMap: Array<[string, WhisperFormOutput.AsObject]>,
    }
}

export class WhisperFormUpdate extends jspb.Message { 
    getKey(): string;
    setKey(value: string): WhisperFormUpdate;


    hasOutput(): boolean;
    clearOutput(): void;
    getOutput(): WhisperFormOutput | undefined;
    setOutput(value?: WhisperFormOutput): WhisperFormUpdate;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperFormUpdate.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperFormUpdate): WhisperFormUpdate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperFormUpdate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperFormUpdate;
    static deserializeBinaryFromReader(message: WhisperFormUpdate, reader: jspb.BinaryReader): WhisperFormUpdate;
}

export namespace WhisperFormUpdate {
    export type AsObject = {
        key: string,
        output?: WhisperFormOutput.AsObject,
    }
}

export class WhisperFormStreamResponse extends jspb.Message { 

    hasResult(): boolean;
    clearResult(): void;
    getResult(): WhisperFormResult | undefined;
    setResult(value?: WhisperFormResult): WhisperFormStreamResponse;


    hasUpdate(): boolean;
    clearUpdate(): void;
    getUpdate(): WhisperFormUpdate | undefined;
    setUpdate(value?: WhisperFormUpdate): WhisperFormStreamResponse;

    getError(): string;
    setError(value: string): WhisperFormStreamResponse;


    getWhisperFormResponseOneofCase(): WhisperFormStreamResponse.WhisperFormResponseOneofCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperFormStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperFormStreamResponse): WhisperFormStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperFormStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperFormStreamResponse;
    static deserializeBinaryFromReader(message: WhisperFormStreamResponse, reader: jspb.BinaryReader): WhisperFormStreamResponse;
}

export namespace WhisperFormStreamResponse {
    export type AsObject = {
        result?: WhisperFormResult.AsObject,
        update?: WhisperFormUpdate.AsObject,
        error: string,
    }

    export enum WhisperFormResponseOneofCase {
        WHISPERFORMRESPONSEONEOF_NOT_SET = 0,
    
    RESULT = 1,

    UPDATE = 2,

    }

}

export class WhisperListRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): WhisperListRequest;


    hasMeta(): boolean;
    clearMeta(): void;
    getMeta(): WhisperMeta | undefined;
    setMeta(value?: WhisperMeta): WhisperListRequest;


    getElementsMap(): jspb.Map<string, WhisperListElement>;
    clearElementsMap(): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperListRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperListRequest): WhisperListRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperListRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperListRequest;
    static deserializeBinaryFromReader(message: WhisperListRequest, reader: jspb.BinaryReader): WhisperListRequest;
}

export namespace WhisperListRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        meta?: WhisperMeta.AsObject,

        elementsMap: Array<[string, WhisperListElement.AsObject]>,
    }
}

export class WhisperListElement extends jspb.Message { 
    getOrder(): number;
    setOrder(value: number): WhisperListElement;

    getExtra(): boolean;
    setExtra(value: boolean): WhisperListElement;


    hasPair(): boolean;
    clearPair(): void;
    getPair(): WhisperListElement.Pair | undefined;
    setPair(value?: WhisperListElement.Pair): WhisperListElement;


    hasMessage(): boolean;
    clearMessage(): void;
    getMessage(): WhisperListElement.Message | undefined;
    setMessage(value?: WhisperListElement.Message): WhisperListElement;


    hasDivider(): boolean;
    clearDivider(): void;
    getDivider(): WhisperListElement.Divider | undefined;
    setDivider(value?: WhisperListElement.Divider): WhisperListElement;


    getElementOneofCase(): WhisperListElement.ElementOneofCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WhisperListElement.AsObject;
    static toObject(includeInstance: boolean, msg: WhisperListElement): WhisperListElement.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WhisperListElement, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WhisperListElement;
    static deserializeBinaryFromReader(message: WhisperListElement, reader: jspb.BinaryReader): WhisperListElement;
}

export namespace WhisperListElement {
    export type AsObject = {
        order: number,
        extra: boolean,
        pair?: WhisperListElement.Pair.AsObject,
        message?: WhisperListElement.Message.AsObject,
        divider?: WhisperListElement.Divider.AsObject,
    }


    export class Pair extends jspb.Message { 
        getLabel(): string;
        setLabel(value: string): Pair;

        getValue(): string;
        setValue(value: string): Pair;

        getStyle(): WhisperListElement.Style;
        setStyle(value: WhisperListElement.Style): Pair;

        getCopyable(): boolean;
        setCopyable(value: boolean): Pair;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Pair.AsObject;
        static toObject(includeInstance: boolean, msg: Pair): Pair.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Pair, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Pair;
        static deserializeBinaryFromReader(message: Pair, reader: jspb.BinaryReader): Pair;
    }

    export namespace Pair {
        export type AsObject = {
            label: string,
            value: string,
            style: WhisperListElement.Style,
            copyable: boolean,
        }
    }

    export class Message extends jspb.Message { 
        getHeader(): string;
        setHeader(value: string): Message;

        getBody(): string;
        setBody(value: string): Message;

        getStyle(): WhisperListElement.Style;
        setStyle(value: WhisperListElement.Style): Message;

        getAlign(): WhisperListElement.Align;
        setAlign(value: WhisperListElement.Align): Message;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Message.AsObject;
        static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Message;
        static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
    }

    export namespace Message {
        export type AsObject = {
            header: string,
            body: string,
            style: WhisperListElement.Style,
            align: WhisperListElement.Align,
        }
    }

    export class Divider extends jspb.Message { 
        getStyle(): WhisperListElement.Style;
        setStyle(value: WhisperListElement.Style): Divider;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Divider.AsObject;
        static toObject(includeInstance: boolean, msg: Divider): Divider.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Divider, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Divider;
        static deserializeBinaryFromReader(message: Divider, reader: jspb.BinaryReader): Divider;
    }

    export namespace Divider {
        export type AsObject = {
            style: WhisperListElement.Style,
        }
    }


    export enum Style {
    STYLE_NONE = 0,
    STYLE_SUCCESS = 1,
    STYLE_WARN = 2,
    STYLE_ERROR = 3,
    }

    export enum Align {
    ALIGN_LEFT = 0,
    ALIGN_CENTER = 1,
    ALIGN_RIGHT = 2,
    }


    export enum ElementOneofCase {
        ELEMENTONEOF_NOT_SET = 0,
    
    PAIR = 4,

    MESSAGE = 5,

    DIVIDER = 6,

    }

}
