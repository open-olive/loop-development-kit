/**
 * The UI aptitude gives access to the Olive helps search bar
 */
export interface UI {
  listenSearchbar(cb: (val: string) => void): void;
  listenGlobalSearch(cb: (val: string) => void): void;
}

/**
 * Creates a stream receiving updates whenever the user enters a search in the Olive Helps Searchbar.
 * @param callback: The callback function that receives updates.
 */
function listenSearchbar(callback: (val: string) => void): void {
  return oliveHelps.ui.listenSearchbar(callback);
}

/**
 * Creates a stream receiving updates whenever the user enters a search in the Olive Helps Global Search.
 * @param callback: The callback function that receives updates.
 */
function listenGlobalSearch(callback: (val: string) => void): void {
  return oliveHelps.ui.listenGlobalSearch(callback);
}

export const ui: UI = {
  listenSearchbar,
  listenGlobalSearch,
};
