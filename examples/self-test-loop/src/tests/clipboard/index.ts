/* eslint-disable no-async-promise-executor */
import { clipboard } from '@oliveai/ldk';
import { whisper } from '../../../../../dist';
import { resolveRejectButtons } from '../whisper/utils';

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
      const listener = await clipboard.listen(true, (clipboardText: string) => {
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

export const testListenExcludingOliveHelps = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('Registering clipboard listener.');
      const listener = await clipboard.listen(false, (clipboardText: string) => {
        whisper.create({
          label: 'Clipboard - listen without olive helps events',
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body: clipboardText,
            },
            {
              type: whisper.WhisperComponentType.Markdown,
              body: 'Was the text above copied outside of olive helps?',
            },
            resolveRejectButtons(resolve, reject, 'Yes', 'No', true),
          ],
        });
        listener.cancel();
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testListenWithOptions = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('Registering clipboard listener.');
      const listener = await clipboard.listenWithOptions(
        { includeOliveHelpsEvents: true },
        (clipboardText: string) => {
          console.log(`Received clipboard text: ${clipboardText}`);
          listener.cancel();
          if (clipboardText === 'LDKThxBai') {
            resolve(true);
          }
          reject(new Error('Incorrect value detected'));
        },
      );
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testListenWithOptionsExcludingOliveHelps = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('Registering clipboard listener.');
      const listener = await clipboard.listenWithOptions(
        { includeOliveHelpsEvents: false },
        (clipboardText: string) => {
          whisper.create({
            label: 'Clipboard - listen without olive helps events',
            components: [
              {
                type: whisper.WhisperComponentType.Markdown,
                body: clipboardText,
              },
              {
                type: whisper.WhisperComponentType.Markdown,
                body: 'Was the text above copied outside of olive helps?',
              },
              resolveRejectButtons(resolve, reject, 'Yes', 'No', true),
            ],
          });
          listener.cancel();
        },
      );
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
