import * as grpc from '@grpc/grpc-js';
import { ConnInfo } from './grpc/broker_pb';
/**
 * Class used to interact with the broker GRPC service.
 *
 * @internal
 */
export default class BrokerGrpcServer {
    private connInfoPromise;
    /**
     * Create a BrokerGrpcServer.
     *
     * @param server - The GRPC server instance.
     * @example
     * BrokerGrpcServer(server);
     */
    constructor(server: grpc.Server);
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
    startStream(connInfoCallback: (connInfo: ConnInfo.AsObject) => void): grpc.handleBidiStreamingCall<ConnInfo, ConnInfo>;
    /**
     * Returns a promise which resolves to the connection information for the host process.
     *
     * @returns Promise object represents connection information
     */
    getConnInfo(): Promise<ConnInfo.AsObject>;
}
