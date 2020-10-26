// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var process_pb = require('./process_pb.js');
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
function serialize_proto_ProcessStateResponse(arg) {
    if (!(arg instanceof process_pb.ProcessStateResponse)) {
        throw new Error('Expected argument of type proto.ProcessStateResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_ProcessStateResponse(buffer_arg) {
    return process_pb.ProcessStateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_ProcessStateStreamResponse(arg) {
    if (!(arg instanceof process_pb.ProcessStateStreamResponse)) {
        throw new Error('Expected argument of type proto.ProcessStateStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_ProcessStateStreamResponse(buffer_arg) {
    return process_pb.ProcessStateStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
var ProcessService = exports.ProcessService = {
    // stream updates to processes as they happen
    processStateStream: {
        path: '/proto.Process/ProcessStateStream',
        requestStream: false,
        responseStream: true,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: process_pb.ProcessStateStreamResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_ProcessStateStreamResponse,
        responseDeserialize: deserialize_proto_ProcessStateStreamResponse,
    },
    // get a list of all processes
    processState: {
        path: '/proto.Process/ProcessState',
        requestStream: false,
        responseStream: false,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: process_pb.ProcessStateResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_ProcessStateResponse,
        responseDeserialize: deserialize_proto_ProcessStateResponse,
    },
};
exports.ProcessClient = grpc.makeGenericClientConstructor(ProcessService);
