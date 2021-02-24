import { StoppableStream, StreamListener } from './stoppables';
export interface KeyboardModifiers {
    altL: boolean;
    altR: boolean;
    alt: boolean;
    ctrlL: boolean;
    ctrlR: boolean;
    ctrl: boolean;
    metaL: boolean;
    metaR: boolean;
    meta: boolean;
    shiftL: boolean;
    shiftR: boolean;
    shift: boolean;
}
export interface HotKeyRequest {
    key: string;
    modifiers: Partial<KeyboardModifiers>;
}
export interface HotKeyEvent {
    direction: 'down' | 'up';
}
export interface TextStream {
    text: string;
}
export interface ScanCodeEvent {
    scanCode: number;
    direction: 'up' | 'down';
}
/**
 * The Keyboard allows you to observe key presses and text entry on the keyboard.
 */
export interface Keyboard {
    /**
     * Streams chunks of text, emitted when the user stops entering text for a moment.
     *
     * @param listener - Listener function called whenever a chunk of text is emitted.
     */
    listenText(listener: StreamListener<string>): StoppableStream<string>;
    /**
     * Streams individual key presses as they happen.
     *
     * @param listener - Listener function called whenever an alphanumeric key is pressed.
     */
    listenChar(listener: StreamListener<TextStream>): StoppableStream<TextStream>;
    /**
     * Streams Keyboard Scan Codes as they're entered.
     *
     * @param listener - Listener function called whenever a key is pressed or released.
     */
    listenScanCode(listener: StreamListener<ScanCodeEvent>): StoppableStream<ScanCodeEvent>;
    /**
     * Streams when the provided hot key combinations are pressed or released.
     *
     * The listener function only knows that one of the hot keys provided was pressed or released. If you want to listenText for different hot keys you'll need to create a different listenText for each.
     *
     * @param hotKeys - The list of hot keys to listenText for.
     * @param listener - Listener function called whenever any of the provided hot key combinations is pressed or released.
     */
    listenHotKey(hotKeys: HotKeyRequest, listener: StreamListener<HotKeyEvent>): StoppableStream<HotKeyEvent>;
}
