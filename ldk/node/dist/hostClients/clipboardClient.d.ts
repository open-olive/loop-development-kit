import BaseClient, { GRPCClientConstructor } from './baseClient';
import { ClipboardClient as ClipboardGRPCClient } from '../grpc/clipboard_grpc_pb';
import { ClipboardService } from './clipboardService';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class ClipboardClient extends BaseClient<ClipboardGRPCClient> implements ClipboardService {
    protected generateClient(): GRPCClientConstructor<ClipboardGRPCClient>;
    queryClipboard(): Promise<string>;
    streamClipboard(listener: StreamListener<string>): StoppableStream<string>;
    streamClipboardConfigurable(listener: StreamListener<string>, includeOliveHelpsTraffic: boolean): StoppableStream<string>;
    writeClipboard(text: string): Promise<void>;
    protected serviceName(): string;
}
