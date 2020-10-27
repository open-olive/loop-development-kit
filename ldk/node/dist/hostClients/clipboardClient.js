"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipboardClient = void 0;
const baseClient_1 = __importDefault(require("./baseClient"));
const clipboard_grpc_pb_1 = require("../grpc/clipboard_grpc_pb");
const clipboard_pb_1 = __importDefault(require("../grpc/clipboard_pb"));
const transformingStream_1 = require("./transformingStream");
/**
 * @internal
 *
 * @param message
 */
const clipboardTransformer = (message) => {
    return message.getText();
};
/**
 * @internal
 */
class ClipboardClient extends baseClient_1.default {
    generateClient() {
        return clipboard_grpc_pb_1.ClipboardClient;
    }
    queryClipboard() {
        return this.buildQuery((message, callback) => this.client.clipboardRead(message, callback), () => new clipboard_pb_1.default.ClipboardReadRequest(), clipboardTransformer);
    }
    streamClipboard(listener) {
        return new transformingStream_1.TransformingStream(this.client.clipboardReadStream(new clipboard_pb_1.default.ClipboardReadStreamRequest().setSession(this.createSessionMessage())), clipboardTransformer, listener);
    }
    writeClipboard(text) {
        return this.buildQuery((message, callback) => {
            this.client.clipboardWrite(message, callback);
        }, () => new clipboard_pb_1.default.ClipboardWriteRequest().setText(text), 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
}
exports.ClipboardClient = ClipboardClient;
