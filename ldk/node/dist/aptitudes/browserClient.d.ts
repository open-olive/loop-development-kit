import { BrowserClient as BrowserGRPCClient } from '../grpc/browser_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { SelectedText, Browser } from './browser';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class BrowserClient extends BaseClient<BrowserGRPCClient> implements Browser {
    activeURL(): Promise<string>;
    selectedText(): Promise<SelectedText>;
    listenActiveURL(listener: StreamListener<string>): StoppableStream<string>;
    listenActiveText(listener: StreamListener<SelectedText>): StoppableStream<SelectedText>;
    protected generateClient(): GRPCClientConstructor<BrowserGRPCClient>;
    protected serviceName(): string;
}
