export namespace GRPCStdioService {
    namespace streamStdio {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export const responseType: typeof import("./stdio_pb.js").StdioData;
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_plugin_StdioData as responseSerialize };
        export { deserialize_plugin_StdioData as responseDeserialize };
    }
}
export var GRPCStdioClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_google_protobuf_Empty(arg: any): Buffer;
declare function deserialize_google_protobuf_Empty(buffer_arg: any): import("google-protobuf/google/protobuf/empty_pb").Empty;
declare function serialize_plugin_StdioData(arg: any): Buffer;
declare function deserialize_plugin_StdioData(buffer_arg: any): import("./stdio_pb.js").StdioData;
export {};
