// package: proto
// file: vault.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as vault_pb from "./vault_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as session_pb from "./session_pb";

interface IVaultService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    vaultDelete: IVaultService_IVaultDelete;
    vaultExists: IVaultService_IVaultExists;
    vaultRead: IVaultService_IVaultRead;
    vaultWrite: IVaultService_IVaultWrite;
}

interface IVaultService_IVaultDelete extends grpc.MethodDefinition<vault_pb.VaultDeleteRequest, google_protobuf_empty_pb.Empty> {
    path: "/proto.Vault/VaultDelete";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vault_pb.VaultDeleteRequest>;
    requestDeserialize: grpc.deserialize<vault_pb.VaultDeleteRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IVaultService_IVaultExists extends grpc.MethodDefinition<vault_pb.VaultExistsRequest, vault_pb.VaultExistsResponse> {
    path: "/proto.Vault/VaultExists";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vault_pb.VaultExistsRequest>;
    requestDeserialize: grpc.deserialize<vault_pb.VaultExistsRequest>;
    responseSerialize: grpc.serialize<vault_pb.VaultExistsResponse>;
    responseDeserialize: grpc.deserialize<vault_pb.VaultExistsResponse>;
}
interface IVaultService_IVaultRead extends grpc.MethodDefinition<vault_pb.VaultReadRequest, vault_pb.VaultReadResponse> {
    path: "/proto.Vault/VaultRead";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vault_pb.VaultReadRequest>;
    requestDeserialize: grpc.deserialize<vault_pb.VaultReadRequest>;
    responseSerialize: grpc.serialize<vault_pb.VaultReadResponse>;
    responseDeserialize: grpc.deserialize<vault_pb.VaultReadResponse>;
}
interface IVaultService_IVaultWrite extends grpc.MethodDefinition<vault_pb.VaultWriteRequest, google_protobuf_empty_pb.Empty> {
    path: "/proto.Vault/VaultWrite";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<vault_pb.VaultWriteRequest>;
    requestDeserialize: grpc.deserialize<vault_pb.VaultWriteRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const VaultService: IVaultService;

export interface IVaultServer {
    vaultDelete: grpc.handleUnaryCall<vault_pb.VaultDeleteRequest, google_protobuf_empty_pb.Empty>;
    vaultExists: grpc.handleUnaryCall<vault_pb.VaultExistsRequest, vault_pb.VaultExistsResponse>;
    vaultRead: grpc.handleUnaryCall<vault_pb.VaultReadRequest, vault_pb.VaultReadResponse>;
    vaultWrite: grpc.handleUnaryCall<vault_pb.VaultWriteRequest, google_protobuf_empty_pb.Empty>;
}

export interface IVaultClient {
    vaultDelete(request: vault_pb.VaultDeleteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    vaultDelete(request: vault_pb.VaultDeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    vaultDelete(request: vault_pb.VaultDeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    vaultExists(request: vault_pb.VaultExistsRequest, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultExistsResponse) => void): grpc.ClientUnaryCall;
    vaultExists(request: vault_pb.VaultExistsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultExistsResponse) => void): grpc.ClientUnaryCall;
    vaultExists(request: vault_pb.VaultExistsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultExistsResponse) => void): grpc.ClientUnaryCall;
    vaultRead(request: vault_pb.VaultReadRequest, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultReadResponse) => void): grpc.ClientUnaryCall;
    vaultRead(request: vault_pb.VaultReadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultReadResponse) => void): grpc.ClientUnaryCall;
    vaultRead(request: vault_pb.VaultReadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultReadResponse) => void): grpc.ClientUnaryCall;
    vaultWrite(request: vault_pb.VaultWriteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    vaultWrite(request: vault_pb.VaultWriteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    vaultWrite(request: vault_pb.VaultWriteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class VaultClient extends grpc.Client implements IVaultClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public vaultDelete(request: vault_pb.VaultDeleteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public vaultDelete(request: vault_pb.VaultDeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public vaultDelete(request: vault_pb.VaultDeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public vaultExists(request: vault_pb.VaultExistsRequest, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultExistsResponse) => void): grpc.ClientUnaryCall;
    public vaultExists(request: vault_pb.VaultExistsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultExistsResponse) => void): grpc.ClientUnaryCall;
    public vaultExists(request: vault_pb.VaultExistsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultExistsResponse) => void): grpc.ClientUnaryCall;
    public vaultRead(request: vault_pb.VaultReadRequest, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultReadResponse) => void): grpc.ClientUnaryCall;
    public vaultRead(request: vault_pb.VaultReadRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultReadResponse) => void): grpc.ClientUnaryCall;
    public vaultRead(request: vault_pb.VaultReadRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: vault_pb.VaultReadResponse) => void): grpc.ClientUnaryCall;
    public vaultWrite(request: vault_pb.VaultWriteRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public vaultWrite(request: vault_pb.VaultWriteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public vaultWrite(request: vault_pb.VaultWriteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
}
