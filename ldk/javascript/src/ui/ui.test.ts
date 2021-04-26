import { mocked } from 'ts-jest/utils';
import { ui } from '.';

describe('UI', () => {
  beforeEach(() => {
    oliveHelps.ui = {
      listenSearchbar: jest.fn(),
      listenGlobalSearch: jest.fn(),
    };
  });

  describe('listenSearchbar', () => {
    it('passed in listen function to olive helps', () => {
      const callback = jest.fn();
      ui.listenSearchbar(callback);

      expect(oliveHelps.ui.listenSearchbar).toHaveBeenCalledWith(callback,expect.any(Function));
    });

    it('throws exception when passing in Listen function', () => {
      const exception = 'Exception';
      mocked(oliveHelps.ui.listenSearchbar).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => ui.listenSearchbar(callback)).toThrow(exception);
    });
  });

  describe('listenGlobalSearch', () => {
    it('passed in listen function to olive helps', () => {
      const callback = jest.fn();
      ui.listenGlobalSearch(callback);

      expect(oliveHelps.ui.listenGlobalSearch).toHaveBeenCalledWith(callback,expect.any(Function));
    });

    it('throws exception when passing in Listen function', () => {
      const exception = 'Exception';
      mocked(oliveHelps.ui.listenGlobalSearch).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => ui.listenGlobalSearch(callback)).toThrow(exception);
    });
  });
});