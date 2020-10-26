// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var loop_pb = require('./loop_pb.js');
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

function serialize_proto_LoopStartRequest(arg) {
  if (!(arg instanceof loop_pb.LoopStartRequest)) {
    throw new Error('Expected argument of type proto.LoopStartRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_LoopStartRequest(buffer_arg) {
  return loop_pb.LoopStartRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var LoopService = exports.LoopService = {
  // start the loop
loopStart: {
    path: '/proto.Loop/LoopStart',
    requestStream: false,
    responseStream: false,
    requestType: loop_pb.LoopStartRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_LoopStartRequest,
    requestDeserialize: deserialize_proto_LoopStartRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // stop the loop
loopStop: {
    path: '/proto.Loop/LoopStop',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.LoopClient = grpc.makeGenericClientConstructor(LoopService);
