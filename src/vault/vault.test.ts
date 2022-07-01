import { mocked } from 'ts-jest/utils';
import * as vault from '.';

describe('Vault', () => {
  beforeEach(() => {
    oliveHelps.vault = {
      remove: jest.fn(),
      exists: jest.fn(),
      read: jest.fn(),
      write: jest.fn(),
    };
  });

  describe('remove', () => {
    it('returns a promise with expected remove status', () => {
      const expectedKey = 'myKeyToRemove';
      mocked(oliveHelps.vault.remove).mockImplementation((key, callback) => callback(undefined));

      const actual = vault.remove(expectedKey);

      expect(oliveHelps.vault.remove).toHaveBeenCalledWith(expectedKey, expect.any(Function));
      return expect(actual).resolves.toBeUndefined();
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.vault.remove).mockImplementation(() => {
        throw exception;
      });

      const actual = vault.remove('myKeyToRemove');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('exists', () => {
    it('returns a promise with expected exists value', () => {
      const expectedKey = 'myExistsKey';
      const expectedResult = true;
      mocked(oliveHelps.vault.exists).mockImplementation((key, callback) =>
        callback(undefined, expectedResult),
      );

      const actual = vault.exists(expectedKey);

      expect(oliveHelps.vault.exists).toHaveBeenCalledWith(expectedKey, expect.any(Function));
      return expect(actual).resolves.toBe(expectedResult);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.vault.exists).mockImplementation(() => {
        throw exception;
      });

      const actual = vault.exists('myKey');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('read', () => {
    it('returns a promise with expected read value', () => {
      const expectedKey = 'myReadKey';
      const expectedResult = 'my read value';
      mocked(oliveHelps.vault.read).mockImplementation((key, callback) =>
        callback(undefined, expectedResult),
      );

      const actual = vault.read(expectedKey);

      expect(oliveHelps.vault.read).toHaveBeenCalledWith(expectedKey, expect.any(Function));
      return expect(actual).resolves.toBe(expectedResult);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.vault.read).mockImplementation(() => {
        throw exception;
      });

      const actual = vault.read('myKey');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('write', () => {
    it('returns a promise with expected write value', () => {
      const expectedKey = 'myWriteKey';
      const expectedValue = 'my write value';
      mocked(oliveHelps.vault.write).mockImplementation((key, value, callback) =>
        callback(undefined),
      );

      const actual = vault.write(expectedKey, expectedValue);

      expect(oliveHelps.vault.write).toHaveBeenCalledWith(
        expectedKey,
        expectedValue,
        expect.any(Function),
      );
      return expect(actual).resolves.toBeUndefined();
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.vault.write).mockImplementation(() => {
        throw exception;
      });

      const actual = vault.write('myKey', 'myValue');

      return expect(actual).rejects.toBe(exception);
    });
  });
});
