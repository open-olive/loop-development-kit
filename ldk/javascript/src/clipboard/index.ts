import { Cancellable } from '../cancellable';
import { promisify, promisifyWithParam, promisifyListenableWithParam} from '../promisify';

/**
 *  The Clipboard aptitude provides access to the OS's clipboard.
 */
export interface Clipboard {
  /**
   * @returns A Promise resolving with the current contents of the clipboard.
   */
  read(): Promise<string>;

  /**
   * Writes the provided text into the clipboard.
   *
   * @param text A string to write to clipboard
   */
  write(text: string): Promise<void>;

  /**
   * Starts listening to changes to the clipboard.
   *
   * @param includeOliveHelpsEvents - if passed in true, callback will be called while olive helps window is in focus
   * @param callback - A function that's called whenever the clipboard's contents change.
   */
  listen(
    includeOliveHelpsEvents: boolean,
    callback: (clipboardText: string) => void,
  ): Promise<Cancellable>;
}

export function listen(
  includeOliveHelpsEvents: boolean,
  callback: (clipboardText: string) => void,
): Promise<Cancellable> {
  return promisifyListenableWithParam(includeOliveHelpsEvents, callback, oliveHelps.clipboard.listen2);
}

export function read(): Promise<string> {
  return promisify(oliveHelps.clipboard.read);
}

export function write(text: string): Promise<void> {
  return promisifyWithParam(text, oliveHelps.clipboard.write);
}
