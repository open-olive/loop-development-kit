import { KeyboardClient as KeyboardGRPCClient } from '../grpc/keyboard_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { StoppableStream, StreamListener } from './stoppables';
import { HotKeyEvent, HotKeyRequest, Keyboard, ScanCodeEvent, TextStream } from './keyboard';
/**
 * @internal
 */
export default class KeyboardClient extends BaseClient<KeyboardGRPCClient> implements Keyboard {
    listenHotKey(hotKeys: HotKeyRequest, listener: StreamListener<HotKeyEvent>): StoppableStream<HotKeyEvent>;
    listenText(listener: StreamListener<string>): StoppableStream<string>;
    listenChar(listener: StreamListener<TextStream>): StoppableStream<TextStream>;
    listenScanCode(listener: StreamListener<ScanCodeEvent>): StoppableStream<ScanCodeEvent>;
    protected generateClient(): GRPCClientConstructor<KeyboardGRPCClient>;
    protected serviceName(): string;
}
