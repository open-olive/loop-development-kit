// package: proto
// file: filesystem.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
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

export class FilesystemFileInfoStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): FilesystemFileInfoStreamRequest;

    getPath(): string;
    setPath(value: string): FilesystemFileInfoStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemFileInfoStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemFileInfoStreamRequest): FilesystemFileInfoStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemFileInfoStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemFileInfoStreamRequest;
    static deserializeBinaryFromReader(message: FilesystemFileInfoStreamRequest, reader: jspb.BinaryReader): FilesystemFileInfoStreamRequest;
}

export namespace FilesystemFileInfoStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        path: string,
    }
}

export class FilesystemFileInfoStreamResponse extends jspb.Message { 

    hasFile(): boolean;
    clearFile(): void;
    getFile(): FileInfo | undefined;
    setFile(value?: FileInfo): FilesystemFileInfoStreamResponse;

    getAction(): FileAction;
    setAction(value: FileAction): FilesystemFileInfoStreamResponse;

    getError(): string;
    setError(value: string): FilesystemFileInfoStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemFileInfoStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemFileInfoStreamResponse): FilesystemFileInfoStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemFileInfoStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemFileInfoStreamResponse;
    static deserializeBinaryFromReader(message: FilesystemFileInfoStreamResponse, reader: jspb.BinaryReader): FilesystemFileInfoStreamResponse;
}

export namespace FilesystemFileInfoStreamResponse {
    export type AsObject = {
        file?: FileInfo.AsObject,
        action: FileAction,
        error: string,
    }
}

export class FilesystemFileStreamRequest extends jspb.Message { 

    hasCreate(): boolean;
    clearCreate(): void;
    getCreate(): FilesystemFileStreamRequest.Create | undefined;
    setCreate(value?: FilesystemFileStreamRequest.Create): FilesystemFileStreamRequest;


    hasOpen(): boolean;
    clearOpen(): void;
    getOpen(): FilesystemFileStreamRequest.Open | undefined;
    setOpen(value?: FilesystemFileStreamRequest.Open): FilesystemFileStreamRequest;


    hasRead(): boolean;
    clearRead(): void;
    getRead(): FilesystemFileStreamRequest.Read | undefined;
    setRead(value?: FilesystemFileStreamRequest.Read): FilesystemFileStreamRequest;


    hasWrite(): boolean;
    clearWrite(): void;
    getWrite(): FilesystemFileStreamRequest.Write | undefined;
    setWrite(value?: FilesystemFileStreamRequest.Write): FilesystemFileStreamRequest;


    hasChmod(): boolean;
    clearChmod(): void;
    getChmod(): FilesystemFileStreamRequest.Chmod | undefined;
    setChmod(value?: FilesystemFileStreamRequest.Chmod): FilesystemFileStreamRequest;


    hasChown(): boolean;
    clearChown(): void;
    getChown(): FilesystemFileStreamRequest.Chown | undefined;
    setChown(value?: FilesystemFileStreamRequest.Chown): FilesystemFileStreamRequest;


    hasStat(): boolean;
    clearStat(): void;
    getStat(): FilesystemFileStreamRequest.Stat | undefined;
    setStat(value?: FilesystemFileStreamRequest.Stat): FilesystemFileStreamRequest;


    hasClose(): boolean;
    clearClose(): void;
    getClose(): FilesystemFileStreamRequest.Close | undefined;
    setClose(value?: FilesystemFileStreamRequest.Close): FilesystemFileStreamRequest;


