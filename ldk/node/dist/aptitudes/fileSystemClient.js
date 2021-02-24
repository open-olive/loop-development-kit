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
const fileSystem_1 = require("./fileSystem");
const transformingStream_1 = require("./transformingStream");
const fileSystemFile_1 = require("./fileSystemFile");
/**
 * @param action - The file action.
 * @internal
 */
function parseFileAction(action) {
    switch (action) {
        case filesystem_pb_1.FileAction.FILE_ACTION_CREATE:
            return fileSystem_1.FileSystemStreamAction.Create;
        case filesystem_pb_1.FileAction.FILE_ACTION_WRITE:
            return fileSystem_1.FileSystemStreamAction.Write;
        case filesystem_pb_1.FileAction.FILE_ACTION_REMOVE:
            return fileSystem_1.FileSystemStreamAction.Remove;
        case filesystem_pb_1.FileAction.FILE_ACTION_RENAME:
            return fileSystem_1.FileSystemStreamAction.Rename;
        case filesystem_pb_1.FileAction.FILE_ACTION_CHMOD:
            return fileSystem_1.FileSystemStreamAction.Chmod;
        case filesystem_pb_1.FileAction.FILE_ACTION_UNKNOWN:
        default:
            return fileSystem_1.FileSystemStreamAction.Unknown;
    }
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
            files: message.getFilesList().map(fileSystemFile_1.parseFileInfo),
        }));
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
                files: fileSystemFile_1.parseFileInfo(fileInfo),
                action: parseFileAction(response.getAction()),
            };
        }, listener);
    }
    streamFileInfo(params, listener) {
        const message = new filesystem_pb_1.default.FilesystemFileInfoStreamRequest()
            .setPath(params.file)
            .setSession(this.createSessionMessage());
        return new transformingStream_1.TransformingStream(this.client.filesystemFileInfoStream(message), (response) => {
            const fileInfo = response.getFile();
            if (fileInfo == null) {
                return undefined;
            }
            return {
                file: fileSystemFile_1.parseFileInfo(fileInfo),
                action: parseFileAction(response.getAction()),
            };
        }, listener);
    }
    copyFile(params) {
        const message = new filesystem_pb_1.default.FilesystemCopyRequest()
            .setDest(params.destination)
            .setSource(params.source)
            .setSession(this.createSessionMessage());
        return this.buildQuery((request, callback) => {
            this.client.filesystemCopy(request, callback);
        }, () => message, 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    moveFile(params) {
        const message = new filesystem_pb_1.default.FilesystemMoveRequest()
            .setDest(params.destination)
            .setSource(params.source)
            .setSession(this.createSessionMessage());
        return this.buildQuery((request, callback) => {
            this.client.filesystemMove(request, callback);
        }, () => message, 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    makeDirectory(path) {
        return this.buildQuery((request, callback) => {
            this.client.filesystemMakeDir(request, callback);
        }, () => new filesystem_pb_1.default.FilesystemMakeDirRequest()
            .setPath(path.path)
            .setPerm(path.permissions)
            .setSession(this.createSessionMessage()), 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    openFile(path) {
        const impl = new fileSystemFile_1.FileSystemFileImpl(this.session, this.client.filesystemFileStream(), this.logger);
        impl.open(path);
        return impl;
    }
    createFile(path) {
        const impl = new fileSystemFile_1.FileSystemFileImpl(this.session, this.client.filesystemFileStream(), this.logger);
        impl.create(path);
        return impl;
    }
    removeFile(params) {
        return this.buildQuery((request, callback) => {
            this.client.filesystemRemove(request, callback);
        }, () => new filesystem_pb_1.default.FilesystemRemoveRequest()
            .setPath(params.path)
            .setRecursive(params.recursive || false)
            .setSession(this.createSessionMessage()), 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    serviceName() {
        return 'filesystem';
    }
}
exports.FileSystemClient = FileSystemClient;
