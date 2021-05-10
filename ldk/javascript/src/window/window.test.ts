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
        callback(expectedWindowInfo),
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
    it('passed in listen function to olive helps', () => {
      const callback = jest.fn();
      window.listenActiveWindow(callback);

      expect(oliveHelps.window.listenActiveWindow).toHaveBeenCalledWith(
        callback,
        expect.any(Function),
      );
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

      mocked(oliveHelps.window.all).mockImplementation((callback) => callback(expectedWindowInfo));

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
    it('passed in listen function to olive helps', () => {
      const callback = jest.fn();
      window.listenAll(callback);

      expect(oliveHelps.window.listenAll).toHaveBeenCalledWith(callback, expect.any(Function));
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