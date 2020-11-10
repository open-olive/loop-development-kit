"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkClient = void 0;
const baseClient_1 = __importDefault(require("./baseClient"));
const network_grpc_pb_1 = require("../grpc/network_grpc_pb");
const network_pb_1 = __importDefault(require("../grpc/network_pb"));
class NetworkClient extends baseClient_1.default {
    generateClient() {
        return network_grpc_pb_1.NetworkClient;
    }
    httpRequest(req) {
        return this.buildQuery((message, callback) => this.client.hTTPRequest(message, callback), () => {
            const msg = new network_pb_1.default.HTTPRequestMsg();
            msg.setUrl(req.url);
            msg.setMethod(req.method);
            msg.setBody(req.body);
            return msg;
        }, (response) => ({
            statusCode: response.getResponsecode(),
            data: response.getData(),
        }));
    }
}
exports.NetworkClient = NetworkClient;
