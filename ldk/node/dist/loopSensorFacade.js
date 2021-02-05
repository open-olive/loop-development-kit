"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whisperClient_1 = __importDefault(require("./loopClients/whisperClient"));
const storageClient_1 = __importDefault(require("./loopClients/storageClient"));
const keyboardClient_1 = __importDefault(require("./loopClients/keyboardClient"));
const clipboardClient_1 = require("./loopClients/clipboardClient");
const cursorClient_1 = require("./loopClients/cursorClient");
// import { HoverClient } from './loopClients/hoverClient';
const fileSystemClient_1 = require("./loopClients/fileSystemClient");
const processClient_1 = require("./loopClients/processClient");
// import { WindowClient } from './loopClients/windowClient';
// import { BrowserClient } from './loopClients/browserClient';
const networkClient_1 = require("./loopClients/networkClient");
const uiClient_1 = require("./loopClients/uiClient");
/**
 * @internal
 */
class LoopSensorFacade {
    // These sensors are not yet implemented.
    // public hover: HoverClient = new HoverClient();
    // public window: WindowClient = new WindowClient();
    // public browser: BrowserClient = new BrowserClient();
    constructor(logger) {
        this.whisper = new whisperClient_1.default();
        this.storage = new storageClient_1.default();
        this.keyboard = new keyboardClient_1.default();
        this.clipboard = new clipboardClient_1.ClipboardClient();
        this.cursor = new cursorClient_1.CursorClient();
        this.fileSystem = new fileSystemClient_1.FileSystemClient();
        this.process = new processClient_1.ProcessClient();
        this.ui = new uiClient_1.UIClient();
        this.network = new networkClient_1.NetworkClient();
        this.logger = logger;
    }
    connect(connInfo, session) {
        return Promise.all([
            // These sensors are not yet implemented.
            // this.browser.connect(connInfo, session, this.logger),
            // this.hover.connect(connInfo, session, this.logger),
            // this.window.connect(connInfo, session, this.logger),
            this.whisper.connect(connInfo, session, this.logger),
            this.storage.connect(connInfo, session, this.logger),
            this.clipboard.connect(connInfo, session, this.logger),
            this.keyboard.connect(connInfo, session, this.logger),
            this.process.connect(connInfo, session, this.logger),
            this.cursor.connect(connInfo, session, this.logger),
            this.fileSystem.connect(connInfo, session, this.logger),
            this.network.connect(connInfo, session, this.logger),
        ]);
    }
}
exports.default = LoopSensorFacade;
