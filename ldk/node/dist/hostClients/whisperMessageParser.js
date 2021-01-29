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
exports.transformResponse = exports.transformDisambiguationResponse = void 0;
const messages = __importStar(require("../grpc/whisper_pb"));
const transformOutput = (message) => {
    const messageObj = message.toObject();
    switch (message.getOutputOneofCase()) {
        case messages.WhisperFormOutput.OutputOneofCase.CHECKBOX:
            return messageObj.checkbox.value;
        case messages.WhisperFormOutput.OutputOneofCase.EMAIL:
            return messageObj.email.value;
        case messages.WhisperFormOutput.OutputOneofCase.MARKDOWN:
            return messageObj.markdown.value;
        case messages.WhisperFormOutput.OutputOneofCase.NUMBER:
            return messageObj.number.value;
        case messages.WhisperFormOutput.OutputOneofCase.PASSWORD:
            return messageObj.password.value;
        case messages.WhisperFormOutput.OutputOneofCase.RADIO:
            return messageObj.radio.value;
        case messages.WhisperFormOutput.OutputOneofCase.SELECT:
            return messageObj.select.value;
        case messages.WhisperFormOutput.OutputOneofCase.TEL:
            return messageObj.tel.value;
        case messages.WhisperFormOutput.OutputOneofCase.TEXT:
            return messageObj.text.value;
        case messages.WhisperFormOutput.OutputOneofCase.TIME:
            return message.getTime().getValue().toDate();
        case messages.WhisperFormOutput.OutputOneofCase.OUTPUT_ONEOF_NOT_SET:
        default:
            return '';
    }
};
const transformUpdate = (message) => ({
    key: message.getKey(),
    value: transformOutput(message.getOutput()),
    type: 'update',
});
const transformOutputMap = (map) => {
    const results = {};
    map.forEach((entry, key) => {
        results[key] = transformOutput(entry);
    });
    return results;
};
const transformResult = (message) => ({
    submitted: message.getSubmitted(),
    outputs: transformOutputMap(message.getOutputsMap()),
    type: 'submit',
});
exports.transformDisambiguationResponse = (response) => ({ key: response.getKey() });
exports.transformResponse = (response) => {
    const update = response.getUpdate();
    const result = response.getResult();
    try {
        if (update) {
            return transformUpdate(update);
        }
        if (result) {
            return transformResult(result);
        }
        return {
            key: '',
            value: '',
            type: 'update',
        };
    }
    catch (e) {
        return {
            key: '',
            value: '',
            type: 'update',
        };
    }
};
