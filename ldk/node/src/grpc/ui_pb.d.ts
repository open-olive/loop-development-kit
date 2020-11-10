// package: proto
// file: ui.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as session_pb from "./session_pb";

export class GlobalSearchStreamResponse extends jspb.Message { 
    getText(): string;
    setText(value: string): GlobalSearchStreamResponse;

    getError(): string;
    setError(value: string): GlobalSearchStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GlobalSearchStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GlobalSearchStreamResponse): GlobalSearchStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GlobalSearchStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GlobalSearchStreamResponse;
    static deserializeBinaryFromReader(message: GlobalSearchStreamResponse, reader: jspb.BinaryReader): GlobalSearchStreamResponse;
}

export namespace GlobalSearchStreamResponse {
    export type AsObject = {
        text: string,
        error: string,
    }
}

export class SearchbarStreamResponse extends jspb.Message { 
    getText(): string;
    setText(value: string): SearchbarStreamResponse;

    getError(): string;
    setError(value: string): SearchbarStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchbarStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SearchbarStreamResponse): SearchbarStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchbarStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchbarStreamResponse;
    static deserializeBinaryFromReader(message: SearchbarStreamResponse, reader: jspb.BinaryReader): SearchbarStreamResponse;
}

export namespace SearchbarStreamResponse {
    export type AsObject = {
        text: string,
        error: string,
    }
}

export class GlobalSearchStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): GlobalSearchStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GlobalSearchStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GlobalSearchStreamRequest): GlobalSearchStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GlobalSearchStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GlobalSearchStreamRequest;
    static deserializeBinaryFromReader(message: GlobalSearchStreamRequest, reader: jspb.BinaryReader): GlobalSearchStreamRequest;
}

export namespace GlobalSearchStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class SearchbarStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): SearchbarStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchbarStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SearchbarStreamRequest): SearchbarStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchbarStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchbarStreamRequest;
    static deserializeBinaryFromReader(message: SearchbarStreamRequest, reader: jspb.BinaryReader): SearchbarStreamRequest;
}

export namespace SearchbarStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}
