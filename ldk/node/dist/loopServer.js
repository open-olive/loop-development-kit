"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const empty_pb_1 = require("google-protobuf/google/protobuf/empty_pb");
const loop_grpc_pb_1 = __importDefault(require("./grpc/loop_grpc_pb"));
const hostClientFacade_1 = __importDefault(require("./hostClientFacade"));
const stdioGrpcServer_1 = require("./stdioGrpcServer");
/**
 * @internal
 */
class LoopServer {
    constructor(server, broker, impl, logger) {
        this.broker = broker;
        this.loop = impl;
        this.logger = logger;
        // Disabling any b/c the untyped server requires an indexed type.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        server.addService(loop_grpc_pb_1.default.LoopService, this);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        server.addService(stdioGrpcServer_1.StdioService, new stdioGrpcServer_1.StdioGrpcServer());
    }
    /**
     * Called by the host to start the Loop.
     *
     * @param call - The GRPC call initiating the loop.
     * @param callback - The callback to respond to once the loop started.
     */
    loopStart(call, callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const connInfo = yield this.broker.getConnInfo();
            const sessionInfo = (_a = call.request) === null || _a === void 0 ? void 0 : _a.getSession();
            const response = new empty_pb_1.Empty();
            if (sessionInfo == null) {
                this.logger.error('loopServer - Invalid Session Information');
                callback(new Error('Invalid Session Information'), response);
                return;
            }
            const hostClient = new hostClientFacade_1.default(this.logger);
            yield hostClient.connect(connInfo, sessionInfo.toObject()).catch((err) => {
                this.logger.error('loopServer - Failed to Connect to Facades', 'error', JSON.stringify(err));
                throw err;
            });
            yield this.loop.start(hostClient);
            callback(null, response);
        });
    }
    /**
     * Called by the host to stop the Loop.
     *
     * @param call - The GRPC call stopping the loop.
     * @param callback - The callback to respond to once the loop stopped.
     */
    loopStop(call, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loop.stop();
            const response = new empty_pb_1.Empty();
            callback(null, response);
        });
    }
}
exports.default = LoopServer;
