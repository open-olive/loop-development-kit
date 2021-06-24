import { keyboard } from '@oliveai/ldk';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const charTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let keyboardStream: Cancellable;
    keyboard
      .listenCharacter((char) => {
        console.debug('Character pressed', 'response', char);
        if (char === 'f' || char === 'F') {
          keyboardStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => {
        keyboardStream = cancellable;
      });
  });

export const charStreamTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let keyboardStream: Cancellable;
    keyboard
      .listenText((text) => {
        console.debug('Characters pressed', 'response', text);
        if (text === 'Olive') {
          keyboardStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => {
        keyboardStream = cancellable;
      });
  });

export const hotkeyTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const hotkeys = {
      key: 'a',
      control: true,
    };

    let keyboardStream: Cancellable;
    keyboard
      .listenHotkey(hotkeys, (pressed) => {
        console.debug('Hotkey pressed', 'response', pressed);
        keyboardStream.cancel();
        resolve(true);
      })
      .then((cancellable: Cancellable) => {
        keyboardStream = cancellable;
      });
  });
