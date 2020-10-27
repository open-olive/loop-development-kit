import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import grpc from '@grpc/grpc-js';
import services, { ILoopServer } from './grpc/loop_grpc_pb';
import BrokerGrpcServer from './brokerGrpcServer';
import messages from './grpc/loop_pb';
import { Loop } from './loop';
import HostClientFacade from './hostClientFacade';

/**
 * @internal
 */
export default class LoopServer implements ILoopServer {
  protected broker: BrokerGrpcServer;

  private loop: Loop;

  constructor(server: grpc.Server, broker: BrokerGrpcServer, impl: Loop) {
    this.broker = broker;
    this.loop = impl;
    // Disabling any b/c the untyped server requires an indexed type.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server.addService(services.LoopService, this as any);
  }

  /**
   * Called by the host to start the Loop.
   *
   * @param call - The GRPC call initiating the loop.
   * @param callback - The callback to respond to once the loop started.
   */
  async loopStart(
    call: grpc.ServerUnaryCall<messages.LoopStartRequest, Empty>,
    callback: grpc.sendUnaryData<Empty>,
  ): Promise<void> {
    const connInfo = await this.broker.getConnInfo();
    const sessionInfo = call.request?.getSession();
    const response = new Empty();
    if (sessionInfo == null) {
      callback(new Error('Invalid Session Information'), response);
      return;
    }

    const hostClient = new HostClientFacade();

    await hostClient.connect(connInfo, sessionInfo.toObject()).catch((err) => {
      throw err;
    });
    await this.loop.start(hostClient);

    callback(null, response);
  }

  /**
   * Called by the host to stop the Loop.
   *
   * @param call - The GRPC call stopping the loop.
   * @param callback - The callback to respond to once the loop stopped.
   */
  async loopStop(
    call: grpc.ServerUnaryCall<Empty, Empty>,
    callback: grpc.sendUnaryData<Empty>,
  ): Promise<void> {
    await this.loop.stop();

    const response = new Empty();
    callback(null, response);
  }
}
