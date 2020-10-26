"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformResponse = void 0;
const whisper_pb_1 = __importDefault(require("../grpc/whisper_pb"));
const transformOutput = (message) => {
    const messageObj = message.toObject();
    switch (message.getOutputOneofCase()) {
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.CHECKBOX:
            return messageObj.checkbox.value;
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.EMAIL:
            return messageObj.email.value;
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.MARKDOWN:
            return messageObj.markdown.value;
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.NUMBER:
            return messageObj.number.value;
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.PASSWORD:
            return messageObj.password.value;
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.RADIO:
            return messageObj.radio.value;
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.SELECT:
            return messageObj.select.value;
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.TEL:
            return messageObj.tel.value;
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.TEXT:
            return messageObj.text.value;
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.TIME:
            return message.getTime().getValue().toDate();
        case whisper_pb_1.default.WhisperFormOutput.OutputOneofCase.OUTPUTONEOF_NOT_SET:
        default:
            return '';
    }
};
const transformUpdate = (message) => {
    return {
        key: message.getKey(),
        value: transformOutput(message.getOutput()),
        type: 'update',
    };
};
const transformOutputMap = (map) => {
    const results = {};
    map.forEach((entry, key) => {
        results[key] = transformOutput(entry);
    });
    return results;
};
const transformResult = (message) => {
    return {
        submitted: message.getSubmitted(),
        outputs: transformOutputMap(message.getOutputsMap()),
        type: 'submit',
    };
};
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
