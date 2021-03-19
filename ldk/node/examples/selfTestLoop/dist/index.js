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
const logger = new dist_1.Logger('node-self-test-loop');
const testConfig = {
    clipboard: new testGroup_1.default('Cliboard Service', [
        new loopTest_1.LoopTest('Clipboard Service - Write And Query Test', tests_1.clipboardWriteAndQuery, 10000, 'Copying value to clipboard and reading it back'),
        new loopTest_1.LoopTest('Clipboard Service - Clipboard Stream', tests_1.clipboardStream, 10000, 'Copying the value "LDKThxBai" the the clipboard'),
    ]),
    cursor: new testGroup_1.default('Cursor Service', [
        new loopTest_1.LoopTest('Cursor Service - Position Test', tests_1.cursorPosition, 10000, 'Querying cursor position...'),
        new loopTest_1.LoopTest('Cursor Service - Stream Position Test', tests_1.streamCursorPosition, 10000, 'Move your cursor around...'),
    ]),
    window: new testGroup_1.default('Window Service', [
        new loopTest_1.LoopTest('Window Service - Active Window Test', tests_1.windowTest, 10000, 'Make window active...'),
    ]),
    file: new testGroup_1.default('File Service', [
        new loopTest_1.LoopTest('File Service - Query File Directory', tests_1.queryFileDirectory, 10000, 'Querying root directory to look for "go.mod"...'),
        new loopTest_1.LoopTest('File Service - Create and Delete File', tests_1.createAndDeleteFile, 10000, 'Trying to create then delete "test.txt"'),
        new loopTest_1.LoopTest('File Service - Update and read a file', tests_1.updateAndReadFile, 15000, 'Trying to create, update, then read the text in "test.txt" before deleting'),
    ]),
    keyboard: new testGroup_1.default('Keyboard Service', [
        new loopTest_1.LoopTest('Keyboard Service - Hotkey Test', tests_1.hotkeyTest, 10000, 'Press Ctrl+A to test the hotkey functionality.'),
        new loopTest_1.LoopTest('Keyboard Service - Char Stream Test', tests_1.charStreamTest, 10000, 'Type the word "Olive"'),
        new loopTest_1.LoopTest('Keyboard Service - Char Test', tests_1.charTest, 10000, 'Type the letter "F" to pay respects...and test the individual character test'),
    ]),
    process: new testGroup_1.default('Process Service', [
        new loopTest_1.LoopTest('Process Service - Query processes', tests_1.processQuery, 10000, 'Querying what processes are running on the computer...'),
    ]),
    vault: new testGroup_1.default('Vault Service', [
        new loopTest_1.LoopTest('Vault Service - Write / Read from vault', tests_1.vaultReadWrite, 10000, 'Writing value to vault then reading it back.'),
    ]),
    whispers: new testGroup_1.default('Whisper Service', [
        new loopTest_1.LoopTest('Whispser Service - Confirm Whisper', tests_1.confirmWhisper, 10000, 'Click the resolve button'),
        new loopTest_1.LoopTest('Whisper Service - Form Whisper', tests_1.formWhisper, 10000, 'Type in "Stonks" and submit'),
        new loopTest_1.LoopTest('Whisper Service - List Whisper', tests_1.networkAndListWhisper, 20000, 'Opening list whisper. In 10 seconds, this whisper will be dismissed'),
        new loopTest_1.LoopTest('Whisper Service - Disambiguation Whisper', tests_1.disambiguationWhisper, 20000, 'Click the 3rd link'),
    ]),
};
class ClipboardLoop {
    start(host) {
        this._host = host;
        logger.info('Starting Self Test...');
        /* this.simplified().then(() => {
          logger.info('test executed');
        }); */
        const hotkeys = {
            key: '/',
            modifiers: {
                ctrl: true,
            },
        };
        try {
            this.openTestGroups(this.host);
            this.host.keyboard.streamHotKey(hotkeys, (error, response) => {
                if (error) {
                    logger.error('Something is wrong with the hotkey sensor');
                    logger.error(error);
                }
                else {
                    this.openTestGroups(this.host);
                }
            });
        }
        catch (e) {
            logger.error('Error Streaming', 'error', e.toString());
        }
    }
    openTestGroups(host) {
        let allTests = [];
        const elements = {};
        const keys = Object.keys(testConfig);
        for (let i = 0; i < keys.length; i += 1) {
            const group = testConfig[keys[i]];
            elements[keys[i]] = {
                label: `---${group.getId()}`,
                order: i + 1,
                type: 'option',
            };
            allTests = allTests.concat(testConfig[keys[i]].getTests());
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
        }, (error, response) => {
            if (error) {
                whisper.stop();
            }
            if (typeof response !== 'undefined' && response.key !== 'all') {
                const suite = new testSuite_1.default(testConfig[response.key].getTests(), logger);
                suite.start(host).then(() => {
                    logger.info('🎉 Group Done!');
                    const prompt = this.host.whisper.markdownWhisper({
                        markdown: `All tests for ${testConfig[response.key].getId()} have been run`,
                        label: 'Testing Complete',
                    });
                    setTimeout(() => {
                        prompt.stop();
                    }, 5000);
                });
                whisper.stop();
            }
            else if (typeof response !== 'undefined' && response.key === 'all') {
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
