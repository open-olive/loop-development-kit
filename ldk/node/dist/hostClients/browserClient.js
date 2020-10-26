"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserClient = void 0;
const empty_pb_1 = require("google-protobuf/google/protobuf/empty_pb");
const browser_grpc_pb_1 = require("../grpc/browser_grpc_pb");
const baseClient_1 = __importDefault(require("./baseClient"));
const transformingStream_1 = require("./transformingStream");
/**
 * @internal
 *
 * @param message
 */
const transformSelectedTextResponse = (message) => {
    return {
        url: message.getUrl(),
        text: message.getText(),
        tabTitle: message.getTabtitle(),
    };
};
/**
 * @internal
 */
class BrowserClient extends baseClient_1.default {
    queryActiveURL() {
        return this.buildQuery((message, callback) => this.client.browserActiveURL(message, callback), () => new empty_pb_1.Empty(), (response) => response.getUrl());
    }
    querySelectedText() {
        return this.buildQuery((message, callback) => this.client.browserSelectedText(message, callback), () => new empty_pb_1.Empty(), transformSelectedTextResponse);
    }
    streamActiveURL(listener) {
        return new transformingStream_1.TransformingStream(this.client.browserActiveURLStream(new empty_pb_1.Empty()), (message) => message.getUrl(), listener);
    }
    streamSelectedText(listener) {
        return new transformingStream_1.TransformingStream(this.client.browserSelectedTextStream(new empty_pb_1.Empty()), transformSelectedTextResponse, listener);
    }
    generateClient() {
        return browser_grpc_pb_1.BrowserClient;
    }
}
exports.BrowserClient = BrowserClient;
