"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whisper_grpc_pb_1 = require("../grpc/whisper_grpc_pb");
const baseClient_1 = __importDefault(require("./baseClient"));
const transformingStream_1 = require("./transformingStream");
const whisperMessageParser_1 = require("./whisperMessageParser");
const whisperMessageBuilder_1 = require("./whisperMessageBuilder");
/**
 * Class responsible for abstracting Whisper requests to Olive Helps.
 *
 * @internal
 */
class WhisperClient extends baseClient_1.default {
    /**
     * Send a Whisper to the host process.
     *
     * @async
     * @param whisper - An object defining the contents of the Whisper.
     * @returns Promise resolving when the server responds to the command.
     */
    markdownWhisper(whisper) {
        return this.buildStoppableMessage((message, callback) => this.client.whisperMarkdown(message, callback), () => whisperMessageBuilder_1.buildWhisperMarkdownRequest(whisper), 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    listWhisper(whisper) {
        return this.buildStoppableMessage((message, callback) => this.client.whisperList(message, callback), () => whisperMessageBuilder_1.buildWhisperListRequest(whisper), 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    confirmWhisper(whisper) {
        return this.buildStoppableMessage((message, callback) => this.client.whisperConfirm(message, callback), () => whisperMessageBuilder_1.buildWhisperConfirmMessage(whisper), (response) => response.getResponse());
    }
    disambiguationWhisper(whisper, listener) {
        const message = whisperMessageBuilder_1.generateWhisperDisambiguation(whisper).setSession(this.createSessionMessage());
        return new transformingStream_1.TransformingStream(this.client.whisperDisambiguation(message), (response) => whisperMessageParser_1.transformDisambiguationResponse(response), listener);
    }
    formWhisper(whisper, listener) {
        const message = whisperMessageBuilder_1.generateWhisperForm(whisper).setSession(this.createSessionMessage());
        return new transformingStream_1.TransformingStream(this.client.whisperForm(message), (response) => whisperMessageParser_1.transformResponse(response), listener);
    }
    generateClient() {
        return whisper_grpc_pb_1.WhisperClient;
    }
}
exports.default = WhisperClient;
