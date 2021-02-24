import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import grpc from '@grpc/grpc-js';
import { ILoopServer } from './grpc/loop_grpc_pb';
import BrokerGrpcServer from './brokerGrpcServer';
import messages from './grpc/loop_pb';
import { Loop } from './loop';
import { Logger } from './logging';
/**
 * @internal
 */
export default class LoopServer implements ILoopServer {
    protected broker: BrokerGrpcServer;
    private loop;
    private logger;
    constructor(server: grpc.Server, broker: BrokerGrpcServer, impl: Loop, logger: Logger);
    /**
     * Called by OliveHelps to start the Loop.
     *
     * @param call - The GRPC call initiating the Loop.
     * @param callback - The callback to respond to once the Loop started.
     */
    loopStart(call: grpc.ServerUnaryCall<messages.LoopStartRequest, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void>;
    /**
     * Called by OliveHelps stop the Loop.
     *
     * @param call - The GRPC call stopping the Loop.
     * @param callback - The callback to respond to once the Loop stopped.
     */
    loopStop(call: grpc.ServerUnaryCall<Empty, Empty>, callback: grpc.sendUnaryData<Empty>): Promise<void>;
}
