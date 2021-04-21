import { mocked } from 'ts-jest/utils';
import * as filesystem from '.';

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
      join: jest.fn(),
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
      const expected: filesystem.FileInfo[] = [
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

      const actual = filesystem.listenDir('path', jest.fn());

      return expect(actual).rejects.toBe(exception);
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

      const actual = filesystem.listenFile('path', jest.fn());

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('makeDir', () => {
    it('returns a promise result when directory is created', () => {
      const writeMode: filesystem.WriteMode = 5;
      const destination = 'destination';
      mocked(
        oliveHelps.filesystem.makeDir,
      ).mockImplementation((_destination, _writeMode, callback) => callback());

      filesystem.makeDir(destination, writeMode);

      expect(oliveHelps.filesystem.makeDir).toHaveBeenCalledWith(
        destination,
        writeMode,
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

  describe('move', () => {
    it('returns a promise result when file is moved', () => {
      const source = 'source';
      const destination = 'destination';
      mocked(oliveHelps.filesystem.move).mockImplementation((_source, _destination, callback) =>
        callback(),
      );

      filesystem.move(source, destination);

      expect(oliveHelps.filesystem.move).toHaveBeenCalledWith(
        source,
        destination,
        expect.any(Function),
      );
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.move).mockImplementation(() => {
        throw exception;
      });

      const actual = filesystem.move('source', 'destination');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('readFile', () => {
    it('returns a promise result with expected array', () => {
      const path = 'path';
      const expected = new Uint8Array([84]);
      mocked(oliveHelps.filesystem.readFile).mockImplementation((_path, callback) =>
        callback(expected),
      );

      const actual = filesystem.readFile(path);

      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.readFile).mockImplementation(() => {
        throw exception;
      });

      const actual = filesystem.readFile('path');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('remove', () => {
    it('returns a promise result when file is removed', () => {
      const source = 'source';
      mocked(oliveHelps.filesystem.remove).mockImplementation((_source, callback) => callback());

      filesystem.remove(source);

      expect(oliveHelps.filesystem.remove).toHaveBeenCalledWith(source, expect.any(Function));
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.remove).mockImplementation(() => {
        throw exception;
      });

      const actual = filesystem.remove('source');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('stat', () => {
    it('returns a promise result with expected file information', () => {
      const path = 'path';
      const expected: filesystem.FileInfo = {
        name: 'name',
        size: 2345,
        mode: 'mode',
        modTime: 'modTime',
        isDir: true,
      };
      mocked(oliveHelps.filesystem.stat).mockImplementation((_path, callback) =>
        callback(expected),
      );

      const actual = filesystem.stat(path);

      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.stat).mockImplementation(() => {
        throw exception;
      });

      const actual = filesystem.stat('path');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('writeFile', () => {
    it('returns a promise result when file is written', () => {
      const path = 'path';
      const data = new Uint8Array([84]);
      const writeOperation: filesystem.WriteOperation = 1;
      const writeMode: filesystem.WriteMode = 54;
      mocked(
        oliveHelps.filesystem.writeFile,
      ).mockImplementation((_path, _data, _writeOperation, _writeMode, callback) => callback());

      filesystem.writeFile(path, data, writeOperation, writeMode);

      expect(oliveHelps.filesystem.writeFile).toHaveBeenCalledWith(
        path,
        data,
        writeOperation,
        writeMode,
        expect.any(Function),
      );
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.writeFile).mockImplementation(() => {
        throw exception;
      });

      const actual = filesystem.writeFile('path', new Uint8Array([84]), 1, 54);

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('join', () => {
    it('returns a promise result with given joined path', () => {
      const segments = ["first", "second", "third"];
      const expected = "first/second/third";

      mocked(oliveHelps.filesystem.join).mockImplementation((_segments, callback) => callback(expected));

      const actual = filesystem.join(segments);

      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.filesystem.join).mockImplementation(() => {
        throw exception;
      });

      const actual = filesystem.join(['a','b','c']);

      return expect(actual).rejects.toBe(exception);
    });
  });
});
