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
exports.buildWhisperConfirmMessage = exports.buildWhisperListRequest = exports.buildWhisperMarkdownRequest = exports.generateWhisperForm = exports.generateWhisperMeta = exports.generateWhisperListElement = exports.generateWhisperListElementAlertHighlight = exports.generateWhisperListElementPairHighlight = exports.generateWhisperInput = void 0;
const timestamp_pb_1 = require("google-protobuf/google/protobuf/timestamp_pb");
const whisperService_1 = require("./whisperService");
const messages = __importStar(require("../grpc/whisper_pb"));
/**
 * @param msg - The message.
 * @param input - The whisper form input.
 */
function setFormMessages(msg, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
input) {
    msg.setLabel(input.label);
    msg.setTooltip(input.tooltip);
    if (input.order && input.order > 0) {
        msg.setOrder(input.order);
    }
}
exports.generateWhisperInput = (input) => {
    const WFI = messages.WhisperFormInput;
    const msg = new WFI();
    let inputMsg;
    switch (input.type) {
        case 'password': {
            inputMsg = new WFI.Password();
            msg.setPassword(inputMsg);
            break;
        }
        case 'email': {
            inputMsg = new WFI.Email();
            inputMsg.setValue(input.value);
            msg.setEmail(inputMsg);
            break;
        }
        case 'checkbox': {
            inputMsg = new WFI.Checkbox();
            inputMsg.setValue(input.value);
            msg.setCheckbox(inputMsg);
            break;
        }
        case 'markdown': {
            inputMsg = new WFI.Markdown();
            inputMsg.setValue(input.value);
            msg.setMarkdown(inputMsg);
            break;
        }
        case 'number': {
            inputMsg = new WFI.Number();
            inputMsg.setValue(input.value);
            inputMsg.setMax(input.max);
            inputMsg.setMin(input.min);
            msg.setNumber(inputMsg);
            break;
        }
        case 'radio': {
            inputMsg = new WFI.Radio();
            inputMsg.setOptionsList(input.options);
            msg.setRadio(inputMsg);
            break;
        }
        case 'select': {
            inputMsg = new WFI.Select();
            inputMsg.setOptionsList(input.options);
            msg.setSelect(inputMsg);
            break;
        }
        case 'telephone': {
            inputMsg = new WFI.Tel();
            inputMsg.setValue(input.value);
            msg.setTel(inputMsg);
            break;
        }
        case 'text': {
            inputMsg = new WFI.Text();
            inputMsg.setValue(input.value);
            msg.setText(inputMsg);
            break;
        }
        case 'date': {
            const date = new timestamp_pb_1.Timestamp();
            date.fromDate(input.value);
            inputMsg = new WFI.Time();
            inputMsg.setValue(date);
            msg.setTime(inputMsg);
            break;
        }
        default: {
            throw new Error('Unexpected Input Type');
        }
    }
    setFormMessages(inputMsg, input);
    return msg;
};
/**
 * @param msg - The message.
 * @param input - The whisper list element.
 */
function setListMessages(msg, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
input) {
    msg.setExtra(input.extra);
    if (input.order && input.order > 0) {
        msg.setOrder(input.order);
    }
}
exports.generateWhisperListElementPairHighlight = (highlight) => {
    switch (highlight) {
        case whisperService_1.WhisperListPairHighlight.NONE: {
            return messages.WhisperListElement.Pair.Highlight.NONE;
        }
        case whisperService_1.WhisperListPairHighlight.YELLOW: {
            return messages.WhisperListElement.Pair.Highlight.YELLOW;
        }
        default: {
            throw new Error('Unexpected Input Type');
        }
    }
};
exports.generateWhisperListElementAlertHighlight = (highlight) => {
    switch (highlight) {
        case whisperService_1.WhisperListAlertHighlight.NONE: {
            return messages.WhisperListElement.Alert.Highlight.NONE;
        }
        case whisperService_1.WhisperListAlertHighlight.GREEN: {
            return messages.WhisperListElement.Alert.Highlight.GREEN;
        }
        case whisperService_1.WhisperListAlertHighlight.RED: {
            return messages.WhisperListElement.Alert.Highlight.RED;
        }
        default: {
            throw new Error('Unexpected Input Type');
        }
    }
};
exports.generateWhisperListElement = (element) => {
    const WLE = messages.WhisperListElement;
    const msg = new WLE();
    switch (element.type) {
        case 'pair': {
            const inputMsg = new WLE.Pair();
            inputMsg.setCopyable(element.copyable);
            inputMsg.setHighlight(exports.generateWhisperListElementPairHighlight(element.highlight));
            inputMsg.setKey(element.key);
            inputMsg.setValue(element.value);
            msg.setPair(inputMsg);
            break;
        }
        case 'alert': {
            const inputMsg = new WLE.Alert();
            inputMsg.setBody(element.body);
            inputMsg.setHighlight(exports.generateWhisperListElementAlertHighlight(element.highlight));
            msg.setAlert(inputMsg);
            break;
        }
        default: {
            throw new Error('Unexpected Input Type');
        }
    }
    setListMessages(msg, element);
    return msg;
};
exports.generateWhisperMeta = (whisper) => {
    const whisperMsg = new messages.WhisperMeta();
    whisperMsg.setLabel(whisper.label);
    whisperMsg.setIcon(whisper.icon);
    return whisperMsg;
};
exports.generateWhisperForm = (config) => {
    const msg = new messages.WhisperFormRequest();
    msg.setMeta(exports.generateWhisperMeta(config));
    msg.setMarkdown(config.markdown);
    msg.setCancellabel(config.cancelButton);
    msg.setSubmitlabel(config.submitButton);
    const map = msg.getInputsMap();
    Object.keys(config.inputs).forEach((key) => {
        const value = config.inputs[key];
        const input = exports.generateWhisperInput(value);
        map.set(key, input);
    });
    return msg;
};
exports.buildWhisperMarkdownRequest = (whisper) => {
    const meta = exports.generateWhisperMeta(whisper);
    const result = new messages.WhisperMarkdownRequest().setMeta(meta);
    result.setMarkdown(whisper.markdown);
    return result;
};
exports.buildWhisperListRequest = (config) => {
    const meta = exports.generateWhisperMeta(config);
    const request = new messages.WhisperListRequest().setMeta(meta);
    const elements = request.getElementsMap();
    Object.keys(config.elements).forEach((key) => {
        const value = config.elements[key];
        const input = exports.generateWhisperListElement(value);
        elements.set(key, input);
    });
    return request;
};
exports.buildWhisperConfirmMessage = (whisper) => {
    const msg = new messages.WhisperConfirmRequest();
    msg.setRejectlabel(whisper.rejectButton);
    msg.setResolvelabel(whisper.resolveButton);
    msg.setMarkdown(whisper.markdown);
    msg.setMeta();
    return msg;
};
