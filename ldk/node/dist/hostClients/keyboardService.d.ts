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
/**
 * The KeyboardService allows you to observe key presses and text entry on the keyboard.
 */
export interface KeyboardService {
    /**
     * Streams chunks of text, emitted when the user stops entering text for a moment.
     *
     * @param listener - Listener function called whenever a chunk of text is emitted.
     */
    streamText(listener: StreamListener<string>): StoppableStream<string>;
    /**
     * Streams individual key presses as they happen.
     *
     * @param listener - Listener function called whenever an alphanumeric key is pressed.
     */
    streamChar(listener: StreamListener<TextStream>): StoppableStream<TextStream>;
    /**
     * Streams when the provided hot key combinations are pressed or released.
     *
     * The listener function only knows that one of the hot keys provided was pressed or released. If you want to listen for different hot keys you'll need to create a different stream for each.
     *
     * @param hotKeys - The list of hot keys to listen for.
     * @param listener - Listener function called whenever any of the provided hot key combinations is pressed or released.
     */
    streamHotKey(hotKeys: HotKeyRequest, listener: StreamListener<HotKeyEvent>): StoppableStream<HotKeyEvent>;
}
