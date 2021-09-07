/**
 * The UI aptitude gives access to the Olive helps search bar
 */
import { Cancellable } from '../cancellable';
import { promisifyListenable } from '../promisify';

export interface UI {
  /**
   * Creates a stream receiving updates whenever the user enters a search in the Olive Helps Searchbar.
   *
   * @param cb - The callback function called when an update to the searchbar occurs.
   */
  listenSearchbar(cb: (val: string) => void): Promise<Cancellable>;

  /**
   * Creates a stream receiving updates whenever the user enters a search in the Olive Helps Global Search.
   *
   * @param cb - The callback function called when an update to the global searchbar occurs.
   */
  listenGlobalSearch(cb: (val: string) => void): Promise<Cancellable>;


  /**
   * Registers a handler function for the Olive Helps Loop Open Button
   * 
   * @param callback Function called when Loop Open Button is pressed in Olive Helps
   */
  loopOpenHandler(callback: () => void): void;
}

export function listenSearchbar(callback: (val: string) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.ui.listenSearchbar);
}

export function listenGlobalSearch(callback: (val: string) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.ui.listenGlobalSearch);
}

export function loopOpenHandler(callback: () => void): Promise<Cancellable> {
    return promisifyListenable(callback, oliveHelps.ui.loopOpenHandler);
}
