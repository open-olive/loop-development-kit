// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var process_pb = require('./process_pb.js');
var session_pb = require('./session_pb.js');
function serialize_proto_ProcessStateRequest(arg) {
    if (!(arg instanceof process_pb.ProcessStateRequest)) {
        throw new Error('Expected argument of type proto.ProcessStateRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_ProcessStateRequest(buffer_arg) {
    return process_pb.ProcessStateRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
function serialize_proto_ProcessStateStreamRequest(arg) {
    if (!(arg instanceof process_pb.ProcessStateStreamRequest)) {
        throw new Error('Expected argument of type proto.ProcessStateStreamRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_ProcessStateStreamRequest(buffer_arg) {
    return process_pb.ProcessStateStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
        requestType: process_pb.ProcessStateStreamRequest,
        responseType: process_pb.ProcessStateStreamResponse,
        requestSerialize: serialize_proto_ProcessStateStreamRequest,
        requestDeserialize: deserialize_proto_ProcessStateStreamRequest,
        responseSerialize: serialize_proto_ProcessStateStreamResponse,
        responseDeserialize: deserialize_proto_ProcessStateStreamResponse,
    },
    // get a list of all processes
    processState: {
        path: '/proto.Process/ProcessState',
        requestStream: false,
        responseStream: false,
        requestType: process_pb.ProcessStateRequest,
        responseType: process_pb.ProcessStateResponse,
        requestSerialize: serialize_proto_ProcessStateRequest,
        requestDeserialize: deserialize_proto_ProcessStateRequest,
        responseSerialize: serialize_proto_ProcessStateResponse,
        responseDeserialize: deserialize_proto_ProcessStateResponse,
    },
};
exports.ProcessClient = grpc.makeGenericClientConstructor(ProcessService);
