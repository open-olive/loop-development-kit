"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWhisperConfirmMessage = exports.buildWhisperMarkdownRequest = exports.generateWhisperForm = exports.generateWhisperMeta = exports.generateWhisperInput = void 0;
const timestamp_pb_1 = require("google-protobuf/google/protobuf/timestamp_pb");
const whisper_pb_1 = __importDefault(require("../grpc/whisper_pb"));
function setFormMessages(msg, input) {
    msg.setLabel(input.label);
    msg.setTooltip(input.tooltip);
}
exports.generateWhisperInput = (input) => {
    const WFI = whisper_pb_1.default.WhisperFormInput;
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
    const style = new whisper_pb_1.default.WhisperStyle();
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
    const whisperMsg = new whisper_pb_1.default.WhisperMeta();
    whisperMsg.setLabel(whisper.label);
    whisperMsg.setStyle(style);
    whisperMsg.setIcon(whisper.icon);
    return whisperMsg;
};
exports.generateWhisperForm = (config) => {
    const msg = new whisper_pb_1.default.WhisperFormRequest();
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
    const result = new whisper_pb_1.default.WhisperMarkdownRequest().setMeta(meta);
    result.setMarkdown(whisper.markdown);
    return result;
};
exports.buildWhisperConfirmMessage = (whisper) => {
    const msg = new whisper_pb_1.default.WhisperConfirmRequest();
    msg.setRejectlabel(whisper.rejectButton);
    msg.setResolvelabel(whisper.resolveButton);
    msg.setMarkdown(whisper.markdown);
    msg.setMeta();
    return msg;
};
