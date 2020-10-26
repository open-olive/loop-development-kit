// package: proto
// file: process.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as process_pb from "./process_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IProcessService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    processStateStream: IProcessService_IProcessStateStream;
    processState: IProcessService_IProcessState;
}

interface IProcessService_IProcessStateStream extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, process_pb.ProcessStateStreamResponse> {
    path: string; // "/proto.Process/ProcessStateStream"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<process_pb.ProcessStateStreamResponse>;
    responseDeserialize: grpc.deserialize<process_pb.ProcessStateStreamResponse>;
}
interface IProcessService_IProcessState extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, process_pb.ProcessStateResponse> {
    path: string; // "/proto.Process/ProcessState"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<process_pb.ProcessStateResponse>;
    responseDeserialize: grpc.deserialize<process_pb.ProcessStateResponse>;
}

export const ProcessService: IProcessService;

export interface IProcessServer {
    processStateStream: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, process_pb.ProcessStateStreamResponse>;
    processState: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, process_pb.ProcessStateResponse>;
}

export interface IProcessClient {
    processStateStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<process_pb.ProcessStateStreamResponse>;
    processStateStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<process_pb.ProcessStateStreamResponse>;
    processState(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
    processState(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
    processState(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
}

export class ProcessClient extends grpc.Client implements IProcessClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public processStateStream(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<process_pb.ProcessStateStreamResponse>;
    public processStateStream(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<process_pb.ProcessStateStreamResponse>;
    public processState(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
    public processState(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
    public processState(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
}
