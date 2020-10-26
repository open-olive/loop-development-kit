// package: proto
// file: hover.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class HoverReadRequest extends jspb.Message { 
    getXfromcenter(): number;
    setXfromcenter(value: number): HoverReadRequest;

    getYfromcenter(): number;
    setYfromcenter(value: number): HoverReadRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HoverReadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: HoverReadRequest): HoverReadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HoverReadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HoverReadRequest;
    static deserializeBinaryFromReader(message: HoverReadRequest, reader: jspb.BinaryReader): HoverReadRequest;
}

export namespace HoverReadRequest {
    export type AsObject = {
        xfromcenter: number,
        yfromcenter: number,
    }
}

export class HoverReadStreamRequest extends jspb.Message { 
    getXfromcenter(): number;
    setXfromcenter(value: number): HoverReadStreamRequest;

    getYfromcenter(): number;
    setYfromcenter(value: number): HoverReadStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HoverReadStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: HoverReadStreamRequest): HoverReadStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HoverReadStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HoverReadStreamRequest;
    static deserializeBinaryFromReader(message: HoverReadStreamRequest, reader: jspb.BinaryReader): HoverReadStreamRequest;
}

export namespace HoverReadStreamRequest {
    export type AsObject = {
        xfromcenter: number,
        yfromcenter: number,
    }
}

export class HoverReadResponse extends jspb.Message { 
    getText(): string;
    setText(value: string): HoverReadResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HoverReadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: HoverReadResponse): HoverReadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HoverReadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HoverReadResponse;
    static deserializeBinaryFromReader(message: HoverReadResponse, reader: jspb.BinaryReader): HoverReadResponse;
}

export namespace HoverReadResponse {
    export type AsObject = {
        text: string,
    }
}

export class HoverReadStreamResponse extends jspb.Message { 
    getText(): string;
    setText(value: string): HoverReadStreamResponse;

    getError(): string;
    setError(value: string): HoverReadStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HoverReadStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: HoverReadStreamResponse): HoverReadStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HoverReadStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HoverReadStreamResponse;
    static deserializeBinaryFromReader(message: HoverReadStreamResponse, reader: jspb.BinaryReader): HoverReadStreamResponse;
}

export namespace HoverReadStreamResponse {
    export type AsObject = {
        text: string,
        error: string,
    }
}
