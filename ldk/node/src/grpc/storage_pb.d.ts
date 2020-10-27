// package: proto
// file: storage.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as session_pb from "./session_pb";

export class StorageHasKeyRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): StorageHasKeyRequest;

    getKey(): string;
    setKey(value: string): StorageHasKeyRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageHasKeyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StorageHasKeyRequest): StorageHasKeyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageHasKeyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageHasKeyRequest;
    static deserializeBinaryFromReader(message: StorageHasKeyRequest, reader: jspb.BinaryReader): StorageHasKeyRequest;
}

export namespace StorageHasKeyRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        key: string,
    }
}

export class StorageHasKeyResponse extends jspb.Message { 
    getHaskey(): boolean;
    setHaskey(value: boolean): StorageHasKeyResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageHasKeyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StorageHasKeyResponse): StorageHasKeyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageHasKeyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageHasKeyResponse;
    static deserializeBinaryFromReader(message: StorageHasKeyResponse, reader: jspb.BinaryReader): StorageHasKeyResponse;
}

export namespace StorageHasKeyResponse {
    export type AsObject = {
        haskey: boolean,
    }
}

export class StorageKeysRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): StorageKeysRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageKeysRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StorageKeysRequest): StorageKeysRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageKeysRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageKeysRequest;
    static deserializeBinaryFromReader(message: StorageKeysRequest, reader: jspb.BinaryReader): StorageKeysRequest;
}

export namespace StorageKeysRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class StorageKeysResponse extends jspb.Message { 
    clearKeysList(): void;
    getKeysList(): Array<string>;
    setKeysList(value: Array<string>): StorageKeysResponse;
    addKeys(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageKeysResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StorageKeysResponse): StorageKeysResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageKeysResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageKeysResponse;
    static deserializeBinaryFromReader(message: StorageKeysResponse, reader: jspb.BinaryReader): StorageKeysResponse;
}

export namespace StorageKeysResponse {
    export type AsObject = {
        keysList: Array<string>,
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

export class StorageReadAllRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): StorageReadAllRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageReadAllRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StorageReadAllRequest): StorageReadAllRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageReadAllRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageReadAllRequest;
    static deserializeBinaryFromReader(message: StorageReadAllRequest, reader: jspb.BinaryReader): StorageReadAllRequest;
}

export namespace StorageReadAllRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class StorageReadAllResponse extends jspb.Message { 

    getEntriesMap(): jspb.Map<string, string>;
    clearEntriesMap(): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageReadAllResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StorageReadAllResponse): StorageReadAllResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageReadAllResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageReadAllResponse;
    static deserializeBinaryFromReader(message: StorageReadAllResponse, reader: jspb.BinaryReader): StorageReadAllResponse;
}

export namespace StorageReadAllResponse {
    export type AsObject = {

        entriesMap: Array<[string, string]>,
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

export class StorageDeleteAllRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): StorageDeleteAllRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageDeleteAllRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StorageDeleteAllRequest): StorageDeleteAllRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageDeleteAllRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageDeleteAllRequest;
    static deserializeBinaryFromReader(message: StorageDeleteAllRequest, reader: jspb.BinaryReader): StorageDeleteAllRequest;
}

export namespace StorageDeleteAllRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
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
