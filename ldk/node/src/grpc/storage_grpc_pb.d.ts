// package: proto
// file: storage.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as storage_pb from "./storage_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as session_pb from "./session_pb";

interface IStorageService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    storageDelete: IStorageService_IStorageDelete;
    storageExists: IStorageService_IStorageExists;
    storageRead: IStorageService_IStorageRead;
    storageWrite: IStorageService_IStorageWrite;
}

interface IStorageService_IStorageDelete extends grpc.MethodDefinition<storage_pb.StorageDeleteRequest, google_protobuf_empty_pb.Empty> {
    path: "/proto.Storage/StorageDelete";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<storage_pb.StorageDeleteRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.StorageDeleteRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IStorageService_IStorageExists extends grpc.MethodDefinition<storage_pb.StorageExistsRequest, storage_pb.StorageExistsResponse> {
    path: "/proto.Storage/StorageExists";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<storage_pb.StorageExistsRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.StorageExistsRequest>;
    responseSerialize: grpc.serialize<storage_pb.StorageExistsResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.StorageExistsResponse>;
}
interface IStorageService_IStorageRead extends grpc.MethodDefinition<storage_pb.StorageReadRequest, storage_pb.StorageReadResponse> {
    path: "/proto.Storage/StorageRead";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<storage_pb.StorageReadRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.StorageReadRequest>;
    responseSerialize: grpc.serialize<storage_pb.StorageReadResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.StorageReadResponse>;
}
interface IStorageService_IStorageWrite extends grpc.MethodDefinition<storage_pb.StorageWriteRequest, google_protobuf_empty_pb.Empty> {
    path: "/proto.Storage/StorageWrite";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<storage_pb.StorageWriteRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.StorageWriteRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const StorageService: IStorageService;

export interface IStorageServer {
    storageDelete: grpc.handleUnaryCall<storage_pb.StorageDeleteRequest, google_protobuf_empty_pb.Empty>;
    storageExists: grpc.handleUnaryCall<storage_pb.StorageExistsRequest, storage_pb.StorageExistsResponse>;
    storageRead: grpc.handleUnaryCall<storage_pb.StorageReadRequest, storage_pb.StorageReadResponse>;
    storageWrite: grpc.handleUnaryCall<storage_pb.StorageWriteRequest, google_protobuf_empty_pb.Empty>;
}

export interface IStorageClient {
    storageDelete(request: storage_pb.StorageDeleteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageDelete(request: storage_pb.StorageDeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageDelete(request: storage_pb.StorageDeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageExists(request: storage_pb.StorageExistsRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageExistsResponse) => void): grpc.ClientUnaryCall;
    storageExists(request: storage_pb.StorageExistsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageExistsResponse) => void): grpc.ClientUnaryCall;
    storageExists(request: storage_pb.StorageExistsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageExistsResponse) => void): grpc.ClientUnaryCall;
    storageRead(request: storage_pb.StorageReadRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    storageRead(request: storage_pb.StorageReadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    storageRead(request: storage_pb.StorageReadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    storageWrite(request: storage_pb.StorageWriteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageWrite(request: storage_pb.StorageWriteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageWrite(request: storage_pb.StorageWriteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class StorageClient extends grpc.Client implements IStorageClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public storageDelete(request: storage_pb.StorageDeleteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageDelete(request: storage_pb.StorageDeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageDelete(request: storage_pb.StorageDeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageExists(request: storage_pb.StorageExistsRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageExistsResponse) => void): grpc.ClientUnaryCall;
    public storageExists(request: storage_pb.StorageExistsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageExistsResponse) => void): grpc.ClientUnaryCall;
    public storageExists(request: storage_pb.StorageExistsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageExistsResponse) => void): grpc.ClientUnaryCall;
    public storageRead(request: storage_pb.StorageReadRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    public storageRead(request: storage_pb.StorageReadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    public storageRead(request: storage_pb.StorageReadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    public storageWrite(request: storage_pb.StorageWriteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageWrite(request: storage_pb.StorageWriteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageWrite(request: storage_pb.StorageWriteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
