'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const dist_1 = require('../../../dist');
const logger = new dist_1.Logger('olive-helps-node-example-clipboard');
class ClipboardLoop {
  start(host) {
    this._host = host;
    this.clipboardStream = this.host.clipboard.streamClipboard((response) => {
      logger.info('Received Clipboard Event', 'text', response || '');
      if (response) {
        this.host.whisper.markdownWhisper({
          markdown: `Clipboard Text: ${response}`,
          label: 'Clipboard Event',
        });
      }
    });
  }
  stop() {
    var _a;
    (_a = this.clipboardStream) === null || _a === void 0 ? void 0 : _a.stop();
    this.clipboardStream = undefined;
    this._host = undefined;
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