    getRequestOneOfCase(): FilesystemFileStreamRequest.RequestOneOfCase;

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
        create?: FilesystemFileStreamRequest.Create.AsObject,
        open?: FilesystemFileStreamRequest.Open.AsObject,
        read?: FilesystemFileStreamRequest.Read.AsObject,
        write?: FilesystemFileStreamRequest.Write.AsObject,
        chmod?: FilesystemFileStreamRequest.Chmod.AsObject,
        chown?: FilesystemFileStreamRequest.Chown.AsObject,
        stat?: FilesystemFileStreamRequest.Stat.AsObject,
        close?: FilesystemFileStreamRequest.Close.AsObject,
    }


    export class Open extends jspb.Message { 

        hasSession(): boolean;
        clearSession(): void;
        getSession(): session_pb.Session | undefined;
        setSession(value?: session_pb.Session): Open;

        getPath(): string;
        setPath(value: string): Open;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Open.AsObject;
        static toObject(includeInstance: boolean, msg: Open): Open.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Open, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Open;
        static deserializeBinaryFromReader(message: Open, reader: jspb.BinaryReader): Open;
    }

    export namespace Open {
        export type AsObject = {
            session?: session_pb.Session.AsObject,
            path: string,
        }
    }

    export class Create extends jspb.Message { 

        hasSession(): boolean;
        clearSession(): void;
        getSession(): session_pb.Session | undefined;
        setSession(value?: session_pb.Session): Create;

        getPath(): string;
        setPath(value: string): Create;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Create.AsObject;
        static toObject(includeInstance: boolean, msg: Create): Create.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Create, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Create;
        static deserializeBinaryFromReader(message: Create, reader: jspb.BinaryReader): Create;
    }

    export namespace Create {
        export type AsObject = {
            session?: session_pb.Session.AsObject,
            path: string,
        }
    }

    export class Write extends jspb.Message { 
        getData(): Uint8Array | string;
        getData_asU8(): Uint8Array;
        getData_asB64(): string;
        setData(value: Uint8Array | string): Write;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Write.AsObject;
        static toObject(includeInstance: boolean, msg: Write): Write.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Write, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Write;
        static deserializeBinaryFromReader(message: Write, reader: jspb.BinaryReader): Write;
    }

    export namespace Write {
        export type AsObject = {
            data: Uint8Array | string,
        }
    }

    export class Read extends jspb.Message { 

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Read.AsObject;
        static toObject(includeInstance: boolean, msg: Read): Read.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Read, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Read;
        static deserializeBinaryFromReader(message: Read, reader: jspb.BinaryReader): Read;
    }

    export namespace Read {
        export type AsObject = {
        }
    }

    export class Close extends jspb.Message { 

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Close.AsObject;
        static toObject(includeInstance: boolean, msg: Close): Close.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Close, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Close;
        static deserializeBinaryFromReader(message: Close, reader: jspb.BinaryReader): Close;
    }

    export namespace Close {
        export type AsObject = {
        }
    }

    export class Chmod extends jspb.Message { 
        getMode(): number;
        setMode(value: number): Chmod;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Chmod.AsObject;
        static toObject(includeInstance: boolean, msg: Chmod): Chmod.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Chmod, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Chmod;
        static deserializeBinaryFromReader(message: Chmod, reader: jspb.BinaryReader): Chmod;
    }

    export namespace Chmod {
        export type AsObject = {
            mode: number,
        }
    }

    export class Chown extends jspb.Message { 
        getUid(): number;
        setUid(value: number): Chown;

        getGid(): number;
        setGid(value: number): Chown;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Chown.AsObject;
        static toObject(includeInstance: boolean, msg: Chown): Chown.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Chown, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Chown;
        static deserializeBinaryFromReader(message: Chown, reader: jspb.BinaryReader): Chown;
    }

    export namespace Chown {
        export type AsObject = {
            uid: number,
            gid: number,
        }
    }

    export class Stat extends jspb.Message { 

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Stat.AsObject;
        static toObject(includeInstance: boolean, msg: Stat): Stat.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Stat, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Stat;
        static deserializeBinaryFromReader(message: Stat, reader: jspb.BinaryReader): Stat;
    }

    export namespace Stat {
        export type AsObject = {
        }
    }


    export enum RequestOneOfCase {
        REQUESTONEOF_NOT_SET = 0,
    
    CREATE = 1,

    OPEN = 2,

    READ = 3,

    WRITE = 4,

    CHMOD = 5,

    CHOWN = 6,

    STAT = 7,

    CLOSE = 8,

    }

}

export class FilesystemFileStreamResponse extends jspb.Message { 

    hasRead(): boolean;
    clearRead(): void;
    getRead(): FilesystemFileStreamResponse.Read | undefined;
    setRead(value?: FilesystemFileStreamResponse.Read): FilesystemFileStreamResponse;


    hasWrite(): boolean;
    clearWrite(): void;
    getWrite(): FilesystemFileStreamResponse.Write | undefined;
    setWrite(value?: FilesystemFileStreamResponse.Write): FilesystemFileStreamResponse;


    hasChmod(): boolean;
    clearChmod(): void;
    getChmod(): FilesystemFileStreamResponse.Chmod | undefined;
    setChmod(value?: FilesystemFileStreamResponse.Chmod): FilesystemFileStreamResponse;


    hasChown(): boolean;
    clearChown(): void;
    getChown(): FilesystemFileStreamResponse.Chown | undefined;
    setChown(value?: FilesystemFileStreamResponse.Chown): FilesystemFileStreamResponse;


    hasStat(): boolean;
    clearStat(): void;
    getStat(): FilesystemFileStreamResponse.Stat | undefined;
    setStat(value?: FilesystemFileStreamResponse.Stat): FilesystemFileStreamResponse;


