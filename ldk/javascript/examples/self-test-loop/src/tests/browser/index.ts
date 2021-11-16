/* eslint-disable no-async-promise-executor */
import { browser } from '@oliveai/ldk';
import { NavigationDetails } from '@oliveai/ldk/dist/browser';

export const testOpenTabAndListenNavigation = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://www.oliveai.dev/';
      const tabId = await browser.openTab(URL);

      const listener = await browser.listenNavigation(
        (navigationEvent: NavigationDetails): void => {
          const { tabId: eventTabId, url: eventUrl } = navigationEvent;

          if (eventTabId === tabId && eventUrl === URL) {
            listener.cancel();
            resolve(true);
          }

          reject(new Error('The newest tab and URL do not match the test'));
        },
      );
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testOpenWindowAndListenNavigation = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://www.oliveai.dev/';
      await browser.openWindow(URL);

      const listener = await browser.listenNavigation(
        (navigationEvent: NavigationDetails): void => {
          const { url: eventUrl } = navigationEvent;

          // TODO: Update with Tab ID after S&A team looks into openWindow tab ID bug
          if (eventUrl === URL) {
            listener.cancel();
            resolve(true);
          }

          reject(new Error('The URL opened in the window does not match the test URL'));
        },
      );
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testListenTextSelection = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://www.oliveai.dev/';
      const TEXT_TO_SELECT = 'Welcome to the Olive Helps Developer Hub';
      await browser.openTab(URL);
      // A string to update and compare with to decide if text selection is "final"
      let textSelectedSoFar = '';

      const listener = await browser.listenTextSelection((textSelection: string): void => {
        textSelectedSoFar = textSelection;

        if (textSelection === TEXT_TO_SELECT) {
          listener.cancel();
          resolve(true);
        }

        setTimeout(() => {
          // After 2 seconds, if the text selection hasn't changed, assume it's final
          if (textSelectedSoFar === textSelection) {
            reject(new Error('The text selection in your browser does not match the test text'));
          }
        }, 2000);
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
