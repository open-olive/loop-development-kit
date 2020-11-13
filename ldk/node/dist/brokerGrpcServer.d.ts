import * as grpc from '@grpc/grpc-js';
import { ConnInfo } from './grpc/broker_pb';
/**
 * Class used to interact with the broker GRPC service.
 *
 * @internal
 */
export default class BrokerGrpcServer {
    private connInfoPromise;
    private connInfoCallback;
    /**
     * Create a BrokerGrpcServer.
     *
     * @param server - The GRPC server instance.
     * @example
     * BrokerGrpcServer(server);
     */
    constructor(server: grpc.Server);
    /**
     * Start a connection info stream from the host process.
     *
     *
     * @param call - The callback that handles receiving connection info.
     */
    startStream: grpc.handleBidiStreamingCall<ConnInfo, ConnInfo>;
    /**
     * Returns a promise which resolves to the connection information for the host process.
     *
     * @returns Promise object represents connection information
     */
    getConnInfo(): Promise<ConnInfo.AsObject>;
}
