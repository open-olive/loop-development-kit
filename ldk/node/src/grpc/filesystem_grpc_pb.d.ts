// package: proto
// file: filesystem.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as filesystem_pb from "./filesystem_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface IFilesystemService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    filesystemDir: IFilesystemService_IFilesystemDir;
    filesystemDirStream: IFilesystemService_IFilesystemDirStream;
    filesystemFile: IFilesystemService_IFilesystemFile;
    filesystemFileStream: IFilesystemService_IFilesystemFileStream;
}

interface IFilesystemService_IFilesystemDir extends grpc.MethodDefinition<filesystem_pb.FilesystemDirRequest, filesystem_pb.FilesystemDirResponse> {
    path: string; // "/proto.Filesystem/FilesystemDir"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemDirRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemDirRequest>;
    responseSerialize: grpc.serialize<filesystem_pb.FilesystemDirResponse>;
    responseDeserialize: grpc.deserialize<filesystem_pb.FilesystemDirResponse>;
}
interface IFilesystemService_IFilesystemDirStream extends grpc.MethodDefinition<filesystem_pb.FilesystemDirStreamRequest, filesystem_pb.FilesystemDirStreamResponse> {
    path: string; // "/proto.Filesystem/FilesystemDirStream"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemDirStreamRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemDirStreamRequest>;
    responseSerialize: grpc.serialize<filesystem_pb.FilesystemDirStreamResponse>;
    responseDeserialize: grpc.deserialize<filesystem_pb.FilesystemDirStreamResponse>;
}
interface IFilesystemService_IFilesystemFile extends grpc.MethodDefinition<filesystem_pb.FilesystemFileRequest, filesystem_pb.FilesystemFileResponse> {
    path: string; // "/proto.Filesystem/FilesystemFile"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemFileRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemFileRequest>;
    responseSerialize: grpc.serialize<filesystem_pb.FilesystemFileResponse>;
    responseDeserialize: grpc.deserialize<filesystem_pb.FilesystemFileResponse>;
}
interface IFilesystemService_IFilesystemFileStream extends grpc.MethodDefinition<filesystem_pb.FilesystemFileStreamRequest, filesystem_pb.FilesystemFileStreamResponse> {
    path: string; // "/proto.Filesystem/FilesystemFileStream"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemFileStreamRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemFileStreamRequest>;
    responseSerialize: grpc.serialize<filesystem_pb.FilesystemFileStreamResponse>;
    responseDeserialize: grpc.deserialize<filesystem_pb.FilesystemFileStreamResponse>;
}

export const FilesystemService: IFilesystemService;

export interface IFilesystemServer {
    filesystemDir: grpc.handleUnaryCall<filesystem_pb.FilesystemDirRequest, filesystem_pb.FilesystemDirResponse>;
    filesystemDirStream: grpc.handleServerStreamingCall<filesystem_pb.FilesystemDirStreamRequest, filesystem_pb.FilesystemDirStreamResponse>;
    filesystemFile: grpc.handleUnaryCall<filesystem_pb.FilesystemFileRequest, filesystem_pb.FilesystemFileResponse>;
    filesystemFileStream: grpc.handleServerStreamingCall<filesystem_pb.FilesystemFileStreamRequest, filesystem_pb.FilesystemFileStreamResponse>;
}

export interface IFilesystemClient {
    filesystemDir(request: filesystem_pb.FilesystemDirRequest, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    filesystemDir(request: filesystem_pb.FilesystemDirRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    filesystemDir(request: filesystem_pb.FilesystemDirRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    filesystemDirStream(request: filesystem_pb.FilesystemDirStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemDirStreamResponse>;
    filesystemDirStream(request: filesystem_pb.FilesystemDirStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemDirStreamResponse>;
    filesystemFile(request: filesystem_pb.FilesystemFileRequest, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemFileResponse) => void): grpc.ClientUnaryCall;
    filesystemFile(request: filesystem_pb.FilesystemFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemFileResponse) => void): grpc.ClientUnaryCall;
    filesystemFile(request: filesystem_pb.FilesystemFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemFileResponse) => void): grpc.ClientUnaryCall;
    filesystemFileStream(request: filesystem_pb.FilesystemFileStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemFileStreamResponse>;
    filesystemFileStream(request: filesystem_pb.FilesystemFileStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemFileStreamResponse>;
}

export class FilesystemClient extends grpc.Client implements IFilesystemClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public filesystemDir(request: filesystem_pb.FilesystemDirRequest, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    public filesystemDir(request: filesystem_pb.FilesystemDirRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    public filesystemDir(request: filesystem_pb.FilesystemDirRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    public filesystemDirStream(request: filesystem_pb.FilesystemDirStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemDirStreamResponse>;
    public filesystemDirStream(request: filesystem_pb.FilesystemDirStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemDirStreamResponse>;
    public filesystemFile(request: filesystem_pb.FilesystemFileRequest, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemFileResponse) => void): grpc.ClientUnaryCall;
    public filesystemFile(request: filesystem_pb.FilesystemFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemFileResponse) => void): grpc.ClientUnaryCall;
    public filesystemFile(request: filesystem_pb.FilesystemFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemFileResponse) => void): grpc.ClientUnaryCall;
    public filesystemFileStream(request: filesystem_pb.FilesystemFileStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemFileStreamResponse>;
    public filesystemFileStream(request: filesystem_pb.FilesystemFileStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemFileStreamResponse>;
}
