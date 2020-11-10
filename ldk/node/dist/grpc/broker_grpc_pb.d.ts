export namespace GRPCBrokerService {
    namespace startStream {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./broker_pb.js").ConnInfo;
        export const responseType: typeof import("./broker_pb.js").ConnInfo;
        export { serialize_plugin_ConnInfo as requestSerialize };
        export { deserialize_plugin_ConnInfo as requestDeserialize };
        export { serialize_plugin_ConnInfo as responseSerialize };
        export { deserialize_plugin_ConnInfo as responseDeserialize };
    }
}
export var GRPCBrokerClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_plugin_ConnInfo(arg: any): Buffer;
declare function deserialize_plugin_ConnInfo(buffer_arg: any): import("./broker_pb.js").ConnInfo;
export {};
