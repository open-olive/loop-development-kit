// package: plugin
// file: broker.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as broker_pb from "./broker_pb";

interface IGRPCBrokerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    startStream: IGRPCBrokerService_IStartStream;
}

interface IGRPCBrokerService_IStartStream extends grpc.MethodDefinition<broker_pb.ConnInfo, broker_pb.ConnInfo> {
    path: "/plugin.GRPCBroker/StartStream";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<broker_pb.ConnInfo>;
    requestDeserialize: grpc.deserialize<broker_pb.ConnInfo>;
    responseSerialize: grpc.serialize<broker_pb.ConnInfo>;
    responseDeserialize: grpc.deserialize<broker_pb.ConnInfo>;
}

export const GRPCBrokerService: IGRPCBrokerService;

export interface IGRPCBrokerServer {
    startStream: grpc.handleBidiStreamingCall<broker_pb.ConnInfo, broker_pb.ConnInfo>;
}

export interface IGRPCBrokerClient {
    startStream(): grpc.ClientDuplexStream<broker_pb.ConnInfo, broker_pb.ConnInfo>;
    startStream(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<broker_pb.ConnInfo, broker_pb.ConnInfo>;
    startStream(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<broker_pb.ConnInfo, broker_pb.ConnInfo>;
}

export class GRPCBrokerClient extends grpc.Client implements IGRPCBrokerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public startStream(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<broker_pb.ConnInfo, broker_pb.ConnInfo>;
    public startStream(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<broker_pb.ConnInfo, broker_pb.ConnInfo>;
}
