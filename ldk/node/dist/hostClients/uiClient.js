"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIClient = void 0;
const baseClient_1 = __importDefault(require("./baseClient"));
const ui_grpc_pb_1 = require("../grpc/ui_grpc_pb");
const ui_pb_1 = __importDefault(require("../grpc/ui_pb"));
const transformingStream_1 = require("./transformingStream");
class UIClient extends baseClient_1.default {
    generateClient() {
        return ui_grpc_pb_1.UIClient;
    }
    streamSearchbar(listener) {
        return new transformingStream_1.TransformingStream(this.client.searchbarStream(new ui_pb_1.default.SearchbarStreamRequest().setSession(this.createSessionMessage())), (message) => message.getText(), listener);
    }
    streamGlobalSearch(listener) {
        return new transformingStream_1.TransformingStream(this.client.globalSearchStream(new ui_pb_1.default.GlobalSearchStreamRequest().setSession(this.createSessionMessage())), (message) => message.getText(), listener);
    }
    sensorName() {
        return 'ui';
    }
}
exports.UIClient = UIClient;
