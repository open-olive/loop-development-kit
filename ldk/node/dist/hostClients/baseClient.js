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
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const session_pb_1 = require("../grpc/session_pb");
const transformingMessage_1 = require("./transformingMessage");
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
     * @param logger
     * @param session - An object containing the loop Session information.
     */
    connect(connInfo, session, logger) {
        return new Promise((resolve, reject) => {
            let address;
            if (connInfo.network === 'unix') {
                address = `unix://${connInfo.address}`;
            }
            else {
                address = connInfo.address;
            }
            const ClientConstructor = this.generateClient();
            this.session = session;
            this.client = new ClientConstructor(address, grpc.credentials.createInsecure());
            // set a 5 second deadline
            const deadline = new Date();
            deadline.setSeconds(deadline.getSeconds() + 5);
            this.client.waitForReady(deadline, (err) => {
                if (err) {
                    logger.error('Connection Failed', 'address', address);
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
            message.setSession(this.createSessionMessage());
            const callback = (err, response) => {
                if (err) {
                    return reject(err);
                }
                return resolve(renderer(response));
            };
            clientRequest(message, callback);
        });
    }
    buildStoppableMessage(clientRequest, builder, renderer) {
        const message = builder();
        message.setSession(this.createSessionMessage());
        const result = new transformingMessage_1.TransformingMessage(renderer);
        const call = clientRequest(message, result.callback);
        result.assignCall(call);
        return result;
    }
    createSessionMessage() {
        const session = new session_pb_1.Session();
        session.setLoopid(this.session.loopid);
        session.setToken(this.session.token);
        return session;
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
    get session() {
        if (this._session === undefined) {
            throw new Error('Accessing session data before connection');
        }
        return this._session;
    }
    set session(session) {
        this._session = session;
    }
}
exports.default = BaseClient;
