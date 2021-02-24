// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var filesystem_pb = require('./filesystem_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
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

function serialize_proto_FilesystemCopyRequest(arg) {
  if (!(arg instanceof filesystem_pb.FilesystemCopyRequest)) {
    throw new Error('Expected argument of type proto.FilesystemCopyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_FilesystemCopyRequest(buffer_arg) {
  return filesystem_pb.FilesystemCopyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

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

function serialize_proto_FilesystemFileInfoStreamRequest(arg) {
  if (!(arg instanceof filesystem_pb.FilesystemFileInfoStreamRequest)) {
    throw new Error('Expected argument of type proto.FilesystemFileInfoStreamRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_FilesystemFileInfoStreamRequest(buffer_arg) {
  return filesystem_pb.FilesystemFileInfoStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_FilesystemFileInfoStreamResponse(arg) {
  if (!(arg instanceof filesystem_pb.FilesystemFileInfoStreamResponse)) {
    throw new Error('Expected argument of type proto.FilesystemFileInfoStreamResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_FilesystemFileInfoStreamResponse(buffer_arg) {
  return filesystem_pb.FilesystemFileInfoStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_proto_FilesystemMakeDirRequest(arg) {
  if (!(arg instanceof filesystem_pb.FilesystemMakeDirRequest)) {
    throw new Error('Expected argument of type proto.FilesystemMakeDirRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_FilesystemMakeDirRequest(buffer_arg) {
  return filesystem_pb.FilesystemMakeDirRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_FilesystemMoveRequest(arg) {
  if (!(arg instanceof filesystem_pb.FilesystemMoveRequest)) {
    throw new Error('Expected argument of type proto.FilesystemMoveRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_FilesystemMoveRequest(buffer_arg) {
  return filesystem_pb.FilesystemMoveRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_FilesystemRemoveRequest(arg) {
  if (!(arg instanceof filesystem_pb.FilesystemRemoveRequest)) {
    throw new Error('Expected argument of type proto.FilesystemRemoveRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_FilesystemRemoveRequest(buffer_arg) {
  return filesystem_pb.FilesystemRemoveRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
  // listenText any updates to the contents of a directory
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
  // listenText any updates to a file
filesystemFileInfoStream: {
    path: '/proto.Filesystem/FilesystemFileInfoStream',
    requestStream: false,
    responseStream: true,
    requestType: filesystem_pb.FilesystemFileInfoStreamRequest,
    responseType: filesystem_pb.FilesystemFileInfoStreamResponse,
    requestSerialize: serialize_proto_FilesystemFileInfoStreamRequest,
    requestDeserialize: deserialize_proto_FilesystemFileInfoStreamRequest,
    responseSerialize: serialize_proto_FilesystemFileInfoStreamResponse,
    responseDeserialize: deserialize_proto_FilesystemFileInfoStreamResponse,
  },
  // file listenText
filesystemFileStream: {
    path: '/proto.Filesystem/FilesystemFileStream',
    requestStream: true,
    responseStream: true,
    requestType: filesystem_pb.FilesystemFileStreamRequest,
    responseType: filesystem_pb.FilesystemFileStreamResponse,
    requestSerialize: serialize_proto_FilesystemFileStreamRequest,
    requestDeserialize: deserialize_proto_FilesystemFileStreamRequest,
    responseSerialize: serialize_proto_FilesystemFileStreamResponse,
    responseDeserialize: deserialize_proto_FilesystemFileStreamResponse,
  },
  // create directory
filesystemMakeDir: {
    path: '/proto.Filesystem/FilesystemMakeDir',
    requestStream: false,
    responseStream: false,
    requestType: filesystem_pb.FilesystemMakeDirRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_FilesystemMakeDirRequest,
    requestDeserialize: deserialize_proto_FilesystemMakeDirRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  //  copy
filesystemCopy: {
    path: '/proto.Filesystem/FilesystemCopy',
    requestStream: false,
    responseStream: false,
    requestType: filesystem_pb.FilesystemCopyRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_FilesystemCopyRequest,
    requestDeserialize: deserialize_proto_FilesystemCopyRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  //  move
filesystemMove: {
    path: '/proto.Filesystem/FilesystemMove',
    requestStream: false,
    responseStream: false,
    requestType: filesystem_pb.FilesystemMoveRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_FilesystemMoveRequest,
    requestDeserialize: deserialize_proto_FilesystemMoveRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // remove
filesystemRemove: {
    path: '/proto.Filesystem/FilesystemRemove',
    requestStream: false,
    responseStream: false,
    requestType: filesystem_pb.FilesystemRemoveRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_FilesystemRemoveRequest,
    requestDeserialize: deserialize_proto_FilesystemRemoveRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.FilesystemClient = grpc.makeGenericClientConstructor(FilesystemService);
