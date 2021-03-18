// package: proto
// file: cursor.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as session_pb from "./session_pb";

export class CursorPositionRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): CursorPositionRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CursorPositionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CursorPositionRequest): CursorPositionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CursorPositionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CursorPositionRequest;
    static deserializeBinaryFromReader(message: CursorPositionRequest, reader: jspb.BinaryReader): CursorPositionRequest;
}

export namespace CursorPositionRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class CursorPositionResponse extends jspb.Message { 
    getX(): number;
    setX(value: number): CursorPositionResponse;

    getY(): number;
    setY(value: number): CursorPositionResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CursorPositionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CursorPositionResponse): CursorPositionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CursorPositionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CursorPositionResponse;
    static deserializeBinaryFromReader(message: CursorPositionResponse, reader: jspb.BinaryReader): CursorPositionResponse;
}

export namespace CursorPositionResponse {
    export type AsObject = {
        x: number,
        y: number,
    }
}

export class CursorPositionStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): CursorPositionStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CursorPositionStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CursorPositionStreamRequest): CursorPositionStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CursorPositionStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CursorPositionStreamRequest;
    static deserializeBinaryFromReader(message: CursorPositionStreamRequest, reader: jspb.BinaryReader): CursorPositionStreamRequest;
}

export namespace CursorPositionStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class CursorPositionStreamResponse extends jspb.Message { 
    getX(): number;
    setX(value: number): CursorPositionStreamResponse;

    getY(): number;
    setY(value: number): CursorPositionStreamResponse;

    getError(): string;
    setError(value: string): CursorPositionStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CursorPositionStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CursorPositionStreamResponse): CursorPositionStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CursorPositionStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CursorPositionStreamResponse;
    static deserializeBinaryFromReader(message: CursorPositionStreamResponse, reader: jspb.BinaryReader): CursorPositionStreamResponse;
}

export namespace CursorPositionStreamResponse {
    export type AsObject = {
        x: number,
        y: number,
        error: string,
    }
}
