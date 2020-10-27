// package: proto
// file: process.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as session_pb from "./session_pb";

export class ProcessInfo extends jspb.Message { 
    getPid(): number;
    setPid(value: number): ProcessInfo;

    getCommand(): string;
    setCommand(value: string): ProcessInfo;

    getArguments(): string;
    setArguments(value: string): ProcessInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProcessInfo.AsObject;
    static toObject(includeInstance: boolean, msg: ProcessInfo): ProcessInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProcessInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProcessInfo;
    static deserializeBinaryFromReader(message: ProcessInfo, reader: jspb.BinaryReader): ProcessInfo;
}

export namespace ProcessInfo {
    export type AsObject = {
        pid: number,
        command: string,
        arguments: string,
    }
}

export class ProcessStateStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): ProcessStateStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProcessStateStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ProcessStateStreamRequest): ProcessStateStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProcessStateStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProcessStateStreamRequest;
    static deserializeBinaryFromReader(message: ProcessStateStreamRequest, reader: jspb.BinaryReader): ProcessStateStreamRequest;
}

export namespace ProcessStateStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class ProcessStateStreamResponse extends jspb.Message { 

    hasProcess(): boolean;
    clearProcess(): void;
    getProcess(): ProcessInfo | undefined;
    setProcess(value?: ProcessInfo): ProcessStateStreamResponse;

    getAction(): ProcessAction;
    setAction(value: ProcessAction): ProcessStateStreamResponse;

    getError(): string;
    setError(value: string): ProcessStateStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProcessStateStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ProcessStateStreamResponse): ProcessStateStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProcessStateStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProcessStateStreamResponse;
    static deserializeBinaryFromReader(message: ProcessStateStreamResponse, reader: jspb.BinaryReader): ProcessStateStreamResponse;
}

export namespace ProcessStateStreamResponse {
    export type AsObject = {
        process?: ProcessInfo.AsObject,
        action: ProcessAction,
        error: string,
    }
}

export class ProcessStateRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): ProcessStateRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProcessStateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ProcessStateRequest): ProcessStateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProcessStateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProcessStateRequest;
    static deserializeBinaryFromReader(message: ProcessStateRequest, reader: jspb.BinaryReader): ProcessStateRequest;
}

export namespace ProcessStateRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class ProcessStateResponse extends jspb.Message { 
    clearProcessesList(): void;
    getProcessesList(): Array<ProcessInfo>;
    setProcessesList(value: Array<ProcessInfo>): ProcessStateResponse;
    addProcesses(value?: ProcessInfo, index?: number): ProcessInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProcessStateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ProcessStateResponse): ProcessStateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProcessStateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProcessStateResponse;
    static deserializeBinaryFromReader(message: ProcessStateResponse, reader: jspb.BinaryReader): ProcessStateResponse;
}

export namespace ProcessStateResponse {
    export type AsObject = {
        processesList: Array<ProcessInfo.AsObject>,
    }
}

export enum ProcessAction {
    PROCESS_ACTION_UNKNOWN = 0,
    PROCESS_ACTION_STARTED = 1,
    PROCESS_ACTION_STOPPED = 2,
}
