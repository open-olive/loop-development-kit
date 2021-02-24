import { BrowserClient as BrowserGRPCClient } from '../grpc/browser_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { BrowserSelectedTextResponse, Browser } from './browser';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class BrowserClient extends BaseClient<BrowserGRPCClient> implements Browser {
    queryActiveURL(): Promise<string>;
    querySelectedText(): Promise<BrowserSelectedTextResponse>;
    streamActiveURL(listener: StreamListener<string>): StoppableStream<string>;
    streamSelectedText(listener: StreamListener<BrowserSelectedTextResponse>): StoppableStream<BrowserSelectedTextResponse>;
    protected generateClient(): GRPCClientConstructor<BrowserGRPCClient>;
    protected serviceName(): string;
}
