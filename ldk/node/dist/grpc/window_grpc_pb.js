// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var window_pb = require('./window_pb.js');
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
function serialize_proto_WindowActiveWindowResponse(arg) {
    if (!(arg instanceof window_pb.WindowActiveWindowResponse)) {
        throw new Error('Expected argument of type proto.WindowActiveWindowResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_WindowActiveWindowResponse(buffer_arg) {
    return window_pb.WindowActiveWindowResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_WindowActiveWindowStreamResponse(arg) {
    if (!(arg instanceof window_pb.WindowActiveWindowStreamResponse)) {
        throw new Error('Expected argument of type proto.WindowActiveWindowStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_WindowActiveWindowStreamResponse(buffer_arg) {
    return window_pb.WindowActiveWindowStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_WindowStateResponse(arg) {
    if (!(arg instanceof window_pb.WindowStateResponse)) {
        throw new Error('Expected argument of type proto.WindowStateResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_WindowStateResponse(buffer_arg) {
    return window_pb.WindowStateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_WindowStateStreamResponse(arg) {
    if (!(arg instanceof window_pb.WindowStateStreamResponse)) {
        throw new Error('Expected argument of type proto.WindowStateStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_WindowStateStreamResponse(buffer_arg) {
    return window_pb.WindowStateStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
var WindowService = exports.WindowService = {
    // get information about currently focused window
    windowActiveWindow: {
        path: '/proto.Window/WindowActiveWindow',
        requestStream: false,
        responseStream: false,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: window_pb.WindowActiveWindowResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_WindowActiveWindowResponse,
        responseDeserialize: deserialize_proto_WindowActiveWindowResponse,
    },
    // stream information about currently focused window as it changes
    windowActiveWindowStream: {
        path: '/proto.Window/WindowActiveWindowStream',
        requestStream: false,
        responseStream: true,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: window_pb.WindowActiveWindowStreamResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_WindowActiveWindowStreamResponse,
        responseDeserialize: deserialize_proto_WindowActiveWindowStreamResponse,
    },
    // get information about all windows
    windowState: {
        path: '/proto.Window/WindowState',
        requestStream: false,
        responseStream: false,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: window_pb.WindowStateResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_WindowStateResponse,
        responseDeserialize: deserialize_proto_WindowStateResponse,
    },
    // get information about windows as they change
    windowStateStream: {
        path: '/proto.Window/WindowStateStream',
        requestStream: false,
        responseStream: true,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: window_pb.WindowStateStreamResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_WindowStateStreamResponse,
        responseDeserialize: deserialize_proto_WindowStateStreamResponse,
    },
};
exports.WindowClient = grpc.makeGenericClientConstructor(WindowService);
