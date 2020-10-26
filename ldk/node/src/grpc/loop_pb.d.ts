// package: proto
// file: loop.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as session_pb from "./session_pb";

export class serviceHosts extends jspb.Message { 
    getHostwhisper(): number;
    setHostwhisper(value: number): serviceHosts;

    getHoststorage(): number;
    setHoststorage(value: number): serviceHosts;

    getHostclipboard(): number;
    setHostclipboard(value: number): serviceHosts;

    getHostkeyboard(): number;
    setHostkeyboard(value: number): serviceHosts;

    getHostprocess(): number;
    setHostprocess(value: number): serviceHosts;

    getHostbrowser(): number;
    setHostbrowser(value: number): serviceHosts;

    getHostfilesystem(): number;
    setHostfilesystem(value: number): serviceHosts;

    getHosthover(): number;
    setHosthover(value: number): serviceHosts;

    getHostwindow(): number;
    setHostwindow(value: number): serviceHosts;

    getHostcursor(): number;
    setHostcursor(value: number): serviceHosts;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): serviceHosts.AsObject;
    static toObject(includeInstance: boolean, msg: serviceHosts): serviceHosts.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: serviceHosts, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): serviceHosts;
    static deserializeBinaryFromReader(message: serviceHosts, reader: jspb.BinaryReader): serviceHosts;
}

export namespace serviceHosts {
    export type AsObject = {
        hostwhisper: number,
        hoststorage: number,
        hostclipboard: number,
        hostkeyboard: number,
        hostprocess: number,
        hostbrowser: number,
        hostfilesystem: number,
        hosthover: number,
        hostwindow: number,
        hostcursor: number,
    }
}

export class LoopStartRequest extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): LoopStartRequest;


    hasServicehosts(): boolean;
    clearServicehosts(): void;
    getServicehosts(): serviceHosts | undefined;
    setServicehosts(value?: serviceHosts): LoopStartRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoopStartRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoopStartRequest): LoopStartRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoopStartRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoopStartRequest;
    static deserializeBinaryFromReader(message: LoopStartRequest, reader: jspb.BinaryReader): LoopStartRequest;
}

export namespace LoopStartRequest {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        servicehosts?: serviceHosts.AsObject,
    }
}
