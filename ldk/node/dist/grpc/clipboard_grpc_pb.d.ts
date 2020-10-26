export namespace ClipboardService {
    namespace clipboardRead {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export const responseType: typeof import("./clipboard_pb.js").ClipboardReadResponse;
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_ClipboardReadResponse as responseSerialize };
        export { deserialize_proto_ClipboardReadResponse as responseDeserialize };
    }
    namespace clipboardReadStream {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./clipboard_pb.js").ClipboardReadStreamResponse;
        export { responseType_1 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_ClipboardReadStreamResponse as responseSerialize };
        export { deserialize_proto_ClipboardReadStreamResponse as responseDeserialize };
    }
    namespace clipboardWrite {
        const path_2: string;
        export { path_2 as path };
        const requestStream_2: boolean;
        export { requestStream_2 as requestStream };
        const responseStream_2: boolean;
        export { responseStream_2 as responseStream };
        const requestType_2: typeof import("./clipboard_pb.js").ClipboardWriteRequest;
        export { requestType_2 as requestType };
        const responseType_2: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { responseType_2 as responseType };
        export { serialize_proto_ClipboardWriteRequest as requestSerialize };
        export { deserialize_proto_ClipboardWriteRequest as requestDeserialize };
        export { serialize_google_protobuf_Empty as responseSerialize };
        export { deserialize_google_protobuf_Empty as responseDeserialize };
    }
}
export var ClipboardClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_google_protobuf_Empty(arg: any): Buffer;
declare function deserialize_google_protobuf_Empty(buffer_arg: any): import("google-protobuf/google/protobuf/empty_pb").Empty;
declare function serialize_proto_ClipboardReadResponse(arg: any): Buffer;
declare function deserialize_proto_ClipboardReadResponse(buffer_arg: any): import("./clipboard_pb.js").ClipboardReadResponse;
declare function serialize_proto_ClipboardReadStreamResponse(arg: any): Buffer;
declare function deserialize_proto_ClipboardReadStreamResponse(buffer_arg: any): import("./clipboard_pb.js").ClipboardReadStreamResponse;
declare function serialize_proto_ClipboardWriteRequest(arg: any): Buffer;
declare function deserialize_proto_ClipboardWriteRequest(buffer_arg: any): import("./clipboard_pb.js").ClipboardWriteRequest;
export {};
