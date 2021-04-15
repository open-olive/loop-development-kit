import { mocked } from 'ts-jest/utils';
import { FileInfo, filesystem } from '.';

describe('Filesystem', () => {
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

  describe('dir', () => {
    it('returns a promise result with expected FileInfos', () => {
      const path = 'path';
      const expected: FileInfo[] = [
        {
          name: 'name',
          size: 2345,
          mode: 'mode',
          modTime: 'modTime',
          isDir: true,
        },
      ];
      mocked(oliveHelps.filesystem.dir).mockImplementation((_path, callback) => callback(expected));

      const actual = filesystem.dir(path);

      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.dir).mockImplementation(() => {
        throw exception;
      });

      const actual = filesystem.dir('path');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('exists', () => {
    it('returns a promise result with expected result', () => {
      const path = 'path';
      const expected = true;
      mocked(oliveHelps.filesystem.exists).mockImplementation((_path, callback) =>
        callback(expected),
      );

      const actual = filesystem.exists(path);

      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.exists).mockImplementation(() => {
        throw exception;
      });

      const actual = filesystem.exists('path');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('listenDir', () => {
    it('passed in listen function to olive helps', () => {
      const path = 'path';
      const callback = jest.fn();

      filesystem.listenDir(path, callback);

      expect(oliveHelps.filesystem.listenDir).toHaveBeenCalledWith(path, callback);
    });

    it('throws exception when passing in listen callback', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.listenDir).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => filesystem.listenDir('path', callback)).toThrow(exception);
    });
  });

  describe('listenFile', () => {
    it('passed in listen function to olive helps', () => {
      const path = 'path';
      const callback = jest.fn();

      filesystem.listenFile(path, callback);

      expect(oliveHelps.filesystem.listenFile).toHaveBeenCalledWith(path, callback);
    });

    it('throws exception when passing in listen callback', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.listenFile).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => filesystem.listenFile('path', callback)).toThrow(exception);
    });
  });

  describe('makeDir', () => {
    it('returns a promise result when directory is created', () => {
      const permissions = 5;
      const destination = 'destination';
      mocked(
        oliveHelps.filesystem.makeDir,
      ).mockImplementation((_destination, _permissions, callback) => callback());

      filesystem.makeDir(destination, permissions);

      expect(oliveHelps.filesystem.makeDir).toHaveBeenCalledWith(
        destination,
        permissions,
        expect.any(Function),
      );
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.makeDir).mockImplementation(() => {
        throw exception;
      });

      const actual = filesystem.makeDir('destination', 45);

      return expect(actual).rejects.toBe(exception);
    });
  });
});
