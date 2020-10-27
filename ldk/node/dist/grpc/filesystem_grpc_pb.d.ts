export namespace FilesystemService {
    namespace filesystemDir {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./filesystem_pb.js").FilesystemDirRequest;
        export const responseType: typeof import("./filesystem_pb.js").FilesystemDirResponse;
        export { serialize_proto_FilesystemDirRequest as requestSerialize };
        export { deserialize_proto_FilesystemDirRequest as requestDeserialize };
        export { serialize_proto_FilesystemDirResponse as responseSerialize };
        export { deserialize_proto_FilesystemDirResponse as responseDeserialize };
    }
    namespace filesystemDirStream {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("./filesystem_pb.js").FilesystemDirStreamRequest;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./filesystem_pb.js").FilesystemDirStreamResponse;
        export { responseType_1 as responseType };
        export { serialize_proto_FilesystemDirStreamRequest as requestSerialize };
        export { deserialize_proto_FilesystemDirStreamRequest as requestDeserialize };
        export { serialize_proto_FilesystemDirStreamResponse as responseSerialize };
        export { deserialize_proto_FilesystemDirStreamResponse as responseDeserialize };
    }
    namespace filesystemFile {
        const path_2: string;
        export { path_2 as path };
        const requestStream_2: boolean;
        export { requestStream_2 as requestStream };
        const responseStream_2: boolean;
        export { responseStream_2 as responseStream };
        const requestType_2: typeof import("./filesystem_pb.js").FilesystemFileRequest;
        export { requestType_2 as requestType };
        const responseType_2: typeof import("./filesystem_pb.js").FilesystemFileResponse;
        export { responseType_2 as responseType };
        export { serialize_proto_FilesystemFileRequest as requestSerialize };
        export { deserialize_proto_FilesystemFileRequest as requestDeserialize };
        export { serialize_proto_FilesystemFileResponse as responseSerialize };
        export { deserialize_proto_FilesystemFileResponse as responseDeserialize };
    }
    namespace filesystemFileStream {
        const path_3: string;
        export { path_3 as path };
        const requestStream_3: boolean;
        export { requestStream_3 as requestStream };
        const responseStream_3: boolean;
        export { responseStream_3 as responseStream };
        const requestType_3: typeof import("./filesystem_pb.js").FilesystemFileStreamRequest;
        export { requestType_3 as requestType };
        const responseType_3: typeof import("./filesystem_pb.js").FilesystemFileStreamResponse;
        export { responseType_3 as responseType };
        export { serialize_proto_FilesystemFileStreamRequest as requestSerialize };
        export { deserialize_proto_FilesystemFileStreamRequest as requestDeserialize };
        export { serialize_proto_FilesystemFileStreamResponse as responseSerialize };
        export { deserialize_proto_FilesystemFileStreamResponse as responseDeserialize };
    }
}
export var FilesystemClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_FilesystemDirRequest(arg: any): Buffer;
declare function deserialize_proto_FilesystemDirRequest(buffer_arg: any): import("./filesystem_pb.js").FilesystemDirRequest;
declare function serialize_proto_FilesystemDirResponse(arg: any): Buffer;
declare function deserialize_proto_FilesystemDirResponse(buffer_arg: any): import("./filesystem_pb.js").FilesystemDirResponse;
declare function serialize_proto_FilesystemDirStreamRequest(arg: any): Buffer;
declare function deserialize_proto_FilesystemDirStreamRequest(buffer_arg: any): import("./filesystem_pb.js").FilesystemDirStreamRequest;
declare function serialize_proto_FilesystemDirStreamResponse(arg: any): Buffer;
declare function deserialize_proto_FilesystemDirStreamResponse(buffer_arg: any): import("./filesystem_pb.js").FilesystemDirStreamResponse;
declare function serialize_proto_FilesystemFileRequest(arg: any): Buffer;
declare function deserialize_proto_FilesystemFileRequest(buffer_arg: any): import("./filesystem_pb.js").FilesystemFileRequest;
declare function serialize_proto_FilesystemFileResponse(arg: any): Buffer;
declare function deserialize_proto_FilesystemFileResponse(buffer_arg: any): import("./filesystem_pb.js").FilesystemFileResponse;
declare function serialize_proto_FilesystemFileStreamRequest(arg: any): Buffer;
declare function deserialize_proto_FilesystemFileStreamRequest(buffer_arg: any): import("./filesystem_pb.js").FilesystemFileStreamRequest;
declare function serialize_proto_FilesystemFileStreamResponse(arg: any): Buffer;
declare function deserialize_proto_FilesystemFileStreamResponse(buffer_arg: any): import("./filesystem_pb.js").FilesystemFileStreamResponse;
export {};
