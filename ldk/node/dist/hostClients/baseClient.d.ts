import grpc, { ServiceError } from '@grpc/grpc-js';
import { ConnInfo } from '../grpc/broker_pb';
import { CommonHostServer } from '../commonHostServer';
import { CommonHostClient } from './commonHostClient';
/**
 * @internal
 */
export interface GRPCClientConstructor<T> {
    new (address: string, credentials: grpc.ChannelCredentials, options?: object): T;
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
     */
    connect(connInfo: ConnInfo.AsObject): Promise<void>;
    /**
     * This convenience function returns a promise that resolves once the request has been completed and the response
     * converted to the desired output.
     *
     * @param clientRequest - A function that calls the client with the generated message and callback.
     * @param builder - The function that builds the message.
     * @param renderer - The function that renders the message.
     */
    buildQuery<TMessage, TResponse, TOutput>(clientRequest: (message: TMessage, callback: (err: ServiceError | null, response: TResponse) => void) => void, builder: () => TMessage, renderer: (response: TResponse) => TOutput | undefined): Promise<TOutput>;
    protected get client(): THost;
    protected set client(client: THost);
}
