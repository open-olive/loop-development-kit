"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const broker_grpc_pb_1 = __importDefault(require("./grpc/broker_grpc_pb"));
/**
 * Class used to interact with the broker GRPC service.
 *
 * @internal
 */
class BrokerGrpcServer {
    /**
     * Create a BrokerGrpcServer.
     *
     * @param server - The GRPC server instance.
     * @example
     * BrokerGrpcServer(server);
     */
    constructor(server) {
        let connInfoCallback;
        this.connInfoPromise = new Promise((resolve) => {
            connInfoCallback = (connInfo) => {
                resolve(connInfo);
            };
        });
        server.addService(broker_grpc_pb_1.default.GRPCBrokerService, {
            startStream: this.startStream(connInfoCallback),
        });
    }
    /**
     * This callback is called when connection info is received from the host process.
     *
     * @callback BrokerGrpcServer~connInfoCallback
     * @param connInfo - An object containing host process connection information.
     */
    /**
     * Start a connection info stream from the host process.
     *
     * @param connInfoCallback
     * - The callback that handles receiving connection info.
     */
    startStream(connInfoCallback) {
        return (call) => {
            call.on('data', (msg) => {
                const connInfo = {
                    address: msg.getAddress(),
                    serviceId: msg.getServiceId(),
                    network: msg.getNetwork(),
                };
                connInfoCallback(connInfo);
            });
            call.on('end', () => {
                call.end();
            });
        };
    }
    /**
     * Returns a promise which resolves to the connection information for the host process.
     *
     * @returns Promise object represents connection information
     */
    getConnInfo() {
        return this.connInfoPromise;
    }
}
exports.default = BrokerGrpcServer;
