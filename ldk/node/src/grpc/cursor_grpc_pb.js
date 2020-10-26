// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var cursor_pb = require('./cursor_pb.js');
var session_pb = require('./session_pb.js');

function serialize_proto_CursorPositionRequest(arg) {
  if (!(arg instanceof cursor_pb.CursorPositionRequest)) {
    throw new Error('Expected argument of type proto.CursorPositionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_CursorPositionRequest(buffer_arg) {
  return cursor_pb.CursorPositionRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_proto_CursorPositionStreamRequest(arg) {
  if (!(arg instanceof cursor_pb.CursorPositionStreamRequest)) {
    throw new Error('Expected argument of type proto.CursorPositionStreamRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_CursorPositionStreamRequest(buffer_arg) {
  return cursor_pb.CursorPositionStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
    requestType: cursor_pb.CursorPositionRequest,
    responseType: cursor_pb.CursorPositionResponse,
    requestSerialize: serialize_proto_CursorPositionRequest,
    requestDeserialize: deserialize_proto_CursorPositionRequest,
    responseSerialize: serialize_proto_CursorPositionResponse,
    responseDeserialize: deserialize_proto_CursorPositionResponse,
  },
  // get the position of the cursor every time it changes
cursorPositionStream: {
    path: '/proto.Cursor/CursorPositionStream',
    requestStream: false,
    responseStream: true,
    requestType: cursor_pb.CursorPositionStreamRequest,
    responseType: cursor_pb.CursorPositionStreamResponse,
    requestSerialize: serialize_proto_CursorPositionStreamRequest,
    requestDeserialize: deserialize_proto_CursorPositionStreamRequest,
    responseSerialize: serialize_proto_CursorPositionStreamResponse,
    responseDeserialize: deserialize_proto_CursorPositionStreamResponse,
  },
};

exports.CursorClient = grpc.makeGenericClientConstructor(CursorService);
