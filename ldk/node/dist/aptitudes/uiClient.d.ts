import BaseClient, { GRPCClientConstructor } from './baseClient';
import { UIClient as UIGRPCClient } from '../grpc/ui_grpc_pb';
import { Ui } from './ui';
import { StoppableStream, StreamListener } from './stoppables';
export declare class UIClient extends BaseClient<UIGRPCClient> implements Ui {
    protected generateClient(): GRPCClientConstructor<UIGRPCClient>;
    listenSearchbar(listener: StreamListener<string>): StoppableStream<string>;
    listenGlobalSearch(listener: StreamListener<string>): StoppableStream<string>;
    protected serviceName(): string;
}
