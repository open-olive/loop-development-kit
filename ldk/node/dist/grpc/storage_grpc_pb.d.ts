export namespace StorageService {
    namespace storageDelete {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./storage_pb.js").StorageDeleteRequest;
        export const responseType: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { serialize_proto_StorageDeleteRequest as requestSerialize };
        export { deserialize_proto_StorageDeleteRequest as requestDeserialize };
        export { serialize_google_protobuf_Empty as responseSerialize };
        export { deserialize_google_protobuf_Empty as responseDeserialize };
    }
    namespace storageExists {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("./storage_pb.js").StorageExistsRequest;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./storage_pb.js").StorageExistsResponse;
        export { responseType_1 as responseType };
        export { serialize_proto_StorageExistsRequest as requestSerialize };
        export { deserialize_proto_StorageExistsRequest as requestDeserialize };
        export { serialize_proto_StorageExistsResponse as responseSerialize };
        export { deserialize_proto_StorageExistsResponse as responseDeserialize };
    }
    namespace storageRead {
        const path_2: string;
        export { path_2 as path };
        const requestStream_2: boolean;
        export { requestStream_2 as requestStream };
        const responseStream_2: boolean;
        export { responseStream_2 as responseStream };
        const requestType_2: typeof import("./storage_pb.js").StorageReadRequest;
        export { requestType_2 as requestType };
        const responseType_2: typeof import("./storage_pb.js").StorageReadResponse;
        export { responseType_2 as responseType };
        export { serialize_proto_StorageReadRequest as requestSerialize };
        export { deserialize_proto_StorageReadRequest as requestDeserialize };
        export { serialize_proto_StorageReadResponse as responseSerialize };
        export { deserialize_proto_StorageReadResponse as responseDeserialize };
    }
    namespace storageWrite {
        const path_3: string;
        export { path_3 as path };
        const requestStream_3: boolean;
        export { requestStream_3 as requestStream };
        const responseStream_3: boolean;
        export { responseStream_3 as responseStream };
        const requestType_3: typeof import("./storage_pb.js").StorageWriteRequest;
        export { requestType_3 as requestType };
        const responseType_3: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { responseType_3 as responseType };
        export { serialize_proto_StorageWriteRequest as requestSerialize };
        export { deserialize_proto_StorageWriteRequest as requestDeserialize };
        export { serialize_google_protobuf_Empty as responseSerialize };
        export { deserialize_google_protobuf_Empty as responseDeserialize };
    }
}
export var StorageClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_StorageDeleteRequest(arg: any): Buffer;
declare function deserialize_proto_StorageDeleteRequest(buffer_arg: any): import("./storage_pb.js").StorageDeleteRequest;
declare function serialize_google_protobuf_Empty(arg: any): Buffer;
declare function deserialize_google_protobuf_Empty(buffer_arg: any): import("google-protobuf/google/protobuf/empty_pb").Empty;
declare function serialize_proto_StorageExistsRequest(arg: any): Buffer;
declare function deserialize_proto_StorageExistsRequest(buffer_arg: any): import("./storage_pb.js").StorageExistsRequest;
declare function serialize_proto_StorageExistsResponse(arg: any): Buffer;
declare function deserialize_proto_StorageExistsResponse(buffer_arg: any): import("./storage_pb.js").StorageExistsResponse;
declare function serialize_proto_StorageReadRequest(arg: any): Buffer;
declare function deserialize_proto_StorageReadRequest(buffer_arg: any): import("./storage_pb.js").StorageReadRequest;
declare function serialize_proto_StorageReadResponse(arg: any): Buffer;
declare function deserialize_proto_StorageReadResponse(buffer_arg: any): import("./storage_pb.js").StorageReadResponse;
declare function serialize_proto_StorageWriteRequest(arg: any): Buffer;
declare function deserialize_proto_StorageWriteRequest(buffer_arg: any): import("./storage_pb.js").StorageWriteRequest;
export {};
