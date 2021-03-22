// package: proto
// file: keyboard.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as session_pb from "./session_pb";

export class KeyboardHotkey extends jspb.Message { 
    getKey(): string;
    setKey(value: string): KeyboardHotkey;

    getModifiers(): number;
    setModifiers(value: number): KeyboardHotkey;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyboardHotkey.AsObject;
    static toObject(includeInstance: boolean, msg: KeyboardHotkey): KeyboardHotkey.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyboardHotkey, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyboardHotkey;
    static deserializeBinaryFromReader(message: KeyboardHotkey, reader: jspb.BinaryReader): KeyboardHotkey;
}

export namespace KeyboardHotkey {
    export type AsObject = {
        key: string,
        modifiers: number,
    }
}

export class KeyboardHotkeyStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): KeyboardHotkeyStreamRequest;


    hasHotkey(): boolean;
    clearHotkey(): void;
    getHotkey(): KeyboardHotkey | undefined;
    setHotkey(value?: KeyboardHotkey): KeyboardHotkeyStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyboardHotkeyStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: KeyboardHotkeyStreamRequest): KeyboardHotkeyStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyboardHotkeyStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyboardHotkeyStreamRequest;
    static deserializeBinaryFromReader(message: KeyboardHotkeyStreamRequest, reader: jspb.BinaryReader): KeyboardHotkeyStreamRequest;
}

export namespace KeyboardHotkeyStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        hotkey?: KeyboardHotkey.AsObject,
    }
}

export class KeyboardHotkeyStreamResponse extends jspb.Message { 
    getScanned(): boolean;
    setScanned(value: boolean): KeyboardHotkeyStreamResponse;

    getError(): string;
    setError(value: string): KeyboardHotkeyStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyboardHotkeyStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: KeyboardHotkeyStreamResponse): KeyboardHotkeyStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyboardHotkeyStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyboardHotkeyStreamResponse;
    static deserializeBinaryFromReader(message: KeyboardHotkeyStreamResponse, reader: jspb.BinaryReader): KeyboardHotkeyStreamResponse;
}

export namespace KeyboardHotkeyStreamResponse {
    export type AsObject = {
        scanned: boolean,
        error: string,
    }
}

export class KeyboardTextStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): KeyboardTextStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyboardTextStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: KeyboardTextStreamRequest): KeyboardTextStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyboardTextStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyboardTextStreamRequest;
    static deserializeBinaryFromReader(message: KeyboardTextStreamRequest, reader: jspb.BinaryReader): KeyboardTextStreamRequest;
}

export namespace KeyboardTextStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class KeyboardTextStreamResponse extends jspb.Message { 
    getText(): string;
    setText(value: string): KeyboardTextStreamResponse;

    getError(): string;
    setError(value: string): KeyboardTextStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyboardTextStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: KeyboardTextStreamResponse): KeyboardTextStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyboardTextStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyboardTextStreamResponse;
    static deserializeBinaryFromReader(message: KeyboardTextStreamResponse, reader: jspb.BinaryReader): KeyboardTextStreamResponse;
}

export namespace KeyboardTextStreamResponse {
    export type AsObject = {
        text: string,
        error: string,
    }
}

export class KeyboardCharacterStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): KeyboardCharacterStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyboardCharacterStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: KeyboardCharacterStreamRequest): KeyboardCharacterStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyboardCharacterStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyboardCharacterStreamRequest;
    static deserializeBinaryFromReader(message: KeyboardCharacterStreamRequest, reader: jspb.BinaryReader): KeyboardCharacterStreamRequest;
}

export namespace KeyboardCharacterStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class KeyboardCharacterStreamResponse extends jspb.Message { 
    getText(): string;
    setText(value: string): KeyboardCharacterStreamResponse;

    getError(): string;
    setError(value: string): KeyboardCharacterStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyboardCharacterStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: KeyboardCharacterStreamResponse): KeyboardCharacterStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyboardCharacterStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyboardCharacterStreamResponse;
    static deserializeBinaryFromReader(message: KeyboardCharacterStreamResponse, reader: jspb.BinaryReader): KeyboardCharacterStreamResponse;
}

export namespace KeyboardCharacterStreamResponse {
    export type AsObject = {
        text: string,
        error: string,
    }
}
