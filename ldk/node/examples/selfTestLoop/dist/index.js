"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../../../dist");
const testSuite_1 = __importDefault(require("./testingFixtures/testSuite"));
const testGroup_1 = __importDefault(require("./testingFixtures/testGroup"));
const loopTest_1 = require("./testingFixtures/loopTest");
const tests_1 = require("./tests");
const logger = new dist_1.Logger('olive-helps-node-example-clipboard');
const testConfig = {
    clipboard: new testGroup_1.default('Cliboard Service', [
        new loopTest_1.LoopTest('Clipboard Service - Write And Query Test', tests_1.clipboardWriteAndQuery, 10000, 'Copying value to clipboard and reading it back'),
    ]),
    cursor: new testGroup_1.default('Cursor Service', [
        new loopTest_1.LoopTest('Cursor Service - Position Test', tests_1.cursorPosition, 10000, 'Querying cursor position...'),
        new loopTest_1.LoopTest('Cursor Service - Stream Position Test', tests_1.streamCursorPosition, 10000, 'Move your cursor around...'),
    ]),
    file: new testGroup_1.default('File Service', [
    /* new LoopTest(
      'File Service - Query File Directory',
      this.queryFileDirectory,
      10000,
      'Querying root directory to look for "go.mod"...',
    ),
    /*
    new LoopTest(
      'File Service - Stream File Info',
      this.streamFileInfo,
      10000,
      'Monitoring for file changes...',
    ),
    */
    ]),
    keyboard: new testGroup_1.default('Keyboard Service', [
        new loopTest_1.LoopTest('Keyboard Service - Hotkey Test', tests_1.hotkeyTest, 10000, 'Press Ctrl+A to test the hotkey functionality.'),
        new loopTest_1.LoopTest('Keyboard Service - Char Stream Test', tests_1.charStreamTest, 10000, 'Type the word "Olive"'),
        new loopTest_1.LoopTest('Keyboard Service - Char Test', tests_1.charTest, 10000, 'Type the letter "F"'),
    ]),
    whispers: new testGroup_1.default('Whisper Service', [
        /*
        new LoopTest(
          'Whispser Service - Confirm Whisper',
          this.confirmWhisper,
          10000,
          'Click the resolve button',
        ),
        new LoopTest(
          'Whispser Service - Form Whisper',
          this.formWhisper,
          10000,
          'Type in "Stonks" and submit',
        ),
        */
        new loopTest_1.LoopTest('Whisper Service - List Whisper', tests_1.networkAndListWhisper, 20000, 'Opening list whisper. In 10 seconds, this whisper will be dismissed'),
        new loopTest_1.LoopTest('Whisper Service - Disambiguation Whisper', tests_1.disambiguationWhisper, 20000, 'Click the 3rd link'),
    ]),
};
class ClipboardLoop {
    start(host) {
        this._host = host;
        logger.info('Starting Self Test...');
        try {
            const initial = this.host.whisper.markdownWhisper({
                markdown: 'Copy the word "LDKThxBai" to your clipboard to begin',
                label: 'Begin Test',
            });
            this.host.clipboard.streamClipboard((error, response) => {
                logger.info(typeof response !== 'undefined' ? response.toString() : 'undefined');
                if (error) {
                    logger.error(error);
                }
                else if (typeof response !== 'undefined' &&
                    response.toString() === 'LDKThxBai') {
                    initial.stop();
                    const allTests = [];
                    const elements = {};
                    const keys = Object.keys(testConfig);
                    for (let i = 0; i < keys.length; i += 1) {
                        const group = testConfig[keys[i]];
                        elements[keys[i]] = {
                            label: group.getId(),
                            order: i + 1,
                            type: 'option',
                        };
                        allTests.concat(testConfig[keys[i]].getTests());
                    }
                    elements.all = {
                        label: `Run all tests`,
                        order: keys.length + 1,
                        type: 'option',
                    };
                    const whisper = host.whisper.disambiguationWhisper({
                        label: 'Self Test Loop groups',
                        markdown: '',
                        elements,
                    }, (e, disResp) => {
                        if (error) {
                            whisper.stop();
                        }
                        logger.debug(JSON.stringify(response));
                        if (typeof disResp !== 'undefined' && disResp.key !== 'all') {
                            const suite = new testSuite_1.default(testConfig[disResp.key].getTests(), logger);
                            suite.start(host).then(() => {
                                logger.info('🎉 Done!');
                                const prompt = this.host.whisper.markdownWhisper({
                                    markdown: `All tests for ${testConfig[disResp.key].getId()} have been run`,
                                    label: 'Testing Complete',
                                });
                                setTimeout(() => {
                                    prompt.stop();
                                }, 5000);
                            });
                            whisper.stop();
                        }
                        else {
                            const suite = new testSuite_1.default(allTests, logger);
                            suite.start(host).then(() => {
                                logger.info('🎉 Done!');
                                const prompt = this.host.whisper.markdownWhisper({
                                    markdown: 'All tests have been run',
                                    label: 'Testing Complete',
                                });
                                setTimeout(() => {
                                    prompt.stop();
                                }, 5000);
                            });
                            whisper.stop();
                        }
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
