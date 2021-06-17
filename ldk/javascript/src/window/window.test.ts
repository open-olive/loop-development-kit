import { mocked } from 'ts-jest/utils';
import * as window from '.';

describe('Window', () => {
  beforeEach(() => {
    oliveHelps.window = {
      activeWindow: jest.fn(),
      listenActiveWindow: jest.fn(),
      all: jest.fn(),
      listenAll: jest.fn(),
    };
  });

  describe('activeWindow', () => {
    it('returns a promise containing active window info', () => {
      const expectedWindowInfo = {
        title: 'Chrome',
        path: 'path/to/my/window',
        pid: 8675309,
        x: 0,
        y: 1,
        width: 9001,
        height: 50,
      };

      mocked(oliveHelps.window.activeWindow).mockImplementation((callback) =>
        callback(undefined, expectedWindowInfo),
      );

      const actual = window.activeWindow();

      expect(oliveHelps.window.activeWindow).toHaveBeenCalled();
      return expect(actual).resolves.toBe(expectedWindowInfo);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.window.activeWindow).mockImplementation(() => {
        throw exception;
      });

      const actual = window.activeWindow();

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('listenActiveWindow', () => {
    it('passed in listen function to olive helps', async () => {
      const callback = jest.fn();
      const windowEvent = {
        title: 'title',
        path: 'path',
        x: 1,
        y: 2,
        pid: 3,
        height: 4,
        width: 5,
      };
      mocked(oliveHelps.window.listenActiveWindow).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, windowEvent);
      });

      await window.listenActiveWindow(callback);

      expect(callback).toHaveBeenCalledWith(windowEvent);
    });

    it('throws exception when passing in listen function', () => {
      const exception = 'Exception';
      mocked(oliveHelps.window.listenActiveWindow).mockImplementation(() => {
        throw exception;
      });

      expect(() => window.listenActiveWindow(jest.fn())).rejects.toBe(exception);
    });
  });

  describe('all', () => {
    it('returns a promise containing all window info', () => {
      const expectedWindowInfo: window.WindowInfo[] = [
        {
          title: 'Chrome',
          path: 'path/to/my/window',
          pid: 8675309,
          x: 0,
          y: 1,
          width: 9001,
          height: 50,
        },
        {
          title: 'Finder',
          path: 'path/to/my/window2',
          pid: 123456,
          x: 50,
          y: 99,
          width: 123,
          height: 456,
        },
      ];

      mocked(oliveHelps.window.all).mockImplementation((callback) =>
        callback(undefined, expectedWindowInfo),
      );

      const actual = window.all();

      expect(oliveHelps.window.all).toHaveBeenCalled();
      return expect(actual).resolves.toBe(expectedWindowInfo);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.window.all).mockImplementation(() => {
        throw exception;
      });

      const actual = window.all();

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('listenAll', () => {
    it('passed in listen function to olive helps', async () => {
      const callback = jest.fn();
      const windowAllEvent = {
        action: 'focused' as window.WindowActionFocused,
        info: {
          title: 'title',
          path: 'path',
          x: 1,
          y: 2,
          pid: 3,
          height: 4,
          width: 5,
        },
      };
      mocked(oliveHelps.window.listenAll).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, windowAllEvent);
      });

      await window.listenAll(callback);

      expect(callback).toHaveBeenCalledWith(windowAllEvent);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.window.listenAll).mockImplementation(() => {
        throw exception;
      });

      expect(() => window.listenAll(jest.fn())).rejects.toBe(exception);
    });
  });
});
