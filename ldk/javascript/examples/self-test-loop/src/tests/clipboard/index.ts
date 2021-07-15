/* eslint-disable no-async-promise-executor */
import { clipboard } from '@oliveai/ldk';

export const testWriteAndRead = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const string = 'Im in yr loop, writing to yr clipboard';
    try {
      await clipboard.write(string);
      const response = await clipboard.read();
      if (response === string) {
        resolve(true);
      } else {
        reject(new Error('Incorrect value detected'));
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testListen = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('Registering clipboard listener.');
      const listener = await clipboard.listen(true, (clipboardText) => {
        console.log(`Received clipboard text: ${clipboardText}`);
        listener.cancel();
        if (clipboardText === 'LDKThxBai') {
          resolve(true);
        }
        reject(new Error('Incorrect value detected'));
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
