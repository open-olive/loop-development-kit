import { ProcessClient as ProcessGRPCClient } from '../grpc/process_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { Process, ProcessInfoList, ProcessEvent } from './process';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class ProcessClient extends BaseClient<ProcessGRPCClient> implements Process {
    protected generateClient(): GRPCClientConstructor<ProcessGRPCClient>;
    processes(): Promise<ProcessInfoList>;
    listenProcesses(listener: StreamListener<ProcessEvent>): StoppableStream<ProcessEvent>;
    protected serviceName(): string;
}
