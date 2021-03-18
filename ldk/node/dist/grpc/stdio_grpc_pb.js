// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var stdio_pb = require('./stdio_pb.js');
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
function serialize_plugin_StdioData(arg) {
    if (!(arg instanceof stdio_pb.StdioData)) {
        throw new Error('Expected argument of type plugin.StdioData');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_plugin_StdioData(buffer_arg) {
    return stdio_pb.StdioData.deserializeBinary(new Uint8Array(buffer_arg));
}
// GRPCStdio is a service that is automatically run by the plugin process
// to stream any stdout/err data so that it can be mirrored on the plugin
// host side.
var GRPCStdioService = exports.GRPCStdioService = {
    // StreamStdio returns a stream that contains all the stdout/stderr.
    // This RPC endpoint must only be called ONCE. Once stdio data is consumed
    // it is not sent again.
    //
    // Callers should connect early to prevent blocking on the plugin process.
    streamStdio: {
        path: '/plugin.GRPCStdio/StreamStdio',
        requestStream: false,
        responseStream: true,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: stdio_pb.StdioData,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_plugin_StdioData,
        responseDeserialize: deserialize_plugin_StdioData,
    },
};
exports.GRPCStdioClient = grpc.makeGenericClientConstructor(GRPCStdioService);
