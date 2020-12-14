// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var network_pb = require('./network_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
var session_pb = require('./session_pb.js');
function serialize_proto_HTTPRequestMsg(arg) {
    if (!(arg instanceof network_pb.HTTPRequestMsg)) {
        throw new Error('Expected argument of type proto.HTTPRequestMsg');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_HTTPRequestMsg(buffer_arg) {
    return network_pb.HTTPRequestMsg.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_HTTPResponseMsg(arg) {
    if (!(arg instanceof network_pb.HTTPResponseMsg)) {
        throw new Error('Expected argument of type proto.HTTPResponseMsg');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_HTTPResponseMsg(buffer_arg) {
    return network_pb.HTTPResponseMsg.deserializeBinary(new Uint8Array(buffer_arg));
}
var NetworkService = exports.NetworkService = {
    hTTPRequest: {
        path: '/proto.Network/HTTPRequest',
        requestStream: false,
        responseStream: false,
        requestType: network_pb.HTTPRequestMsg,
        responseType: network_pb.HTTPResponseMsg,
        requestSerialize: serialize_proto_HTTPRequestMsg,
        requestDeserialize: deserialize_proto_HTTPRequestMsg,
        responseSerialize: serialize_proto_HTTPResponseMsg,
        responseDeserialize: deserialize_proto_HTTPResponseMsg,
    },
};
exports.NetworkClient = grpc.makeGenericClientConstructor(NetworkService);
