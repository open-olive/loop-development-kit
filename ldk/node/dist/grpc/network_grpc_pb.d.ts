export namespace NetworkService {
    namespace hTTPRequest {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./network_pb.js").HTTPRequestMsg;
        export const responseType: typeof import("./network_pb.js").HTTPResponseMsg;
        export { serialize_proto_HTTPRequestMsg as requestSerialize };
        export { deserialize_proto_HTTPRequestMsg as requestDeserialize };
        export { serialize_proto_HTTPResponseMsg as responseSerialize };
        export { deserialize_proto_HTTPResponseMsg as responseDeserialize };
    }
}
export var NetworkClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_HTTPRequestMsg(arg: any): Buffer;
declare function deserialize_proto_HTTPRequestMsg(buffer_arg: any): import("./network_pb.js").HTTPRequestMsg;
declare function serialize_proto_HTTPResponseMsg(arg: any): Buffer;
declare function deserialize_proto_HTTPResponseMsg(buffer_arg: any): import("./network_pb.js").HTTPResponseMsg;
export {};
