import * as grpc from '@grpc/grpc-js';
import BrokerGrpcServer from './brokerGrpcServer';
import { Loop } from './loop';
import { prepareLogging } from './logging';
import LoopServer from './loopServer';

/**
 * The Plugin class is responsible for establishing the connection to Olive Helps.
 */
class Plugin {
  private server: grpc.Server;

  private broker: BrokerGrpcServer;

  private loopServer: LoopServer;

  /**
   * Create a Plugin.
   *
   * @param impl - The implementation of the Loop.
   * ```
   * new Plugin(myLoop);
   * ```
   */
  constructor(impl: Loop) {
    this.server = new grpc.Server();
    this.broker = new BrokerGrpcServer(this.server);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-enable @typescript-eslint/no-explicit-any */
    this.loopServer = new LoopServer(this.server, this.broker, impl);
  }

  /**
   * Starts the GRPC server and write connection information to stdout.
   *
   * @returns Promise resolving when the server starts.
   */
  serve(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.bindAsync(
        '127.0.0.1:0',
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
          if (err) {
            reject(err);
          }
          this.server.start();
          process.stdout.write(`1|1|tcp|127.0.0.1:${port}|grpc\n`);
          prepareLogging();
          resolve();
        },
      );
    });
  }
}

export default Plugin;
