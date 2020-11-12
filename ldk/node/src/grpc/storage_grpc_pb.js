// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var storage_pb = require('./storage_pb.js');
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

function serialize_proto_StorageDeleteRequest(arg) {
  if (!(arg instanceof storage_pb.StorageDeleteRequest)) {
    throw new Error('Expected argument of type proto.StorageDeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_StorageDeleteRequest(buffer_arg) {
  return storage_pb.StorageDeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_StorageExistsRequest(arg) {
  if (!(arg instanceof storage_pb.StorageExistsRequest)) {
    throw new Error('Expected argument of type proto.StorageExistsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_StorageExistsRequest(buffer_arg) {
  return storage_pb.StorageExistsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_StorageExistsResponse(arg) {
  if (!(arg instanceof storage_pb.StorageExistsResponse)) {
    throw new Error('Expected argument of type proto.StorageExistsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_StorageExistsResponse(buffer_arg) {
  return storage_pb.StorageExistsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_StorageReadRequest(arg) {
  if (!(arg instanceof storage_pb.StorageReadRequest)) {
    throw new Error('Expected argument of type proto.StorageReadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_StorageReadRequest(buffer_arg) {
  return storage_pb.StorageReadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_StorageReadResponse(arg) {
  if (!(arg instanceof storage_pb.StorageReadResponse)) {
    throw new Error('Expected argument of type proto.StorageReadResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_StorageReadResponse(buffer_arg) {
  return storage_pb.StorageReadResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_StorageWriteRequest(arg) {
  if (!(arg instanceof storage_pb.StorageWriteRequest)) {
    throw new Error('Expected argument of type proto.StorageWriteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_StorageWriteRequest(buffer_arg) {
  return storage_pb.StorageWriteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var StorageService = exports.StorageService = {
  // Delete the value of a specific key
storageDelete: {
    path: '/proto.Storage/StorageDelete',
    requestStream: false,
    responseStream: false,
    requestType: storage_pb.StorageDeleteRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_StorageDeleteRequest,
    requestDeserialize: deserialize_proto_StorageDeleteRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Check in storage to determine if a key has a value
storageExists: {
    path: '/proto.Storage/StorageExists',
    requestStream: false,
    responseStream: false,
    requestType: storage_pb.StorageExistsRequest,
    responseType: storage_pb.StorageExistsResponse,
    requestSerialize: serialize_proto_StorageExistsRequest,
    requestDeserialize: deserialize_proto_StorageExistsRequest,
    responseSerialize: serialize_proto_StorageExistsResponse,
    responseDeserialize: deserialize_proto_StorageExistsResponse,
  },
  // Read the value of a specific storage key
storageRead: {
    path: '/proto.Storage/StorageRead',
    requestStream: false,
    responseStream: false,
    requestType: storage_pb.StorageReadRequest,
    responseType: storage_pb.StorageReadResponse,
    requestSerialize: serialize_proto_StorageReadRequest,
    requestDeserialize: deserialize_proto_StorageReadRequest,
    responseSerialize: serialize_proto_StorageReadResponse,
    responseDeserialize: deserialize_proto_StorageReadResponse,
  },
  // Write the value of a key to storage
storageWrite: {
    path: '/proto.Storage/StorageWrite',
    requestStream: false,
    responseStream: false,
    requestType: storage_pb.StorageWriteRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_StorageWriteRequest,
    requestDeserialize: deserialize_proto_StorageWriteRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.StorageClient = grpc.makeGenericClientConstructor(StorageService);
