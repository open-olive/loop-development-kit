"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../../../dist");
const testSuite_1 = __importDefault(require("./testingFixtures/testSuite"));
const loopTest_1 = require("./testingFixtures/loopTest");
const logger = new dist_1.Logger('olive-helps-node-example-clipboard');
class ClipboardLoop {
    start(host) {
        this._host = host;
        logger.info('Starting Self Test...');
        try {
            this.host.clipboard.streamClipboard((error, response) => {
                const loopTest1 = new loopTest_1.LoopTest('Passing Test', this.pass);
                const loopTest2 = new loopTest_1.LoopTest('Failing Test', this.fail);
                const suite = new testSuite_1.default([loopTest1, loopTest2]);
                suite.start();
            });
        }
        catch (e) {
            logger.error('Error Streaming', 'error', e.toString());
        }
    }
    pass() {
        logger.info('passing test...');
    }
    fail() {
        throw new Error('This test is supposed to fail');
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
