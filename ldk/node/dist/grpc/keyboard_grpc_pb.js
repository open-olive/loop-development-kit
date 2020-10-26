// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var keyboard_pb = require('./keyboard_pb.js');
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
function serialize_proto_KeyboardCharacterStreamResponse(arg) {
    if (!(arg instanceof keyboard_pb.KeyboardCharacterStreamResponse)) {
        throw new Error('Expected argument of type proto.KeyboardCharacterStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_KeyboardCharacterStreamResponse(buffer_arg) {
    return keyboard_pb.KeyboardCharacterStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_KeyboardHotkeyStreamRequest(arg) {
    if (!(arg instanceof keyboard_pb.KeyboardHotkeyStreamRequest)) {
        throw new Error('Expected argument of type proto.KeyboardHotkeyStreamRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_KeyboardHotkeyStreamRequest(buffer_arg) {
    return keyboard_pb.KeyboardHotkeyStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_KeyboardHotkeyStreamResponse(arg) {
    if (!(arg instanceof keyboard_pb.KeyboardHotkeyStreamResponse)) {
        throw new Error('Expected argument of type proto.KeyboardHotkeyStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_KeyboardHotkeyStreamResponse(buffer_arg) {
    return keyboard_pb.KeyboardHotkeyStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_KeyboardScancodeStreamResponse(arg) {
    if (!(arg instanceof keyboard_pb.KeyboardScancodeStreamResponse)) {
        throw new Error('Expected argument of type proto.KeyboardScancodeStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_KeyboardScancodeStreamResponse(buffer_arg) {
    return keyboard_pb.KeyboardScancodeStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_proto_KeyboardTextStreamResponse(arg) {
    if (!(arg instanceof keyboard_pb.KeyboardTextStreamResponse)) {
        throw new Error('Expected argument of type proto.KeyboardTextStreamResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_KeyboardTextStreamResponse(buffer_arg) {
    return keyboard_pb.KeyboardTextStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
var KeyboardService = exports.KeyboardService = {
    // register a hotkey and receive streamed messages when it is pressed
    keyboardHotkeyStream: {
        path: '/proto.Keyboard/KeyboardHotkeyStream',
        requestStream: false,
        responseStream: true,
        requestType: keyboard_pb.KeyboardHotkeyStreamRequest,
        responseType: keyboard_pb.KeyboardHotkeyStreamResponse,
        requestSerialize: serialize_proto_KeyboardHotkeyStreamRequest,
        requestDeserialize: deserialize_proto_KeyboardHotkeyStreamRequest,
        responseSerialize: serialize_proto_KeyboardHotkeyStreamResponse,
        responseDeserialize: deserialize_proto_KeyboardHotkeyStreamResponse,
    },
    // stream each scancode as it is pressed
    keyboardScancodeStream: {
        path: '/proto.Keyboard/KeyboardScancodeStream',
        requestStream: false,
        responseStream: true,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: keyboard_pb.KeyboardScancodeStreamResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_KeyboardScancodeStreamResponse,
        responseDeserialize: deserialize_proto_KeyboardScancodeStreamResponse,
    },
    // stream chunks of text when the user finishes typing them
    keyboardTextStream: {
        path: '/proto.Keyboard/KeyboardTextStream',
        requestStream: false,
        responseStream: true,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: keyboard_pb.KeyboardTextStreamResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_KeyboardTextStreamResponse,
        responseDeserialize: deserialize_proto_KeyboardTextStreamResponse,
    },
    // stream text as it is typed
    keyboardCharacterStream: {
        path: '/proto.Keyboard/KeyboardCharacterStream',
        requestStream: false,
        responseStream: true,
        requestType: google_protobuf_empty_pb.Empty,
        responseType: keyboard_pb.KeyboardCharacterStreamResponse,
        requestSerialize: serialize_google_protobuf_Empty,
        requestDeserialize: deserialize_google_protobuf_Empty,
        responseSerialize: serialize_proto_KeyboardCharacterStreamResponse,
        responseDeserialize: deserialize_proto_KeyboardCharacterStreamResponse,
    },
};
exports.KeyboardClient = grpc.makeGenericClientConstructor(KeyboardService);
