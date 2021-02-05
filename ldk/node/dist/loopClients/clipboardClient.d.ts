import BaseClient, { GRPCClientConstructor } from './baseClient';
import { ClipboardClient as ClipboardGRPCClient } from '../grpc/clipboard_grpc_pb';
import { ClipboardSensor } from './clipboardSensor';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class ClipboardClient extends BaseClient<ClipboardGRPCClient> implements ClipboardSensor {
    protected generateClient(): GRPCClientConstructor<ClipboardGRPCClient>;
    queryClipboard(): Promise<string>;
    streamClipboard(listener: StreamListener<string>): StoppableStream<string>;
    writeClipboard(text: string): Promise<void>;
    protected sensorName(): string;
}
