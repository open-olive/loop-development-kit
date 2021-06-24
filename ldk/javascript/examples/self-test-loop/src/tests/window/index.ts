import { window } from '@oliveai/ldk';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const listenActiveWindowTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let activeWindowStream: Cancellable;
    window
      .listenActiveWindow((response) => {
        if (response) {
          console.debug('Window become active', 'response', response.title);
          activeWindowStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => {
        activeWindowStream = cancellable;
      });
  });

export const activeWindowTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    window
      .activeWindow()
      .then((windowInfo) => {
        console.debug(windowInfo.height);
        resolve(true);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const allWindowTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    window
      .all()
      .then((allWindows) => {
        console.debug(allWindows.length);
        resolve(true);
      })
      .catch((e) => {
        reject(e);
      });
  });