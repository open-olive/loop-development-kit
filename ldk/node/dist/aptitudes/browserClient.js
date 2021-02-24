"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserClient = void 0;
const browser_grpc_pb_1 = require("../grpc/browser_grpc_pb");
const browser_pb_1 = __importDefault(require("../grpc/browser_pb"));
const baseClient_1 = __importDefault(require("./baseClient"));
const transformingStream_1 = require("./transformingStream");
/**
 * @internal
 *
 * @param message - The message to transform.
 */
const transformSelectedTextResponse = (message) => ({
    url: message.getUrl(),
    text: message.getText(),
    tabTitle: message.getTabtitle(),
});
/**
 * @internal
 */
class BrowserClient extends baseClient_1.default {
    queryActiveURL() {
        return this.buildQuery((message, callback) => this.client.browserActiveURL(message, callback), () => new browser_pb_1.default.BrowserActiveURLRequest(), (response) => response.getUrl());
    }
    querySelectedText() {
        return this.buildQuery((message, callback) => this.client.browserSelectedText(message, callback), () => new browser_pb_1.default.BrowserSelectedTextRequest(), transformSelectedTextResponse);
    }
    streamActiveURL(listener) {
        return new transformingStream_1.TransformingStream(this.client.browserActiveURLStream(new browser_pb_1.default.BrowserActiveURLRequest().setSession(this.createSessionMessage())), (message) => message.getUrl(), listener);
    }
    streamSelectedText(listener) {
        return new transformingStream_1.TransformingStream(this.client.browserSelectedTextStream(new browser_pb_1.default.BrowserSelectedTextStreamRequest().setSession(this.createSessionMessage())), transformSelectedTextResponse, listener);
    }
    generateClient() {
        return browser_grpc_pb_1.BrowserClient;
    }
    serviceName() {
        return 'browser';
    }
}
exports.BrowserClient = BrowserClient;
