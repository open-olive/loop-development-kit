export namespace LoopService {
    namespace loopStart {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./loop_pb.js").LoopStartRequest;
        export const responseType: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { serialize_proto_LoopStartRequest as requestSerialize };
        export { deserialize_proto_LoopStartRequest as requestDeserialize };
        export { serialize_google_protobuf_Empty as responseSerialize };
        export { deserialize_google_protobuf_Empty as responseDeserialize };
    }
    namespace loopStop {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { responseType_1 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_google_protobuf_Empty as responseSerialize };
        export { deserialize_google_protobuf_Empty as responseDeserialize };
    }
}
export var LoopClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_LoopStartRequest(arg: any): Buffer;
declare function deserialize_proto_LoopStartRequest(buffer_arg: any): import("./loop_pb.js").LoopStartRequest;
declare function serialize_google_protobuf_Empty(arg: any): Buffer;
declare function deserialize_google_protobuf_Empty(buffer_arg: any): import("google-protobuf/google/protobuf/empty_pb").Empty;
export {};
