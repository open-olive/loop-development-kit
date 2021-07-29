import { mocked } from 'ts-jest/utils';
import * as user from '.';

describe('User', () => {
  beforeEach(() => {
    oliveHelps.user = {
      jwt: jest.fn(),
    };
  });

  describe('jwt', () => {
    it('returns a promise with the token when jwtConfig is unset', () => {
      const jwt = 'jwt';
      mocked(oliveHelps.user.jwt).mockImplementation((callback) => callback(undefined, jwt));

      const actual = user.jwt();

      expect(oliveHelps.user.jwt).toHaveBeenCalledWith(expect.any(Function), {});
      return expect(actual).resolves.toBe(jwt);
    });

    it('returns a promise with the token when jwtConfig is present', () => {
      const jwt = 'jwt';
      mocked(oliveHelps.user.jwt).mockImplementation((callback) => callback(undefined, jwt));

      const actual = user.jwt({ includeEmail: true });

      expect(oliveHelps.user.jwt).toHaveBeenCalledWith(expect.any(Function), {
        includeEmail: true,
      });
      return expect(actual).resolves.toBe(jwt);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.user.jwt).mockImplementation(() => {
        throw exception;
      });

      const actual = user.jwt();

      return expect(actual).rejects.toBe(exception);
    });
  });
});
