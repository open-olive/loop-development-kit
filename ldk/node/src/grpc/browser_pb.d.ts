// package: proto
// file: browser.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

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
