import { mocked } from 'ts-jest/utils';
import * as browser from '.';

describe('Browser', () => {
  beforeEach(() => {
    oliveHelps.browser = {
      listenNavigation: jest.fn(),
      listenTextSelection: jest.fn(),
      openTab: jest.fn(),
      openWindow: jest.fn(),
    };
  });

  describe('listenNavigation', () => {
    it('gives details', () => {
      const callback = jest.fn();
      const details = {
        frameId: 0,
        parentFrameId: 1,
        tabId: 2,
        timestamp: 3,
        url: '4',
      };
      mocked(oliveHelps.browser.listenNavigation).mockImplementation((listenerCallback) => {
        listenerCallback(undefined, details);
      });

      browser.listenNavigation(callback);

      expect(callback).toHaveBeenCalledWith(details);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.browser.listenNavigation).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => browser.listenNavigation(callback)).rejects.toBe(exception);
    });
  });

  describe('listenTextSelection', () => {
    it('gives text', () => {
      const callback = jest.fn();
      const text = 'text';
      mocked(oliveHelps.browser.listenTextSelection).mockImplementation((listenerCallback) => {
        listenerCallback(undefined, text);
      });

      browser.listenTextSelection(callback);

      expect(callback).toHaveBeenCalledWith(text);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.browser.listenTextSelection).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => browser.listenTextSelection(callback)).rejects.toBe(exception);
    });
  });

  describe('openTab', () => {
    it('opens a browser tab and returns the tab id', () => {
      const tab = 'soda';
      const tabId = 0;
      mocked(oliveHelps.browser.openTab).mockImplementation((address, callback) => {
        callback(undefined, tabId);
      });

      const actual = browser.openTab(tab);

      expect(oliveHelps.browser.openTab).toHaveBeenCalledWith(tab, expect.any(Function));
      return expect(actual).resolves.toBe(tabId);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.browser.openTab).mockImplementation(() => {
        throw exception;
      });

      const actual = browser.openTab('tab');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('openWindow', () => {
    it('opens a browser window and returns the window id', () => {
      const window = 'xp';
      const windowId = 95;
      mocked(oliveHelps.browser.openWindow).mockImplementation((address, callback) => {
        callback(undefined, windowId);
      });

      const actual = browser.openWindow(window);

      expect(oliveHelps.browser.openWindow).toHaveBeenCalledWith(window, expect.any(Function));
      return expect(actual).resolves.toBe(windowId);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.browser.openWindow).mockImplementation(() => {
        throw exception;
      });

      const actual = browser.openWindow('window');

      return expect(actual).rejects.toBe(exception);
    });
  });
});
