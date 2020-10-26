export namespace KeyboardService {
    namespace keyboardHotkeyStream {
        export const path: string;
        export const requestStream: boolean;
        export const responseStream: boolean;
        export const requestType: typeof import("./keyboard_pb.js").KeyboardHotkeyStreamRequest;
        export const responseType: typeof import("./keyboard_pb.js").KeyboardHotkeyStreamResponse;
        export { serialize_proto_KeyboardHotkeyStreamRequest as requestSerialize };
        export { deserialize_proto_KeyboardHotkeyStreamRequest as requestDeserialize };
        export { serialize_proto_KeyboardHotkeyStreamResponse as responseSerialize };
        export { deserialize_proto_KeyboardHotkeyStreamResponse as responseDeserialize };
    }
    namespace keyboardScancodeStream {
        const path_1: string;
        export { path_1 as path };
        const requestStream_1: boolean;
        export { requestStream_1 as requestStream };
        const responseStream_1: boolean;
        export { responseStream_1 as responseStream };
        const requestType_1: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_1 as requestType };
        const responseType_1: typeof import("./keyboard_pb.js").KeyboardScancodeStreamResponse;
        export { responseType_1 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_KeyboardScancodeStreamResponse as responseSerialize };
        export { deserialize_proto_KeyboardScancodeStreamResponse as responseDeserialize };
    }
    namespace keyboardTextStream {
        const path_2: string;
        export { path_2 as path };
        const requestStream_2: boolean;
        export { requestStream_2 as requestStream };
        const responseStream_2: boolean;
        export { responseStream_2 as responseStream };
        const requestType_2: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_2 as requestType };
        const responseType_2: typeof import("./keyboard_pb.js").KeyboardTextStreamResponse;
        export { responseType_2 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_KeyboardTextStreamResponse as responseSerialize };
        export { deserialize_proto_KeyboardTextStreamResponse as responseDeserialize };
    }
    namespace keyboardCharacterStream {
        const path_3: string;
        export { path_3 as path };
        const requestStream_3: boolean;
        export { requestStream_3 as requestStream };
        const responseStream_3: boolean;
        export { responseStream_3 as responseStream };
        const requestType_3: typeof import("google-protobuf/google/protobuf/empty_pb").Empty;
        export { requestType_3 as requestType };
        const responseType_3: typeof import("./keyboard_pb.js").KeyboardCharacterStreamResponse;
        export { responseType_3 as responseType };
        export { serialize_google_protobuf_Empty as requestSerialize };
        export { deserialize_google_protobuf_Empty as requestDeserialize };
        export { serialize_proto_KeyboardCharacterStreamResponse as responseSerialize };
        export { deserialize_proto_KeyboardCharacterStreamResponse as responseDeserialize };
    }
}
export var KeyboardClient: import("@grpc/grpc-js/build/src/make-client").ServiceClientConstructor;
declare function serialize_proto_KeyboardHotkeyStreamRequest(arg: any): Buffer;
declare function deserialize_proto_KeyboardHotkeyStreamRequest(buffer_arg: any): import("./keyboard_pb.js").KeyboardHotkeyStreamRequest;
declare function serialize_proto_KeyboardHotkeyStreamResponse(arg: any): Buffer;
declare function deserialize_proto_KeyboardHotkeyStreamResponse(buffer_arg: any): import("./keyboard_pb.js").KeyboardHotkeyStreamResponse;
declare function serialize_google_protobuf_Empty(arg: any): Buffer;
declare function deserialize_google_protobuf_Empty(buffer_arg: any): import("google-protobuf/google/protobuf/empty_pb").Empty;
declare function serialize_proto_KeyboardScancodeStreamResponse(arg: any): Buffer;
declare function deserialize_proto_KeyboardScancodeStreamResponse(buffer_arg: any): import("./keyboard_pb.js").KeyboardScancodeStreamResponse;
declare function serialize_proto_KeyboardTextStreamResponse(arg: any): Buffer;
declare function deserialize_proto_KeyboardTextStreamResponse(buffer_arg: any): import("./keyboard_pb.js").KeyboardTextStreamResponse;
declare function serialize_proto_KeyboardCharacterStreamResponse(arg: any): Buffer;
declare function deserialize_proto_KeyboardCharacterStreamResponse(buffer_arg: any): import("./keyboard_pb.js").KeyboardCharacterStreamResponse;
export {};
