export namespace CursorService {
    namespace cursorPosition {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./cursor_pb.js").CursorPositionRequest;
        export const responseType: typeof import("./cursor_pb.js").CursorPositionResponse;
        export { serialize_proto_CursorPositionRequest as requestSerialize };
        export { deserialize_proto_CursorPositionRequest as requestDeserialize };
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
        const requestType_1: typeof import("./cursor_pb.js").CursorPositionStreamRequest;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./cursor_pb.js").CursorPositionStreamResponse;
        export { responseType_1 as responseType };
        export { serialize_proto_CursorPositionStreamRequest as requestSerialize };
        export { deserialize_proto_CursorPositionStreamRequest as requestDeserialize };
        export { serialize_proto_CursorPositionStreamResponse as responseSerialize };
        export { deserialize_proto_CursorPositionStreamResponse as responseDeserialize };
    }
}
export var CursorClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_CursorPositionRequest(arg: any): Buffer;
declare function deserialize_proto_CursorPositionRequest(buffer_arg: any): import("./cursor_pb.js").CursorPositionRequest;
declare function serialize_proto_CursorPositionResponse(arg: any): Buffer;
declare function deserialize_proto_CursorPositionResponse(buffer_arg: any): import("./cursor_pb.js").CursorPositionResponse;
declare function serialize_proto_CursorPositionStreamRequest(arg: any): Buffer;
declare function deserialize_proto_CursorPositionStreamRequest(buffer_arg: any): import("./cursor_pb.js").CursorPositionStreamRequest;
declare function serialize_proto_CursorPositionStreamResponse(arg: any): Buffer;
declare function deserialize_proto_CursorPositionStreamResponse(buffer_arg: any): import("./cursor_pb.js").CursorPositionStreamResponse;
export {};
