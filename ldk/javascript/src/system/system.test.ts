import { mocked } from 'ts-jest/utils';
import * as system from '.';

describe('System', () => {
  beforeEach(() => {
    oliveHelps.system = {
      operatingSystem: jest.fn(),
      getEnvironment: jest.fn(),
    };
  });

  describe('operatingSystem', () => {
    it('returns a promise with the host os', () => {
      const os = 'os';
      mocked(oliveHelps.system.operatingSystem).mockImplementation((callback) =>
        callback(undefined, os),
      );

      const actual = system.operatingSystem();

      expect(oliveHelps.system.operatingSystem).toHaveBeenCalledWith(expect.any(Function));
      return expect(actual).resolves.toBe(os);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.system.operatingSystem).mockImplementation(() => {
        throw exception;
      });

      const actual = system.operatingSystem();

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('getEnvironment', () => {
    it('returns a promise with the host environment', () => {
      const environment = {
        osVersion: 'os',
        oliveHelpsVersion: 'olive-helps-version',
        loopVersion: 'loop-version',
      };
      mocked(oliveHelps.system.getEnvironment).mockImplementation((callback) =>
        callback(undefined, environment),
      );

      const actual = system.getEnvironment();

      expect(oliveHelps.system.getEnvironment).toHaveBeenCalledWith(expect.any(Function));

      return expect(actual).resolves.toBe(environment);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.system.getEnvironment).mockImplementation(() => {
        throw exception;
      });

      const actual = system.getEnvironment();

      return expect(actual).rejects.toBe(exception);
    });
  });
});
