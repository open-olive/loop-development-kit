import grpc, { ServiceError } from '@grpc/grpc-js';
import { ConnInfo } from '../grpc/broker_pb';
import { CommonHostServer } from '../commonHostServer';
import { CommonHostClient } from './commonHostClient';
import { Session } from '../grpc/session_pb';

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

  protected _session: Session | undefined;

  /**
   * Implementation should return the constructor function/class for the GRPC Client itself, imported from the SERVICE_grpc_pb file.
   * @protected
   */
  protected abstract generateClient(): GRPCClientConstructor<THost>;

  /**
   * Establish a connection to the host process.
   *
   * @async
   * @param connInfo - An object containing host process connection information.
   * @param session - An object containing the loop Session information.
   */
  connect(connInfo: ConnInfo.AsObject, session: Session): Promise<void> {
    return new Promise((resolve, reject) => {
      let address;
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
      callback: (err: ServiceError | null, response: TResponse) => void,
    ) => void,
    builder: () => TMessage,
    renderer: (response: TResponse) => TOutput | undefined,
  ): Promise<TOutput> {
    return new Promise((resolve, reject) => {
      const message = builder();
      message.setSession(this.createSessionMessage());
      const callback = (err: ServiceError | null, response: TResponse) => {
        if (err) {
          return reject(err);
        }
        return resolve(renderer(response));
      };
      clientRequest(message, callback);
    });
  }

  protected createSessionMessage(): Session {
    const session = new Session();
    session.setLoopid(this.session.getLoopid());
    session.setToken(this.session.getToken());
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

  protected get session(): Session {
    if (this._session === undefined) {
      throw new Error('Accessing session data before connection');
    }
    return this._session;
  }

  protected set session(session: Session) {
    this._session = session;
  }
}
