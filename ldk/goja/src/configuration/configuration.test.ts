import { mocked } from 'ts-jest/utils';
import { configuration } from '.';

describe('Configuration', () => {
  beforeEach(() => {
    oliveHelps.config = {
      includeOliveHelpsEvents: jest.fn(),
    };
  });

  describe('listen', () => {
    it('passed in olive helps traffic configuration', () => {
      const expected = true;
      configuration.includeOliveHelpsEvents(expected);

      expect(oliveHelps.config.includeOliveHelpsEvents).toHaveBeenCalledWith(expected);
    });

    it('throws exception when passing in olive helps traffic configuration', () => {
      const exception = 'Exception';
      mocked(oliveHelps.config.includeOliveHelpsEvents).mockImplementation(() => {
        throw exception;
      });

      expect(() => configuration.includeOliveHelpsEvents(true)).toThrow(exception);
    });
  });
});
