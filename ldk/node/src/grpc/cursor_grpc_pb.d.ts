// package: proto
// file: cursor.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as cursor_pb from "./cursor_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface ICursorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    cursorPosition: ICursorService_ICursorPosition;
    cursorPositionStream: ICursorService_ICursorPositionStream;
}

interface ICursorService_ICursorPosition extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, cursor_pb.CursorPositionResponse> {
    path: string; // "/proto.Cursor/CursorPosition"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<cursor_pb.CursorPositionResponse>;
    responseDeserialize: grpc.deserialize<cursor_pb.CursorPositionResponse>;
}
interface ICursorService_ICursorPositionStream extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, cursor_pb.CursorPositionStreamResponse> {
    path: string; // "/proto.Cursor/CursorPositionStream"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<cursor_pb.CursorPositionStreamResponse>;
    responseDeserialize: grpc.deserialize<cursor_pb.CursorPositionStreamResponse>;
}

export const CursorService: ICursorService;

export interface ICursorServer {
    cursorPosition: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, cursor_pb.CursorPositionResponse>;
    cursorPositionStream: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, cursor_pb.CursorPositionStreamResponse>;
}

export interface ICursorClient {
    cursorPosition(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    cursorPosition(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    cursorPosition(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    cursorPositionStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cursor_pb.CursorPositionStreamResponse>;
    cursorPositionStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cursor_pb.CursorPositionStreamResponse>;
}

export class CursorClient extends grpc.Client implements ICursorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public cursorPosition(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    public cursorPosition(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    public cursorPosition(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cursor_pb.CursorPositionResponse) => void): grpc.ClientUnaryCall;
    public cursorPositionStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cursor_pb.CursorPositionStreamResponse>;
    public cursorPositionStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<cursor_pb.CursorPositionStreamResponse>;
}
