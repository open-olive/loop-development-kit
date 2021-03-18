// package: proto
// file: filesystem.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as filesystem_pb from "./filesystem_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as session_pb from "./session_pb";

interface IFilesystemService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    filesystemDir: IFilesystemService_IFilesystemDir;
    filesystemDirStream: IFilesystemService_IFilesystemDirStream;
    filesystemFileInfoStream: IFilesystemService_IFilesystemFileInfoStream;
    filesystemFileStream: IFilesystemService_IFilesystemFileStream;
    filesystemMakeDir: IFilesystemService_IFilesystemMakeDir;
    filesystemCopy: IFilesystemService_IFilesystemCopy;
    filesystemMove: IFilesystemService_IFilesystemMove;
    filesystemRemove: IFilesystemService_IFilesystemRemove;
}

interface IFilesystemService_IFilesystemDir extends grpc.MethodDefinition<filesystem_pb.FilesystemDirRequest, filesystem_pb.FilesystemDirResponse> {
    path: "/proto.Filesystem/FilesystemDir";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemDirRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemDirRequest>;
    responseSerialize: grpc.serialize<filesystem_pb.FilesystemDirResponse>;
    responseDeserialize: grpc.deserialize<filesystem_pb.FilesystemDirResponse>;
}
interface IFilesystemService_IFilesystemDirStream extends grpc.MethodDefinition<filesystem_pb.FilesystemDirStreamRequest, filesystem_pb.FilesystemDirStreamResponse> {
    path: "/proto.Filesystem/FilesystemDirStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemDirStreamRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemDirStreamRequest>;
    responseSerialize: grpc.serialize<filesystem_pb.FilesystemDirStreamResponse>;
    responseDeserialize: grpc.deserialize<filesystem_pb.FilesystemDirStreamResponse>;
}
interface IFilesystemService_IFilesystemFileInfoStream extends grpc.MethodDefinition<filesystem_pb.FilesystemFileInfoStreamRequest, filesystem_pb.FilesystemFileInfoStreamResponse> {
    path: "/proto.Filesystem/FilesystemFileInfoStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemFileInfoStreamRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemFileInfoStreamRequest>;
    responseSerialize: grpc.serialize<filesystem_pb.FilesystemFileInfoStreamResponse>;
    responseDeserialize: grpc.deserialize<filesystem_pb.FilesystemFileInfoStreamResponse>;
}
interface IFilesystemService_IFilesystemFileStream extends grpc.MethodDefinition<filesystem_pb.FilesystemFileStreamRequest, filesystem_pb.FilesystemFileStreamResponse> {
    path: "/proto.Filesystem/FilesystemFileStream";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemFileStreamRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemFileStreamRequest>;
    responseSerialize: grpc.serialize<filesystem_pb.FilesystemFileStreamResponse>;
    responseDeserialize: grpc.deserialize<filesystem_pb.FilesystemFileStreamResponse>;
}
interface IFilesystemService_IFilesystemMakeDir extends grpc.MethodDefinition<filesystem_pb.FilesystemMakeDirRequest, google_protobuf_empty_pb.Empty> {
    path: "/proto.Filesystem/FilesystemMakeDir";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemMakeDirRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemMakeDirRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IFilesystemService_IFilesystemCopy extends grpc.MethodDefinition<filesystem_pb.FilesystemCopyRequest, google_protobuf_empty_pb.Empty> {
    path: "/proto.Filesystem/FilesystemCopy";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemCopyRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemCopyRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IFilesystemService_IFilesystemMove extends grpc.MethodDefinition<filesystem_pb.FilesystemMoveRequest, google_protobuf_empty_pb.Empty> {
    path: "/proto.Filesystem/FilesystemMove";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemMoveRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemMoveRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IFilesystemService_IFilesystemRemove extends grpc.MethodDefinition<filesystem_pb.FilesystemRemoveRequest, google_protobuf_empty_pb.Empty> {
    path: "/proto.Filesystem/FilesystemRemove";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<filesystem_pb.FilesystemRemoveRequest>;
    requestDeserialize: grpc.deserialize<filesystem_pb.FilesystemRemoveRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const FilesystemService: IFilesystemService;

export interface IFilesystemServer {
    filesystemDir: grpc.handleUnaryCall<filesystem_pb.FilesystemDirRequest, filesystem_pb.FilesystemDirResponse>;
    filesystemDirStream: grpc.handleServerStreamingCall<filesystem_pb.FilesystemDirStreamRequest, filesystem_pb.FilesystemDirStreamResponse>;
    filesystemFileInfoStream: grpc.handleServerStreamingCall<filesystem_pb.FilesystemFileInfoStreamRequest, filesystem_pb.FilesystemFileInfoStreamResponse>;
    filesystemFileStream: grpc.handleBidiStreamingCall<filesystem_pb.FilesystemFileStreamRequest, filesystem_pb.FilesystemFileStreamResponse>;
    filesystemMakeDir: grpc.handleUnaryCall<filesystem_pb.FilesystemMakeDirRequest, google_protobuf_empty_pb.Empty>;
    filesystemCopy: grpc.handleUnaryCall<filesystem_pb.FilesystemCopyRequest, google_protobuf_empty_pb.Empty>;
    filesystemMove: grpc.handleUnaryCall<filesystem_pb.FilesystemMoveRequest, google_protobuf_empty_pb.Empty>;
    filesystemRemove: grpc.handleUnaryCall<filesystem_pb.FilesystemRemoveRequest, google_protobuf_empty_pb.Empty>;
}

export interface IFilesystemClient {
    filesystemDir(request: filesystem_pb.FilesystemDirRequest, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    filesystemDir(request: filesystem_pb.FilesystemDirRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    filesystemDir(request: filesystem_pb.FilesystemDirRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    filesystemDirStream(request: filesystem_pb.FilesystemDirStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemDirStreamResponse>;
    filesystemDirStream(request: filesystem_pb.FilesystemDirStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemDirStreamResponse>;
    filesystemFileInfoStream(request: filesystem_pb.FilesystemFileInfoStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemFileInfoStreamResponse>;
    filesystemFileInfoStream(request: filesystem_pb.FilesystemFileInfoStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemFileInfoStreamResponse>;
    filesystemFileStream(): grpc.ClientDuplexStream<filesystem_pb.FilesystemFileStreamRequest, filesystem_pb.FilesystemFileStreamResponse>;
    filesystemFileStream(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<filesystem_pb.FilesystemFileStreamRequest, filesystem_pb.FilesystemFileStreamResponse>;
    filesystemFileStream(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<filesystem_pb.FilesystemFileStreamRequest, filesystem_pb.FilesystemFileStreamResponse>;
    filesystemMakeDir(request: filesystem_pb.FilesystemMakeDirRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemMakeDir(request: filesystem_pb.FilesystemMakeDirRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemMakeDir(request: filesystem_pb.FilesystemMakeDirRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemCopy(request: filesystem_pb.FilesystemCopyRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemCopy(request: filesystem_pb.FilesystemCopyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemCopy(request: filesystem_pb.FilesystemCopyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemMove(request: filesystem_pb.FilesystemMoveRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemMove(request: filesystem_pb.FilesystemMoveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemMove(request: filesystem_pb.FilesystemMoveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemRemove(request: filesystem_pb.FilesystemRemoveRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemRemove(request: filesystem_pb.FilesystemRemoveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    filesystemRemove(request: filesystem_pb.FilesystemRemoveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class FilesystemClient extends grpc.Client implements IFilesystemClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public filesystemDir(request: filesystem_pb.FilesystemDirRequest, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    public filesystemDir(request: filesystem_pb.FilesystemDirRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    public filesystemDir(request: filesystem_pb.FilesystemDirRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: filesystem_pb.FilesystemDirResponse) => void): grpc.ClientUnaryCall;
    public filesystemDirStream(request: filesystem_pb.FilesystemDirStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemDirStreamResponse>;
    public filesystemDirStream(request: filesystem_pb.FilesystemDirStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemDirStreamResponse>;
    public filesystemFileInfoStream(request: filesystem_pb.FilesystemFileInfoStreamRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemFileInfoStreamResponse>;
    public filesystemFileInfoStream(request: filesystem_pb.FilesystemFileInfoStreamRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<filesystem_pb.FilesystemFileInfoStreamResponse>;
    public filesystemFileStream(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<filesystem_pb.FilesystemFileStreamRequest, filesystem_pb.FilesystemFileStreamResponse>;
    public filesystemFileStream(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<filesystem_pb.FilesystemFileStreamRequest, filesystem_pb.FilesystemFileStreamResponse>;
    public filesystemMakeDir(request: filesystem_pb.FilesystemMakeDirRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemMakeDir(request: filesystem_pb.FilesystemMakeDirRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemMakeDir(request: filesystem_pb.FilesystemMakeDirRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemCopy(request: filesystem_pb.FilesystemCopyRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemCopy(request: filesystem_pb.FilesystemCopyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemCopy(request: filesystem_pb.FilesystemCopyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemMove(request: filesystem_pb.FilesystemMoveRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemMove(request: filesystem_pb.FilesystemMoveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemMove(request: filesystem_pb.FilesystemMoveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemRemove(request: filesystem_pb.FilesystemRemoveRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemRemove(request: filesystem_pb.FilesystemRemoveRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public filesystemRemove(request: filesystem_pb.FilesystemRemoveRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
