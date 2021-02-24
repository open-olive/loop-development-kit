// package: proto
// file: window.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as session_pb from "./session_pb";

export class WindowInfo extends jspb.Message { 
    getTitle(): string;
    setTitle(value: string): WindowInfo;

    getPath(): string;
    setPath(value: string): WindowInfo;

    getPid(): number;
    setPid(value: number): WindowInfo;

    getX(): number;
    setX(value: number): WindowInfo;

    getY(): number;
    setY(value: number): WindowInfo;

    getWidth(): number;
    setWidth(value: number): WindowInfo;

    getHeight(): number;
    setHeight(value: number): WindowInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WindowInfo.AsObject;
    static toObject(includeInstance: boolean, msg: WindowInfo): WindowInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WindowInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WindowInfo;
    static deserializeBinaryFromReader(message: WindowInfo, reader: jspb.BinaryReader): WindowInfo;
}

export namespace WindowInfo {
    export type AsObject = {
        title: string,
        path: string,
        pid: number,
        x: number,
        y: number,
        width: number,
        height: number,
    }
}

export class WindowActiveWindowResponse extends jspb.Message { 

    hasWindow(): boolean;
    clearWindow(): void;
    getWindow(): WindowInfo | undefined;
    setWindow(value?: WindowInfo): WindowActiveWindowResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WindowActiveWindowResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WindowActiveWindowResponse): WindowActiveWindowResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WindowActiveWindowResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WindowActiveWindowResponse;
    static deserializeBinaryFromReader(message: WindowActiveWindowResponse, reader: jspb.BinaryReader): WindowActiveWindowResponse;
}

export namespace WindowActiveWindowResponse {
    export type AsObject = {
        window?: WindowInfo.AsObject,
    }
}

export class WindowActiveWindowStreamResponse extends jspb.Message { 

    hasWindow(): boolean;
    clearWindow(): void;
    getWindow(): WindowInfo | undefined;
    setWindow(value?: WindowInfo): WindowActiveWindowStreamResponse;

    getError(): string;
    setError(value: string): WindowActiveWindowStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WindowActiveWindowStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WindowActiveWindowStreamResponse): WindowActiveWindowStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WindowActiveWindowStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WindowActiveWindowStreamResponse;
    static deserializeBinaryFromReader(message: WindowActiveWindowStreamResponse, reader: jspb.BinaryReader): WindowActiveWindowStreamResponse;
}

export namespace WindowActiveWindowStreamResponse {
    export type AsObject = {
        window?: WindowInfo.AsObject,
        error: string,
    }
}

export class WindowStateResponse extends jspb.Message { 
    clearWindowList(): void;
    getWindowList(): Array<WindowInfo>;
    setWindowList(value: Array<WindowInfo>): WindowStateResponse;
    addWindow(value?: WindowInfo, index?: number): WindowInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WindowStateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WindowStateResponse): WindowStateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WindowStateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WindowStateResponse;
    static deserializeBinaryFromReader(message: WindowStateResponse, reader: jspb.BinaryReader): WindowStateResponse;
}

export namespace WindowStateResponse {
    export type AsObject = {
        windowList: Array<WindowInfo.AsObject>,
    }
}

export class WindowStateStreamResponse extends jspb.Message { 

    hasWindow(): boolean;
    clearWindow(): void;
    getWindow(): WindowInfo | undefined;
    setWindow(value?: WindowInfo): WindowStateStreamResponse;

    getAction(): WindowActionPB;
    setAction(value: WindowActionPB): WindowStateStreamResponse;

    getError(): string;
    setError(value: string): WindowStateStreamResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WindowStateStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WindowStateStreamResponse): WindowStateStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WindowStateStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WindowStateStreamResponse;
    static deserializeBinaryFromReader(message: WindowStateStreamResponse, reader: jspb.BinaryReader): WindowStateStreamResponse;
}

export namespace WindowStateStreamResponse {
    export type AsObject = {
        window?: WindowInfo.AsObject,
        action: WindowActionPB,
        error: string,
    }
}

export class WindowActiveWindowRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): WindowActiveWindowRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WindowActiveWindowRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WindowActiveWindowRequest): WindowActiveWindowRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WindowActiveWindowRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WindowActiveWindowRequest;
    static deserializeBinaryFromReader(message: WindowActiveWindowRequest, reader: jspb.BinaryReader): WindowActiveWindowRequest;
}

export namespace WindowActiveWindowRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class WindowActiveWindowStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): WindowActiveWindowStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WindowActiveWindowStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WindowActiveWindowStreamRequest): WindowActiveWindowStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WindowActiveWindowStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WindowActiveWindowStreamRequest;
    static deserializeBinaryFromReader(message: WindowActiveWindowStreamRequest, reader: jspb.BinaryReader): WindowActiveWindowStreamRequest;
}

export namespace WindowActiveWindowStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class WindowStateRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): WindowStateRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WindowStateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WindowStateRequest): WindowStateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WindowStateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WindowStateRequest;
    static deserializeBinaryFromReader(message: WindowStateRequest, reader: jspb.BinaryReader): WindowStateRequest;
}

export namespace WindowStateRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export class WindowStateStreamRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): WindowStateStreamRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WindowStateStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WindowStateStreamRequest): WindowStateStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WindowStateStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WindowStateStreamRequest;
    static deserializeBinaryFromReader(message: WindowStateStreamRequest, reader: jspb.BinaryReader): WindowStateStreamRequest;
}

export namespace WindowStateStreamRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
    }
}

export enum WindowActionPB {
    WINDOW_ACTION_UNKNOWN = 0,
    WINDOW_ACTION_FOCUSED = 1,
    WINDOW_ACTION_UNFOCUSED = 2,
    WINDOW_ACTION_OPENED = 3,
    WINDOW_ACTION_CLOSED = 4,
    WINDOW_ACTION_MOVED = 5,
    WINDOW_ACTION_RESIZED = 6,
    WINDOW_ACTION_TITLE_CHANGED = 7,
}
