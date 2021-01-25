import * as grpc from '@grpc/grpc-js';
import { ConnInfo } from '../grpc/broker_pb';
import { CommonHostServer } from '../commonHostServer';
import { CommonHostClient } from './commonHostClient';
import { Session } from '../grpc/session_pb';
import { StoppableMessage } from './stoppables';
import { ILogger } from '../logging';
/**
 * @internal
 */
export interface GRPCClientConstructor<T> {
    new (address: string, credentials: grpc.ChannelCredentials, options?: object): T;
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
export default abstract class BaseClient<THost extends CommonHostServer> implements CommonHostClient {
    private _client;
    private _logger;
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
     * @param session - An object containing the loop Session information.
     * @param logger - An object containing logging methods.
     */
    connect(connInfo: ConnInfo.AsObject, session: Session.AsObject, logger: ILogger): Promise<void>;
    /**
     * This convenience function returns a promise that resolves once the request has been completed and the response
     * converted to the desired output.
     *
     * @param clientRequest - A function that calls the client with the generated message and callback.
     * @param builder - The function that builds the message.
     * @param renderer - The function that renders the message.
     */
    buildQuery<TMessage extends SetSessionable, TResponse, TOutput>(clientRequest: (message: TMessage, callback: (err: grpc.ServiceError | null, response: TResponse) => void) => void, builder: () => TMessage, renderer: (response: TResponse) => TOutput | undefined): Promise<TOutput>;
    buildStoppableMessage<TMessage extends SetSessionable, TResponse, TOutput>(clientRequest: (message: TMessage, callback: (err: grpc.ServiceError | null, response: TResponse) => void) => grpc.ClientUnaryCall, builder: () => TMessage, renderer: (response: TResponse) => TOutput): StoppableMessage<TOutput>;
    protected abstract serviceName(): string;
    protected createSessionMessage(): Session;
    protected get client(): THost;
    protected set client(client: THost);
    protected get session(): Session.AsObject;
    protected set session(session: Session.AsObject);
    protected get logger(): ILogger;
}
