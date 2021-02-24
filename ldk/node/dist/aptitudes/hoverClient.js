"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverClient = void 0;
const baseClient_1 = __importDefault(require("./baseClient"));
const hover_grpc_pb_1 = require("../grpc/hover_grpc_pb");
const hover_pb_1 = __importDefault(require("../grpc/hover_pb"));
const transformingStream_1 = require("./transformingStream");
/**
 * @param request - The request with x & y coordinates to update from.
 * @param message - The message.
 * @internal
 */
function updateRequest(request, message) {
    return message
        .setXfromcenter(request.xFromCenter)
        .setYfromcenter(request.yFromCenter);
}
/**
 * @internal
 */
class HoverClient extends baseClient_1.default {
    generateClient() {
        return hover_grpc_pb_1.HoverClient;
    }
    text(params) {
        return this.buildQuery((message, callback) => {
            this.client.hoverRead(message, callback);
        }, () => updateRequest(params, new hover_pb_1.default.HoverReadRequest()), (response) => ({ text: response.getText() }));
    }
    listenText(params, listener) {
        const message = updateRequest(params, new hover_pb_1.default.HoverReadStreamRequest().setSession(this.createSessionMessage()));
        return new transformingStream_1.TransformingStream(this.client.hoverReadStream(message), (response) => ({ text: response.getText() }), listener);
    }
    serviceName() {
        return 'hover';
    }
}
exports.HoverClient = HoverClient;
