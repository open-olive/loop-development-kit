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
/**
 *  The Keyboard aptitude provides access to the the ability to listen to hotkey, text and character.
 */
export interface Keyboard {
  /**
   * Calls callback function when the specified hotkey is pressed or released.
   *
   * @param hotkey - The hotkey to monitor to initiate callback.
   * @param callback - The callback function called when the specified hotkey is pressed or released.
   */
  listenHotkey(hotkey: Hotkey, callback: (pressed: boolean) => void): Promise<Cancellable>;

  /**
   * Calls callback function when text is detected from the keyboard.
   *
   * @param includeOliveHelpsEvents - if passed in true, callback will be called while olive helps window is in focus. Disabled by default.
   * @param callback - The callback function called when text is detected from the keyboard.
   */
  listenText(
    callback: (text: string) => void,
    includeOliveHelpsEvents: boolean,
  ): Promise<Cancellable>;

  /**
   * Calls callback function when a character is detected from the keyboard.
   *
   * @param callback - The callback function called when a character is detected from the keyboard.
   */
  listenCharacter(callback: (char: string) => void): Promise<Cancellable>;
}

export function listenHotkey(
  hotkey: Hotkey,
  callback: (pressed: boolean) => void,
): Promise<Cancellable> {
  return promisifyListenableWithParam(hotkey, callback, oliveHelps.keyboard.listenHotkey);
}

export function listenText(
  callback: (text: string) => void,
  includeOliveHelpsEvents = false,
): Promise<Cancellable> {
  oliveHelps.keyboard.includeOliveHelpsEvents(includeOliveHelpsEvents);
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
