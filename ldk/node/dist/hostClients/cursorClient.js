"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorClient = void 0;
const baseClient_1 = __importDefault(require("./baseClient"));
const cursor_grpc_pb_1 = require("../grpc/cursor_grpc_pb");
const cursor_pb_1 = __importDefault(require("../grpc/cursor_pb"));
const transformingStream_1 = require("./transformingStream");
/**
 * @internal
 * @param message - The message to transform.
 */
const cursorTransformer = (message) => ({
    screen: message.getScreen(),
    x: message.getX(),
    y: message.getY(),
});
/**
 * @internal
 */
class CursorClient extends baseClient_1.default {
    generateClient() {
        return cursor_grpc_pb_1.CursorClient;
    }
    queryCursorPosition() {
        return this.buildQuery((message, callback) => this.client.cursorPosition(message, callback), () => new cursor_pb_1.default.CursorPositionRequest(), cursorTransformer);
    }
    streamCursorPosition(listener) {
        return new transformingStream_1.TransformingStream(this.client.cursorPositionStream(new cursor_pb_1.default.CursorPositionStreamRequest().setSession(this.createSessionMessage())), cursorTransformer, listener);
    }
}
exports.CursorClient = CursorClient;
