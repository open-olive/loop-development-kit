// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var hover_pb = require('./hover_pb.js');

function serialize_proto_HoverReadRequest(arg) {
  if (!(arg instanceof hover_pb.HoverReadRequest)) {
    throw new Error('Expected argument of type proto.HoverReadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_HoverReadRequest(buffer_arg) {
  return hover_pb.HoverReadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_HoverReadResponse(arg) {
  if (!(arg instanceof hover_pb.HoverReadResponse)) {
    throw new Error('Expected argument of type proto.HoverReadResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_HoverReadResponse(buffer_arg) {
  return hover_pb.HoverReadResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_HoverReadStreamRequest(arg) {
  if (!(arg instanceof hover_pb.HoverReadStreamRequest)) {
    throw new Error('Expected argument of type proto.HoverReadStreamRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_HoverReadStreamRequest(buffer_arg) {
  return hover_pb.HoverReadStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_HoverReadStreamResponse(arg) {
  if (!(arg instanceof hover_pb.HoverReadStreamResponse)) {
    throw new Error('Expected argument of type proto.HoverReadStreamResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_HoverReadStreamResponse(buffer_arg) {
  return hover_pb.HoverReadStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var HoverService = exports.HoverService = {
  // read the text under the cursor
hoverRead: {
    path: '/proto.Hover/HoverRead',
    requestStream: false,
    responseStream: false,
    requestType: hover_pb.HoverReadRequest,
    responseType: hover_pb.HoverReadResponse,
    requestSerialize: serialize_proto_HoverReadRequest,
    requestDeserialize: deserialize_proto_HoverReadRequest,
    responseSerialize: serialize_proto_HoverReadResponse,
    responseDeserialize: deserialize_proto_HoverReadResponse,
  },
  // stream the text under the cursor as it changes
hoverReadStream: {
    path: '/proto.Hover/HoverReadStream',
    requestStream: false,
    responseStream: true,
    requestType: hover_pb.HoverReadStreamRequest,
    responseType: hover_pb.HoverReadStreamResponse,
    requestSerialize: serialize_proto_HoverReadStreamRequest,
    requestDeserialize: deserialize_proto_HoverReadStreamRequest,
    responseSerialize: serialize_proto_HoverReadStreamResponse,
    responseDeserialize: deserialize_proto_HoverReadStreamResponse,
  },
};

exports.HoverClient = grpc.makeGenericClientConstructor(HoverService);
