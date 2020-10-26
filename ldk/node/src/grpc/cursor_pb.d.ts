// package: proto
// file: cursor.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class CursorPositionResponse extends jspb.Message { 
    getX(): number;
    setX(value: number): CursorPositionResponse;

    getY(): number;
    setY(value: number): CursorPositionResponse;

    getScreen(): number;
    setScreen(value: number): CursorPositionResponse;


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
        screen: number,
    }
}

export class CursorPositionStreamResponse extends jspb.Message { 
    getX(): number;
    setX(value: number): CursorPositionStreamResponse;

    getY(): number;
    setY(value: number): CursorPositionStreamResponse;

    getScreen(): number;
    setScreen(value: number): CursorPositionStreamResponse;

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
        screen: number,
        error: string,
    }
}
