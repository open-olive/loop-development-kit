"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whisperClient_1 = __importDefault(require("./aptitudes/whisperClient"));
const vaultClient_1 = __importDefault(require("./aptitudes/vaultClient"));
const keyboardClient_1 = __importDefault(require("./aptitudes/keyboardClient"));
const clipboardClient_1 = require("./aptitudes/clipboardClient");
const cursorClient_1 = require("./aptitudes/cursorClient");
// import { HoverClient } from './aptitudes/hoverClient';
const fileSystemClient_1 = require("./aptitudes/fileSystemClient");
const processClient_1 = require("./aptitudes/processClient");
// import { BrowserClient } from './aptitudes/browserClient';
const networkClient_1 = require("./aptitudes/networkClient");
const uiClient_1 = require("./aptitudes/uiClient");
const windowClient_1 = require("./aptitudes/windowClient");
/**
 * @internal
 */
class AptitudeClients {
    // These services are not yet implemented.
    // public hover: HoverClient = new HoverClient();
    // public browser: BrowserClient = new BrowserClient();
    constructor(logger) {
        this.whisper = new whisperClient_1.default();
        this.vault = new vaultClient_1.default();
        this.keyboard = new keyboardClient_1.default();
        this.clipboard = new clipboardClient_1.ClipboardClient();
        this.cursor = new cursorClient_1.CursorClient();
        this.fileSystem = new fileSystemClient_1.FileSystemClient();
        this.process = new processClient_1.ProcessClient();
        this.ui = new uiClient_1.UIClient();
        this.window = new windowClient_1.WindowClient();
        this.network = new networkClient_1.NetworkClient();
        this.logger = logger;
    }
    connect(connInfo, session) {
        return Promise.all([
            // These services are not yet implemented.
            // this.browser.connect(connInfo, session, this.logger),
            // this.hover.connect(connInfo, session, this.logger),
            // this.window.connect(connInfo, session, this.logger),
            this.whisper.connect(connInfo, session, this.logger),
            this.vault.connect(connInfo, session, this.logger),
            this.clipboard.connect(connInfo, session, this.logger),
            this.keyboard.connect(connInfo, session, this.logger),
            this.process.connect(connInfo, session, this.logger),
            this.cursor.connect(connInfo, session, this.logger),
            this.fileSystem.connect(connInfo, session, this.logger),
            this.network.connect(connInfo, session, this.logger),
        ]);
    }
}
exports.default = AptitudeClients;
