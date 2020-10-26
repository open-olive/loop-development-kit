// package: proto
// file: storage.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as storage_pb from "./storage_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IStorageService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    storageHasKey: IStorageService_IStorageHasKey;
    storageKeys: IStorageService_IStorageKeys;
    storageRead: IStorageService_IStorageRead;
    storageReadAll: IStorageService_IStorageReadAll;
    storageDelete: IStorageService_IStorageDelete;
    storageDeleteAll: IStorageService_IStorageDeleteAll;
    storageWrite: IStorageService_IStorageWrite;
}

interface IStorageService_IStorageHasKey extends grpc.MethodDefinition<storage_pb.StorageHasKeyRequest, storage_pb.StorageHasKeyResponse> {
    path: string; // "/proto.Storage/StorageHasKey"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<storage_pb.StorageHasKeyRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.StorageHasKeyRequest>;
    responseSerialize: grpc.serialize<storage_pb.StorageHasKeyResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.StorageHasKeyResponse>;
}
interface IStorageService_IStorageKeys extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, storage_pb.StorageKeysResponse> {
    path: string; // "/proto.Storage/StorageKeys"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<storage_pb.StorageKeysResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.StorageKeysResponse>;
}
interface IStorageService_IStorageRead extends grpc.MethodDefinition<storage_pb.StorageReadRequest, storage_pb.StorageReadResponse> {
    path: string; // "/proto.Storage/StorageRead"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<storage_pb.StorageReadRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.StorageReadRequest>;
    responseSerialize: grpc.serialize<storage_pb.StorageReadResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.StorageReadResponse>;
}
interface IStorageService_IStorageReadAll extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, storage_pb.StorageReadAllResponse> {
    path: string; // "/proto.Storage/StorageReadAll"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<storage_pb.StorageReadAllResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.StorageReadAllResponse>;
}
interface IStorageService_IStorageDelete extends grpc.MethodDefinition<storage_pb.StorageDeleteRequest, google_protobuf_empty_pb.Empty> {
    path: string; // "/proto.Storage/StorageDelete"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<storage_pb.StorageDeleteRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.StorageDeleteRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IStorageService_IStorageDeleteAll extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, google_protobuf_empty_pb.Empty> {
    path: string; // "/proto.Storage/StorageDeleteAll"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IStorageService_IStorageWrite extends grpc.MethodDefinition<storage_pb.StorageWriteRequest, google_protobuf_empty_pb.Empty> {
    path: string; // "/proto.Storage/StorageWrite"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<storage_pb.StorageWriteRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.StorageWriteRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const StorageService: IStorageService;

export interface IStorageServer {
    storageHasKey: grpc.handleUnaryCall<storage_pb.StorageHasKeyRequest, storage_pb.StorageHasKeyResponse>;
    storageKeys: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, storage_pb.StorageKeysResponse>;
    storageRead: grpc.handleUnaryCall<storage_pb.StorageReadRequest, storage_pb.StorageReadResponse>;
    storageReadAll: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, storage_pb.StorageReadAllResponse>;
    storageDelete: grpc.handleUnaryCall<storage_pb.StorageDeleteRequest, google_protobuf_empty_pb.Empty>;
    storageDeleteAll: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, google_protobuf_empty_pb.Empty>;
    storageWrite: grpc.handleUnaryCall<storage_pb.StorageWriteRequest, google_protobuf_empty_pb.Empty>;
}

export interface IStorageClient {
    storageHasKey(request: storage_pb.StorageHasKeyRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageHasKeyResponse) => void): grpc.ClientUnaryCall;
    storageHasKey(request: storage_pb.StorageHasKeyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageHasKeyResponse) => void): grpc.ClientUnaryCall;
    storageHasKey(request: storage_pb.StorageHasKeyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageHasKeyResponse) => void): grpc.ClientUnaryCall;
    storageKeys(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageKeysResponse) => void): grpc.ClientUnaryCall;
    storageKeys(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageKeysResponse) => void): grpc.ClientUnaryCall;
    storageKeys(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageKeysResponse) => void): grpc.ClientUnaryCall;
    storageRead(request: storage_pb.StorageReadRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    storageRead(request: storage_pb.StorageReadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    storageRead(request: storage_pb.StorageReadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    storageReadAll(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadAllResponse) => void): grpc.ClientUnaryCall;
    storageReadAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadAllResponse) => void): grpc.ClientUnaryCall;
    storageReadAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadAllResponse) => void): grpc.ClientUnaryCall;
    storageDelete(request: storage_pb.StorageDeleteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageDelete(request: storage_pb.StorageDeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageDelete(request: storage_pb.StorageDeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageDeleteAll(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageDeleteAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageDeleteAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageWrite(request: storage_pb.StorageWriteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageWrite(request: storage_pb.StorageWriteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    storageWrite(request: storage_pb.StorageWriteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class StorageClient extends grpc.Client implements IStorageClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public storageHasKey(request: storage_pb.StorageHasKeyRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageHasKeyResponse) => void): grpc.ClientUnaryCall;
    public storageHasKey(request: storage_pb.StorageHasKeyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageHasKeyResponse) => void): grpc.ClientUnaryCall;
    public storageHasKey(request: storage_pb.StorageHasKeyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageHasKeyResponse) => void): grpc.ClientUnaryCall;
    public storageKeys(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageKeysResponse) => void): grpc.ClientUnaryCall;
    public storageKeys(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageKeysResponse) => void): grpc.ClientUnaryCall;
    public storageKeys(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageKeysResponse) => void): grpc.ClientUnaryCall;
    public storageRead(request: storage_pb.StorageReadRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    public storageRead(request: storage_pb.StorageReadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    public storageRead(request: storage_pb.StorageReadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadResponse) => void): grpc.ClientUnaryCall;
    public storageReadAll(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadAllResponse) => void): grpc.ClientUnaryCall;
    public storageReadAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadAllResponse) => void): grpc.ClientUnaryCall;
    public storageReadAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.StorageReadAllResponse) => void): grpc.ClientUnaryCall;
    public storageDelete(request: storage_pb.StorageDeleteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageDelete(request: storage_pb.StorageDeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageDelete(request: storage_pb.StorageDeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageDeleteAll(request: google_protobuf_empty_pb.Empty, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageDeleteAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageDeleteAll(request: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageWrite(request: storage_pb.StorageWriteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageWrite(request: storage_pb.StorageWriteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public storageWrite(request: storage_pb.StorageWriteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
