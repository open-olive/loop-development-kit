export namespace StorageService {
    namespace storageHasKey {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./storage_pb.js").StorageHasKeyRequest;
        export const responseType: typeof import("./storage_pb.js").StorageHasKeyResponse;
        export { serialize_proto_StorageHasKeyRequest as requestSerialize };
        export { deserialize_proto_StorageHasKeyRequest as requestDeserialize };
        export { serialize_proto_StorageHasKeyResponse as responseSerialize };
        export { deserialize_proto_StorageHasKeyResponse as responseDeserialize };
    }
    namespace storageKeys {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./storage_pb.js").StorageKeysResponse;
        export { responseType_1 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_StorageKeysResponse as responseSerialize };
        export { deserialize_proto_StorageKeysResponse as responseDeserialize };
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
    namespace storageReadAll {
        const path_3: string;
        export { path_3 as path };
        const requestStream_3: boolean;
        export { requestStream_3 as requestStream };
        const responseStream_3: boolean;
        export { responseStream_3 as responseStream };
        const requestType_3: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_3 as requestType };
        const responseType_3: typeof import("./storage_pb.js").StorageReadAllResponse;
        export { responseType_3 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_StorageReadAllResponse as responseSerialize };
        export { deserialize_proto_StorageReadAllResponse as responseDeserialize };
    }
    namespace storageDelete {
        const path_4: string;
        export { path_4 as path };
        const requestStream_4: boolean;
        export { requestStream_4 as requestStream };
        const responseStream_4: boolean;
        export { responseStream_4 as responseStream };
        const requestType_4: typeof import("./storage_pb.js").StorageDeleteRequest;
        export { requestType_4 as requestType };
        const responseType_4: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { responseType_4 as responseType };
        export { serialize_proto_StorageDeleteRequest as requestSerialize };
        export { deserialize_proto_StorageDeleteRequest as requestDeserialize };
        export { serialize_google_protobuf_Empty as responseSerialize };
        export { deserialize_google_protobuf_Empty as responseDeserialize };
    }
    namespace storageDeleteAll {
        const path_5: string;
        export { path_5 as path };
        const requestStream_5: boolean;
        export { requestStream_5 as requestStream };
        const responseStream_5: boolean;
        export { responseStream_5 as responseStream };
        const requestType_5: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_5 as requestType };
        const responseType_5: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { responseType_5 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_google_protobuf_Empty as responseSerialize };
        export { deserialize_google_protobuf_Empty as responseDeserialize };
    }
    namespace storageWrite {
        const path_6: string;
        export { path_6 as path };
        const requestStream_6: boolean;
        export { requestStream_6 as requestStream };
        const responseStream_6: boolean;
        export { responseStream_6 as responseStream };
        const requestType_6: typeof import("./storage_pb.js").StorageWriteRequest;
        export { requestType_6 as requestType };
        const responseType_6: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { responseType_6 as responseType };
        export { serialize_proto_StorageWriteRequest as requestSerialize };
        export { deserialize_proto_StorageWriteRequest as requestDeserialize };
        export { serialize_google_protobuf_Empty as responseSerialize };
        export { deserialize_google_protobuf_Empty as responseDeserialize };
    }
}
export var StorageClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_StorageHasKeyRequest(arg: any): Buffer;
declare function deserialize_proto_StorageHasKeyRequest(buffer_arg: any): import("./storage_pb.js").StorageHasKeyRequest;
declare function serialize_proto_StorageHasKeyResponse(arg: any): Buffer;
declare function deserialize_proto_StorageHasKeyResponse(buffer_arg: any): import("./storage_pb.js").StorageHasKeyResponse;
declare function serialize_google_protobuf_Empty(arg: any): Buffer;
declare function deserialize_google_protobuf_Empty(buffer_arg: any): import("google-protobuf/google/protobuf/empty_pb").Empty;
declare function serialize_proto_StorageKeysResponse(arg: any): Buffer;
declare function deserialize_proto_StorageKeysResponse(buffer_arg: any): import("./storage_pb.js").StorageKeysResponse;
declare function serialize_proto_StorageReadRequest(arg: any): Buffer;
declare function deserialize_proto_StorageReadRequest(buffer_arg: any): import("./storage_pb.js").StorageReadRequest;
declare function serialize_proto_StorageReadResponse(arg: any): Buffer;
declare function deserialize_proto_StorageReadResponse(buffer_arg: any): import("./storage_pb.js").StorageReadResponse;
declare function serialize_proto_StorageReadAllResponse(arg: any): Buffer;
declare function deserialize_proto_StorageReadAllResponse(buffer_arg: any): import("./storage_pb.js").StorageReadAllResponse;
declare function serialize_proto_StorageDeleteRequest(arg: any): Buffer;
declare function deserialize_proto_StorageDeleteRequest(buffer_arg: any): import("./storage_pb.js").StorageDeleteRequest;
declare function serialize_proto_StorageWriteRequest(arg: any): Buffer;
declare function deserialize_proto_StorageWriteRequest(buffer_arg: any): import("./storage_pb.js").StorageWriteRequest;
export {};
