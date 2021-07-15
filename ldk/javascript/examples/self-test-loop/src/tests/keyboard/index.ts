/* eslint-disable no-async-promise-executor */
import { keyboard } from '@oliveai/ldk';

export const testListenCharacter = (): Promise<boolean> =>
  new Promise(async (resolve) => {
    const listener = await keyboard.listenCharacter((char) => {
      console.debug('Character pressed', 'response', char);
      if (char === 'f' || char === 'F') {
        listener.cancel();
        resolve(true);
      }
    });
  });

export const testListenText = (): Promise<boolean> =>
  new Promise(async (resolve) => {
    const listener = await keyboard.listenText((text) => {
      console.debug('Text received', 'response', text);
      if (text === 'Olive') {
        listener.cancel();
        resolve(true);
      }
    });
  });

export const testListenHotkey = (): Promise<boolean> =>
  new Promise(async (resolve) => {
    const hotkeys = {
      key: 'a',
      control: true,
    };

    const listener = await keyboard.listenHotkey(hotkeys, (pressed) => {
      console.debug('Hotkey pressed', 'response', pressed);
      listener.cancel();
      resolve(true);
    });
  });
