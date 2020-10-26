"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessClient = void 0;
const empty_pb_1 = require("google-protobuf/google/protobuf/empty_pb");
const process_grpc_pb_1 = require("../grpc/process_grpc_pb");
const process_pb_1 = require("../grpc/process_pb");
const baseClient_1 = __importDefault(require("./baseClient"));
const processService_1 = require("./processService");
const transformingStream_1 = require("./transformingStream");
/**
 * @param info
 * @internal
 */
function parseProcessInfo(info) {
    return info.toObject();
}
/**
 * @param action
 * @internal
 */
function parseProcessAction(action) {
    switch (action) {
        case process_pb_1.ProcessAction.PROCESS_ACTION_STARTED:
            return processService_1.ProcessStreamAction.Started;
        case process_pb_1.ProcessAction.PROCESS_ACTION_STOPPED:
            return processService_1.ProcessStreamAction.Stopped;
        case process_pb_1.ProcessAction.PROCESS_ACTION_UNKNOWN:
        default:
            return processService_1.ProcessStreamAction.Unknown;
    }
}
/**
 * @internal
 */
class ProcessClient extends baseClient_1.default {
    generateClient() {
        return process_grpc_pb_1.ProcessClient;
    }
    queryProcesses() {
        return this.buildQuery((message, callback) => {
            this.client.processState(message, callback);
        }, () => new empty_pb_1.Empty(), (response) => ({
            processes: response
                .getProcessesList()
                .map((processInfo) => parseProcessInfo(processInfo)),
        }));
    }
    streamProcesses() {
        return new transformingStream_1.TransformingStream(this.client.processStateStream(new empty_pb_1.Empty()), (message) => {
            const processRaw = message.getProcess();
            if (processRaw == null) {
                return undefined;
            }
            return {
                process: parseProcessInfo(processRaw),
                action: parseProcessAction(message.getAction()),
            };
        });
    }
}
exports.ProcessClient = ProcessClient;
