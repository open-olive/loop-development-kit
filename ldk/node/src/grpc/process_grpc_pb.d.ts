// package: proto
// file: process.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as process_pb from "./process_pb";
import * as session_pb from "./session_pb";

interface IProcessService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    processStateStream: IProcessService_IProcessStateStream;
    processState: IProcessService_IProcessState;
}

interface IProcessService_IProcessStateStream extends grpc.MethodDefinition<process_pb.ProcessStateStreamRequest, process_pb.ProcessStateStreamResponse> {
    path: "/proto.Process/ProcessStateStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<process_pb.ProcessStateStreamRequest>;
    requestDeserialize: grpc.deserialize<process_pb.ProcessStateStreamRequest>;
    responseSerialize: grpc.serialize<process_pb.ProcessStateStreamResponse>;
    responseDeserialize: grpc.deserialize<process_pb.ProcessStateStreamResponse>;
}
interface IProcessService_IProcessState extends grpc.MethodDefinition<process_pb.ProcessStateRequest, process_pb.ProcessStateResponse> {
    path: "/proto.Process/ProcessState";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<process_pb.ProcessStateRequest>;
    requestDeserialize: grpc.deserialize<process_pb.ProcessStateRequest>;
    responseSerialize: grpc.serialize<process_pb.ProcessStateResponse>;
    responseDeserialize: grpc.deserialize<process_pb.ProcessStateResponse>;
}

export const ProcessService: IProcessService;

export interface IProcessServer {
    processStateStream: grpc.handleServerStreamingCall<process_pb.ProcessStateStreamRequest, process_pb.ProcessStateStreamResponse>;
    processState: grpc.handleUnaryCall<process_pb.ProcessStateRequest, process_pb.ProcessStateResponse>;
}

export interface IProcessClient {
    processStateStream(request: process_pb.ProcessStateStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<process_pb.ProcessStateStreamResponse>;
    processStateStream(request: process_pb.ProcessStateStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<process_pb.ProcessStateStreamResponse>;
    processState(request: process_pb.ProcessStateRequest, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
    processState(request: process_pb.ProcessStateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
    processState(request: process_pb.ProcessStateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
}

export class ProcessClient extends grpc.Client implements IProcessClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public processStateStream(request: process_pb.ProcessStateStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<process_pb.ProcessStateStreamResponse>;
    public processStateStream(request: process_pb.ProcessStateStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<process_pb.ProcessStateStreamResponse>;
    public processState(request: process_pb.ProcessStateRequest, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
    public processState(request: process_pb.ProcessStateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
    public processState(request: process_pb.ProcessStateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: process_pb.ProcessStateResponse) => void): grpc.ClientUnaryCall;
}
