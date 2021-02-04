import BaseClient, { GRPCClientConstructor } from './baseClient';
import { UIClient as UIGRPCClient } from '../grpc/ui_grpc_pb';
import { UIService } from './uiService';
import { StoppableStream, StreamListener } from './stoppables';
export declare class UIClient extends BaseClient<UIGRPCClient> implements UIService {
    protected generateClient(): GRPCClientConstructor<UIGRPCClient>;
    streamSearchbar(listener: StreamListener<string>): StoppableStream<string>;
    streamGlobalSearch(listener: StreamListener<string>): StoppableStream<string>;
    protected serviceName(): string;
}
