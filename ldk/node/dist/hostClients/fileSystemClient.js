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
exports.FileSystemClient = void 0;
const filesystem_grpc_pb_1 = require("../grpc/filesystem_grpc_pb");
const filesystem_pb_1 = __importStar(require("../grpc/filesystem_pb"));
const baseClient_1 = __importDefault(require("./baseClient"));
const fileSystemService_1 = require("./fileSystemService");
const transformingStream_1 = require("./transformingStream");
/**
 * @param action - The file action.
 * @internal
 */
function parseFileAction(action) {
    switch (action) {
        case filesystem_pb_1.FileAction.FILE_ACTION_CREATE:
            return fileSystemService_1.FileSystemStreamAction.Create;
        case filesystem_pb_1.FileAction.FILE_ACTION_WRITE:
            return fileSystemService_1.FileSystemStreamAction.Write;
        case filesystem_pb_1.FileAction.FILE_ACTION_REMOVE:
            return fileSystemService_1.FileSystemStreamAction.Remove;
        case filesystem_pb_1.FileAction.FILE_ACTION_RENAME:
            return fileSystemService_1.FileSystemStreamAction.Rename;
        case filesystem_pb_1.FileAction.FILE_ACTION_CHMOD:
            return fileSystemService_1.FileSystemStreamAction.Chmod;
        case filesystem_pb_1.FileAction.FILE_ACTION_UNKNOWN:
        default:
            return fileSystemService_1.FileSystemStreamAction.Unknown;
    }
}
/**
 * @param fileInfo - The file info.
 * @internal
 */
function parseFileInfo(fileInfo) {
    var _a;
    return {
        name: fileInfo.getName(),
        size: fileInfo.getSize(),
        mode: fileInfo.getMode(),
        updated: (_a = fileInfo.getUpdated()) === null || _a === void 0 ? void 0 : _a.toDate(),
        isDir: fileInfo.getIsdir(),
    };
}
/**
 * @internal
 */
class FileSystemClient extends baseClient_1.default {
    generateClient() {
        return filesystem_grpc_pb_1.FilesystemClient;
    }
    queryDirectory(params) {
        return this.buildQuery((message, callback) => {
            this.client.filesystemDir(message, callback);
        }, () => new filesystem_pb_1.default.FilesystemDirRequest().setDirectory(params.directory), (message) => ({
            files: message.getFilesList().map(parseFileInfo),
        }));
    }
    queryFile(params) {
        return this.buildQuery((message, callback) => this.client.filesystemFile(message, callback), () => new filesystem_pb_1.default.FilesystemFileRequest().setPath(params.file), (message) => {
            const fileInfo = message.getFile();
            return { file: fileInfo ? parseFileInfo(fileInfo) : undefined };
        });
    }
    streamDirectory(params, listener) {
        const message = new filesystem_pb_1.default.FilesystemDirStreamRequest()
            .setDirectory(params.directory)
            .setSession(this.createSessionMessage());
        return new transformingStream_1.TransformingStream(this.client.filesystemDirStream(message), (response) => {
            const fileInfo = response.getFile();
            if (fileInfo == null) {
                return undefined;
            }
            return {
                files: parseFileInfo(fileInfo),
                action: parseFileAction(response.getAction()),
            };
        }, listener);
    }
    streamFile(params, listener) {
        const message = new filesystem_pb_1.default.FilesystemFileStreamRequest()
            .setPath(params.file)
            .setSession(this.createSessionMessage());
        return new transformingStream_1.TransformingStream(this.client.filesystemFileStream(message), (response) => {
            const fileInfo = response.getFile();
            if (fileInfo == null) {
                return undefined;
            }
            return {
                file: parseFileInfo(fileInfo),
                action: parseFileAction(response.getAction()),
            };
        }, listener);
    }
}
exports.FileSystemClient = FileSystemClient;
