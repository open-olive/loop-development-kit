import BaseClient, { GRPCClientConstructor } from './baseClient';
import { NetworkClient as NetworkGRPCClient } from '../grpc/network_grpc_pb';
import { NetworkService, HttpRequest, HttpResponse } from './networkService';
export declare class NetworkClient extends BaseClient<NetworkGRPCClient> implements NetworkService {
    protected generateClient(): GRPCClientConstructor<NetworkGRPCClient>;
    httpRequest(req: HttpRequest): Promise<HttpResponse>;
}
