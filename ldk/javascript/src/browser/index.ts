/**
 * Allows Loops to communicate with a web browser running the Olive Helps extension.
 */
import { Cancellable } from '../cancellable';
import { promisifyListenable, promisifyWithParam } from '../promisify';

export interface NavigationDetails {
  tabId: number;
  url: string;
  frameId: number;
  parentFrameId: number;
  timestamp: number;
}

export interface Browser {
  /**
   * Calls callback on any navigation event pushed from a browser running the Olive Helps extension.
   *
   * @param callback - The callback function called when a navigation event happens.
   */
  listenNavigation(callback: (details: NavigationDetails) => void): Promise<Cancellable>;

  /**
   * Calls callback on any text selection event pushed from a browser running the Olive Helps extension.
   *
   * @param callback - The callback function called when text is selected in the browser.
   */
  listenTextSelection(callback: (value: string) => void): Promise<Cancellable>;

  /**
   * Opens a tab in the browser running the Olive Helps extension.
   *
   * @param address - The address to navigate to in the tab.
   */
  openTab(address: string): Promise<number>;

  /**
   * Opens a window in the browser running the Olive Helps extension.
   *
   * @param address - The address to navigate to in the new window.
   */
  openWindow(address: string): Promise<number>;
}

export function listenNavigation(
  callback: (details: NavigationDetails) => void,
): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.browser.listenNavigation);
}

export function listenTextSelection(callback: (value: string) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.browser.listenTextSelection);
}

export function openTab(address: string): Promise<number> {
  return promisifyWithParam(address, oliveHelps.browser.openTab);
}

export function openWindow(address: string): Promise<number> {
  return promisifyWithParam(address, oliveHelps.browser.openWindow);
}
