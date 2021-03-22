"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clipboardClient_1 = require("./hostClients/clipboardClient");
const cursorClient_1 = require("./hostClients/cursorClient");
const fileSystemClient_1 = require("./hostClients/fileSystemClient");
const keyboardClient_1 = require("./hostClients/keyboardClient");
const networkClient_1 = require("./hostClients/networkClient");
const processClient_1 = require("./hostClients/processClient");
const uiClient_1 = require("./hostClients/uiClient");
const vaultClient_1 = require("./hostClients/vaultClient");
const whisperClient_1 = require("./hostClients/whisperClient");
const windowClient_1 = require("./hostClients/windowClient");
/**
 * @internal
 */
class HostClientFacade {
    constructor(logger) {
        this.clipboard = new clipboardClient_1.ClipboardClient();
        this.cursor = new cursorClient_1.CursorClient();
        this.fileSystem = new fileSystemClient_1.FileSystemClient();
        this.keyboard = new keyboardClient_1.KeyboardClient();
        this.network = new networkClient_1.NetworkClient();
        this.process = new processClient_1.ProcessClient();
        this.ui = new uiClient_1.UIClient();
        this.vault = new vaultClient_1.VaultClient();
        this.whisper = new whisperClient_1.WhisperClient();
        this.window = new windowClient_1.WindowClient();
        this.logger = logger;
    }
    connect(connInfo, session) {
        return Promise.all([
            this.clipboard.connect(connInfo, session, this.logger),
            this.cursor.connect(connInfo, session, this.logger),
            this.fileSystem.connect(connInfo, session, this.logger),
            this.keyboard.connect(connInfo, session, this.logger),
            this.network.connect(connInfo, session, this.logger),
            this.process.connect(connInfo, session, this.logger),
            this.ui.connect(connInfo, session, this.logger),
            this.vault.connect(connInfo, session, this.logger),
            this.whisper.connect(connInfo, session, this.logger),
            this.window.connect(connInfo, session, this.logger),
        ]);
    }
}
exports.default = HostClientFacade;
