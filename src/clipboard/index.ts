import { Cancellable } from '../cancellable';
import { promisify, promisifyWithParam, promisifyListenable } from '../promisify';

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
   * @param filterOptions - object, includesOliveHelps will callback will be called while olive helps window is in focus if true
   * @param callback - A function that's called whenever the clipboard's contents change.
   */
  listen(
    includeOliveHelpsEvents: boolean,
    callback: (clipboardText: string) => void,
  ): Promise<Cancellable>;

  listenWithOptions(
    filterOptions: FilterOptions,
    callback: (clipboardText: string) => void,
  ): Promise<Cancellable>;
}

type FilterOptions = {
  includeOliveHelpsEvents: boolean;
};

export function listen(
  includeOliveHelpsEvents: boolean,
  callback: (clipboardText: string) => void,
): Promise<Cancellable> {
  oliveHelps.clipboard.includeOliveHelpsEvents(includeOliveHelpsEvents);
  return promisifyListenable(callback, oliveHelps.clipboard.listen);
}

export function listenWithOptions(
  filterOptions: FilterOptions,
  callback: (clipboardText: string) => void,
): Promise<Cancellable> {
  return new Promise((resolve, reject) => {
    try {
      const setFocusedWindow = () =>
        new Promise((res, rej) => {
          oliveHelps.window.activeWindow((error, event) => {
            if (error) {
              return rej(error);
            }

            return res(event.title);
          });
        });

      oliveHelps.clipboard.listenAll(
        async (error, event) => {
          if (error) {
            return reject(error);
          }

          const focusedWindow = await setFocusedWindow();

          if (
            filterOptions.includeOliveHelpsEvents ||
            focusedWindow !== 'Olive Helps Application'
          ) {
            return callback(event);
          }
          return undefined;
        },
        (obj) => resolve(obj),
      );
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function read(): Promise<string> {
  return promisify(oliveHelps.clipboard.read);
}

export function write(text: string): Promise<void> {
  return promisifyWithParam(text, oliveHelps.clipboard.write);
}
