import { Cancellable } from '../cancellable';
import { promisifyListenable, promisifyListenableWithParam } from '../promisify';

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
  listenHotkey(hotkey: Hotkey, callback: (pressed: boolean) => void): Promise<Cancellable>;

  /**
   * Calls callback function when text is detected from the clipboard.
   *
   * @param callback - The callback function called when text is detected from the clipboard.
   */
  listenText(callback: (text: string) => void): Promise<Cancellable>;

  /**
   * Calls callback function when a character is detected from the clipboard.
   *
   * @param callback - The callback function called when a character is detected from the clipboard.
   */
  listenCharacter(callback: (char: string) => void): Promise<Cancellable>;
}

export function listenHotkey(
  hotkey: Hotkey,
  callback: (pressed: boolean) => void,
): Promise<Cancellable> {
  return promisifyListenableWithParam(hotkey, callback, oliveHelps.keyboard.listenHotkey);
}

export function listenText(callback: (text: string) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.keyboard.listenText);
}

export function listenCharacter(callback: (char: string) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.keyboard.listenCharacter);
}

export const keyboard: Keyboard = {
  listenHotkey,
  listenText,
  listenCharacter,
};
