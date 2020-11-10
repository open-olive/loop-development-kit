export namespace UIService {
    namespace globalSearchStream {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./ui_pb.js").GlobalSearchStreamRequest;
        export const responseType: typeof import("./ui_pb.js").GlobalSearchStreamResponse;
        export { serialize_proto_GlobalSearchStreamRequest as requestSerialize };
        export { deserialize_proto_GlobalSearchStreamRequest as requestDeserialize };
        export { serialize_proto_GlobalSearchStreamResponse as responseSerialize };
        export { deserialize_proto_GlobalSearchStreamResponse as responseDeserialize };
    }
    namespace searchbarStream {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("./ui_pb.js").SearchbarStreamRequest;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./ui_pb.js").SearchbarStreamResponse;
        export { responseType_1 as responseType };
        export { serialize_proto_SearchbarStreamRequest as requestSerialize };
        export { deserialize_proto_SearchbarStreamRequest as requestDeserialize };
        export { serialize_proto_SearchbarStreamResponse as responseSerialize };
        export { deserialize_proto_SearchbarStreamResponse as responseDeserialize };
    }
}
export var UIClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_GlobalSearchStreamRequest(arg: any): Buffer;
declare function deserialize_proto_GlobalSearchStreamRequest(buffer_arg: any): import("./ui_pb.js").GlobalSearchStreamRequest;
declare function serialize_proto_GlobalSearchStreamResponse(arg: any): Buffer;
declare function deserialize_proto_GlobalSearchStreamResponse(buffer_arg: any): import("./ui_pb.js").GlobalSearchStreamResponse;
declare function serialize_proto_SearchbarStreamRequest(arg: any): Buffer;
declare function deserialize_proto_SearchbarStreamRequest(buffer_arg: any): import("./ui_pb.js").SearchbarStreamRequest;
declare function serialize_proto_SearchbarStreamResponse(arg: any): Buffer;
declare function deserialize_proto_SearchbarStreamResponse(buffer_arg: any): import("./ui_pb.js").SearchbarStreamResponse;
export {};
