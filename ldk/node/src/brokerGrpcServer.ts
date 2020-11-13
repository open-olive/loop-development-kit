import * as grpc from '@grpc/grpc-js';
import services from './grpc/broker_grpc_pb';
import { ConnInfo } from './grpc/broker_pb';

/**
 * Class used to interact with the broker GRPC service.
 *
 * @internal
 */
export default class BrokerGrpcServer {
  private connInfoPromise: Promise<ConnInfo.AsObject>;

  private connInfoCallback!: (connInf: ConnInfo.AsObject) => void;

  /**
   * Create a BrokerGrpcServer.
   *
   * @param server - The GRPC server instance.
   * @example
   * BrokerGrpcServer(server);
   */
  constructor(server: grpc.Server) {
    this.connInfoPromise = new Promise((resolve) => {
      this.connInfoCallback = (connInfo: ConnInfo.AsObject) => {
        resolve(connInfo);
      };
    });

    server.addService(services.GRPCBrokerService, {
      startStream: this.startStream,
    });
  }

  /**
   * Start a connection info stream from the host process.
   *
   *
   * @param call - The callback that handles receiving connection info.
   */
  startStream: grpc.handleBidiStreamingCall<ConnInfo, ConnInfo> = (call) => {
    call.on('data', (msg: ConnInfo) => {
      const connInfo: ConnInfo.AsObject = {
        address: msg.getAddress(),
        serviceId: msg.getServiceId(),
        network: msg.getNetwork(),
      };
      this.connInfoCallback(connInfo);
    });
    call.on('end', () => {
      call.end();
    });
  };

  /**
   * Returns a promise which resolves to the connection information for the host process.
   *
   * @returns Promise object represents connection information
   */
  getConnInfo(): Promise<ConnInfo.AsObject> {
    return this.connInfoPromise;
  }
}
