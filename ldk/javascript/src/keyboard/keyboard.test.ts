import { mocked } from 'ts-jest/utils';
import { Hotkey } from '.';
import * as keyboard from '.';

describe('Keyboard', () => {
  beforeEach(() => {
    oliveHelps.keyboard = {
      listenHotkey: jest.fn(),
      listenText: jest.fn(),
      listenCharacter: jest.fn(),
    };
  });

  describe('listenHotkey', () => {
    it('calls olive helps with given hotkey and callback function', async () => {
      const callback = jest.fn();
      const hotkey: Hotkey = {
        key: 'q',
      };
      mocked(oliveHelps.keyboard.listenHotkey).mockImplementation(
        (hotKeyParam, listenerCb, returnCb) => {
          expect(hotKeyParam).toEqual(hotkey);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          returnCb({} as any);
          listenerCb(undefined, true);
        },
      );

      await keyboard.listenHotkey(hotkey, callback);

      expect(callback).toHaveBeenCalledWith(true);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.keyboard.listenHotkey).mockImplementation(() => {
        throw exception;
      });

      expect(keyboard.listenHotkey).rejects.toBe(exception);
    });
  });

  describe('listenText', () => {
    it('calls olive helps with given callback function', async () => {
      const callback = jest.fn();
      const text = 'text123';
      mocked(oliveHelps.keyboard.listenText).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, text);
      });

      await keyboard.listenText(callback);
      expect(callback).toHaveBeenCalledWith(text);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.keyboard.listenText).mockImplementation(() => {
        throw exception;
      });

      expect(keyboard.listenText).rejects.toBe(exception);
    });
  });

  describe('listenCharacter', () => {
    it('calls olive helps with given callback function', async () => {
      const callback = jest.fn();
      const char = '1';
      mocked(oliveHelps.keyboard.listenCharacter).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, char);
      });

      await keyboard.listenCharacter(callback);

      expect(callback).toHaveBeenCalledWith(char);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.keyboard.listenCharacter).mockImplementation(() => {
        throw exception;
      });

      expect(keyboard.listenCharacter).rejects.toBe(exception);
    });
  });
});
