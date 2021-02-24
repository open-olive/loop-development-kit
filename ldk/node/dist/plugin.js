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
const grpc = __importStar(require("@grpc/grpc-js"));
const brokerGrpcServer_1 = __importDefault(require("./brokerGrpcServer"));
const logging_1 = require("./logging");
const loopServer_1 = __importDefault(require("./loopServer"));
/**
 * @internal
 */
const logger = new logging_1.Logger('loop-core');
/**
 * The Plugin class is responsible for establishing the connection to Olive Helps.
 */
class Plugin {
    /**
     * Create a Plugin.
     *
     * @param impl - The implementation of the Loop.
     * ```
     * new Plugin(myLoop);
     * ```
     */
    constructor(impl) {
        this.server = new grpc.Server();
        this.broker = new brokerGrpcServer_1.default(this.server);
        this.loopServer = new loopServer_1.default(this.server, this.broker, impl, logger);
    }
    /**
     * Starts the GRPC server and writeText connection information to stdout.
     *
     * @returns Promise resolving when the server starts.
     */
    serve() {
        return new Promise((resolve, reject) => {
            this.server.bindAsync('127.0.0.1:0', grpc.ServerCredentials.createInsecure(), (err, port) => {
                if (err) {
                    reject(err);
                }
                this.server.start();
                process.stdout.write(`1|1|tcp|127.0.0.1:${port}|grpc\n`);
                logging_1.prepareLogging();
                resolve();
            });
        });
    }
}
exports.default = Plugin;
