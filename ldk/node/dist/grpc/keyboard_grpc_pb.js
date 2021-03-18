// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('@grpc/grpc-js');
var keyboard_pb = require('./keyboard_pb.js');
var session_pb = require('./session_pb.js');
function serialize_proto_KeyboardCharacterStreamRequest(arg) {
    if (!(arg instanceof keyboard_pb.KeyboardCharacterStreamRequest)) {
        throw new Error('Expected argument of type proto.KeyboardCharacterStreamRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_KeyboardCharacterStreamRequest(buffer_arg) {
    return keyboard_pb.KeyboardCharacterStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
function serialize_proto_KeyboardTextStreamRequest(arg) {
    if (!(arg instanceof keyboard_pb.KeyboardTextStreamRequest)) {
        throw new Error('Expected argument of type proto.KeyboardTextStreamRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_proto_KeyboardTextStreamRequest(buffer_arg) {
    return keyboard_pb.KeyboardTextStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
    // stream chunks of text when the user finishes typing them
    keyboardTextStream: {
        path: '/proto.Keyboard/KeyboardTextStream',
        requestStream: false,
        responseStream: true,
        requestType: keyboard_pb.KeyboardTextStreamRequest,
        responseType: keyboard_pb.KeyboardTextStreamResponse,
        requestSerialize: serialize_proto_KeyboardTextStreamRequest,
        requestDeserialize: deserialize_proto_KeyboardTextStreamRequest,
        responseSerialize: serialize_proto_KeyboardTextStreamResponse,
        responseDeserialize: deserialize_proto_KeyboardTextStreamResponse,
    },
    // stream text as it is typed
    keyboardCharacterStream: {
        path: '/proto.Keyboard/KeyboardCharacterStream',
        requestStream: false,
        responseStream: true,
        requestType: keyboard_pb.KeyboardCharacterStreamRequest,
        responseType: keyboard_pb.KeyboardCharacterStreamResponse,
        requestSerialize: serialize_proto_KeyboardCharacterStreamRequest,
        requestDeserialize: deserialize_proto_KeyboardCharacterStreamRequest,
        responseSerialize: serialize_proto_KeyboardCharacterStreamResponse,
        responseDeserialize: deserialize_proto_KeyboardCharacterStreamResponse,
    },
};
exports.KeyboardClient = grpc.makeGenericClientConstructor(KeyboardService);
