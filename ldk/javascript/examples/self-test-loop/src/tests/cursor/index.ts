import { cursor } from '@oliveai/ldk';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const testPosition = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    cursor
      .position()
      .then((response) => {
        console.debug(`Cursor X - ${response.x}`);
        console.debug(`Cursor Y - ${response.y}`);
        setTimeout(() => {
          resolve(true);
        }, 1500);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });

export const testListenPosition = (): Promise<boolean> =>
  new Promise((resolve) => {
    let i = 0;
    let cursorPositionStream: Cancellable;
    cursor
      .listenPosition((response) => {
        if (typeof response !== 'undefined') {
          console.debug(`Cursor Stream X - ${response.x}`);
          console.debug(`Cursor Stream Y - ${response.y}`);
          i += 1;

          if (i >= 5) {
            cursorPositionStream.cancel();
            resolve(true);
          }
        }
      })
      .then((cancellable: Cancellable) => {
        cursorPositionStream = cancellable;
      });
  });
