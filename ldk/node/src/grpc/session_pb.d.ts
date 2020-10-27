// package: proto
// file: session.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Session extends jspb.Message { 
    getLoopid(): string;
    setLoopid(value: string): Session;

    getToken(): string;
    setToken(value: string): Session;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Session.AsObject;
    static toObject(includeInstance: boolean, msg: Session): Session.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Session, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Session;
    static deserializeBinaryFromReader(message: Session, reader: jspb.BinaryReader): Session;
}

export namespace Session {
    export type AsObject = {
        loopid: string,
        token: string,
    }
}
