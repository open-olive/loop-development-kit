// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var vault_pb = require('./vault_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var session_pb = require('./session_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_VaultDeleteRequest(arg) {
  if (!(arg instanceof vault_pb.VaultDeleteRequest)) {
    throw new Error('Expected argument of type proto.VaultDeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_VaultDeleteRequest(buffer_arg) {
  return vault_pb.VaultDeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_VaultExistsRequest(arg) {
  if (!(arg instanceof vault_pb.VaultExistsRequest)) {
    throw new Error('Expected argument of type proto.VaultExistsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_VaultExistsRequest(buffer_arg) {
  return vault_pb.VaultExistsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_VaultExistsResponse(arg) {
  if (!(arg instanceof vault_pb.VaultExistsResponse)) {
    throw new Error('Expected argument of type proto.VaultExistsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_VaultExistsResponse(buffer_arg) {
  return vault_pb.VaultExistsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_VaultReadRequest(arg) {
  if (!(arg instanceof vault_pb.VaultReadRequest)) {
    throw new Error('Expected argument of type proto.VaultReadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_VaultReadRequest(buffer_arg) {
  return vault_pb.VaultReadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_VaultReadResponse(arg) {
  if (!(arg instanceof vault_pb.VaultReadResponse)) {
    throw new Error('Expected argument of type proto.VaultReadResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_VaultReadResponse(buffer_arg) {
  return vault_pb.VaultReadResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_VaultWriteRequest(arg) {
  if (!(arg instanceof vault_pb.VaultWriteRequest)) {
    throw new Error('Expected argument of type proto.VaultWriteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_VaultWriteRequest(buffer_arg) {
  return vault_pb.VaultWriteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var VaultService = exports.VaultService = {
  // Delete the value of a specific key in the vault
vaultDelete: {
    path: '/proto.Vault/VaultDelete',
    requestStream: false,
    responseStream: false,
    requestType: vault_pb.VaultDeleteRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_VaultDeleteRequest,
    requestDeserialize: deserialize_proto_VaultDeleteRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Check in the vault to determine if a key has a value
vaultExists: {
    path: '/proto.Vault/VaultExists',
    requestStream: false,
    responseStream: false,
    requestType: vault_pb.VaultExistsRequest,
    responseType: vault_pb.VaultExistsResponse,
    requestSerialize: serialize_proto_VaultExistsRequest,
    requestDeserialize: deserialize_proto_VaultExistsRequest,
    responseSerialize: serialize_proto_VaultExistsResponse,
    responseDeserialize: deserialize_proto_VaultExistsResponse,
  },
  // Read the value of a specific vault key
vaultRead: {
    path: '/proto.Vault/VaultRead',
    requestStream: false,
    responseStream: false,
    requestType: vault_pb.VaultReadRequest,
    responseType: vault_pb.VaultReadResponse,
    requestSerialize: serialize_proto_VaultReadRequest,
    requestDeserialize: deserialize_proto_VaultReadRequest,
    responseSerialize: serialize_proto_VaultReadResponse,
    responseDeserialize: deserialize_proto_VaultReadResponse,
  },
  // Write the value of a key to the vault
vaultWrite: {
    path: '/proto.Vault/VaultWrite',
    requestStream: false,
    responseStream: false,
    requestType: vault_pb.VaultWriteRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_VaultWriteRequest,
    requestDeserialize: deserialize_proto_VaultWriteRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.VaultClient = grpc.makeGenericClientConstructor(VaultService);
