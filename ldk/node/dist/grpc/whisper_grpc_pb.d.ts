export namespace WhisperService {
    namespace whisperMarkdown {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./whisper_pb.js").WhisperMarkdownRequest;
        export const responseType: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { serialize_proto_WhisperMarkdownRequest as requestSerialize };
        export { deserialize_proto_WhisperMarkdownRequest as requestDeserialize };
        export { serialize_google_protobuf_Empty as responseSerialize };
        export { deserialize_google_protobuf_Empty as responseDeserialize };
    }
    namespace whisperConfirm {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("./whisper_pb.js").WhisperConfirmRequest;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./whisper_pb.js").WhisperConfirmResponse;
        export { responseType_1 as responseType };
        export { serialize_proto_WhisperConfirmRequest as requestSerialize };
        export { deserialize_proto_WhisperConfirmRequest as requestDeserialize };
        export { serialize_proto_WhisperConfirmResponse as responseSerialize };
        export { deserialize_proto_WhisperConfirmResponse as responseDeserialize };
    }
    namespace whisperForm {
        const path_2: string;
        export { path_2 as path };
        const requestStream_2: boolean;
        export { requestStream_2 as requestStream };
        const responseStream_2: boolean;
        export { responseStream_2 as responseStream };
        const requestType_2: typeof import("./whisper_pb.js").WhisperFormRequest;
        export { requestType_2 as requestType };
        const responseType_2: typeof import("./whisper_pb.js").WhisperFormStreamResponse;
        export { responseType_2 as responseType };
        export { serialize_proto_WhisperFormRequest as requestSerialize };
        export { deserialize_proto_WhisperFormRequest as requestDeserialize };
        export { serialize_proto_WhisperFormStreamResponse as responseSerialize };
        export { deserialize_proto_WhisperFormStreamResponse as responseDeserialize };
    }
}
export var WhisperClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_WhisperMarkdownRequest(arg: any): Buffer;
declare function deserialize_proto_WhisperMarkdownRequest(buffer_arg: any): import("./whisper_pb.js").WhisperMarkdownRequest;
declare function serialize_google_protobuf_Empty(arg: any): Buffer;
declare function deserialize_google_protobuf_Empty(buffer_arg: any): import("google-protobuf/google/protobuf/empty_pb").Empty;
declare function serialize_proto_WhisperConfirmRequest(arg: any): Buffer;
declare function deserialize_proto_WhisperConfirmRequest(buffer_arg: any): import("./whisper_pb.js").WhisperConfirmRequest;
declare function serialize_proto_WhisperConfirmResponse(arg: any): Buffer;
declare function deserialize_proto_WhisperConfirmResponse(buffer_arg: any): import("./whisper_pb.js").WhisperConfirmResponse;
declare function serialize_proto_WhisperFormRequest(arg: any): Buffer;
declare function deserialize_proto_WhisperFormRequest(buffer_arg: any): import("./whisper_pb.js").WhisperFormRequest;
declare function serialize_proto_WhisperFormStreamResponse(arg: any): Buffer;
declare function deserialize_proto_WhisperFormStreamResponse(buffer_arg: any): import("./whisper_pb.js").WhisperFormStreamResponse;
export {};
