// package: proto
// file: cursor.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as cursor_pb from "./cursor_pb";
import * as session_pb from "./session_pb";

interface ICursorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    cursorPosition: ICursorService_ICursorPosition;
    cursorPositionStream: ICursorService_ICursorPositionStream;
}

interface ICursorService_ICursorPosition extends grpc.MethodDefinition<cursor_pb.CursorPositionRequest, cursor_pb.CursorPositionResponse> {
    path: "/proto.Cursor/CursorPosition";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cursor_pb.CursorPositionRequest>;
    requestDeserialize: grpc.deserialize<cursor_pb.CursorPositionRequest>;
    responseSerialize: grpc.serialize<cursor_pb.CursorPositionResponse>;
    responseDeserialize: grpc.deserialize<cursor_pb.CursorPositionResponse>;
}
interface ICursorService_ICursorPositionStream extends grpc.MethodDefinition<cursor_pb.CursorPositionStreamRequest, cursor_pb.CursorPositionStreamResponse> {
    path: "/proto.Cursor/CursorPositionStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<cursor_pb.CursorPositionStreamRequest>;
    requestDeserialize: grpc.deserialize<cursor_pb.CursorPositionStreamRequest>;
    responseSerialize: grpc.serialize<cursor_pb.CursorPositionStreamResponse>;
    responseDeserialize: grpc.deserialize<cursor_pb.CursorPositionStreamResponse>;
}

export const CursorService: ICursorService;

export interface ICursorServer {
    cursorPosition: grpc.handleUnaryCall<cursor_pb.CursorPositionRequest, cursor_pb.CursorPositionResponse>;
    cursorPositionStream: grpc.handleServerStreamingCall<cursor_pb.CursorPositionStreamRequest, cursor_pb.CursorPositionStreamResponse>;
}

export interface ICursorClient {
    cursorPosition(request: cursor_pb.CursorPositionRequest, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    cursorPosition(request: cursor_pb.CursorPositionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    cursorPosition(request: cursor_pb.CursorPositionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    cursorPositionStream(request: cursor_pb.CursorPositionStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cursor_pb.CursorPositionStreamResponse>;
    cursorPositionStream(request: cursor_pb.CursorPositionStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cursor_pb.CursorPositionStreamResponse>;
}

export class CursorClient extends grpc.Client implements ICursorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public cursorPosition(request: cursor_pb.CursorPositionRequest, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    public cursorPosition(request: cursor_pb.CursorPositionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    public cursorPosition(request: cursor_pb.CursorPositionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    public cursorPositionStream(request: cursor_pb.CursorPositionStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cursor_pb.CursorPositionStreamResponse>;
    public cursorPositionStream(request: cursor_pb.CursorPositionStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cursor_pb.CursorPositionStreamResponse>;
}
