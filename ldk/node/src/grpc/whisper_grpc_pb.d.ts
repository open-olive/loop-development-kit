// package: proto
// file: whisper.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as whisper_pb from "./whisper_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as session_pb from "./session_pb";

interface IWhisperService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    whisperMarkdown: IWhisperService_IWhisperMarkdown;
    whisperConfirm: IWhisperService_IWhisperConfirm;
    whisperForm: IWhisperService_IWhisperForm;
    whisperList: IWhisperService_IWhisperList;
}

interface IWhisperService_IWhisperMarkdown extends grpc.MethodDefinition<whisper_pb.WhisperMarkdownRequest, google_protobuf_empty_pb.Empty> {
    path: string; // "/proto.Whisper/WhisperMarkdown"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<whisper_pb.WhisperMarkdownRequest>;
    requestDeserialize: grpc.deserialize<whisper_pb.WhisperMarkdownRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IWhisperService_IWhisperConfirm extends grpc.MethodDefinition<whisper_pb.WhisperConfirmRequest, whisper_pb.WhisperConfirmResponse> {
    path: string; // "/proto.Whisper/WhisperConfirm"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<whisper_pb.WhisperConfirmRequest>;
    requestDeserialize: grpc.deserialize<whisper_pb.WhisperConfirmRequest>;
    responseSerialize: grpc.serialize<whisper_pb.WhisperConfirmResponse>;
    responseDeserialize: grpc.deserialize<whisper_pb.WhisperConfirmResponse>;
}
interface IWhisperService_IWhisperForm extends grpc.MethodDefinition<whisper_pb.WhisperFormRequest, whisper_pb.WhisperFormStreamResponse> {
    path: string; // "/proto.Whisper/WhisperForm"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<whisper_pb.WhisperFormRequest>;
    requestDeserialize: grpc.deserialize<whisper_pb.WhisperFormRequest>;
    responseSerialize: grpc.serialize<whisper_pb.WhisperFormStreamResponse>;
    responseDeserialize: grpc.deserialize<whisper_pb.WhisperFormStreamResponse>;
}
interface IWhisperService_IWhisperList extends grpc.MethodDefinition<whisper_pb.WhisperListRequest, google_protobuf_empty_pb.Empty> {
    path: string; // "/proto.Whisper/WhisperList"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<whisper_pb.WhisperListRequest>;
    requestDeserialize: grpc.deserialize<whisper_pb.WhisperListRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const WhisperService: IWhisperService;

export interface IWhisperServer {
    whisperMarkdown: grpc.handleUnaryCall<whisper_pb.WhisperMarkdownRequest, google_protobuf_empty_pb.Empty>;
    whisperConfirm: grpc.handleUnaryCall<whisper_pb.WhisperConfirmRequest, whisper_pb.WhisperConfirmResponse>;
    whisperForm: grpc.handleServerStreamingCall<whisper_pb.WhisperFormRequest, whisper_pb.WhisperFormStreamResponse>;
    whisperList: grpc.handleUnaryCall<whisper_pb.WhisperListRequest, google_protobuf_empty_pb.Empty>;
}

export interface IWhisperClient {
    whisperMarkdown(request: whisper_pb.WhisperMarkdownRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    whisperMarkdown(request: whisper_pb.WhisperMarkdownRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    whisperMarkdown(request: whisper_pb.WhisperMarkdownRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    whisperConfirm(request: whisper_pb.WhisperConfirmRequest, callback: (error: grpc.ServiceError | null, response: whisper_pb.WhisperConfirmResponse) => void): grpc.ClientUnaryCall;
    whisperConfirm(request: whisper_pb.WhisperConfirmRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: whisper_pb.WhisperConfirmResponse) => void): grpc.ClientUnaryCall;
    whisperConfirm(request: whisper_pb.WhisperConfirmRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: whisper_pb.WhisperConfirmResponse) => void): grpc.ClientUnaryCall;
    whisperForm(request: whisper_pb.WhisperFormRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<whisper_pb.WhisperFormStreamResponse>;
    whisperForm(request: whisper_pb.WhisperFormRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<whisper_pb.WhisperFormStreamResponse>;
    whisperList(request: whisper_pb.WhisperListRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    whisperList(request: whisper_pb.WhisperListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    whisperList(request: whisper_pb.WhisperListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class WhisperClient extends grpc.Client implements IWhisperClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public whisperMarkdown(request: whisper_pb.WhisperMarkdownRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public whisperMarkdown(request: whisper_pb.WhisperMarkdownRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public whisperMarkdown(request: whisper_pb.WhisperMarkdownRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public whisperConfirm(request: whisper_pb.WhisperConfirmRequest, callback: (error: grpc.ServiceError | null, response: whisper_pb.WhisperConfirmResponse) => void): grpc.ClientUnaryCall;
    public whisperConfirm(request: whisper_pb.WhisperConfirmRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: whisper_pb.WhisperConfirmResponse) => void): grpc.ClientUnaryCall;
    public whisperConfirm(request: whisper_pb.WhisperConfirmRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: whisper_pb.WhisperConfirmResponse) => void): grpc.ClientUnaryCall;
    public whisperForm(request: whisper_pb.WhisperFormRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<whisper_pb.WhisperFormStreamResponse>;
    public whisperForm(request: whisper_pb.WhisperFormRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<whisper_pb.WhisperFormStreamResponse>;
    public whisperList(request: whisper_pb.WhisperListRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public whisperList(request: whisper_pb.WhisperListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public whisperList(request: whisper_pb.WhisperListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
