"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../../../dist");
const logger = new dist_1.Logger('olive-helps-node-example-clipboard');
class ClipboardLoop {
    start(host) {
        this._host = host;
        logger.info('Requesting Stream');
        try {
            this.host.clipboard.streamClipboard((error, response) => {
                logger.info('Received Clipboard Event', 'response', JSON.stringify(response));
                if (response) {
                    this.host.whisper.markdownWhisper({
                        markdown: `Clipboard Node Text: ${response}`,
                        label: 'Clipboard Node Event',
                    });
                }
            });
        }
        catch (e) {
            logger.error('Error Streaming', 'error', e.toString());
        }
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
