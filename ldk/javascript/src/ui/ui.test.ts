import { mocked } from 'ts-jest/utils';
import * as ui from '.';

describe('UI', () => {
  beforeEach(() => {
    oliveHelps.ui = {
      listenSearchbar: jest.fn(),
      listenGlobalSearch: jest.fn(),
      loopOpenHandler: jest.fn(),
    };
  });

  describe('listenSearchbar', () => {
    it('passed in listen function to olive helps', async () => {
      const callback = jest.fn();
      const text = 'abc';
      mocked(oliveHelps.ui.listenSearchbar).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, text);
      });
      await ui.listenSearchbar(callback);

      expect(callback).toHaveBeenCalledWith(text);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.ui.listenSearchbar).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => ui.listenSearchbar(callback)).rejects.toBe(exception);
    });
  });

  describe('listenGlobalSearch', () => {
    it('passed in listen function to olive helps', async () => {
      const callback = jest.fn();
      const text = 'abc';
      mocked(oliveHelps.ui.listenGlobalSearch).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, text);
      });
      await ui.listenGlobalSearch(callback);

      expect(callback).toHaveBeenCalledWith(text);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.ui.listenGlobalSearch).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => ui.listenGlobalSearch(callback)).rejects.toBe(exception);
    });
  });

  describe('loopOpenHandler', () => {
    it('passes handler to olive helps', async () => {
      const callback = jest.fn();
      mocked(oliveHelps.ui.loopOpenHandler).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined);
      });

      await ui.loopOpenHandler(callback);

      expect(callback).toHaveBeenCalled();
    });
  });
});
