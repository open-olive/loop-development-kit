// package: proto
// file: window.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as window_pb from "./window_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IWindowService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    windowActiveWindow: IWindowService_IWindowActiveWindow;
    windowActiveWindowStream: IWindowService_IWindowActiveWindowStream;
    windowState: IWindowService_IWindowState;
    windowStateStream: IWindowService_IWindowStateStream;
}

interface IWindowService_IWindowActiveWindow extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, window_pb.WindowActiveWindowResponse> {
    path: string; // "/proto.Window/WindowActiveWindow"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<window_pb.WindowActiveWindowResponse>;
    responseDeserialize: grpc.deserialize<window_pb.WindowActiveWindowResponse>;
}
interface IWindowService_IWindowActiveWindowStream extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, window_pb.WindowActiveWindowStreamResponse> {
    path: string; // "/proto.Window/WindowActiveWindowStream"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<window_pb.WindowActiveWindowStreamResponse>;
    responseDeserialize: grpc.deserialize<window_pb.WindowActiveWindowStreamResponse>;
}
interface IWindowService_IWindowState extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, window_pb.WindowStateResponse> {
    path: string; // "/proto.Window/WindowState"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<window_pb.WindowStateResponse>;
    responseDeserialize: grpc.deserialize<window_pb.WindowStateResponse>;
}
interface IWindowService_IWindowStateStream extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, window_pb.WindowStateStreamResponse> {
    path: string; // "/proto.Window/WindowStateStream"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<window_pb.WindowStateStreamResponse>;
    responseDeserialize: grpc.deserialize<window_pb.WindowStateStreamResponse>;
}

export const WindowService: IWindowService;

export interface IWindowServer {
    windowActiveWindow: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, window_pb.WindowActiveWindowResponse>;
    windowActiveWindowStream: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, window_pb.WindowActiveWindowStreamResponse>;
    windowState: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, window_pb.WindowStateResponse>;
    windowStateStream: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, window_pb.WindowStateStreamResponse>;
}

export interface IWindowClient {
    windowActiveWindow(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    windowActiveWindow(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    windowActiveWindow(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    windowActiveWindowStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowActiveWindowStreamResponse>;
    windowActiveWindowStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowActiveWindowStreamResponse>;
    windowState(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    windowState(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    windowState(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    windowStateStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowStateStreamResponse>;
    windowStateStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowStateStreamResponse>;
}

export class WindowClient extends grpc.Client implements IWindowClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public windowActiveWindow(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    public windowActiveWindow(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    public windowActiveWindow(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    public windowActiveWindowStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowActiveWindowStreamResponse>;
    public windowActiveWindowStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowActiveWindowStreamResponse>;
    public windowState(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    public windowState(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    public windowState(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    public windowStateStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowStateStreamResponse>;
    public windowStateStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowStateStreamResponse>;
}
