export namespace CursorService {
    namespace cursorPosition {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export const responseType: typeof import("./cursor_pb.js").CursorPositionResponse;
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_CursorPositionResponse as responseSerialize };
        export { deserialize_proto_CursorPositionResponse as responseDeserialize };
    }
    namespace cursorPositionStream {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./cursor_pb.js").CursorPositionStreamResponse;
        export { responseType_1 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_CursorPositionStreamResponse as responseSerialize };
        export { deserialize_proto_CursorPositionStreamResponse as responseDeserialize };
    }
}
export var CursorClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_google_protobuf_Empty(arg: any): Buffer;
declare function deserialize_google_protobuf_Empty(buffer_arg: any): import("google-protobuf/google/protobuf/empty_pb").Empty;
declare function serialize_proto_CursorPositionResponse(arg: any): Buffer;
declare function deserialize_proto_CursorPositionResponse(buffer_arg: any): import("./cursor_pb.js").CursorPositionResponse;
declare function serialize_proto_CursorPositionStreamResponse(arg: any): Buffer;
declare function deserialize_proto_CursorPositionStreamResponse(buffer_arg: any): import("./cursor_pb.js").CursorPositionStreamResponse;
export {};
