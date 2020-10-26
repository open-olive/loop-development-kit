// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var clipboard_pb = require('./clipboard_pb.js');
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
function serialize_proto_ClipboardReadResponse(arg) {
    if (!(arg instanceof clipboard_pb.ClipboardReadResponse)) {
        throw new Error('Expected argument of type proto.ClipboardReadResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_ClipboardReadResponse(buffer_arg) {
    return clipboard_pb.ClipboardReadResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_ClipboardReadStreamResponse(arg) {
    if (!(arg instanceof clipboard_pb.ClipboardReadStreamResponse)) {
        throw new Error('Expected argument of type proto.ClipboardReadStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_ClipboardReadStreamResponse(buffer_arg) {
    return clipboard_pb.ClipboardReadStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_ClipboardWriteRequest(arg) {
    if (!(arg instanceof clipboard_pb.ClipboardWriteRequest)) {
        throw new Error('Expected argument of type proto.ClipboardWriteRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_ClipboardWriteRequest(buffer_arg) {
    return clipboard_pb.ClipboardWriteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
var ClipboardService = exports.ClipboardService = {
    // get the contents of the clipboard
    clipboardRead: {
        path: '/proto.Clipboard/ClipboardRead',
        requestStream: false,
        responseStream: false,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: clipboard_pb.ClipboardReadResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_ClipboardReadResponse,
        responseDeserialize: deserialize_proto_ClipboardReadResponse,
    },
    // get the contents of the clipboard every time they change
    clipboardReadStream: {
        path: '/proto.Clipboard/ClipboardReadStream',
        requestStream: false,
        responseStream: true,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: clipboard_pb.ClipboardReadStreamResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_ClipboardReadStreamResponse,
        responseDeserialize: deserialize_proto_ClipboardReadStreamResponse,
    },
    // write to the clipboard
    clipboardWrite: {
        path: '/proto.Clipboard/ClipboardWrite',
        requestStream: false,
        responseStream: false,
        requestType: clipboard_pb.ClipboardWriteRequest,
        responseType: google_protobuf_empty_pb.Empty,
        requestSerialize: serialize_proto_ClipboardWriteRequest,
        requestDeserialize: deserialize_proto_ClipboardWriteRequest,
        responseSerialize: serialize_google_protobuf_Empty,
        responseDeserialize: deserialize_google_protobuf_Empty,
    },
};
exports.ClipboardClient = grpc.makeGenericClientConstructor(ClipboardService);
