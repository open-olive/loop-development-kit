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
      console.info('Text received', 'response', text);
      if (text === 'Olive') {
        listener.cancel();
        resolve(true);
      }
    }, true);
  });

export const testListenTextIgnoreOliveHelpsTraffic = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const listenerIgnoreOH = await keyboard.listenText((text) => {
      reject('Should not allow Olive Helps traffic');
      listenerIgnoreOH.cancel();
      listenerAllowOH.cancel();
    }, false);

    const listenerAllowOH = await keyboard.listenText((text) => {
      if (text === 's' || text === 'S') {
        listenerAllowOH.cancel();
        listenerIgnoreOH.cancel();
        resolve(true);
      }
    }, true);
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
