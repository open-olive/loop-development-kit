import { clipboard } from '@oliveai/ldk';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const testWriteAndRead = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const string = 'Im in yr loop, writing to yr clipboard';
    clipboard
      .write(string)
      .then(() => {
        clipboard.read().then((response) => {
          if (response === string) {
            setTimeout(() => {
              resolve(true);
            }, 1000);
          } else {
            reject(new Error('Incorrect value detected'));
          }
        });
      })
      .catch((e) => {
        reject(e);
      });
  });

export const testListen = (): Promise<boolean> =>
  new Promise((resolve) => {
    let stream: Cancellable;
    clipboard
      .listen(true, (response) => {
        if (response === 'LDKThxBai') {
          stream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => {
        stream = cancellable;
      });
  });
