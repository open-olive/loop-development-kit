import { ProcessClient as ProcessGRPCClient } from '../grpc/process_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { Process, ProcessListResponse, ProcessStreamResponse } from './process';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class ProcessClient extends BaseClient<ProcessGRPCClient> implements Process {
    protected generateClient(): GRPCClientConstructor<ProcessGRPCClient>;
    readProcesses(): Promise<ProcessListResponse>;
    listenProcesses(listener: StreamListener<ProcessStreamResponse>): StoppableStream<ProcessStreamResponse>;
    protected serviceName(): string;
}
