"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveLoop = void 0;
const plugin_1 = __importDefault(require("./plugin"));
/**
 * Takes a Loop implementation and launches it as a plugin.
 *
 * @param loop - The Loop implementation.
 */
function serveLoop(loop) {
    const plugin = new plugin_1.default(loop);
    plugin.serve();
}
exports.serveLoop = serveLoop;
