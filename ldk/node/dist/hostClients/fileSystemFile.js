"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemFileImpl = exports.parseFileInfo = void 0;
const filesystem_pb_1 = require("../grpc/filesystem_pb");
const session_pb_1 = require("../grpc/session_pb");
var FilesystemFileStatus;
(function (FilesystemFileStatus) {
    FilesystemFileStatus[FilesystemFileStatus["Pending"] = 0] = "Pending";
    FilesystemFileStatus[FilesystemFileStatus["Initialized"] = 1] = "Initialized";
    FilesystemFileStatus[FilesystemFileStatus["Closed"] = 2] = "Closed";
    FilesystemFileStatus[FilesystemFileStatus["Errored"] = 3] = "Errored";
})(FilesystemFileStatus || (FilesystemFileStatus = {}));
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
exports.parseFileInfo = parseFileInfo;
class FileSystemFileImpl {
    constructor(session, stream, logger) {
        this.status = FilesystemFileStatus.Pending;
        this.logger = logger.with('service', 'filesystem.file');
        this.session = session;
        this.stream = stream;
        this.streamPromise = new Promise((resolve, reject) => {
            this.stream.on('end', () => {
                this.logger.info('Stream Closed');
                resolve();
            });
            this.stream.on('error', (error) => {
                this.setError(error);
                reject(error);
            });
        });
    }
    open(path) {
        if (path == null || path === '' || typeof path !== 'string') {
            throw new Error('Path must be a non-empty string');
        }
        this.checkStatus(true);
        const openMsg = new filesystem_pb_1.FilesystemFileStreamRequest.Open()
            .setPath(path)
            .setSession(this.createSessionMessage());
        const message = new filesystem_pb_1.FilesystemFileStreamRequest().setOpen(openMsg);
        this.filePath = path;
        this.logger = this.logger.with('path', this.filePath);
        this.logger.debug('Opening File');
        this.stream.write(message);
        this.status = FilesystemFileStatus.Initialized;
    }
    create(path) {
        if (path == null || path === '' || typeof path !== 'string') {
            throw new Error('Path must be a non-empty string');
        }
        this.checkStatus(true);
        const createMsg = new filesystem_pb_1.FilesystemFileStreamRequest.Create()
            .setPath(path)
            .setSession(this.createSessionMessage());
        const message = new filesystem_pb_1.FilesystemFileStreamRequest().setCreate(createMsg);
        this.filePath = path;
        this.logger.debug('Creating File');
        this.stream.write(message);
        this.status = FilesystemFileStatus.Initialized;
    }
    changeOwnership(params) {
        this.checkStatus();
        const msg = new filesystem_pb_1.FilesystemFileStreamRequest.Chown()
            .setUid(params.owner)
            .setGid(params.group);
        const request = new filesystem_pb_1.FilesystemFileStreamRequest().setChown(msg);
        return this.generateResponsePromise(request, 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (response) => response.getChown(), 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    changePermissions(permissions) {
        this.checkStatus();
        const msg = new filesystem_pb_1.FilesystemFileStreamRequest.Chmod().setMode(permissions);
        const request = new filesystem_pb_1.FilesystemFileStreamRequest().setChmod(msg);
        return this.generateResponsePromise(request, 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (response) => response.getChmod(), 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    close() {
        this.checkStatus();
        const msg = new filesystem_pb_1.FilesystemFileStreamRequest.Close();
        const request = new filesystem_pb_1.FilesystemFileStreamRequest().setClose(msg);
        this.stream.write(request);
        this.status = FilesystemFileStatus.Closed;
        return Promise.resolve();
    }
    info() {
        this.checkStatus();
        const msg = new filesystem_pb_1.FilesystemFileStreamRequest.Stat();
        const request = new filesystem_pb_1.FilesystemFileStreamRequest().setStat(msg);
        return this.generateResponsePromise(request, 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (response) => response.getStat(), 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (input) => parseFileInfo(input.getInfo()));
    }
    read() {
        this.checkStatus();
        const msg = new filesystem_pb_1.FilesystemFileStreamRequest.Read();
        const request = new filesystem_pb_1.FilesystemFileStreamRequest().setRead(msg);
        return this.generateResponsePromise(request, 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (response) => response.getRead(), (input) => input.getData_asU8());
    }
    write(contents) {
        this.checkStatus();
        const msg = new filesystem_pb_1.FilesystemFileStreamRequest.Write().setData(contents);
        const request = new filesystem_pb_1.FilesystemFileStreamRequest().setWrite(msg);
        return this.generateResponsePromise(request, 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (response) => response.getWrite(), (input) => input.getNumofbytes());
    }
    generateResponsePromise(message, responseReader, transformer) {
        return new Promise((resolve, reject) => {
            this.logger.trace('Duplex Request - Sending');
            this.stream.once('data', (data) => {
                try {
                    this.logger.trace('Duplex Response - Receiving');
                    const response = responseReader(data);
                    this.logger.trace('Duplex Response - Transforming');
                    const transformed = transformer(response);
                    this.logger.trace('Duplex Response - Resolving');
                    resolve(transformed);
                }
                catch (e) {
                    this.logger.error('Duplex Response - Rejecting, Error Thrown', 'error', e.message);
                    reject(e);
                }
            });
            this.stream.write(message);
            this.logger.trace('Duplex Request - Waiting for Response');
        });
    }
    checkStatus(expectPending = false) {
        if (expectPending && this.status !== FilesystemFileStatus.Pending) {
            throw new Error('File is not pending');
        }
        else if (expectPending) {
            return;
        }
        if (this.status !== FilesystemFileStatus.Initialized) {
            throw new Error('File is not open');
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setError(error) {
        this.logger.error('Stream Closed - Error Received', 'error', JSON.stringify(error));
        this.status = FilesystemFileStatus.Errored;
    }
    createSessionMessage() {
        const session = new session_pb_1.Session();
        session.setLoopid(this.session.loopid);
        session.setToken(this.session.token);
        return session;
    }
}
exports.FileSystemFileImpl = FileSystemFileImpl;
