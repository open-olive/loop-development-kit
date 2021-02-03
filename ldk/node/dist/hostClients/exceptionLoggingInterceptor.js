"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const grpc = __importStar(require("@grpc/grpc-js"));
const METHOD_PATH = /^\/proto\.(?<service>\w+)\/(?<method>\w+)$/;
/**
 * Extracts a standardized method context from string based interceptor options
 *
 * @param options - interceptor options, including the method definition
 */
function extractContext(options) {
    var _a, _b;
    const match = METHOD_PATH.exec(options.method_definition.path);
    return {
        service: ((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.service) || 'UNKNOWN',
        method: ((_b = match === null || match === void 0 ? void 0 : match.groups) === null || _b === void 0 ? void 0 : _b.method) || 'UNKNOWN',
    };
}
/**
 * Builds an interceptor that logs low-level exceptions
 *
 * @param logger - the logger to use for logging exceptions
 */
exports.default = (logger) => (options, nextCall) => {
    const listener = new grpc_js_1.ListenerBuilder()
        .withOnReceiveStatus((status, next) => {
        if (status.code !== grpc.status.OK &&
            status.code !== grpc.status.CANCELLED) {
            const { service, method } = extractContext(options);
            logger.error('Client exception', 'error', status.details, 'service', service, 'method', method);
        }
        next(status);
    })
        .build();
    const requester = new grpc_js_1.RequesterBuilder()
        .withStart((metadata, _listener, next) => {
        next(metadata, listener);
    })
        .build();
    return new grpc_js_1.InterceptingCall(nextCall(options), requester);
};
