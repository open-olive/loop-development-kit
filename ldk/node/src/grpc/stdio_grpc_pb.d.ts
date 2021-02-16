// package: plugin
// file: stdio.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as stdio_pb from "./stdio_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IGRPCStdioService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    streamStdio: IGRPCStdioService_IStreamStdio;
}

interface IGRPCStdioService_IStreamStdio extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, stdio_pb.StdioData> {
    path: "/plugin.GRPCStdio/StreamStdio";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<stdio_pb.StdioData>;
    responseDeserialize: grpc.deserialize<stdio_pb.StdioData>;
}

export const GRPCStdioService: IGRPCStdioService;

export interface IGRPCStdioServer {
    streamStdio: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, stdio_pb.StdioData>;
}

export interface IGRPCStdioClient {
    streamStdio(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<stdio_pb.StdioData>;
    streamStdio(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<stdio_pb.StdioData>;
}

export class GRPCStdioClient extends grpc.Client implements IGRPCStdioClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public streamStdio(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<stdio_pb.StdioData>;
    public streamStdio(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<stdio_pb.StdioData>;
}
