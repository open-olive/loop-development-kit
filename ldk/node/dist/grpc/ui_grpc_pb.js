// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var ui_pb = require('./ui_pb.js');
var session_pb = require('./session_pb.js');
function serialize_proto_GlobalSearchStreamRequest(arg) {
    if (!(arg instanceof ui_pb.GlobalSearchStreamRequest)) {
        throw new Error('Expected argument of type proto.GlobalSearchStreamRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_GlobalSearchStreamRequest(buffer_arg) {
    return ui_pb.GlobalSearchStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_GlobalSearchStreamResponse(arg) {
    if (!(arg instanceof ui_pb.GlobalSearchStreamResponse)) {
        throw new Error('Expected argument of type proto.GlobalSearchStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_GlobalSearchStreamResponse(buffer_arg) {
    return ui_pb.GlobalSearchStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_SearchbarStreamRequest(arg) {
    if (!(arg instanceof ui_pb.SearchbarStreamRequest)) {
        throw new Error('Expected argument of type proto.SearchbarStreamRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_SearchbarStreamRequest(buffer_arg) {
    return ui_pb.SearchbarStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_SearchbarStreamResponse(arg) {
    if (!(arg instanceof ui_pb.SearchbarStreamResponse)) {
        throw new Error('Expected argument of type proto.SearchbarStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_SearchbarStreamResponse(buffer_arg) {
    return ui_pb.SearchbarStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
var UIService = exports.UIService = {
    // Event is streamed whenever user hits enter.
    globalSearchStream: {
        path: '/proto.UI/GlobalSearchStream',
        requestStream: false,
        responseStream: true,
        requestType: ui_pb.GlobalSearchStreamRequest,
        responseType: ui_pb.GlobalSearchStreamResponse,
        requestSerialize: serialize_proto_GlobalSearchStreamRequest,
        requestDeserialize: deserialize_proto_GlobalSearchStreamRequest,
        responseSerialize: serialize_proto_GlobalSearchStreamResponse,
        responseDeserialize: deserialize_proto_GlobalSearchStreamResponse,
    },
    // Event is streamed whenever user hits enter.
    searchbarStream: {
        path: '/proto.UI/SearchbarStream',
        requestStream: false,
        responseStream: true,
        requestType: ui_pb.SearchbarStreamRequest,
        responseType: ui_pb.SearchbarStreamResponse,
        requestSerialize: serialize_proto_SearchbarStreamRequest,
        requestDeserialize: deserialize_proto_SearchbarStreamRequest,
        responseSerialize: serialize_proto_SearchbarStreamResponse,
        responseDeserialize: deserialize_proto_SearchbarStreamResponse,
    },
};
exports.UIClient = grpc.makeGenericClientConstructor(UIService);
