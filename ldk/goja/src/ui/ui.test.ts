import { UIImpl } from '.';
import { mocked } from 'ts-jest/utils';
import any = jasmine.any;
import anything = jasmine.anything;

describe('UI', () => {
  let subject: UIImpl;

  beforeEach(() => {
    oliveHelps.ui = {
      listenSearchbar: jest.fn(),
      listenGlobalSearch: jest.fn(),
    };
    subject = new UIImpl();
  });

  describe('listenSearchbar', () => {
    it('passed in listen function to olive helps', () => {
      const callback = jest.fn();
      subject.listenSearchbar(callback);

      expect(oliveHelps.ui.listenSearchbar).toHaveBeenCalledWith(callback);
    });

    it('throws exception when passing in Listen function', () => {
      const exception = 'Exception';
      mocked(oliveHelps.ui.listenSearchbar).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => subject.listenSearchbar(callback)).toThrow(exception);
    });
  });

  describe('listenGlobalSearch', () => {
    it('passed in listen function to olive helps', () => {
      const callback = jest.fn();
      subject.listenGlobalSearch(callback);

      expect(oliveHelps.ui.listenGlobalSearch).toHaveBeenCalledWith(callback);
    });

    it('throws exception when passing in Listen function', () => {
      const exception = 'Exception';
      mocked(oliveHelps.ui.listenGlobalSearch).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => subject.listenGlobalSearch(callback)).toThrow(exception);
    });
  });
});
