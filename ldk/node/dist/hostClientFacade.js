"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whisperClient_1 = __importDefault(require("./hostClients/whisperClient"));
const storageClient_1 = __importDefault(require("./hostClients/storageClient"));
const keyboardClient_1 = __importDefault(require("./hostClients/keyboardClient"));
const clipboardClient_1 = require("./hostClients/clipboardClient");
const cursorClient_1 = require("./hostClients/cursorClient");
const hoverClient_1 = require("./hostClients/hoverClient");
const fileSystemClient_1 = require("./hostClients/fileSystemClient");
const processClient_1 = require("./hostClients/processClient");
const windowClient_1 = require("./hostClients/windowClient");
const browserClient_1 = require("./hostClients/browserClient");
/**
 * @internal
 */
class HostClientFacade {
    constructor() {
        this.whisper = new whisperClient_1.default();
        this.storage = new storageClient_1.default();
        this.keyboard = new keyboardClient_1.default();
        this.clipboard = new clipboardClient_1.ClipboardClient();
        this.cursor = new cursorClient_1.CursorClient();
        this.hover = new hoverClient_1.HoverClient();
        this.fileSystem = new fileSystemClient_1.FileSystemClient();
        this.process = new processClient_1.ProcessClient();
        this.window = new windowClient_1.WindowClient();
        this.browser = new browserClient_1.BrowserClient();
    }
    connect(connInfo, session) {
        return Promise.all([
            this.whisper.connect(connInfo, session),
            this.storage.connect(connInfo, session),
            this.keyboard.connect(connInfo, session),
            this.clipboard.connect(connInfo, session),
            this.cursor.connect(connInfo, session),
            this.hover.connect(connInfo, session),
            this.fileSystem.connect(connInfo, session),
            this.process.connect(connInfo, session),
            this.window.connect(connInfo, session),
            this.browser.connect(connInfo, session),
        ]);
    }
}
exports.default = HostClientFacade;
