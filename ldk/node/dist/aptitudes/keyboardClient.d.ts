import { KeyboardClient as KeyboardGRPCClient } from '../grpc/keyboard_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { StoppableStream, StreamListener } from './stoppables';
import { HotKeyEvent, HotKeyRequest, Keyboard, ScanCodeEvent, TextStream } from './keyboard';
/**
 * @internal
 */
export default class KeyboardClient extends BaseClient<KeyboardGRPCClient> implements Keyboard {
    streamHotKey(hotKeys: HotKeyRequest, listener: StreamListener<HotKeyEvent>): StoppableStream<HotKeyEvent>;
    streamText(listener: StreamListener<string>): StoppableStream<string>;
    streamChar(listener: StreamListener<TextStream>): StoppableStream<TextStream>;
    streamScanCode(listener: StreamListener<ScanCodeEvent>): StoppableStream<ScanCodeEvent>;
    protected generateClient(): GRPCClientConstructor<KeyboardGRPCClient>;
    protected serviceName(): string;
}
