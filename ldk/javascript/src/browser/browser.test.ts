import { mocked } from 'ts-jest/utils';
import * as browser from '.';

describe('Browser', () => {
  beforeEach(() => {
    oliveHelps.browser = {
      listenNavigation: jest.fn(),
      listenTextSelection: jest.fn(),
      listenUIElement: jest.fn(),
      openTab: jest.fn(),
      openWindow: jest.fn(),
      openTab2: jest.fn(),
      openWindow2: jest.fn(),
      listenNetworkActivity: jest.fn(),
      sourceHTML: jest.fn(),
    };
  });

  describe('listenNavigation', () => {
    it('gives details', () => {
      const callback = jest.fn();
      const details = {
        frameId: 0,
        navigationType: 'real' as browser.NavigationTypeReal,
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

  describe('listenNetworkActivity', () => {
    it('returns network activity events', () => {
      const callback = jest.fn();
      const activity = {
        tabId: 0,
        requestUrl: 'https://www.google.com',
        method: 'GET',
        requestBody: null,
        domain: 'google.com',
      };

      mocked(oliveHelps.browser.listenNetworkActivity).mockImplementation((listenerCallback) => {
        listenerCallback(undefined, activity);
      });

      browser.listenNetworkActivity(callback);
      expect(callback).toHaveBeenCalledWith(activity);
    });
  });

  describe('listenUIElement', () => {
    it('returns UIElement details', () => {
      const callback = jest.fn();
      const UIElement = {
        selector: '',
        type: '',
      };
      const UIArguments = {
        selector: '',
        address: '',
      };
      browser.listenUIElement(UIArguments, callback);
      expect(callback).toHaveBeenCalledWith(UIElement);
    });
  });

  describe('sourceHTML', () => {
    it('returns the id and source', () => {
      const address = 'sourceAddress';
      const details = {
        id: 0,
        sourceHTML: '<HTML></HTML>',
      };
      mocked(oliveHelps.browser.sourceHTML).mockImplementation((addr, callback) => {
        callback(undefined, details);
      });

      const actual = browser.sourceHTML(address);
      expect(oliveHelps.browser.sourceHTML).toHaveBeenCalledWith(address, expect.any(Function));
      return expect(actual).resolves.toBe(details);
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

    it('opens a browser tab and returns the tab id and source', () => {
      const tab = 'soda';
      const details = {
        id: 0,
        sourceHTML: '<HTML></HTML>',
      };
      mocked(oliveHelps.browser.openTab2).mockImplementation((address, callback) => {
        callback(undefined, details);
      });

      const actual = browser.openTab(tab, { includeSource: true });

      expect(oliveHelps.browser.openTab2).toHaveBeenCalledWith(tab, expect.any(Function));
      return expect(actual).resolves.toBe(details);
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

    it('opens a browser window and returns the window id and source', () => {
      const window = 'xp';
      const details = {
        id: 95,
        sourceHTML: '<HTML></HTML>',
      };
      mocked(oliveHelps.browser.openWindow2).mockImplementation((address, callback) => {
        callback(undefined, details);
      });

      const actual = browser.openWindow(window, { includeSource: true });

      expect(oliveHelps.browser.openWindow2).toHaveBeenCalledWith(window, expect.any(Function));
      return expect(actual).resolves.toBe(details);
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
