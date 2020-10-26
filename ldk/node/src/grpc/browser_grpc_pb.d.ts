// package: proto
// file: browser.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as browser_pb from "./browser_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IBrowserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    browserActiveURL: IBrowserService_IBrowserActiveURL;
    browserActiveURLStream: IBrowserService_IBrowserActiveURLStream;
    browserSelectedText: IBrowserService_IBrowserSelectedText;
    browserSelectedTextStream: IBrowserService_IBrowserSelectedTextStream;
}

interface IBrowserService_IBrowserActiveURL extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, browser_pb.BrowserActiveURLResponse> {
    path: string; // "/proto.Browser/BrowserActiveURL"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<browser_pb.BrowserActiveURLResponse>;
    responseDeserialize: grpc.deserialize<browser_pb.BrowserActiveURLResponse>;
}
interface IBrowserService_IBrowserActiveURLStream extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, browser_pb.BrowserActiveURLStreamResponse> {
    path: string; // "/proto.Browser/BrowserActiveURLStream"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<browser_pb.BrowserActiveURLStreamResponse>;
    responseDeserialize: grpc.deserialize<browser_pb.BrowserActiveURLStreamResponse>;
}
interface IBrowserService_IBrowserSelectedText extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, browser_pb.BrowserSelectedTextResponse> {
    path: string; // "/proto.Browser/BrowserSelectedText"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<browser_pb.BrowserSelectedTextResponse>;
    responseDeserialize: grpc.deserialize<browser_pb.BrowserSelectedTextResponse>;
}
interface IBrowserService_IBrowserSelectedTextStream extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, browser_pb.BrowserSelectedTextStreamResponse> {
    path: string; // "/proto.Browser/BrowserSelectedTextStream"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<browser_pb.BrowserSelectedTextStreamResponse>;
    responseDeserialize: grpc.deserialize<browser_pb.BrowserSelectedTextStreamResponse>;
}

export const BrowserService: IBrowserService;

export interface IBrowserServer {
    browserActiveURL: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, browser_pb.BrowserActiveURLResponse>;
    browserActiveURLStream: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, browser_pb.BrowserActiveURLStreamResponse>;
    browserSelectedText: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, browser_pb.BrowserSelectedTextResponse>;
    browserSelectedTextStream: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, browser_pb.BrowserSelectedTextStreamResponse>;
}

export interface IBrowserClient {
    browserActiveURL(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    browserActiveURL(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    browserActiveURL(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    browserActiveURLStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserActiveURLStreamResponse>;
    browserActiveURLStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserActiveURLStreamResponse>;
    browserSelectedText(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    browserSelectedText(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    browserSelectedText(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    browserSelectedTextStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserSelectedTextStreamResponse>;
    browserSelectedTextStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserSelectedTextStreamResponse>;
}

export class BrowserClient extends grpc.Client implements IBrowserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public browserActiveURL(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    public browserActiveURL(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    public browserActiveURL(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    public browserActiveURLStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserActiveURLStreamResponse>;
    public browserActiveURLStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserActiveURLStreamResponse>;
    public browserSelectedText(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    public browserSelectedText(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    public browserSelectedText(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    public browserSelectedTextStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserSelectedTextStreamResponse>;
    public browserSelectedTextStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserSelectedTextStreamResponse>;
}
