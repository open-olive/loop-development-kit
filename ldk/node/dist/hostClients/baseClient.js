"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = __importDefault(require("@grpc/grpc-js"));
/**
 * The BaseClient class provides connectivity support to GRPC services as a client.
 *
 * Subclasses handle the abstraction of making GRPC requests and parsing responses from LDK consumers.
 *
 * @internal
 */
class BaseClient {
    /**
     * Establish a connection to the host process.
     *
     * @async
     * @param connInfo - An object containing host process connection information.
     */
    connect(connInfo) {
        return new Promise((resolve, reject) => {
            let address;
            if (connInfo.network === 'unix') {
                address = `unix://${connInfo.address}`;
            }
            else {
                address = connInfo.address;
            }
            const ClientConstructor = this.generateClient();
            this.client = new ClientConstructor(address, grpc_js_1.default.credentials.createInsecure());
            // set a 5 second deadline
            const deadline = new Date();
            deadline.setSeconds(deadline.getSeconds() + 5);
            this.client.waitForReady(deadline, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }
    /**
     * This convenience function returns a promise that resolves once the request has been completed and the response
     * converted to the desired output.
     *
     * @param clientRequest - A function that calls the client with the generated message and callback.
     * @param builder - The function that builds the message.
     * @param renderer - The function that renders the message.
     */
    buildQuery(clientRequest, builder, renderer) {
        return new Promise((resolve, reject) => {
            const message = builder();
            const callback = (err, response) => {
                if (err) {
                    return reject(err);
                }
                return resolve(renderer(response));
            };
            clientRequest(message, callback);
        });
    }
    get client() {
        if (this._client === undefined) {
            throw new Error('Accessing client before connected');
        }
        return this._client;
    }
    set client(client) {
        this._client = client;
    }
}
exports.default = BaseClient;
