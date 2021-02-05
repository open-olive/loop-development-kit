import { BrowserClient as BrowserGRPCClient } from '../grpc/browser_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { BrowserSelectedTextResponse, BrowserSensor } from './browserSensor';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class BrowserClient extends BaseClient<BrowserGRPCClient> implements BrowserSensor {
    queryActiveURL(): Promise<string>;
    querySelectedText(): Promise<BrowserSelectedTextResponse>;
    streamActiveURL(listener: StreamListener<string>): StoppableStream<string>;
    streamSelectedText(listener: StreamListener<BrowserSelectedTextResponse>): StoppableStream<BrowserSelectedTextResponse>;
    protected generateClient(): GRPCClientConstructor<BrowserGRPCClient>;
    protected sensorName(): string;
}
