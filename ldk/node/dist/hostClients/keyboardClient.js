"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keyboard_grpc_pb_1 = require("../grpc/keyboard_grpc_pb");
const keyboard_pb_1 = __importDefault(require("../grpc/keyboard_pb"));
const baseClient_1 = __importDefault(require("./baseClient"));
const transformingStream_1 = require("./transformingStream");
/**
 * @internal
 * @param modifiers - The modifiers to generate flags for.
 */
const generateModifierFlag = (modifiers) => {
    return (((modifiers === null || modifiers === void 0 ? void 0 : modifiers.altL) ? 1 : 0) +
        ((modifiers === null || modifiers === void 0 ? void 0 : modifiers.altR) ? 2 : 0) +
        ((modifiers === null || modifiers === void 0 ? void 0 : modifiers.ctrlL) ? 4 : 0) +
        ((modifiers === null || modifiers === void 0 ? void 0 : modifiers.ctrlR) ? 8 : 0) +
        ((modifiers === null || modifiers === void 0 ? void 0 : modifiers.metaL) ? 16 : 0) +
        ((modifiers === null || modifiers === void 0 ? void 0 : modifiers.metaR) ? 32 : 0) +
        ((modifiers === null || modifiers === void 0 ? void 0 : modifiers.shiftL) ? 64 : 0) +
        ((modifiers === null || modifiers === void 0 ? void 0 : modifiers.shiftR) ? 128 : 0));
};
/**
 * @internal
 * @param message - The message to transform.
 */
const transformTextStream = (message) => {
    return {
        text: message.getText(),
    };
};
/**
 * @internal
 * @param message - The message to transform.
 */
const transformScanCodeStream = (message) => {
    return {
        scanCode: message.getScancode(),
        direction: message.getPressed() ? 'down' : 'up',
    };
};
/**
 * @internal
 * @param keyRequest - The key request to generate a stream for.
 */
function generateHotkeyStreamRequest(keyRequest) {
    const request = new keyboard_pb_1.default.KeyboardHotkey();
    request.setKey(keyRequest.key);
    request.setModifiers(generateModifierFlag(keyRequest.modifiers));
    const message = new keyboard_pb_1.default.KeyboardHotkeyStreamRequest();
    message.setHotkey(request);
    return message;
}
/**
 * @internal
 * @param message - The message to transform.
 */
const transformHotKeyEvent = (message) => {
    return {
        direction: message.getScanned() ? 'down' : 'up',
    };
};
/**
 * @internal
 */
class KeyboardClient extends baseClient_1.default {
    streamHotKey(hotKeys, listener) {
        const message = generateHotkeyStreamRequest(hotKeys);
        return new transformingStream_1.TransformingStream(this.client.keyboardHotkeyStream(message), transformHotKeyEvent, listener);
    }
    streamText() {
        return new transformingStream_1.TransformingStream(this.client.keyboardTextStream(new keyboard_pb_1.default.KeyboardTextStreamRequest().setSession(this.createSessionMessage())), (response) => response.getText());
    }
    streamChar(listener) {
        return new transformingStream_1.TransformingStream(this.client.keyboardCharacterStream(new keyboard_pb_1.default.KeyboardCharacterStreamRequest().setSession(this.createSessionMessage())), transformTextStream, listener);
    }
    streamScanCode(listener) {
        return new transformingStream_1.TransformingStream(this.client.keyboardScancodeStream(new keyboard_pb_1.default.KeyboardScancodeStreamRequest().setSession(this.createSessionMessage())), transformScanCodeStream, listener);
    }
    generateClient() {
        return keyboard_grpc_pb_1.KeyboardClient;
    }
}
exports.default = KeyboardClient;
