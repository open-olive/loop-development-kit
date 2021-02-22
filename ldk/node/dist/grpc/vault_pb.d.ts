// package: proto
// file: vault.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as session_pb from "./session_pb";

export class VaultExistsRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): VaultExistsRequest;

    getKey(): string;
    setKey(value: string): VaultExistsRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VaultExistsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: VaultExistsRequest): VaultExistsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VaultExistsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VaultExistsRequest;
    static deserializeBinaryFromReader(message: VaultExistsRequest, reader: jspb.BinaryReader): VaultExistsRequest;
}

export namespace VaultExistsRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        key: string,
    }
}

export class VaultExistsResponse extends jspb.Message { 
    getExists(): boolean;
    setExists(value: boolean): VaultExistsResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VaultExistsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: VaultExistsResponse): VaultExistsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VaultExistsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VaultExistsResponse;
    static deserializeBinaryFromReader(message: VaultExistsResponse, reader: jspb.BinaryReader): VaultExistsResponse;
}

export namespace VaultExistsResponse {
    export type AsObject = {
        exists: boolean,
    }
}

export class VaultReadRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): VaultReadRequest;

    getKey(): string;
    setKey(value: string): VaultReadRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VaultReadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: VaultReadRequest): VaultReadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VaultReadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VaultReadRequest;
    static deserializeBinaryFromReader(message: VaultReadRequest, reader: jspb.BinaryReader): VaultReadRequest;
}

export namespace VaultReadRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        key: string,
    }
}

export class VaultReadResponse extends jspb.Message { 
    getValue(): string;
    setValue(value: string): VaultReadResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VaultReadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: VaultReadResponse): VaultReadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VaultReadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VaultReadResponse;
    static deserializeBinaryFromReader(message: VaultReadResponse, reader: jspb.BinaryReader): VaultReadResponse;
}

export namespace VaultReadResponse {
    export type AsObject = {
        value: string,
    }
}

export class VaultDeleteRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): VaultDeleteRequest;

    getKey(): string;
    setKey(value: string): VaultDeleteRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VaultDeleteRequest.AsObject;
    static toObject(includeInstance: boolean, msg: VaultDeleteRequest): VaultDeleteRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VaultDeleteRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VaultDeleteRequest;
    static deserializeBinaryFromReader(message: VaultDeleteRequest, reader: jspb.BinaryReader): VaultDeleteRequest;
}

export namespace VaultDeleteRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        key: string,
    }
}

export class VaultWriteRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): VaultWriteRequest;

    getKey(): string;
    setKey(value: string): VaultWriteRequest;

    getValue(): string;
    setValue(value: string): VaultWriteRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VaultWriteRequest.AsObject;
    static toObject(includeInstance: boolean, msg: VaultWriteRequest): VaultWriteRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VaultWriteRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VaultWriteRequest;
    static deserializeBinaryFromReader(message: VaultWriteRequest, reader: jspb.BinaryReader): VaultWriteRequest;
}

export namespace VaultWriteRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        key: string,
        value: string,
    }
}
