export namespace ProcessService {
    namespace processStateStream {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./process_pb.js").ProcessStateStreamRequest;
        export const responseType: typeof import("./process_pb.js").ProcessStateStreamResponse;
        export { serialize_proto_ProcessStateStreamRequest as requestSerialize };
        export { deserialize_proto_ProcessStateStreamRequest as requestDeserialize };
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
        const requestType_1: typeof import("./process_pb.js").ProcessStateRequest;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./process_pb.js").ProcessStateResponse;
        export { responseType_1 as responseType };
        export { serialize_proto_ProcessStateRequest as requestSerialize };
        export { deserialize_proto_ProcessStateRequest as requestDeserialize };
        export { serialize_proto_ProcessStateResponse as responseSerialize };
        export { deserialize_proto_ProcessStateResponse as responseDeserialize };
    }
}
export var ProcessClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_ProcessStateStreamRequest(arg: any): Buffer;
declare function deserialize_proto_ProcessStateStreamRequest(buffer_arg: any): import("./process_pb.js").ProcessStateStreamRequest;
declare function serialize_proto_ProcessStateStreamResponse(arg: any): Buffer;
declare function deserialize_proto_ProcessStateStreamResponse(buffer_arg: any): import("./process_pb.js").ProcessStateStreamResponse;
declare function serialize_proto_ProcessStateRequest(arg: any): Buffer;
declare function deserialize_proto_ProcessStateRequest(buffer_arg: any): import("./process_pb.js").ProcessStateRequest;
declare function serialize_proto_ProcessStateResponse(arg: any): Buffer;
declare function deserialize_proto_ProcessStateResponse(buffer_arg: any): import("./process_pb.js").ProcessStateResponse;
export {};
