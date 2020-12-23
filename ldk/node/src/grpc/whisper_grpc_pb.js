// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var whisper_pb = require('./whisper_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var session_pb = require('./session_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_WhisperConfirmRequest(arg) {
  if (!(arg instanceof whisper_pb.WhisperConfirmRequest)) {
    throw new Error('Expected argument of type proto.WhisperConfirmRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WhisperConfirmRequest(buffer_arg) {
  return whisper_pb.WhisperConfirmRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_WhisperConfirmResponse(arg) {
  if (!(arg instanceof whisper_pb.WhisperConfirmResponse)) {
    throw new Error('Expected argument of type proto.WhisperConfirmResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WhisperConfirmResponse(buffer_arg) {
  return whisper_pb.WhisperConfirmResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_WhisperDisambiguationRequest(arg) {
  if (!(arg instanceof whisper_pb.WhisperDisambiguationRequest)) {
    throw new Error('Expected argument of type proto.WhisperDisambiguationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WhisperDisambiguationRequest(buffer_arg) {
  return whisper_pb.WhisperDisambiguationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_WhisperDisambiguationStreamResponse(arg) {
  if (!(arg instanceof whisper_pb.WhisperDisambiguationStreamResponse)) {
    throw new Error('Expected argument of type proto.WhisperDisambiguationStreamResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WhisperDisambiguationStreamResponse(buffer_arg) {
  return whisper_pb.WhisperDisambiguationStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_WhisperFormRequest(arg) {
  if (!(arg instanceof whisper_pb.WhisperFormRequest)) {
    throw new Error('Expected argument of type proto.WhisperFormRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WhisperFormRequest(buffer_arg) {
  return whisper_pb.WhisperFormRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_WhisperFormStreamResponse(arg) {
  if (!(arg instanceof whisper_pb.WhisperFormStreamResponse)) {
    throw new Error('Expected argument of type proto.WhisperFormStreamResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WhisperFormStreamResponse(buffer_arg) {
  return whisper_pb.WhisperFormStreamResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_WhisperListRequest(arg) {
  if (!(arg instanceof whisper_pb.WhisperListRequest)) {
    throw new Error('Expected argument of type proto.WhisperListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WhisperListRequest(buffer_arg) {
  return whisper_pb.WhisperListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_WhisperMarkdownRequest(arg) {
  if (!(arg instanceof whisper_pb.WhisperMarkdownRequest)) {
    throw new Error('Expected argument of type proto.WhisperMarkdownRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_WhisperMarkdownRequest(buffer_arg) {
  return whisper_pb.WhisperMarkdownRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var WhisperService = exports.WhisperService = {
  // Send a markdown whisper
whisperMarkdown: {
    path: '/proto.Whisper/WhisperMarkdown',
    requestStream: false,
    responseStream: false,
    requestType: whisper_pb.WhisperMarkdownRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_WhisperMarkdownRequest,
    requestDeserialize: deserialize_proto_WhisperMarkdownRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Send a confirm whisper
whisperConfirm: {
    path: '/proto.Whisper/WhisperConfirm',
    requestStream: false,
    responseStream: false,
    requestType: whisper_pb.WhisperConfirmRequest,
    responseType: whisper_pb.WhisperConfirmResponse,
    requestSerialize: serialize_proto_WhisperConfirmRequest,
    requestDeserialize: deserialize_proto_WhisperConfirmRequest,
    responseSerialize: serialize_proto_WhisperConfirmResponse,
    responseDeserialize: deserialize_proto_WhisperConfirmResponse,
  },
  // Send a disambiguation whisper
whisperDisambiguation: {
    path: '/proto.Whisper/WhisperDisambiguation',
    requestStream: false,
    responseStream: true,
    requestType: whisper_pb.WhisperDisambiguationRequest,
    responseType: whisper_pb.WhisperDisambiguationStreamResponse,
    requestSerialize: serialize_proto_WhisperDisambiguationRequest,
    requestDeserialize: deserialize_proto_WhisperDisambiguationRequest,
    responseSerialize: serialize_proto_WhisperDisambiguationStreamResponse,
    responseDeserialize: deserialize_proto_WhisperDisambiguationStreamResponse,
  },
  // Send a form whisper
whisperForm: {
    path: '/proto.Whisper/WhisperForm',
    requestStream: false,
    responseStream: true,
    requestType: whisper_pb.WhisperFormRequest,
    responseType: whisper_pb.WhisperFormStreamResponse,
    requestSerialize: serialize_proto_WhisperFormRequest,
    requestDeserialize: deserialize_proto_WhisperFormRequest,
    responseSerialize: serialize_proto_WhisperFormStreamResponse,
    responseDeserialize: deserialize_proto_WhisperFormStreamResponse,
  },
  // Send a list whisper
whisperList: {
    path: '/proto.Whisper/WhisperList',
    requestStream: false,
    responseStream: false,
    requestType: whisper_pb.WhisperListRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_proto_WhisperListRequest,
    requestDeserialize: deserialize_proto_WhisperListRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.WhisperClient = grpc.makeGenericClientConstructor(WhisperService);
