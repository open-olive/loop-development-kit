"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = exports.Window = exports.Whisper = exports.Storage = exports.Process = exports.Keyboard = exports.Hover = exports.FileSystem = exports.Cursor = exports.Clipboard = exports.Browser = exports.serveLoop = exports.Logger = exports.Plugin = exports.operatingSystem = exports.categories = exports.access = void 0;
const access_1 = __importDefault(require("./access"));
exports.access = access_1.default;
const categories_1 = __importDefault(require("./categories"));
exports.categories = categories_1.default;
const operatingSystem_1 = __importDefault(require("./operatingSystem"));
exports.operatingSystem = operatingSystem_1.default;
const plugin_1 = __importDefault(require("./plugin"));
exports.Plugin = plugin_1.default;
const logging_1 = require("./logging");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logging_1.Logger; } });
const serve_1 = require("./serve");
Object.defineProperty(exports, "serveLoop", { enumerable: true, get: function () { return serve_1.serveLoop; } });
const Browser = __importStar(require("./loopClients/browserSensor"));
exports.Browser = Browser;
const Clipboard = __importStar(require("./loopClients/clipboardSensor"));
exports.Clipboard = Clipboard;
const Cursor = __importStar(require("./loopClients/cursorSensor"));
exports.Cursor = Cursor;
const FileSystem = __importStar(require("./loopClients/fileSystemSensor"));
exports.FileSystem = FileSystem;
const Hover = __importStar(require("./loopClients/hoverSensor"));
exports.Hover = Hover;
const Keyboard = __importStar(require("./loopClients/keyboardSensor"));
exports.Keyboard = Keyboard;
const Process = __importStar(require("./loopClients/processSensor"));
exports.Process = Process;
const Storage = __importStar(require("./loopClients/storageClient"));
exports.Storage = Storage;
const Whisper = __importStar(require("./loopClients/whisperSensor"));
exports.Whisper = Whisper;
const Window = __importStar(require("./loopClients/windowSensor"));
exports.Window = Window;
const Network = __importStar(require("./loopClients/networkSensor"));
exports.Network = Network;
