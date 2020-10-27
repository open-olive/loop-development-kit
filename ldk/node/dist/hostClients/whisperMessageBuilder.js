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
exports.buildWhisperConfirmMessage = exports.buildWhisperMarkdownRequest = exports.generateWhisperForm = exports.generateWhisperMeta = exports.generateWhisperInput = void 0;
const timestamp_pb_1 = require("google-protobuf/google/protobuf/timestamp_pb");
const messages = __importStar(require("../grpc/whisper_pb"));
/**
 * @param msg
 * @param input
 */
function setFormMessages(msg, input) {
    msg.setLabel(input.label);
    msg.setTooltip(input.tooltip);
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
exports.generateWhisperMeta = (whisper) => {
    const style = new messages.WhisperStyle();
    if (whisper.style) {
        style.setBackgroundcolor(whisper.style.backgroundColor || '#fff');
        style.setPrimarycolor(whisper.style.primaryColor || '#666');
        style.setHighlightcolor(whisper.style.highlightColor || '#651fff');
    }
    else {
        style.setBackgroundcolor('#fff');
        style.setPrimarycolor('#666');
        style.setHighlightcolor('#651fff');
    }
    const whisperMsg = new messages.WhisperMeta();
    whisperMsg.setLabel(whisper.label);
    whisperMsg.setStyle(style);
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
exports.buildWhisperConfirmMessage = (whisper) => {
    const msg = new messages.WhisperConfirmRequest();
    msg.setRejectlabel(whisper.rejectButton);
    msg.setResolvelabel(whisper.resolveButton);
    msg.setMarkdown(whisper.markdown);
    msg.setMeta();
    return msg;
};
