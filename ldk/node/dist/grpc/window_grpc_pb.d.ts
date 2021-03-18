// package: proto
// file: window.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as window_pb from "./window_pb";
import * as session_pb from "./session_pb";

interface IWindowService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    windowActiveWindow: IWindowService_IWindowActiveWindow;
    windowActiveWindowStream: IWindowService_IWindowActiveWindowStream;
    windowState: IWindowService_IWindowState;
    windowStateStream: IWindowService_IWindowStateStream;
}

interface IWindowService_IWindowActiveWindow extends grpc.MethodDefinition<window_pb.WindowActiveWindowRequest, window_pb.WindowActiveWindowResponse> {
    path: "/proto.Window/WindowActiveWindow";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<window_pb.WindowActiveWindowRequest>;
    requestDeserialize: grpc.deserialize<window_pb.WindowActiveWindowRequest>;
    responseSerialize: grpc.serialize<window_pb.WindowActiveWindowResponse>;
    responseDeserialize: grpc.deserialize<window_pb.WindowActiveWindowResponse>;
}
interface IWindowService_IWindowActiveWindowStream extends grpc.MethodDefinition<window_pb.WindowActiveWindowStreamRequest, window_pb.WindowActiveWindowStreamResponse> {
    path: "/proto.Window/WindowActiveWindowStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<window_pb.WindowActiveWindowStreamRequest>;
    requestDeserialize: grpc.deserialize<window_pb.WindowActiveWindowStreamRequest>;
    responseSerialize: grpc.serialize<window_pb.WindowActiveWindowStreamResponse>;
    responseDeserialize: grpc.deserialize<window_pb.WindowActiveWindowStreamResponse>;
}
interface IWindowService_IWindowState extends grpc.MethodDefinition<window_pb.WindowStateRequest, window_pb.WindowStateResponse> {
    path: "/proto.Window/WindowState";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<window_pb.WindowStateRequest>;
    requestDeserialize: grpc.deserialize<window_pb.WindowStateRequest>;
    responseSerialize: grpc.serialize<window_pb.WindowStateResponse>;
    responseDeserialize: grpc.deserialize<window_pb.WindowStateResponse>;
}
interface IWindowService_IWindowStateStream extends grpc.MethodDefinition<window_pb.WindowStateStreamRequest, window_pb.WindowStateStreamResponse> {
    path: "/proto.Window/WindowStateStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<window_pb.WindowStateStreamRequest>;
    requestDeserialize: grpc.deserialize<window_pb.WindowStateStreamRequest>;
    responseSerialize: grpc.serialize<window_pb.WindowStateStreamResponse>;
    responseDeserialize: grpc.deserialize<window_pb.WindowStateStreamResponse>;
}

export const WindowService: IWindowService;

export interface IWindowServer {
    windowActiveWindow: grpc.handleUnaryCall<window_pb.WindowActiveWindowRequest, window_pb.WindowActiveWindowResponse>;
    windowActiveWindowStream: grpc.handleServerStreamingCall<window_pb.WindowActiveWindowStreamRequest, window_pb.WindowActiveWindowStreamResponse>;
    windowState: grpc.handleUnaryCall<window_pb.WindowStateRequest, window_pb.WindowStateResponse>;
    windowStateStream: grpc.handleServerStreamingCall<window_pb.WindowStateStreamRequest, window_pb.WindowStateStreamResponse>;
}

export interface IWindowClient {
    windowActiveWindow(request: window_pb.WindowActiveWindowRequest, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    windowActiveWindow(request: window_pb.WindowActiveWindowRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    windowActiveWindow(request: window_pb.WindowActiveWindowRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    windowActiveWindowStream(request: window_pb.WindowActiveWindowStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowActiveWindowStreamResponse>;
    windowActiveWindowStream(request: window_pb.WindowActiveWindowStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowActiveWindowStreamResponse>;
    windowState(request: window_pb.WindowStateRequest, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    windowState(request: window_pb.WindowStateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    windowState(request: window_pb.WindowStateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    windowStateStream(request: window_pb.WindowStateStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowStateStreamResponse>;
    windowStateStream(request: window_pb.WindowStateStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowStateStreamResponse>;
}

export class WindowClient extends grpc.Client implements IWindowClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public windowActiveWindow(request: window_pb.WindowActiveWindowRequest, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    public windowActiveWindow(request: window_pb.WindowActiveWindowRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    public windowActiveWindow(request: window_pb.WindowActiveWindowRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: window_pb.WindowActiveWindowResponse) => void): grpc.ClientUnaryCall;
    public windowActiveWindowStream(request: window_pb.WindowActiveWindowStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowActiveWindowStreamResponse>;
    public windowActiveWindowStream(request: window_pb.WindowActiveWindowStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowActiveWindowStreamResponse>;
    public windowState(request: window_pb.WindowStateRequest, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    public windowState(request: window_pb.WindowStateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    public windowState(request: window_pb.WindowStateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: window_pb.WindowStateResponse) => void): grpc.ClientUnaryCall;
    public windowStateStream(request: window_pb.WindowStateStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowStateStreamResponse>;
    public windowStateStream(request: window_pb.WindowStateStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<window_pb.WindowStateStreamResponse>;
}
