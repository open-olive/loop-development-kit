import BaseClient, { GRPCClientConstructor } from './baseClient';
import { ClipboardClient as ClipboardGRPCClient } from '../grpc/clipboard_grpc_pb';
import { Clipboard } from './clipboard';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class ClipboardClient extends BaseClient<ClipboardGRPCClient> implements Clipboard {
    protected generateClient(): GRPCClientConstructor<ClipboardGRPCClient>;
    text(): Promise<string>;
    listenText(listener: StreamListener<string>): StoppableStream<string>;
    writeText(text: string): Promise<void>;
    protected serviceName(): string;
}
