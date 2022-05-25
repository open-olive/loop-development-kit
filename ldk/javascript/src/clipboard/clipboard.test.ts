import { mocked } from 'ts-jest/utils';
import * as clipboard from '.';

describe('Clipboard', () => {
  beforeEach(() => {
    oliveHelps.clipboard = {
      read: jest.fn(),
      listenAll: jest.fn(),
      write: jest.fn(),
    };
    oliveHelps.window = {
      activeWindow: jest.fn(),
      listenActiveWindow: jest.fn(),
      all: jest.fn(),
      listenAll: jest.fn(),
      getActiveWindowID: jest.fn(),
    };
  });

  describe('read', () => {
    it('returns a promise result with expected clipboard value', () => {
      const expected = 'expected string';
      mocked(oliveHelps.clipboard.read).mockImplementation((callback) =>
        callback(undefined, expected),
      );

      const actual = clipboard.read();

      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.clipboard.read).mockImplementation(() => {
        throw exception;
      });

      const actual = clipboard.read();

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('listen', () => {
    it('sets clipboard olive helps configuration', () => {
      const callback = jest.fn();
      clipboard.listen({ includeOliveHelpsEvents: true }, callback);

      expect(oliveHelps.clipboard.listenAll).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
      );
    });

    it('passed in listen Including olive helps events function to Olive Helps', async () => {
      const callback = jest.fn();
      const text = 'abc';
      const expectedWindowInfo = {
        title: 'Olive Helps Application',
        path: 'path/to/my/window',
        pid: 8675309,
        x: 0,
        y: 1,
        width: 9001,
        height: 50,
      };
      mocked(oliveHelps.window.activeWindow).mockImplementation((callbackAW) =>
        callbackAW(undefined, expectedWindowInfo),
      );
      mocked(oliveHelps.clipboard.listenAll).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, text);
      });

      await clipboard.listen({ includeOliveHelpsEvents: true }, callback);
      expect(callback).toHaveBeenCalledWith(text);
    });

    it('passed in listen Including olive helps events function to Chrome', async () => {
      const callback = jest.fn();
      const expectedWindowInfo = {
        title: 'Chrome',
        path: 'path/to/my/window',
        pid: 8675309,
        x: 0,
        y: 1,
        width: 9001,
        height: 50,
      };
      const text = 'abc';

      mocked(oliveHelps.window.activeWindow).mockImplementation((callbackAW) =>
        callbackAW(undefined, expectedWindowInfo),
      );
      mocked(oliveHelps.clipboard.listenAll).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, text);
      });

      await clipboard.listen({ includeOliveHelpsEvents: true }, callback);
      expect(callback).toHaveBeenCalledWith(text);
    });
    it('passed in listen excluding olive helps events function to Olive Helps', async () => {
      const callback = jest.fn();
      const expectedWindowInfo = {
        title: 'Olive Helps Application',
        path: 'path/to/my/window',
        pid: 8675309,
        x: 0,
        y: 1,
        width: 9001,
        height: 50,
      };
      const text = 'abc';

      mocked(oliveHelps.window.activeWindow).mockImplementation((callbackAW) =>
        callbackAW(undefined, expectedWindowInfo),
      );
      mocked(oliveHelps.clipboard.listenAll).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, text);
      });

      await clipboard.listen({ includeOliveHelpsEvents: false }, callback);
      expect(callback).not.toHaveBeenCalled();
    });

    it('passed in listen excluding olive helps events function to Chrome', async () => {
      const callback = jest.fn();
      const expectedWindowInfo = {
        title: 'Chrome',
        path: 'path/to/my/window',
        pid: 8675309,
        x: 0,
        y: 1,
        width: 9001,
        height: 50,
      };
      const text = 'abc';

      mocked(oliveHelps.window.activeWindow).mockImplementation((callbackAW) =>
        callbackAW(undefined, expectedWindowInfo),
      );
      mocked(oliveHelps.clipboard.listenAll).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, text);
      });

      await clipboard.listen({ includeOliveHelpsEvents: false }, callback);
      expect(callback).toHaveBeenCalledWith(text);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.clipboard.listenAll).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => clipboard.listen({ includeOliveHelpsEvents: false }, callback)).rejects.toBe(
        exception,
      );
    });
  });

  describe('write', () => {
    it('writes text to an olive helps clipboard', () => {
      const expectedText = 'text';
      mocked(oliveHelps.clipboard.write).mockImplementation((text, callback) => {
        callback(undefined);
      });

      const actual = clipboard.write(expectedText);

      expect(oliveHelps.clipboard.write).toHaveBeenCalledWith(expectedText, expect.any(Function));
      return expect(actual).resolves.toBeUndefined();
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.clipboard.write).mockImplementation(() => {
        throw exception;
      });

      const actual = clipboard.write('text');

      return expect(actual).rejects.toBe(exception);
    });
  });
});
