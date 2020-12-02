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
exports.buildWhisperConfirmMessage = exports.buildWhisperListRequest = exports.buildWhisperMarkdownRequest = exports.generateWhisperForm = exports.generateWhisperMeta = exports.generateWhisperListElement = exports.generateWhisperListAlign = exports.generateWhisperListStyle = exports.generateWhisperInput = void 0;
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
    if (input.extra) {
        msg.setExtra(input.extra);
    }
    if (input.order && input.order > 0) {
        msg.setOrder(input.order);
    }
}
exports.generateWhisperListStyle = (style) => {
    switch (style) {
        case whisperService_1.WhisperListStyle.NONE: {
            return messages.WhisperListElement.Style.STYLE_NONE;
        }
        case whisperService_1.WhisperListStyle.SUCCESS: {
            return messages.WhisperListElement.Style.STYLE_SUCCESS;
        }
        case whisperService_1.WhisperListStyle.WARN: {
            return messages.WhisperListElement.Style.STYLE_WARN;
        }
        case whisperService_1.WhisperListStyle.ERROR: {
            return messages.WhisperListElement.Style.STYLE_ERROR;
        }
        default: {
            return messages.WhisperListElement.Style.STYLE_NONE;
        }
    }
};
exports.generateWhisperListAlign = (align) => {
    switch (align) {
        case whisperService_1.WhisperListAlign.LEFT: {
            return messages.WhisperListElement.Align.ALIGN_LEFT;
        }
        case whisperService_1.WhisperListAlign.CENTER: {
            return messages.WhisperListElement.Align.ALIGN_CENTER;
        }
        case whisperService_1.WhisperListAlign.RIGHT: {
            return messages.WhisperListElement.Align.ALIGN_RIGHT;
        }
        default: {
            return messages.WhisperListElement.Align.ALIGN_LEFT;
        }
    }
};
exports.generateWhisperListElement = (element) => {
    const WLE = messages.WhisperListElement;
    const msg = new WLE();
    switch (element.type) {
        case 'pair': {
            const inputMsg = new WLE.Pair();
            if (element.copyable) {
                inputMsg.setCopyable(element.copyable);
            }
            inputMsg.setLabel(element.label);
            if (element.style) {
                inputMsg.setStyle(exports.generateWhisperListStyle(element.style));
            }
            else {
                inputMsg.setStyle(exports.generateWhisperListStyle(whisperService_1.WhisperListStyle.NONE));
            }
            inputMsg.setValue(element.value);
            msg.setPair(inputMsg);
            break;
        }
        case 'message': {
            const inputMsg = new WLE.Message();
            if (element.align) {
                inputMsg.setAlign(exports.generateWhisperListAlign(element.align));
            }
            else {
                inputMsg.setAlign(exports.generateWhisperListAlign(whisperService_1.WhisperListAlign.LEFT));
            }
            if (element.body) {
                inputMsg.setBody(element.body);
            }
            if (element.header) {
                inputMsg.setBody(element.header);
            }
            if (element.style) {
                inputMsg.setStyle(exports.generateWhisperListStyle(element.style));
            }
            else {
                inputMsg.setStyle(exports.generateWhisperListStyle(whisperService_1.WhisperListStyle.NONE));
            }
            msg.setMessage(inputMsg);
            break;
        }
        case 'divider': {
            const inputMsg = new WLE.Divider();
            if (element.style) {
                inputMsg.setStyle(exports.generateWhisperListStyle(element.style));
            }
            else {
                inputMsg.setStyle(exports.generateWhisperListStyle(whisperService_1.WhisperListStyle.NONE));
            }
            msg.setDivider(inputMsg);
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
