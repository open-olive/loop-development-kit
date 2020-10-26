export namespace ProcessService {
    namespace processStateStream {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export const responseType: typeof import("./process_pb.js").ProcessStateStreamResponse;
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_ProcessStateStreamResponse as responseSerialize };
        export { deserialize_proto_ProcessStateStreamResponse as responseDeserialize };
    }
    namespace processState {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./process_pb.js").ProcessStateResponse;
        export { responseType_1 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_ProcessStateResponse as responseSerialize };
        export { deserialize_proto_ProcessStateResponse as responseDeserialize };
    }
}
export var ProcessClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_google_protobuf_Empty(arg: any): Buffer;
declare function deserialize_google_protobuf_Empty(buffer_arg: any): import("google-protobuf/google/protobuf/empty_pb").Empty;
declare function serialize_proto_ProcessStateStreamResponse(arg: any): Buffer;
declare function deserialize_proto_ProcessStateStreamResponse(buffer_arg: any): import("./process_pb.js").ProcessStateStreamResponse;
declare function serialize_proto_ProcessStateResponse(arg: any): Buffer;
declare function deserialize_proto_ProcessStateResponse(buffer_arg: any): import("./process_pb.js").ProcessStateResponse;
export {};
