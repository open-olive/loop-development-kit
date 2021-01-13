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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowClient = void 0;
const window_pb_1 = __importStar(require("../grpc/window_pb"));
const window_grpc_pb_1 = require("../grpc/window_grpc_pb");
const baseClient_1 = __importDefault(require("./baseClient"));
const windowService_1 = require("./windowService");
const transformingStream_1 = require("./transformingStream");
/**
 * @param action - The action.
 * @internal
 */
function parseWindowAction(action) {
    switch (action) {
        case window_pb_1.WindowAction.WINDOW_ACTION_FOCUSED:
            return windowService_1.WindowStreamAction.Focused;
        case window_pb_1.WindowAction.WINDOW_ACTION_UNFOCUSED:
            return windowService_1.WindowStreamAction.Unfocused;
        case window_pb_1.WindowAction.WINDOW_ACTION_OPENED:
            return windowService_1.WindowStreamAction.Opened;
        case window_pb_1.WindowAction.WINDOW_ACTION_CLOSED:
            return windowService_1.WindowStreamAction.Closed;
        case window_pb_1.WindowAction.WINDOW_ACTION_UNKNOWN:
        default:
            return windowService_1.WindowStreamAction.Unknown;
    }
}
/**
 * @internal
 */
class WindowClient extends baseClient_1.default {
    generateClient() {
        return window_grpc_pb_1.WindowClient;
    }
    queryActiveWindow() {
        return this.buildQuery((message, callback) => this.client.windowActiveWindow(message, callback), () => new window_pb_1.default.WindowActiveWindowRequest(), (response) => response.toObject().window);
    }
    queryWindows() {
        return this.buildQuery((message, callback) => this.client.windowState(message, callback), () => new window_pb_1.default.WindowStateRequest(), (response) => response.toObject().windowList);
    }
    streamActiveWindow(listener) {
        return new transformingStream_1.TransformingStream(this.client.windowActiveWindowStream(new window_pb_1.default.WindowActiveWindowStreamRequest().setSession(this.createSessionMessage())), (response) => response.toObject().window, listener);
    }
    streamWindows(listener) {
        return new transformingStream_1.TransformingStream(this.client.windowStateStream(new window_pb_1.default.WindowStateStreamRequest().setSession(this.createSessionMessage())), (response) => {
            const window = response.getWindow();
            if (window == null) {
                return undefined;
            }
            return {
                window: window.toObject(),
                action: parseWindowAction(response.getAction()),
            };
        }, listener);
    }
}
exports.WindowClient = WindowClient;
