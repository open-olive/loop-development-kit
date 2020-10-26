export namespace HoverService {
    namespace hoverRead {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./hover_pb.js").HoverReadRequest;
        export const responseType: typeof import("./hover_pb.js").HoverReadResponse;
        export { serialize_proto_HoverReadRequest as requestSerialize };
        export { deserialize_proto_HoverReadRequest as requestDeserialize };
        export { serialize_proto_HoverReadResponse as responseSerialize };
        export { deserialize_proto_HoverReadResponse as responseDeserialize };
    }
    namespace hoverReadStream {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("./hover_pb.js").HoverReadStreamRequest;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./hover_pb.js").HoverReadStreamResponse;
        export { responseType_1 as responseType };
        export { serialize_proto_HoverReadStreamRequest as requestSerialize };
        export { deserialize_proto_HoverReadStreamRequest as requestDeserialize };
        export { serialize_proto_HoverReadStreamResponse as responseSerialize };
        export { deserialize_proto_HoverReadStreamResponse as responseDeserialize };
    }
}
export var HoverClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_HoverReadRequest(arg: any): Buffer;
declare function deserialize_proto_HoverReadRequest(buffer_arg: any): import("./hover_pb.js").HoverReadRequest;
declare function serialize_proto_HoverReadResponse(arg: any): Buffer;
declare function deserialize_proto_HoverReadResponse(buffer_arg: any): import("./hover_pb.js").HoverReadResponse;
declare function serialize_proto_HoverReadStreamRequest(arg: any): Buffer;
declare function deserialize_proto_HoverReadStreamRequest(buffer_arg: any): import("./hover_pb.js").HoverReadStreamRequest;
declare function serialize_proto_HoverReadStreamResponse(arg: any): Buffer;
declare function deserialize_proto_HoverReadStreamResponse(buffer_arg: any): import("./hover_pb.js").HoverReadStreamResponse;
export {};