    getResponseOneOfCase(): FilesystemFileStreamResponse.ResponseOneOfCase;

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
        read?: FilesystemFileStreamResponse.Read.AsObject,
        write?: FilesystemFileStreamResponse.Write.AsObject,
        chmod?: FilesystemFileStreamResponse.Chmod.AsObject,
        chown?: FilesystemFileStreamResponse.Chown.AsObject,
        stat?: FilesystemFileStreamResponse.Stat.AsObject,
    }


    export class Read extends jspb.Message { 
        getData(): Uint8Array | string;
        getData_asU8(): Uint8Array;
        getData_asB64(): string;
        setData(value: Uint8Array | string): Read;

        getError(): string;
        setError(value: string): Read;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Read.AsObject;
        static toObject(includeInstance: boolean, msg: Read): Read.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Read, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Read;
        static deserializeBinaryFromReader(message: Read, reader: jspb.BinaryReader): Read;
    }

    export namespace Read {
        export type AsObject = {
            data: Uint8Array | string,
            error: string,
        }
    }

    export class Write extends jspb.Message { 
        getNumofbytes(): number;
        setNumofbytes(value: number): Write;

        getError(): string;
        setError(value: string): Write;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Write.AsObject;
        static toObject(includeInstance: boolean, msg: Write): Write.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Write, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Write;
        static deserializeBinaryFromReader(message: Write, reader: jspb.BinaryReader): Write;
    }

    export namespace Write {
        export type AsObject = {
            numofbytes: number,
            error: string,
        }
    }

    export class Chmod extends jspb.Message { 
        getError(): string;
        setError(value: string): Chmod;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Chmod.AsObject;
        static toObject(includeInstance: boolean, msg: Chmod): Chmod.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Chmod, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Chmod;
        static deserializeBinaryFromReader(message: Chmod, reader: jspb.BinaryReader): Chmod;
    }

    export namespace Chmod {
        export type AsObject = {
            error: string,
        }
    }

    export class Chown extends jspb.Message { 
        getError(): string;
        setError(value: string): Chown;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Chown.AsObject;
        static toObject(includeInstance: boolean, msg: Chown): Chown.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Chown, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Chown;
        static deserializeBinaryFromReader(message: Chown, reader: jspb.BinaryReader): Chown;
    }

    export namespace Chown {
        export type AsObject = {
            error: string,
        }
    }

    export class Stat extends jspb.Message { 

        hasInfo(): boolean;
        clearInfo(): void;
        getInfo(): FileInfo | undefined;
        setInfo(value?: FileInfo): Stat;

        getError(): string;
        setError(value: string): Stat;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Stat.AsObject;
        static toObject(includeInstance: boolean, msg: Stat): Stat.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Stat, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Stat;
        static deserializeBinaryFromReader(message: Stat, reader: jspb.BinaryReader): Stat;
    }

    export namespace Stat {
        export type AsObject = {
            info?: FileInfo.AsObject,
            error: string,
        }
    }


    export enum ResponseOneOfCase {
        RESPONSEONEOF_NOT_SET = 0,
    
    READ = 1,

    WRITE = 2,

    CHMOD = 3,

    CHOWN = 4,

    STAT = 5,

    }

}

export class FilesystemMakeDirRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): FilesystemMakeDirRequest;

    getPath(): string;
    setPath(value: string): FilesystemMakeDirRequest;

    getPerm(): number;
    setPerm(value: number): FilesystemMakeDirRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemMakeDirRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemMakeDirRequest): FilesystemMakeDirRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemMakeDirRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemMakeDirRequest;
    static deserializeBinaryFromReader(message: FilesystemMakeDirRequest, reader: jspb.BinaryReader): FilesystemMakeDirRequest;
}

export namespace FilesystemMakeDirRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        path: string,
        perm: number,
    }
}

export class FilesystemCopyRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): FilesystemCopyRequest;

    getSource(): string;
    setSource(value: string): FilesystemCopyRequest;

    getDest(): string;
    setDest(value: string): FilesystemCopyRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemCopyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemCopyRequest): FilesystemCopyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemCopyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemCopyRequest;
    static deserializeBinaryFromReader(message: FilesystemCopyRequest, reader: jspb.BinaryReader): FilesystemCopyRequest;
}

export namespace FilesystemCopyRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        source: string,
        dest: string,
    }
}

export class FilesystemMoveRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): FilesystemMoveRequest;

    getSource(): string;
    setSource(value: string): FilesystemMoveRequest;

    getDest(): string;
    setDest(value: string): FilesystemMoveRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemMoveRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemMoveRequest): FilesystemMoveRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemMoveRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemMoveRequest;
    static deserializeBinaryFromReader(message: FilesystemMoveRequest, reader: jspb.BinaryReader): FilesystemMoveRequest;
}

export namespace FilesystemMoveRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        source: string,
        dest: string,
    }
}

export class FilesystemRemoveRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): FilesystemRemoveRequest;

    getPath(): string;
    setPath(value: string): FilesystemRemoveRequest;

    getRecursive(): boolean;
    setRecursive(value: boolean): FilesystemRemoveRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FilesystemRemoveRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FilesystemRemoveRequest): FilesystemRemoveRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FilesystemRemoveRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FilesystemRemoveRequest;
    static deserializeBinaryFromReader(message: FilesystemRemoveRequest, reader: jspb.BinaryReader): FilesystemRemoveRequest;
}

export namespace FilesystemRemoveRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        path: string,
        recursive: boolean,
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
