import { BrowserClient as BrowserGRPCClient } from '../grpc/browser_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { BrowserSelectedTextResponse, Browser } from './browser';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class BrowserClient extends BaseClient<BrowserGRPCClient> implements Browser {
    activeURL(): Promise<string>;
    selectedText(): Promise<BrowserSelectedTextResponse>;
    listenActiveURL(listener: StreamListener<string>): StoppableStream<string>;
    listenActiveText(listener: StreamListener<BrowserSelectedTextResponse>): StoppableStream<BrowserSelectedTextResponse>;
    protected generateClient(): GRPCClientConstructor<BrowserGRPCClient>;
    protected serviceName(): string;
}
