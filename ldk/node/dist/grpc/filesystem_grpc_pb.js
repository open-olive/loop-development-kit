// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var filesystem_pb = require('./filesystem_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
function serialize_proto_FilesystemDirRequest(arg) {
    if (!(arg instanceof filesystem_pb.FilesystemDirRequest)) {
        throw new Error('Expected argument of type proto.FilesystemDirRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_FilesystemDirRequest(buffer_arg) {
    return filesystem_pb.FilesystemDirRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_FilesystemDirResponse(arg) {
    if (!(arg instanceof filesystem_pb.FilesystemDirResponse)) {
        throw new Error('Expected argument of type proto.FilesystemDirResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_FilesystemDirResponse(buffer_arg) {
    return filesystem_pb.FilesystemDirResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_FilesystemDirStreamRequest(arg) {
    if (!(arg instanceof filesystem_pb.FilesystemDirStreamRequest)) {
        throw new Error('Expected argument of type proto.FilesystemDirStreamRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_FilesystemDirStreamRequest(buffer_arg) {
    return filesystem_pb.FilesystemDirStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_FilesystemDirStreamResponse(arg) {
    if (!(arg instanceof filesystem_pb.FilesystemDirStreamResponse)) {
        throw new Error('Expected argument of type proto.FilesystemDirStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_FilesystemDirStreamResponse(buffer_arg) {
    return filesystem_pb.FilesystemDirStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_FilesystemFileRequest(arg) {
    if (!(arg instanceof filesystem_pb.FilesystemFileRequest)) {
        throw new Error('Expected argument of type proto.FilesystemFileRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_FilesystemFileRequest(buffer_arg) {
    return filesystem_pb.FilesystemFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_FilesystemFileResponse(arg) {
    if (!(arg instanceof filesystem_pb.FilesystemFileResponse)) {
        throw new Error('Expected argument of type proto.FilesystemFileResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_FilesystemFileResponse(buffer_arg) {
    return filesystem_pb.FilesystemFileResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_FilesystemFileStreamRequest(arg) {
    if (!(arg instanceof filesystem_pb.FilesystemFileStreamRequest)) {
        throw new Error('Expected argument of type proto.FilesystemFileStreamRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_FilesystemFileStreamRequest(buffer_arg) {
    return filesystem_pb.FilesystemFileStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_FilesystemFileStreamResponse(arg) {
    if (!(arg instanceof filesystem_pb.FilesystemFileStreamResponse)) {
        throw new Error('Expected argument of type proto.FilesystemFileStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_FilesystemFileStreamResponse(buffer_arg) {
    return filesystem_pb.FilesystemFileStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
var FilesystemService = exports.FilesystemService = {
    // list the contents of a directory
    filesystemDir: {
        path: '/proto.Filesystem/FilesystemDir',
        requestStream: false,
        responseStream: false,
        requestType: filesystem_pb.FilesystemDirRequest,
        responseType: filesystem_pb.FilesystemDirResponse,
        requestSerialize: serialize_proto_FilesystemDirRequest,
        requestDeserialize: deserialize_proto_FilesystemDirRequest,
        responseSerialize: serialize_proto_FilesystemDirResponse,
        responseDeserialize: deserialize_proto_FilesystemDirResponse,
    },
    // stream any updates to the contents of a directory
    filesystemDirStream: {
        path: '/proto.Filesystem/FilesystemDirStream',
        requestStream: false,
        responseStream: true,
        requestType: filesystem_pb.FilesystemDirStreamRequest,
        responseType: filesystem_pb.FilesystemDirStreamResponse,
        requestSerialize: serialize_proto_FilesystemDirStreamRequest,
        requestDeserialize: deserialize_proto_FilesystemDirStreamRequest,
        responseSerialize: serialize_proto_FilesystemDirStreamResponse,
        responseDeserialize: deserialize_proto_FilesystemDirStreamResponse,
    },
    // get information about a file
    filesystemFile: {
        path: '/proto.Filesystem/FilesystemFile',
        requestStream: false,
        responseStream: false,
        requestType: filesystem_pb.FilesystemFileRequest,
        responseType: filesystem_pb.FilesystemFileResponse,
        requestSerialize: serialize_proto_FilesystemFileRequest,
        requestDeserialize: deserialize_proto_FilesystemFileRequest,
        responseSerialize: serialize_proto_FilesystemFileResponse,
        responseDeserialize: deserialize_proto_FilesystemFileResponse,
    },
    // stream any updates to a file
    filesystemFileStream: {
        path: '/proto.Filesystem/FilesystemFileStream',
        requestStream: false,
        responseStream: true,
        requestType: filesystem_pb.FilesystemFileStreamRequest,
        responseType: filesystem_pb.FilesystemFileStreamResponse,
        requestSerialize: serialize_proto_FilesystemFileStreamRequest,
        requestDeserialize: deserialize_proto_FilesystemFileStreamRequest,
        responseSerialize: serialize_proto_FilesystemFileStreamResponse,
        responseDeserialize: deserialize_proto_FilesystemFileStreamResponse,
    },
};
exports.FilesystemClient = grpc.makeGenericClientConstructor(FilesystemService);
