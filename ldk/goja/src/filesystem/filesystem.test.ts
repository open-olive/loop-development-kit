import { mocked } from 'ts-jest/utils';
import { filesystem } from '.';

describe('Clipboard', () => {
  beforeEach(() => {
    oliveHelps.filesystem = {
      copy: jest.fn(),
      dir: jest.fn(),
      exists: jest.fn(),
      listenDir: jest.fn(),
      listenFile: jest.fn(),
      makeDir: jest.fn(),
      move: jest.fn(),
      readFile: jest.fn(),
      remove: jest.fn(),
      stat: jest.fn(),
      writeFile: jest.fn(),
    };
  });

  describe('copy', () => {
    it('returns a promise result when file is copied', () => {
      const source = 'source';
      const destination = 'destination';
      mocked(oliveHelps.filesystem.copy).mockImplementation((_source, _destination, callback) =>
        callback(),
      );

      filesystem.copy(source, destination);

      expect(oliveHelps.filesystem.copy).toHaveBeenCalledWith(
        source,
        destination,
        expect.any(Function),
      );
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.copy).mockImplementation(() => {
        throw exception;
      });

      const actual = filesystem.copy('source', 'destination');

      return expect(actual).rejects.toBe(exception);
    });
  });
});
