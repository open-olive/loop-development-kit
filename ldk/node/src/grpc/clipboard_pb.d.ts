// package: proto
// file: clipboard.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as session_pb from "./session_pb";

export class ClipboardReadRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): ClipboardReadRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClipboardReadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ClipboardReadRequest): ClipboardReadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClipboardReadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClipboardReadRequest;
    static deserializeBinaryFromReader(message: ClipboardReadRequest, reader: jspb.BinaryReader): ClipboardReadRequest;
}

export namespace ClipboardReadRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class ClipboardReadResponse extends jspb.Message { 
    getText(): string;
    setText(value: string): ClipboardReadResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClipboardReadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ClipboardReadResponse): ClipboardReadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClipboardReadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClipboardReadResponse;
    static deserializeBinaryFromReader(message: ClipboardReadResponse, reader: jspb.BinaryReader): ClipboardReadResponse;
}

export namespace ClipboardReadResponse {
    export type AsObject = {
        text: string,
    }
}

export class ClipboardReadStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): ClipboardReadStreamRequest;

    getIncludeolivehelptraffic(): boolean;
    setIncludeolivehelptraffic(value: boolean): ClipboardReadStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClipboardReadStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ClipboardReadStreamRequest): ClipboardReadStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClipboardReadStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClipboardReadStreamRequest;
    static deserializeBinaryFromReader(message: ClipboardReadStreamRequest, reader: jspb.BinaryReader): ClipboardReadStreamRequest;
}

export namespace ClipboardReadStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        includeolivehelptraffic: boolean,
    }
}

export class ClipboardReadStreamResponse extends jspb.Message { 
    getText(): string;
    setText(value: string): ClipboardReadStreamResponse;

    getError(): string;
    setError(value: string): ClipboardReadStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClipboardReadStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ClipboardReadStreamResponse): ClipboardReadStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClipboardReadStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClipboardReadStreamResponse;
    static deserializeBinaryFromReader(message: ClipboardReadStreamResponse, reader: jspb.BinaryReader): ClipboardReadStreamResponse;
}

export namespace ClipboardReadStreamResponse {
    export type AsObject = {
        text: string,
        error: string,
    }
}

export class ClipboardWriteRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): ClipboardWriteRequest;

    getText(): string;
    setText(value: string): ClipboardWriteRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClipboardWriteRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ClipboardWriteRequest): ClipboardWriteRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClipboardWriteRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClipboardWriteRequest;
    static deserializeBinaryFromReader(message: ClipboardWriteRequest, reader: jspb.BinaryReader): ClipboardWriteRequest;
}

export namespace ClipboardWriteRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        text: string,
    }
}
