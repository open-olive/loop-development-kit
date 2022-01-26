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

    it('returns a promise with the token when jwtConfig is present (fullName)', () => {
      const jwt = 'jwt';
      mocked(oliveHelps.user.jwt).mockImplementation((callback) => callback(undefined, jwt));

      const actual = user.jwt({ includeFulllName: true });

      expect(oliveHelps.user.jwt).toHaveBeenCalledWith(expect.any(Function), {
        includeFulllName: true,
      });
      return expect(actual).resolves.toBe(jwt);
    });

    it('returns a promise with the token when jwtConfig is present (organizationId)', () => {
      const jwt = 'jwt';
      mocked(oliveHelps.user.jwt).mockImplementation((callback) => callback(undefined, jwt));

      const actual = user.jwt({ includeOrganizationId: true });

      expect(oliveHelps.user.jwt).toHaveBeenCalledWith(expect.any(Function), {
        includeOrganizationId: true,
      });
      return expect(actual).resolves.toBe(jwt);
    });

    it('returns a promise with the token when jwtConfig is present (organizationName)', () => {
      const jwt = 'jwt';
      mocked(oliveHelps.user.jwt).mockImplementation((callback) => callback(undefined, jwt));

      const actual = user.jwt({ includeOrganizationName: true });

      expect(oliveHelps.user.jwt).toHaveBeenCalledWith(expect.any(Function), {
        includeOrganizationName: true,
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
