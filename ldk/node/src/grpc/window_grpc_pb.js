// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var window_pb = require('./window_pb.js');
var session_pb = require('./session_pb.js');

function serialize_proto_WindowActiveWindowRequest(arg) {
  if (!(arg instanceof window_pb.WindowActiveWindowRequest)) {
    throw new Error('Expected argument of type proto.WindowActiveWindowRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WindowActiveWindowRequest(buffer_arg) {
  return window_pb.WindowActiveWindowRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_proto_WindowActiveWindowStreamRequest(arg) {
  if (!(arg instanceof window_pb.WindowActiveWindowStreamRequest)) {
    throw new Error('Expected argument of type proto.WindowActiveWindowStreamRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WindowActiveWindowStreamRequest(buffer_arg) {
  return window_pb.WindowActiveWindowStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_proto_WindowStateRequest(arg) {
  if (!(arg instanceof window_pb.WindowStateRequest)) {
    throw new Error('Expected argument of type proto.WindowStateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WindowStateRequest(buffer_arg) {
  return window_pb.WindowStateRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_proto_WindowStateStreamRequest(arg) {
  if (!(arg instanceof window_pb.WindowStateStreamRequest)) {
    throw new Error('Expected argument of type proto.WindowStateStreamRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WindowStateStreamRequest(buffer_arg) {
  return window_pb.WindowStateStreamRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
    requestType: window_pb.WindowActiveWindowRequest,
    responseType: window_pb.WindowActiveWindowResponse,
    requestSerialize: serialize_proto_WindowActiveWindowRequest,
    requestDeserialize: deserialize_proto_WindowActiveWindowRequest,
    responseSerialize: serialize_proto_WindowActiveWindowResponse,
    responseDeserialize: deserialize_proto_WindowActiveWindowResponse,
  },
  // stream information about currently focused window as it changes
windowActiveWindowStream: {
    path: '/proto.Window/WindowActiveWindowStream',
    requestStream: false,
    responseStream: true,
    requestType: window_pb.WindowActiveWindowStreamRequest,
    responseType: window_pb.WindowActiveWindowStreamResponse,
    requestSerialize: serialize_proto_WindowActiveWindowStreamRequest,
    requestDeserialize: deserialize_proto_WindowActiveWindowStreamRequest,
    responseSerialize: serialize_proto_WindowActiveWindowStreamResponse,
    responseDeserialize: deserialize_proto_WindowActiveWindowStreamResponse,
  },
  // get information about all windows
windowState: {
    path: '/proto.Window/WindowState',
    requestStream: false,
    responseStream: false,
    requestType: window_pb.WindowStateRequest,
    responseType: window_pb.WindowStateResponse,
    requestSerialize: serialize_proto_WindowStateRequest,
    requestDeserialize: deserialize_proto_WindowStateRequest,
    responseSerialize: serialize_proto_WindowStateResponse,
    responseDeserialize: deserialize_proto_WindowStateResponse,
  },
  // get information about windows as they change
windowStateStream: {
    path: '/proto.Window/WindowStateStream',
    requestStream: false,
    responseStream: true,
    requestType: window_pb.WindowStateStreamRequest,
    responseType: window_pb.WindowStateStreamResponse,
    requestSerialize: serialize_proto_WindowStateStreamRequest,
    requestDeserialize: deserialize_proto_WindowStateStreamRequest,
    responseSerialize: serialize_proto_WindowStateStreamResponse,
    responseDeserialize: deserialize_proto_WindowStateStreamResponse,
  },
};

exports.WindowClient = grpc.makeGenericClientConstructor(WindowService);
