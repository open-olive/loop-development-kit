// package: proto
// file: storage.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as session_pb from "./session_pb";

export class StorageExistsRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): StorageExistsRequest;

    getKey(): string;
    setKey(value: string): StorageExistsRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageExistsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StorageExistsRequest): StorageExistsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageExistsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageExistsRequest;
    static deserializeBinaryFromReader(message: StorageExistsRequest, reader: jspb.BinaryReader): StorageExistsRequest;
}

export namespace StorageExistsRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        key: string,
    }
}

export class StorageExistsResponse extends jspb.Message { 
    getExists(): boolean;
    setExists(value: boolean): StorageExistsResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageExistsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StorageExistsResponse): StorageExistsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageExistsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageExistsResponse;
    static deserializeBinaryFromReader(message: StorageExistsResponse, reader: jspb.BinaryReader): StorageExistsResponse;
}

export namespace StorageExistsResponse {
    export type AsObject = {
        exists: boolean,
    }
}

export class StorageReadRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): StorageReadRequest;

    getKey(): string;
    setKey(value: string): StorageReadRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageReadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StorageReadRequest): StorageReadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageReadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageReadRequest;
    static deserializeBinaryFromReader(message: StorageReadRequest, reader: jspb.BinaryReader): StorageReadRequest;
}

export namespace StorageReadRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        key: string,
    }
}

export class StorageReadResponse extends jspb.Message { 
    getValue(): string;
    setValue(value: string): StorageReadResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageReadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StorageReadResponse): StorageReadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageReadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageReadResponse;
    static deserializeBinaryFromReader(message: StorageReadResponse, reader: jspb.BinaryReader): StorageReadResponse;
}

export namespace StorageReadResponse {
    export type AsObject = {
        value: string,
    }
}

export class StorageDeleteRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): StorageDeleteRequest;

    getKey(): string;
    setKey(value: string): StorageDeleteRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageDeleteRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StorageDeleteRequest): StorageDeleteRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageDeleteRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageDeleteRequest;
    static deserializeBinaryFromReader(message: StorageDeleteRequest, reader: jspb.BinaryReader): StorageDeleteRequest;
}

export namespace StorageDeleteRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        key: string,
    }
}

export class StorageWriteRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): StorageWriteRequest;

    getKey(): string;
    setKey(value: string): StorageWriteRequest;

    getValue(): string;
    setValue(value: string): StorageWriteRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageWriteRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StorageWriteRequest): StorageWriteRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageWriteRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageWriteRequest;
    static deserializeBinaryFromReader(message: StorageWriteRequest, reader: jspb.BinaryReader): StorageWriteRequest;
}

export namespace StorageWriteRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        key: string,
        value: string,
    }
}
