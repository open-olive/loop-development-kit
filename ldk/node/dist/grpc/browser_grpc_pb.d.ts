// package: proto
// file: browser.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as browser_pb from "./browser_pb";
import * as session_pb from "./session_pb";

interface IBrowserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    browserActiveURL: IBrowserService_IBrowserActiveURL;
    browserActiveURLStream: IBrowserService_IBrowserActiveURLStream;
    browserSelectedText: IBrowserService_IBrowserSelectedText;
    browserSelectedTextStream: IBrowserService_IBrowserSelectedTextStream;
}

interface IBrowserService_IBrowserActiveURL extends grpc.MethodDefinition<browser_pb.BrowserActiveURLRequest, browser_pb.BrowserActiveURLResponse> {
    path: "/proto.Browser/BrowserActiveURL";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<browser_pb.BrowserActiveURLRequest>;
    requestDeserialize: grpc.deserialize<browser_pb.BrowserActiveURLRequest>;
    responseSerialize: grpc.serialize<browser_pb.BrowserActiveURLResponse>;
    responseDeserialize: grpc.deserialize<browser_pb.BrowserActiveURLResponse>;
}
interface IBrowserService_IBrowserActiveURLStream extends grpc.MethodDefinition<browser_pb.BrowserActiveURLStreamRequest, browser_pb.BrowserActiveURLStreamResponse> {
    path: "/proto.Browser/BrowserActiveURLStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<browser_pb.BrowserActiveURLStreamRequest>;
    requestDeserialize: grpc.deserialize<browser_pb.BrowserActiveURLStreamRequest>;
    responseSerialize: grpc.serialize<browser_pb.BrowserActiveURLStreamResponse>;
    responseDeserialize: grpc.deserialize<browser_pb.BrowserActiveURLStreamResponse>;
}
interface IBrowserService_IBrowserSelectedText extends grpc.MethodDefinition<browser_pb.BrowserSelectedTextRequest, browser_pb.BrowserSelectedTextResponse> {
    path: "/proto.Browser/BrowserSelectedText";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<browser_pb.BrowserSelectedTextRequest>;
    requestDeserialize: grpc.deserialize<browser_pb.BrowserSelectedTextRequest>;
    responseSerialize: grpc.serialize<browser_pb.BrowserSelectedTextResponse>;
    responseDeserialize: grpc.deserialize<browser_pb.BrowserSelectedTextResponse>;
}
interface IBrowserService_IBrowserSelectedTextStream extends grpc.MethodDefinition<browser_pb.BrowserSelectedTextStreamRequest, browser_pb.BrowserSelectedTextStreamResponse> {
    path: "/proto.Browser/BrowserSelectedTextStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<browser_pb.BrowserSelectedTextStreamRequest>;
    requestDeserialize: grpc.deserialize<browser_pb.BrowserSelectedTextStreamRequest>;
    responseSerialize: grpc.serialize<browser_pb.BrowserSelectedTextStreamResponse>;
    responseDeserialize: grpc.deserialize<browser_pb.BrowserSelectedTextStreamResponse>;
}

export const BrowserService: IBrowserService;

export interface IBrowserServer {
    browserActiveURL: grpc.handleUnaryCall<browser_pb.BrowserActiveURLRequest, browser_pb.BrowserActiveURLResponse>;
    browserActiveURLStream: grpc.handleServerStreamingCall<browser_pb.BrowserActiveURLStreamRequest, browser_pb.BrowserActiveURLStreamResponse>;
    browserSelectedText: grpc.handleUnaryCall<browser_pb.BrowserSelectedTextRequest, browser_pb.BrowserSelectedTextResponse>;
    browserSelectedTextStream: grpc.handleServerStreamingCall<browser_pb.BrowserSelectedTextStreamRequest, browser_pb.BrowserSelectedTextStreamResponse>;
}

export interface IBrowserClient {
    browserActiveURL(request: browser_pb.BrowserActiveURLRequest, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    browserActiveURL(request: browser_pb.BrowserActiveURLRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    browserActiveURL(request: browser_pb.BrowserActiveURLRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    browserActiveURLStream(request: browser_pb.BrowserActiveURLStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserActiveURLStreamResponse>;
    browserActiveURLStream(request: browser_pb.BrowserActiveURLStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserActiveURLStreamResponse>;
    browserSelectedText(request: browser_pb.BrowserSelectedTextRequest, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    browserSelectedText(request: browser_pb.BrowserSelectedTextRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    browserSelectedText(request: browser_pb.BrowserSelectedTextRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    browserSelectedTextStream(request: browser_pb.BrowserSelectedTextStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserSelectedTextStreamResponse>;
    browserSelectedTextStream(request: browser_pb.BrowserSelectedTextStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserSelectedTextStreamResponse>;
}

export class BrowserClient extends grpc.Client implements IBrowserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public browserActiveURL(request: browser_pb.BrowserActiveURLRequest, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    public browserActiveURL(request: browser_pb.BrowserActiveURLRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    public browserActiveURL(request: browser_pb.BrowserActiveURLRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserActiveURLResponse) => void): grpc.ClientUnaryCall;
    public browserActiveURLStream(request: browser_pb.BrowserActiveURLStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserActiveURLStreamResponse>;
    public browserActiveURLStream(request: browser_pb.BrowserActiveURLStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserActiveURLStreamResponse>;
    public browserSelectedText(request: browser_pb.BrowserSelectedTextRequest, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    public browserSelectedText(request: browser_pb.BrowserSelectedTextRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    public browserSelectedText(request: browser_pb.BrowserSelectedTextRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: browser_pb.BrowserSelectedTextResponse) => void): grpc.ClientUnaryCall;
    public browserSelectedTextStream(request: browser_pb.BrowserSelectedTextStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserSelectedTextStreamResponse>;
    public browserSelectedTextStream(request: browser_pb.BrowserSelectedTextStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<browser_pb.BrowserSelectedTextStreamResponse>;
}
