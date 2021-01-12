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
  // Must be one character long.
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
 * The KeyboardService allows you to observe key presses and text entry on the keyboard.
 * For more information on Loop's keyboard sensor visit its {@link https://open-olive.github.io/olive-helps/#keyboard sensor doc}.
 */
export interface KeyboardService {
  /**
   * Streams chunks of text, emitted when the user stops entering text for a moment.
   * For more information on this sensor function visit its {@link https://open-olive.github.io/olive-helps/#keyboard-text sensor doc}.
   *
   * @param listener - Listener function called whenever a chunk of text is emitted.
   */
  streamText(listener: StreamListener<string>): StoppableStream<string>;

  /**
   * Streams individual key presses as they happen.
   * For more information on this sensor function visit its {@link https://open-olive.github.io/olive-helps/#keyboard-char sensor doc}.
   *
   * @param listener - Listener function called whenever an alphanumeric key is pressed.
   */
  streamChar(listener: StreamListener<TextStream>): StoppableStream<TextStream>;

  /**
   * Streams Keyboard Scan Codes as they're entered.
   * For more information on this sensor function visit its {@link https://open-olive.github.io/olive-helps/#keyboard-scan-codes sensor doc}.
   *
   * @param listener - Listener function called whenever a key is pressed or released.
   */
  streamScanCode(
    listener: StreamListener<ScanCodeEvent>,
  ): StoppableStream<ScanCodeEvent>;

  /**
   * Streams when the provided hot key combinations are pressed or released.
   *
   * The listener function only knows that one of the hot keys provided was pressed or released. If you want to listen for different hot keys you'll need to create a different stream for each.
   *
   * The following is an example of something that would go in the sensor doc as a limitation VVV
   * For more information on this sensor function visit its {@link https://open-olive.github.io/olive-helps/#keyboard-hot-keys sensor doc}.
   *
   * @param hotKeys - The list of hot keys to listen for.
   * @param listener - Listener function called whenever any of the provided hot key combinations is pressed or released.
   */
  streamHotKey(
    hotKeys: HotKeyRequest,
    listener: StreamListener<HotKeyEvent>,
  ): StoppableStream<HotKeyEvent>;
}
