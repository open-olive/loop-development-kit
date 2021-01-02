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
exports.NetworkClient = void 0;
const baseClient_1 = __importDefault(require("./baseClient"));
const network_grpc_pb_1 = require("../grpc/network_grpc_pb");
const network_pb_1 = __importStar(require("../grpc/network_pb"));
/**
 * @param headersMap - A map of headers
 * @internal
 */
function parseHeadersMap(headersMap) {
    const record = {};
    headersMap.forEach((values, key) => {
        record[key] = values.getValuesList();
    });
    return record;
}
/**
 * Adds headers to a request message
 *
 * @param message - the message that will be sent via gRPC - modified in place
 * @param headers - the headers to add to the request as a map
 * @internal
 */
function addHeadersToMessage(message, headers) {
    Object.entries(headers).forEach(([key, values]) => {
        message.getHeadersMap().set(key, new network_pb_1.HTTPHeader().setValuesList(values));
    });
    return message;
}
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
            if (req.headers) {
                addHeadersToMessage(msg, req.headers);
            }
            return msg;
        }, (response) => ({
            statusCode: response.getResponsecode(),
            data: response.getData(),
            headers: parseHeadersMap(response.getHeadersMap()),
        }));
    }
    serviceName() {
        return 'network';
    }
}
exports.NetworkClient = NetworkClient;
