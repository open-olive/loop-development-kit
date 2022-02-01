import { mocked } from 'ts-jest/utils';
import * as user from '.';

describe('User', () => {
  beforeEach(() => {
    oliveHelps.user = {
      jwt: jest.fn(),
      jwtWithUserDetails: jest.fn(),
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
      const jwt: user.JWTWithParams = {
        jwt: 'jwt',
        fullName: 'fullName',
      };
      mocked(oliveHelps.user.jwtWithUserDetails).mockImplementation((unknown, callback) =>
        callback(undefined, jwt),
      );

      const actual = user.jwtWithUserDetails({ includeFullName: true });

      expect(oliveHelps.user.jwt).toHaveBeenCalledWith(expect.any(Function), {
        includeFullName: true,
      });
      return expect(actual).resolves.toBe(jwt);
    });

    it('returns a promise with the token when jwtConfig is present (organizationId)', () => {
      const jwt: user.JWTWithParams = {
        jwt: 'jwt',
        organizationId: 'organizationId',
      };
      mocked(oliveHelps.user.jwtWithUserDetails).mockImplementation((unknown, callback) =>
        callback(undefined, jwt),
      );

      const actual = user.jwtWithUserDetails({ includeFullName: true });

      expect(oliveHelps.user.jwt).toHaveBeenCalledWith(expect.any(Function), {
        includeOrganizationId: true,
      });
      return expect(actual).resolves.toBe(jwt);
    });

    it('returns a promise with the token when jwtConfig is present (organizationName)', () => {
      const jwt: user.JWTWithParams = {
        jwt: 'jwt',
        organizationName: 'organizationName',
      };
      mocked(oliveHelps.user.jwtWithUserDetails).mockImplementation((unknown, callback) =>
        callback(undefined, jwt),
      );

      const actual = user.jwtWithUserDetails({ includeFullName: true });

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
