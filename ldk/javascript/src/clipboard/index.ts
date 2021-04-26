/**
 * The ClipboardService provides access to the OS's clipboard.
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
  listen(includeOliveHelpsEvents: boolean, callback: (clipboardText: string) => void): void;
}

export function listen(includeOliveHelpsEvents: boolean, callback: (clipboardText: string) => void): void {
  oliveHelps.clipboard.includeOliveHelpsEvents(includeOliveHelpsEvents);
  return oliveHelps.clipboard.listen(callback);
}

export function read(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      oliveHelps.clipboard.read((clipboardText: string) => resolve(clipboardText));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function write(text: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      oliveHelps.clipboard.write(text, () => resolve());
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
