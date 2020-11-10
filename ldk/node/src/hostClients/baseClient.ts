import * as grpc from '@grpc/grpc-js';
import { ConnInfo } from '../grpc/broker_pb';
import { CommonHostServer } from '../commonHostServer';
import { CommonHostClient } from './commonHostClient';
import { Session } from '../grpc/session_pb';
import { StoppableMessage } from './stoppables';
import { TransformingMessage } from './transformingMessage';
import { Logger } from '../logging';

/**
 * @internal
 */
export interface GRPCClientConstructor<T> {
  new (
    address: string,
    credentials: grpc.ChannelCredentials,
    // eslint-disable-next-line @typescript-eslint/ban-types
    options?: object,
  ): T;
}

/**
 * @internal
 */
export interface SetSessionable {
  setSession(session: Session): void;
}

/**
 * The BaseClient class provides connectivity support to GRPC services as a client.
 *
 * Subclasses handle the abstraction of making GRPC requests and parsing responses from LDK consumers.
 *
 * @internal
 */
export default abstract class BaseClient<THost extends CommonHostServer>
  implements CommonHostClient {
  private _client: THost | undefined;

  protected _session: Session.AsObject | undefined;

  /**
   * Implementation should return the constructor function/class for the GRPC Client itself, imported from the SERVICE_grpc_pb file.
   *
   * @protected
   */
  protected abstract generateClient(): GRPCClientConstructor<THost>;

  /**
   * Establish a connection to the host process.
   *
   * @async
   * @param connInfo - An object containing host process connection information.
   * @param logger
   * @param session - An object containing the loop Session information.
   */
  connect(
    connInfo: ConnInfo.AsObject,
    session: Session.AsObject,
    logger: Logger,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      let address: string;
      if (connInfo.network === 'unix') {
        address = `unix://${connInfo.address}`;
      } else {
        address = connInfo.address;
      }
      const ClientConstructor = this.generateClient();
      this.session = session;
      this.client = new ClientConstructor(
        address,
        grpc.credentials.createInsecure(),
      );

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
  buildQuery<TMessage extends SetSessionable, TResponse, TOutput>(
    clientRequest: (
      message: TMessage,
      callback: (err: grpc.ServiceError | null, response: TResponse) => void,
    ) => void,
    builder: () => TMessage,
    renderer: (response: TResponse) => TOutput | undefined,
  ): Promise<TOutput> {
    return new Promise((resolve, reject) => {
      const message = builder();
      message.setSession(this.createSessionMessage());
      const callback = (err: grpc.ServiceError | null, response: TResponse) => {
        if (err) {
          return reject(err);
        }
        return resolve(renderer(response));
      };
      clientRequest(message, callback);
    });
  }

  buildStoppableMessage<TMessage extends SetSessionable, TResponse, TOutput>(
    clientRequest: (
      message: TMessage,
      callback: (err: grpc.ServiceError | null, response: TResponse) => void,
    ) => grpc.ClientUnaryCall,
    builder: () => TMessage,
    renderer: (response: TResponse) => TOutput,
  ): StoppableMessage<TOutput> {
    const message = builder();
    message.setSession(this.createSessionMessage());
    const result = new TransformingMessage(renderer);
    const call = clientRequest(message, result.callback);
    result.assignCall(call);
    return result;
  }

  protected createSessionMessage(): Session {
    const session = new Session();
    session.setLoopid(this.session.loopid);
    session.setToken(this.session.token);
    return session;
  }

  protected get client(): THost {
    if (this._client === undefined) {
      throw new Error('Accessing client before connected');
    }
    return this._client;
  }

  protected set client(client: THost) {
    this._client = client;
  }

  protected get session(): Session.AsObject {
    if (this._session === undefined) {
      throw new Error('Accessing session data before connection');
    }
    return this._session;
  }

  protected set session(session: Session.AsObject) {
    this._session = session;
  }
}
