import { Cancellable } from '../cancellable';
import { promisify, promisifyWithParam } from '../promisify';

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
   * @param filterOptions - object, includesOliveHelps will callback will be called while olive helps window is in focus if true
   * @param callback - A function that's called whenever the clipboard's contents change.
   */
  listen(
    filterOptions: FilterOptions,
    callback: (clipboardText: string) => void,
  ): Promise<Cancellable>;
}

type FilterOptions = {
  includeOliveHelpsEvents: boolean;
};

export function listen(
  filterOptions: FilterOptions,
  callback: (clipboardText: string) => void,
): Promise<Cancellable> {
  return new Promise((resolve, reject) => {
    try {
      let focusedWindow: string;

      oliveHelps.window.activeWindow((error, event) => {
        if (error) {
          return error;
        }
        focusedWindow = event.path;
        console.log("___________________")
        console.log("focusedWindow init")
        console.log(focusedWindow)
        console.log("___________________")
        return focusedWindow;
      });

      // updates focusedWindow when focused window is changed
      oliveHelps.window.listenActiveWindow(
        (error, event) => {
          if (error) {
            return error;
          }
          focusedWindow = event.path;
          console.log("___________________")
          console.log("focusedWindow updated")
          console.log(focusedWindow)
          console.log("___________________")
          return focusedWindow;
        },
        (obj) => resolve(obj),
        );

      oliveHelps.clipboard.listenAll(
        (error, event) => {
          if (error) {
            return error;
          }
          if (
            filterOptions.includeOliveHelpsEvents !== false ||
            (focusedWindow !== 'olive-helps.exe' && focusedWindow !== 'olive-helps')
          ) {
            console.log("___________________")
            console.log(focusedWindow)
            console.log(event)
            console.log("___________________")
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
