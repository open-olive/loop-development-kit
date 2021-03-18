// package: proto
// file: network.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as network_pb from "./network_pb";
import * as session_pb from "./session_pb";

interface INetworkService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    hTTPRequest: INetworkService_IHTTPRequest;
}

interface INetworkService_IHTTPRequest extends grpc.MethodDefinition<network_pb.HTTPRequestMsg, network_pb.HTTPResponseMsg> {
    path: "/proto.Network/HTTPRequest";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<network_pb.HTTPRequestMsg>;
    requestDeserialize: grpc.deserialize<network_pb.HTTPRequestMsg>;
    responseSerialize: grpc.serialize<network_pb.HTTPResponseMsg>;
    responseDeserialize: grpc.deserialize<network_pb.HTTPResponseMsg>;
}

export const NetworkService: INetworkService;

export interface INetworkServer {
    hTTPRequest: grpc.handleUnaryCall<network_pb.HTTPRequestMsg, network_pb.HTTPResponseMsg>;
}

export interface INetworkClient {
    hTTPRequest(request: network_pb.HTTPRequestMsg, callback: (error: grpc.ServiceError | null, response: network_pb.HTTPResponseMsg) => void): grpc.ClientUnaryCall;
    hTTPRequest(request: network_pb.HTTPRequestMsg, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: network_pb.HTTPResponseMsg) => void): grpc.ClientUnaryCall;
    hTTPRequest(request: network_pb.HTTPRequestMsg, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: network_pb.HTTPResponseMsg) => void): grpc.ClientUnaryCall;
}

export class NetworkClient extends grpc.Client implements INetworkClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public hTTPRequest(request: network_pb.HTTPRequestMsg, callback: (error: grpc.ServiceError | null, response: network_pb.HTTPResponseMsg) => void): grpc.ClientUnaryCall;
    public hTTPRequest(request: network_pb.HTTPRequestMsg, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: network_pb.HTTPResponseMsg) => void): grpc.ClientUnaryCall;
    public hTTPRequest(request: network_pb.HTTPRequestMsg, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: network_pb.HTTPResponseMsg) => void): grpc.ClientUnaryCall;
}
