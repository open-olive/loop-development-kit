import { keyboard } from '@oliveai/ldk';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const testListenCharacter = (): Promise<boolean> =>
  new Promise((resolve) => {
    let keyboardListener: Cancellable;
    keyboard
      .listenCharacter((char) => {
        console.debug('Character pressed', 'response', char);
        if (char === 'f' || char === 'F') {
          keyboardListener.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => {
        keyboardListener = cancellable;
      });
  });

export const testListenText = (): Promise<boolean> =>
  new Promise((resolve) => {
    let keyboardListener: Cancellable;
    keyboard
      .listenText((text) => {
        console.debug('Characters pressed', 'response', text);
        if (text === 'Olive') {
          keyboardListener.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => {
        keyboardListener = cancellable;
      });
  });

export const testListenHotkey = (): Promise<boolean> =>
  new Promise((resolve) => {
    const hotkeys = {
      key: 'a',
      control: true,
    };

    let keyboardListener: Cancellable;
    keyboard
      .listenHotkey(hotkeys, (pressed) => {
        console.debug('Hotkey pressed', 'response', pressed);
        keyboardListener.cancel();
        resolve(true);
      })
      .then((cancellable: Cancellable) => {
        keyboardListener = cancellable;
      });
  });
