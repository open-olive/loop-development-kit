// package: plugin
// file: stdio.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class StdioData extends jspb.Message { 
    getChannel(): StdioData.Channel;
    setChannel(value: StdioData.Channel): StdioData;

    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): StdioData;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StdioData.AsObject;
    static toObject(includeInstance: boolean, msg: StdioData): StdioData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StdioData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StdioData;
    static deserializeBinaryFromReader(message: StdioData, reader: jspb.BinaryReader): StdioData;
}

export namespace StdioData {
    export type AsObject = {
        channel: StdioData.Channel,
        data: Uint8Array | string,
    }

    export enum Channel {
    INVALID = 0,
    STDOUT = 1,
    STDERR = 2,
    }

}
