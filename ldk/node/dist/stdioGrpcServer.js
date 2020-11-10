"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StdioGrpcServer = exports.StdioService = void 0;
const stdio_grpc_pb_1 = require("./grpc/stdio_grpc_pb");
Object.defineProperty(exports, "StdioService", { enumerable: true, get: function () { return stdio_grpc_pb_1.GRPCStdioService; } });
/**
 * @internal
 */
class StdioGrpcServer {
    streamStdio() {
        // This appears to be used in Go, but we're not quite sure how to use
        // it in JS.
    }
}
exports.StdioGrpcServer = StdioGrpcServer;
