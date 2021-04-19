/**
 * The UI aptitude gives access to the Olive helps search bar
 */
import { Cancellable } from '../cancellable';

export interface UI {
  /**
   * Creates a stream receiving updates whenever the user enters a search in the Olive Helps Searchbar.
   *
   * @param cb - The callback function called when an update to the searchbar occurs.
   */
  listenSearchbar(cb: (val: string) => void): Cancellable;

  /**
   * Creates a stream receiving updates whenever the user enters a search in the Olive Helps Global Search.
   *
   * @param cb - The callback function called when an update to the global searchbar occurs.
   */
  listenGlobalSearch(cb: (val: string) => void): Cancellable;
}

function listenSearchbar(callback: (val: string) => void): Cancellable {
  return oliveHelps.ui.listenSearchbar(callback);
}

function listenGlobalSearch(callback: (val: string) => void): Cancellable {
  return oliveHelps.ui.listenGlobalSearch(callback);
}

export const ui: UI = {
  listenSearchbar,
  listenGlobalSearch,
};
