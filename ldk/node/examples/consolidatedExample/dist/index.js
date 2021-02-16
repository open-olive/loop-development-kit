"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../../../dist");
const logger = new dist_1.Logger('olive-helps-node-example-clipboard');
class ClipboardLoop {
    start(host) {
        this._host = host;
        logger.info('Requesting Stream');
        try {
            this.host.clipboard.streamClipboard(async (error, response) => {
                if (response !== 'fileinfo') {
                    return;
                }
                this.workFile().catch((e) => {
                    logger.error('Received Error', 'error', e);
                });
            });
        }
        catch (e) {
            logger.error('Error Streaming', 'error', e.toString());
        }
    }
    async workFile() {
        logger.debug('Opening File');
        const file = this.host.fileSystem.openFile('/tmp/log.txt');
        logger.debug('Getting File');
        const fileInfo = await file.info();
        logger.debug('Received File', 'info', JSON.stringify(fileInfo));
        this.host.whisper.markdownWhisper({
            label: 'File Info',
            markdown: JSON.stringify(fileInfo),
        });
        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });
        await file.close();
        logger.debug('File Closed');
    }
    stop() {
        var _a;
        logger.info('Stopping');
        (_a = this.clipboardStream) === null || _a === void 0 ? void 0 : _a.stop();
        this.clipboardStream = undefined;
        this._host = undefined;
        process.exit(0);
    }
    get host() {
        if (this._host == null) {
            throw new Error('Cannot Retrieve Host Before Set');
        }
        return this._host;
    }
}
const loop = new ClipboardLoop();
dist_1.serveLoop(loop);
