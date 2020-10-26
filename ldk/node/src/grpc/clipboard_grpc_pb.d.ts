// package: proto
// file: clipboard.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as clipboard_pb from "./clipboard_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IClipboardService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    clipboardRead: IClipboardService_IClipboardRead;
    clipboardReadStream: IClipboardService_IClipboardReadStream;
    clipboardWrite: IClipboardService_IClipboardWrite;
}

interface IClipboardService_IClipboardRead extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, clipboard_pb.ClipboardReadResponse> {
    path: string; // "/proto.Clipboard/ClipboardRead"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<clipboard_pb.ClipboardReadResponse>;
    responseDeserialize: grpc.deserialize<clipboard_pb.ClipboardReadResponse>;
}
interface IClipboardService_IClipboardReadStream extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, clipboard_pb.ClipboardReadStreamResponse> {
    path: string; // "/proto.Clipboard/ClipboardReadStream"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<clipboard_pb.ClipboardReadStreamResponse>;
    responseDeserialize: grpc.deserialize<clipboard_pb.ClipboardReadStreamResponse>;
}
interface IClipboardService_IClipboardWrite extends grpc.MethodDefinition<clipboard_pb.ClipboardWriteRequest, google_protobuf_empty_pb.Empty> {
    path: string; // "/proto.Clipboard/ClipboardWrite"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<clipboard_pb.ClipboardWriteRequest>;
    requestDeserialize: grpc.deserialize<clipboard_pb.ClipboardWriteRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const ClipboardService: IClipboardService;

export interface IClipboardServer {
    clipboardRead: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, clipboard_pb.ClipboardReadResponse>;
    clipboardReadStream: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, clipboard_pb.ClipboardReadStreamResponse>;
    clipboardWrite: grpc.handleUnaryCall<clipboard_pb.ClipboardWriteRequest, google_protobuf_empty_pb.Empty>;
}

export interface IClipboardClient {
    clipboardRead(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: clipboard_pb.ClipboardReadResponse) => void): grpc.ClientUnaryCall;
    clipboardRead(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: clipboard_pb.ClipboardReadResponse) => void): grpc.ClientUnaryCall;
    clipboardRead(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: clipboard_pb.ClipboardReadResponse) => void): grpc.ClientUnaryCall;
    clipboardReadStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<clipboard_pb.ClipboardReadStreamResponse>;
    clipboardReadStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<clipboard_pb.ClipboardReadStreamResponse>;
    clipboardWrite(request: clipboard_pb.ClipboardWriteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    clipboardWrite(request: clipboard_pb.ClipboardWriteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    clipboardWrite(request: clipboard_pb.ClipboardWriteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class ClipboardClient extends grpc.Client implements IClipboardClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public clipboardRead(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: clipboard_pb.ClipboardReadResponse) => void): grpc.ClientUnaryCall;
    public clipboardRead(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: clipboard_pb.ClipboardReadResponse) => void): grpc.ClientUnaryCall;
    public clipboardRead(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: clipboard_pb.ClipboardReadResponse) => void): grpc.ClientUnaryCall;
    public clipboardReadStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<clipboard_pb.ClipboardReadStreamResponse>;
    public clipboardReadStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<clipboard_pb.ClipboardReadStreamResponse>;
    public clipboardWrite(request: clipboard_pb.ClipboardWriteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public clipboardWrite(request: clipboard_pb.ClipboardWriteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public clipboardWrite(request: clipboard_pb.ClipboardWriteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
