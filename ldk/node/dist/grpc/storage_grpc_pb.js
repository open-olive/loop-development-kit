// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var storage_pb = require('./storage_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
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
function serialize_proto_StorageHasKeyRequest(arg) {
    if (!(arg instanceof storage_pb.StorageHasKeyRequest)) {
        throw new Error('Expected argument of type proto.StorageHasKeyRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_StorageHasKeyRequest(buffer_arg) {
    return storage_pb.StorageHasKeyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_StorageHasKeyResponse(arg) {
    if (!(arg instanceof storage_pb.StorageHasKeyResponse)) {
        throw new Error('Expected argument of type proto.StorageHasKeyResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_StorageHasKeyResponse(buffer_arg) {
    return storage_pb.StorageHasKeyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_StorageKeysResponse(arg) {
    if (!(arg instanceof storage_pb.StorageKeysResponse)) {
        throw new Error('Expected argument of type proto.StorageKeysResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_StorageKeysResponse(buffer_arg) {
    return storage_pb.StorageKeysResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_StorageReadAllResponse(arg) {
    if (!(arg instanceof storage_pb.StorageReadAllResponse)) {
        throw new Error('Expected argument of type proto.StorageReadAllResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_StorageReadAllResponse(buffer_arg) {
    return storage_pb.StorageReadAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
    // Check in storage to determine if a key has a value
    storageHasKey: {
        path: '/proto.Storage/StorageHasKey',
        requestStream: false,
        responseStream: false,
        requestType: storage_pb.StorageHasKeyRequest,
        responseType: storage_pb.StorageHasKeyResponse,
        requestSerialize: serialize_proto_StorageHasKeyRequest,
        requestDeserialize: deserialize_proto_StorageHasKeyRequest,
        responseSerialize: serialize_proto_StorageHasKeyResponse,
        responseDeserialize: deserialize_proto_StorageHasKeyResponse,
    },
    // Get a list of storage keys
    storageKeys: {
        path: '/proto.Storage/StorageKeys',
        requestStream: false,
        responseStream: false,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: storage_pb.StorageKeysResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_StorageKeysResponse,
        responseDeserialize: deserialize_proto_StorageKeysResponse,
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
    // Get all storage keys and values
    storageReadAll: {
        path: '/proto.Storage/StorageReadAll',
        requestStream: false,
        responseStream: false,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: storage_pb.StorageReadAllResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_StorageReadAllResponse,
        responseDeserialize: deserialize_proto_StorageReadAllResponse,
    },
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
    // Delete the values of all keys
    storageDeleteAll: {
        path: '/proto.Storage/StorageDeleteAll',
        requestStream: false,
        responseStream: false,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: google_protobuf_empty_pb.Empty,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_google_protobuf_Empty,
        responseDeserialize: deserialize_google_protobuf_Empty,
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
