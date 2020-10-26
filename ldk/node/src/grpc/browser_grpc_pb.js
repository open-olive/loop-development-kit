// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var browser_pb = require('./browser_pb.js');
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

function serialize_proto_BrowserActiveURLResponse(arg) {
  if (!(arg instanceof browser_pb.BrowserActiveURLResponse)) {
    throw new Error('Expected argument of type proto.BrowserActiveURLResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_BrowserActiveURLResponse(buffer_arg) {
  return browser_pb.BrowserActiveURLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_BrowserActiveURLStreamResponse(arg) {
  if (!(arg instanceof browser_pb.BrowserActiveURLStreamResponse)) {
    throw new Error('Expected argument of type proto.BrowserActiveURLStreamResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_BrowserActiveURLStreamResponse(buffer_arg) {
  return browser_pb.BrowserActiveURLStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_BrowserSelectedTextResponse(arg) {
  if (!(arg instanceof browser_pb.BrowserSelectedTextResponse)) {
    throw new Error('Expected argument of type proto.BrowserSelectedTextResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_BrowserSelectedTextResponse(buffer_arg) {
  return browser_pb.BrowserSelectedTextResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_BrowserSelectedTextStreamResponse(arg) {
  if (!(arg instanceof browser_pb.BrowserSelectedTextStreamResponse)) {
    throw new Error('Expected argument of type proto.BrowserSelectedTextStreamResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_BrowserSelectedTextStreamResponse(buffer_arg) {
  return browser_pb.BrowserSelectedTextStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BrowserService = exports.BrowserService = {
  // get the active URL
browserActiveURL: {
    path: '/proto.Browser/BrowserActiveURL',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: browser_pb.BrowserActiveURLResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_proto_BrowserActiveURLResponse,
    responseDeserialize: deserialize_proto_BrowserActiveURLResponse,
  },
  // stream active URL every time it changes
browserActiveURLStream: {
    path: '/proto.Browser/BrowserActiveURLStream',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: browser_pb.BrowserActiveURLStreamResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_proto_BrowserActiveURLStreamResponse,
    responseDeserialize: deserialize_proto_BrowserActiveURLStreamResponse,
  },
  // get currently selected text
browserSelectedText: {
    path: '/proto.Browser/BrowserSelectedText',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: browser_pb.BrowserSelectedTextResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_proto_BrowserSelectedTextResponse,
    responseDeserialize: deserialize_proto_BrowserSelectedTextResponse,
  },
  // stream selected text every time it changes
browserSelectedTextStream: {
    path: '/proto.Browser/BrowserSelectedTextStream',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: browser_pb.BrowserSelectedTextStreamResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_proto_BrowserSelectedTextStreamResponse,
    responseDeserialize: deserialize_proto_BrowserSelectedTextStreamResponse,
  },
};

exports.BrowserClient = grpc.makeGenericClientConstructor(BrowserService);
