import BaseClient, { GRPCClientConstructor } from './baseClient';
import { NetworkClient as NetworkGRPCClient } from '../grpc/network_grpc_pb';
import { Network, HttpRequest, HttpResponse } from './network';
/**
 * @internal
 */
export declare class NetworkClient extends BaseClient<NetworkGRPCClient> implements Network {
    protected generateClient(): GRPCClientConstructor<NetworkGRPCClient>;
    httpRequest(req: HttpRequest): Promise<HttpResponse>;
    protected serviceName(): string;
}
