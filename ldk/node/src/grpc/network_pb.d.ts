// package: proto
// file: network.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as session_pb from "./session_pb";

export class HTTPRequestMsg extends jspb.Message { 

    hasSession(): boolean;
    clearSession(): void;
    getSession(): session_pb.Session | undefined;
    setSession(value?: session_pb.Session): HTTPRequestMsg;

    getUrl(): string;
    setUrl(value: string): HTTPRequestMsg;

    getMethod(): string;
    setMethod(value: string): HTTPRequestMsg;

    getBody(): Uint8Array | string;
    getBody_asU8(): Uint8Array;
    getBody_asB64(): string;
    setBody(value: Uint8Array | string): HTTPRequestMsg;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HTTPRequestMsg.AsObject;
    static toObject(includeInstance: boolean, msg: HTTPRequestMsg): HTTPRequestMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HTTPRequestMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HTTPRequestMsg;
    static deserializeBinaryFromReader(message: HTTPRequestMsg, reader: jspb.BinaryReader): HTTPRequestMsg;
}

export namespace HTTPRequestMsg {
    export type AsObject = {
        session?: session_pb.Session.AsObject,
        url: string,
        method: string,
        body: Uint8Array | string,
    }
}

export class HTTPResponseMsg extends jspb.Message { 
    getResponsecode(): number;
    setResponsecode(value: number): HTTPResponseMsg;

    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): HTTPResponseMsg;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HTTPResponseMsg.AsObject;
    static toObject(includeInstance: boolean, msg: HTTPResponseMsg): HTTPResponseMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HTTPResponseMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HTTPResponseMsg;
    static deserializeBinaryFromReader(message: HTTPResponseMsg, reader: jspb.BinaryReader): HTTPResponseMsg;
}

export namespace HTTPResponseMsg {
    export type AsObject = {
        responsecode: number,
        data: Uint8Array | string,
    }
}
