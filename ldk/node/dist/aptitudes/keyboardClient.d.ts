import { KeyboardClient as KeyboardGRPCClient } from '../grpc/keyboard_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { StoppableStream, StreamListener } from './stoppables';
import { HotKeyEvent, HotKey, Keyboard, ScanCodeEvent, CharacterEvent } from './keyboard';
/**
 * @internal
 */
export default class KeyboardClient extends BaseClient<KeyboardGRPCClient> implements Keyboard {
    listenHotKey(hotKeys: HotKey, listener: StreamListener<HotKeyEvent>): StoppableStream<HotKeyEvent>;
    listenText(listener: StreamListener<string>): StoppableStream<string>;
    listenChar(listener: StreamListener<CharacterEvent>): StoppableStream<CharacterEvent>;
    listenScanCode(listener: StreamListener<ScanCodeEvent>): StoppableStream<ScanCodeEvent>;
    protected generateClient(): GRPCClientConstructor<KeyboardGRPCClient>;
    protected serviceName(): string;
}
