export namespace WindowService {
    namespace windowActiveWindow {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export const responseType: typeof import("./window_pb.js").WindowActiveWindowResponse;
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_WindowActiveWindowResponse as responseSerialize };
        export { deserialize_proto_WindowActiveWindowResponse as responseDeserialize };
    }
    namespace windowActiveWindowStream {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./window_pb.js").WindowActiveWindowStreamResponse;
        export { responseType_1 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_WindowActiveWindowStreamResponse as responseSerialize };
        export { deserialize_proto_WindowActiveWindowStreamResponse as responseDeserialize };
    }
    namespace windowState {
        const path_2: string;
        export { path_2 as path };
        const requestStream_2: boolean;
        export { requestStream_2 as requestStream };
        const responseStream_2: boolean;
        export { responseStream_2 as responseStream };
        const requestType_2: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_2 as requestType };
        const responseType_2: typeof import("./window_pb.js").WindowStateResponse;
        export { responseType_2 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_WindowStateResponse as responseSerialize };
        export { deserialize_proto_WindowStateResponse as responseDeserialize };
    }
    namespace windowStateStream {
        const path_3: string;
        export { path_3 as path };
        const requestStream_3: boolean;
        export { requestStream_3 as requestStream };
        const responseStream_3: boolean;
        export { responseStream_3 as responseStream };
        const requestType_3: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_3 as requestType };
        const responseType_3: typeof import("./window_pb.js").WindowStateStreamResponse;
        export { responseType_3 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_WindowStateStreamResponse as responseSerialize };
        export { deserialize_proto_WindowStateStreamResponse as responseDeserialize };
    }
}
export var WindowClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_google_protobuf_Empty(arg: any): Buffer;
declare function deserialize_google_protobuf_Empty(buffer_arg: any): import("google-protobuf/google/protobuf/empty_pb").Empty;
declare function serialize_proto_WindowActiveWindowResponse(arg: any): Buffer;
declare function deserialize_proto_WindowActiveWindowResponse(buffer_arg: any): import("./window_pb.js").WindowActiveWindowResponse;
declare function serialize_proto_WindowActiveWindowStreamResponse(arg: any): Buffer;
declare function deserialize_proto_WindowActiveWindowStreamResponse(buffer_arg: any): import("./window_pb.js").WindowActiveWindowStreamResponse;
declare function serialize_proto_WindowStateResponse(arg: any): Buffer;
declare function deserialize_proto_WindowStateResponse(buffer_arg: any): import("./window_pb.js").WindowStateResponse;
declare function serialize_proto_WindowStateStreamResponse(arg: any): Buffer;
declare function deserialize_proto_WindowStateStreamResponse(buffer_arg: any): import("./window_pb.js").WindowStateStreamResponse;
export {};
