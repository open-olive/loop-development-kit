// package: proto
// file: browser.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as session_pb from "./session_pb";

export class BrowserActiveURLRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): BrowserActiveURLRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BrowserActiveURLRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BrowserActiveURLRequest): BrowserActiveURLRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BrowserActiveURLRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BrowserActiveURLRequest;
    static deserializeBinaryFromReader(message: BrowserActiveURLRequest, reader: jspb.BinaryReader): BrowserActiveURLRequest;
}

export namespace BrowserActiveURLRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class BrowserActiveURLResponse extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): BrowserActiveURLResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BrowserActiveURLResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BrowserActiveURLResponse): BrowserActiveURLResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BrowserActiveURLResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BrowserActiveURLResponse;
    static deserializeBinaryFromReader(message: BrowserActiveURLResponse, reader: jspb.BinaryReader): BrowserActiveURLResponse;
}

export namespace BrowserActiveURLResponse {
    export type AsObject = {
        url: string,
    }
}

export class BrowserActiveURLStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): BrowserActiveURLStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BrowserActiveURLStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BrowserActiveURLStreamRequest): BrowserActiveURLStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BrowserActiveURLStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BrowserActiveURLStreamRequest;
    static deserializeBinaryFromReader(message: BrowserActiveURLStreamRequest, reader: jspb.BinaryReader): BrowserActiveURLStreamRequest;
}

export namespace BrowserActiveURLStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class BrowserActiveURLStreamResponse extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): BrowserActiveURLStreamResponse;

    getError(): string;
    setError(value: string): BrowserActiveURLStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BrowserActiveURLStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BrowserActiveURLStreamResponse): BrowserActiveURLStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BrowserActiveURLStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BrowserActiveURLStreamResponse;
    static deserializeBinaryFromReader(message: BrowserActiveURLStreamResponse, reader: jspb.BinaryReader): BrowserActiveURLStreamResponse;
}

export namespace BrowserActiveURLStreamResponse {
    export type AsObject = {
        url: string,
        error: string,
    }
}

export class BrowserSelectedTextRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): BrowserSelectedTextRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BrowserSelectedTextRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BrowserSelectedTextRequest): BrowserSelectedTextRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BrowserSelectedTextRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BrowserSelectedTextRequest;
    static deserializeBinaryFromReader(message: BrowserSelectedTextRequest, reader: jspb.BinaryReader): BrowserSelectedTextRequest;
}

export namespace BrowserSelectedTextRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class BrowserSelectedTextResponse extends jspb.Message { 
    getText(): string;
    setText(value: string): BrowserSelectedTextResponse;

    getUrl(): string;
    setUrl(value: string): BrowserSelectedTextResponse;

    getTabtitle(): string;
    setTabtitle(value: string): BrowserSelectedTextResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BrowserSelectedTextResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BrowserSelectedTextResponse): BrowserSelectedTextResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BrowserSelectedTextResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BrowserSelectedTextResponse;
    static deserializeBinaryFromReader(message: BrowserSelectedTextResponse, reader: jspb.BinaryReader): BrowserSelectedTextResponse;
}

export namespace BrowserSelectedTextResponse {
    export type AsObject = {
        text: string,
        url: string,
        tabtitle: string,
    }
}

export class BrowserSelectedTextStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): BrowserSelectedTextStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BrowserSelectedTextStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BrowserSelectedTextStreamRequest): BrowserSelectedTextStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BrowserSelectedTextStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BrowserSelectedTextStreamRequest;
    static deserializeBinaryFromReader(message: BrowserSelectedTextStreamRequest, reader: jspb.BinaryReader): BrowserSelectedTextStreamRequest;
}

export namespace BrowserSelectedTextStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class BrowserSelectedTextStreamResponse extends jspb.Message { 
    getText(): string;
    setText(value: string): BrowserSelectedTextStreamResponse;

    getUrl(): string;
    setUrl(value: string): BrowserSelectedTextStreamResponse;

    getTabtitle(): string;
    setTabtitle(value: string): BrowserSelectedTextStreamResponse;

    getError(): string;
    setError(value: string): BrowserSelectedTextStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BrowserSelectedTextStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BrowserSelectedTextStreamResponse): BrowserSelectedTextStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BrowserSelectedTextStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BrowserSelectedTextStreamResponse;
    static deserializeBinaryFromReader(message: BrowserSelectedTextStreamResponse, reader: jspb.BinaryReader): BrowserSelectedTextStreamResponse;
}

export namespace BrowserSelectedTextStreamResponse {
    export type AsObject = {
        text: string,
        url: string,
        tabtitle: string,
        error: string,
    }
}
