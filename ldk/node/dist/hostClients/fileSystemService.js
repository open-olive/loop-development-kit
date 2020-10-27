"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemStreamAction = void 0;
// This rule is triggering for some reason.
// eslint-disable-next-line no-shadow
var FileSystemStreamAction;
(function (FileSystemStreamAction) {
    FileSystemStreamAction["Unknown"] = "unknown";
    FileSystemStreamAction["Create"] = "create";
    FileSystemStreamAction["Write"] = "write";
    FileSystemStreamAction["Remove"] = "remove";
    FileSystemStreamAction["Rename"] = "rename";
    FileSystemStreamAction["Chmod"] = "chmod";
})(FileSystemStreamAction = exports.FileSystemStreamAction || (exports.FileSystemStreamAction = {}));
