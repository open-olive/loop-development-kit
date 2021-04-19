import { Cancellable } from '../cancellable';

export interface Hotkey {
  key: string;
  alt?: boolean;
  altLeft?: boolean;
  altRight?: boolean;
  control?: boolean;
  controlLeft?: boolean;
  controlRight?: boolean;
  meta?: boolean;
  metaLeft?: boolean;
  metaRight?: boolean;
  shift?: boolean;
  shiftLeft?: boolean;
  shiftRight?: boolean;
}

export interface Keyboard {
  /**
   * Calls callback function when the specified hotkey is pressed or released.
   *
   * @param hotkey - The hotkey to monitor to initiate callback.
   * @param callback - The callback function called when the specified hotkey is pressed or released.
   */
  listenHotkey(hotkey: Hotkey, callback: (pressed: boolean) => void): Cancellable;

  /**
   * Calls callback function when text is detected from the clipboard.
   *
   * @param callback - The callback function called when text is detected from the clipboard.
   */
  listenText(callback: (text: string) => void): Cancellable;

  /**
   * Calls callback function when a character is detected from the clipboard.
   *
   * @param callback - The callback function called when a character is detected from the clipboard.
   */
  listenCharacter(callback: (char: string) => void): Cancellable;
}

function listenHotkey(hotkey: Hotkey, callback: (pressed: boolean) => void): Cancellable {
  return oliveHelps.keyboard.listenHotkey(hotkey, callback);
}

function listenText(callback: (text: string) => void): Cancellable {
  return oliveHelps.keyboard.listenText(callback);
}

function listenCharacter(callback: (char: string) => void): Cancellable {
  return oliveHelps.keyboard.listenCharacter(callback);
}

export const keyboard: Keyboard = {
  listenHotkey,
  listenText,
  listenCharacter,
};
