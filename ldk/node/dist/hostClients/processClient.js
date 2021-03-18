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
exports.ProcessClient = void 0;
const process_grpc_pb_1 = require("../grpc/process_grpc_pb");
const process_pb_1 = __importStar(require("../grpc/process_pb"));
const baseClient_1 = __importDefault(require("./baseClient"));
const processService_1 = require("./processService");
const transformingStream_1 = require("./transformingStream");
/**
 * @param info - The process info to parse.
 * @internal
 */
function parseProcessInfo(info) {
    return info.toObject();
}
/**
 * @param action - The action to process.
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
        }, () => new process_pb_1.default.ProcessStateRequest(), (response) => ({
            processes: response
                .getProcessesList()
                .map((processInfo) => parseProcessInfo(processInfo)),
        }));
    }
    streamProcesses(listener) {
        return new transformingStream_1.TransformingStream(this.client.processStateStream(new process_pb_1.default.ProcessStateStreamRequest().setSession(this.createSessionMessage())), (message) => {
            const processRaw = message.getProcess();
            if (processRaw == null) {
                return undefined;
            }
            return {
                process: parseProcessInfo(processRaw),
                action: parseProcessAction(message.getAction()),
            };
        }, listener);
    }
    serviceName() {
        return 'process';
    }
}
exports.ProcessClient = ProcessClient;
