// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var cursor_pb = require('./cursor_pb.js');
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

function serialize_proto_CursorPositionResponse(arg) {
  if (!(arg instanceof cursor_pb.CursorPositionResponse)) {
    throw new Error('Expected argument of type proto.CursorPositionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_CursorPositionResponse(buffer_arg) {
  return cursor_pb.CursorPositionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_CursorPositionStreamResponse(arg) {
  if (!(arg instanceof cursor_pb.CursorPositionStreamResponse)) {
    throw new Error('Expected argument of type proto.CursorPositionStreamResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_CursorPositionStreamResponse(buffer_arg) {
  return cursor_pb.CursorPositionStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CursorService = exports.CursorService = {
  // get the current position of the cursor
cursorPosition: {
    path: '/proto.Cursor/CursorPosition',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: cursor_pb.CursorPositionResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_proto_CursorPositionResponse,
    responseDeserialize: deserialize_proto_CursorPositionResponse,
  },
  // get the position of the cursor every time it changes
cursorPositionStream: {
    path: '/proto.Cursor/CursorPositionStream',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: cursor_pb.CursorPositionStreamResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_proto_CursorPositionStreamResponse,
    responseDeserialize: deserialize_proto_CursorPositionStreamResponse,
  },
};

exports.CursorClient = grpc.makeGenericClientConstructor(CursorService);
