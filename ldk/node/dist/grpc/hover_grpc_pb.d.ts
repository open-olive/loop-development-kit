// package: proto
// file: hover.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as hover_pb from "./hover_pb";
import * as session_pb from "./session_pb";

interface IHoverService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    hoverRead: IHoverService_IHoverRead;
    hoverReadStream: IHoverService_IHoverReadStream;
}

interface IHoverService_IHoverRead extends grpc.MethodDefinition<hover_pb.HoverReadRequest, hover_pb.HoverReadResponse> {
    path: "/proto.Hover/HoverRead";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<hover_pb.HoverReadRequest>;
    requestDeserialize: grpc.deserialize<hover_pb.HoverReadRequest>;
    responseSerialize: grpc.serialize<hover_pb.HoverReadResponse>;
    responseDeserialize: grpc.deserialize<hover_pb.HoverReadResponse>;
}
interface IHoverService_IHoverReadStream extends grpc.MethodDefinition<hover_pb.HoverReadStreamRequest, hover_pb.HoverReadStreamResponse> {
    path: "/proto.Hover/HoverReadStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<hover_pb.HoverReadStreamRequest>;
    requestDeserialize: grpc.deserialize<hover_pb.HoverReadStreamRequest>;
    responseSerialize: grpc.serialize<hover_pb.HoverReadStreamResponse>;
    responseDeserialize: grpc.deserialize<hover_pb.HoverReadStreamResponse>;
}

export const HoverService: IHoverService;

export interface IHoverServer {
    hoverRead: grpc.handleUnaryCall<hover_pb.HoverReadRequest, hover_pb.HoverReadResponse>;
    hoverReadStream: grpc.handleServerStreamingCall<hover_pb.HoverReadStreamRequest, hover_pb.HoverReadStreamResponse>;
}

export interface IHoverClient {
    hoverRead(request: hover_pb.HoverReadRequest, callback: (error: grpc.ServiceError | null, response: hover_pb.HoverReadResponse) => void): grpc.ClientUnaryCall;
    hoverRead(request: hover_pb.HoverReadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: hover_pb.HoverReadResponse) => void): grpc.ClientUnaryCall;
    hoverRead(request: hover_pb.HoverReadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: hover_pb.HoverReadResponse) => void): grpc.ClientUnaryCall;
    hoverReadStream(request: hover_pb.HoverReadStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<hover_pb.HoverReadStreamResponse>;
    hoverReadStream(request: hover_pb.HoverReadStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<hover_pb.HoverReadStreamResponse>;
}

export class HoverClient extends grpc.Client implements IHoverClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public hoverRead(request: hover_pb.HoverReadRequest, callback: (error: grpc.ServiceError | null, response: hover_pb.HoverReadResponse) => void): grpc.ClientUnaryCall;
    public hoverRead(request: hover_pb.HoverReadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: hover_pb.HoverReadResponse) => void): grpc.ClientUnaryCall;
    public hoverRead(request: hover_pb.HoverReadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: hover_pb.HoverReadResponse) => void): grpc.ClientUnaryCall;
    public hoverReadStream(request: hover_pb.HoverReadStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<hover_pb.HoverReadStreamResponse>;
    public hoverReadStream(request: hover_pb.HoverReadStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<hover_pb.HoverReadStreamResponse>;
}
