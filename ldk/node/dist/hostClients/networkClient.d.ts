import BaseClient, { GRPCClientConstructor } from './baseClient';
import { NetworkClient as NetworkGRPCClient } from '../grpc/network_grpc_pb';
import { NetworkSensor, HttpRequest, HttpResponse } from './networkSensor';
export declare class NetworkClient extends BaseClient<NetworkGRPCClient> implements NetworkSensor {
    protected generateClient(): GRPCClientConstructor<NetworkGRPCClient>;
    httpRequest(req: HttpRequest): Promise<HttpResponse>;
    protected sensorName(): string;
}
