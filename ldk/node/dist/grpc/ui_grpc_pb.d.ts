// package: proto
// file: ui.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as ui_pb from "./ui_pb";
import * as session_pb from "./session_pb";

interface IUIService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    globalSearchStream: IUIService_IGlobalSearchStream;
    searchbarStream: IUIService_ISearchbarStream;
}

interface IUIService_IGlobalSearchStream extends grpc.MethodDefinition<ui_pb.GlobalSearchStreamRequest, ui_pb.GlobalSearchStreamResponse> {
    path: "/proto.UI/GlobalSearchStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<ui_pb.GlobalSearchStreamRequest>;
    requestDeserialize: grpc.deserialize<ui_pb.GlobalSearchStreamRequest>;
    responseSerialize: grpc.serialize<ui_pb.GlobalSearchStreamResponse>;
    responseDeserialize: grpc.deserialize<ui_pb.GlobalSearchStreamResponse>;
}
interface IUIService_ISearchbarStream extends grpc.MethodDefinition<ui_pb.SearchbarStreamRequest, ui_pb.SearchbarStreamResponse> {
    path: "/proto.UI/SearchbarStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<ui_pb.SearchbarStreamRequest>;
    requestDeserialize: grpc.deserialize<ui_pb.SearchbarStreamRequest>;
    responseSerialize: grpc.serialize<ui_pb.SearchbarStreamResponse>;
    responseDeserialize: grpc.deserialize<ui_pb.SearchbarStreamResponse>;
}

export const UIService: IUIService;

export interface IUIServer {
    globalSearchStream: grpc.handleServerStreamingCall<ui_pb.GlobalSearchStreamRequest, ui_pb.GlobalSearchStreamResponse>;
    searchbarStream: grpc.handleServerStreamingCall<ui_pb.SearchbarStreamRequest, ui_pb.SearchbarStreamResponse>;
}

export interface IUIClient {
    globalSearchStream(request: ui_pb.GlobalSearchStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<ui_pb.GlobalSearchStreamResponse>;
    globalSearchStream(request: ui_pb.GlobalSearchStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<ui_pb.GlobalSearchStreamResponse>;
    searchbarStream(request: ui_pb.SearchbarStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<ui_pb.SearchbarStreamResponse>;
    searchbarStream(request: ui_pb.SearchbarStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<ui_pb.SearchbarStreamResponse>;
}

export class UIClient extends grpc.Client implements IUIClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public globalSearchStream(request: ui_pb.GlobalSearchStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<ui_pb.GlobalSearchStreamResponse>;
    public globalSearchStream(request: ui_pb.GlobalSearchStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<ui_pb.GlobalSearchStreamResponse>;
    public searchbarStream(request: ui_pb.SearchbarStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<ui_pb.SearchbarStreamResponse>;
    public searchbarStream(request: ui_pb.SearchbarStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<ui_pb.SearchbarStreamResponse>;
}
