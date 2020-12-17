// package: proto
// file: filesystem.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as session_pb from "./session_pb";

export class FileInfo extends jspb.Message { 
    getName(): string;
    setName(value: string): FileInfo;

    getSize(): number;
    setSize(value: number): FileInfo;

    getMode(): number;
    setMode(value: number): FileInfo;


    hasUpdated(): boolean;
    clearUpdated(): void;
    getUpdated(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdated(value?: google_protobuf_timestamp_pb.Timestamp): FileInfo;

    getIsdir(): boolean;
    setIsdir(value: boolean): FileInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileInfo.AsObject;
    static toObject(includeInstance: boolean, msg: FileInfo): FileInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileInfo;
    static deserializeBinaryFromReader(message: FileInfo, reader: jspb.BinaryReader): FileInfo;
}

export namespace FileInfo {
    export type AsObject = {
        name: string,
        size: number,
        mode: number,
        updated?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        isdir: boolean,
    }
}

export class FilesystemDirRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): FilesystemDirRequest;

    getDirectory(): string;
    setDirectory(value: string): FilesystemDirRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemDirRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemDirRequest): FilesystemDirRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemDirRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemDirRequest;
    static deserializeBinaryFromReader(message: FilesystemDirRequest, reader: jspb.BinaryReader): FilesystemDirRequest;
}

export namespace FilesystemDirRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        directory: string,
    }
}

export class FilesystemDirResponse extends jspb.Message { 
    clearFilesList(): void;
    getFilesList(): Array<FileInfo>;
    setFilesList(value: Array<FileInfo>): FilesystemDirResponse;
    addFiles(value?: FileInfo, index?: number): FileInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemDirResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemDirResponse): FilesystemDirResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemDirResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemDirResponse;
    static deserializeBinaryFromReader(message: FilesystemDirResponse, reader: jspb.BinaryReader): FilesystemDirResponse;
}

export namespace FilesystemDirResponse {
    export type AsObject = {
        filesList: Array<FileInfo.AsObject>,
    }
}

export class FilesystemDirStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): FilesystemDirStreamRequest;

    getDirectory(): string;
    setDirectory(value: string): FilesystemDirStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemDirStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemDirStreamRequest): FilesystemDirStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemDirStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemDirStreamRequest;
    static deserializeBinaryFromReader(message: FilesystemDirStreamRequest, reader: jspb.BinaryReader): FilesystemDirStreamRequest;
}

export namespace FilesystemDirStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        directory: string,
    }
}

export class FilesystemDirStreamResponse extends jspb.Message { 

    hasFile(): boolean;
    clearFile(): void;
    getFile(): FileInfo | undefined;
    setFile(value?: FileInfo): FilesystemDirStreamResponse;

    getAction(): FileAction;
    setAction(value: FileAction): FilesystemDirStreamResponse;

    getError(): string;
    setError(value: string): FilesystemDirStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemDirStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemDirStreamResponse): FilesystemDirStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemDirStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemDirStreamResponse;
    static deserializeBinaryFromReader(message: FilesystemDirStreamResponse, reader: jspb.BinaryReader): FilesystemDirStreamResponse;
}

export namespace FilesystemDirStreamResponse {
    export type AsObject = {
        file?: FileInfo.AsObject,
        action: FileAction,
        error: string,
    }
}

export class FilesystemFileRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): FilesystemFileRequest;

    getPath(): string;
    setPath(value: string): FilesystemFileRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemFileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemFileRequest): FilesystemFileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemFileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemFileRequest;
    static deserializeBinaryFromReader(message: FilesystemFileRequest, reader: jspb.BinaryReader): FilesystemFileRequest;
}

export namespace FilesystemFileRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        path: string,
    }
}

export class FilesystemFileResponse extends jspb.Message { 

    hasFile(): boolean;
    clearFile(): void;
    getFile(): FileInfo | undefined;
    setFile(value?: FileInfo): FilesystemFileResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemFileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemFileResponse): FilesystemFileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemFileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemFileResponse;
    static deserializeBinaryFromReader(message: FilesystemFileResponse, reader: jspb.BinaryReader): FilesystemFileResponse;
}

export namespace FilesystemFileResponse {
    export type AsObject = {
        file?: FileInfo.AsObject,
    }
}

export class FilesystemFileStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): FilesystemFileStreamRequest;

    getPath(): string;
    setPath(value: string): FilesystemFileStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemFileStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemFileStreamRequest): FilesystemFileStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemFileStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemFileStreamRequest;
    static deserializeBinaryFromReader(message: FilesystemFileStreamRequest, reader: jspb.BinaryReader): FilesystemFileStreamRequest;
}

export namespace FilesystemFileStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        path: string,
    }
}

export class FilesystemFileStreamResponse extends jspb.Message { 

    hasFile(): boolean;
    clearFile(): void;
    getFile(): FileInfo | undefined;
    setFile(value?: FileInfo): FilesystemFileStreamResponse;

    getAction(): FileAction;
    setAction(value: FileAction): FilesystemFileStreamResponse;

    getError(): string;
    setError(value: string): FilesystemFileStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemFileStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemFileStreamResponse): FilesystemFileStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemFileStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemFileStreamResponse;
    static deserializeBinaryFromReader(message: FilesystemFileStreamResponse, reader: jspb.BinaryReader): FilesystemFileStreamResponse;
}

export namespace FilesystemFileStreamResponse {
    export type AsObject = {
        file?: FileInfo.AsObject,
        action: FileAction,
        error: string,
    }
}

export enum FileAction {
    FILE_ACTION_UNKNOWN = 0,
    FILE_ACTION_CREATE = 1,
    FILE_ACTION_WRITE = 2,
    FILE_ACTION_REMOVE = 3,
    FILE_ACTION_RENAME = 4,
    FILE_ACTION_CHMOD = 5,
}
