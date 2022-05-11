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
      const jwt = {
        jwt: 'jwt',
        fullName: 'stuff',
      };
      mocked(oliveHelps.user.jwtWithUserDetails).mockImplementation((unknow: unknown, callback) =>
        callback(undefined, jwt),
      );

      const actual = user.jwtWithUserDetails({ includeFullName: true });

      expect(oliveHelps.user.jwtWithUserDetails).toHaveBeenCalledWith(
        {
          includeFullName: true,
        },
        expect.any(Function),
      );
      return expect(actual).resolves.toBe(jwt);
    });

    it('returns a promise with the token when jwtConfig is present (organizationId)', () => {
      const jwt = {
        jwt: 'jwt',
        organizationId: 'stuff',
      };
      mocked(oliveHelps.user.jwtWithUserDetails).mockImplementation((unknow: unknown, callback) =>
        callback(undefined, jwt),
      );

      const actual = user.jwtWithUserDetails({ includeOrganizationId: true });

      expect(oliveHelps.user.jwtWithUserDetails).toHaveBeenCalledWith(
        {
          includeOrganizationId: true,
        },
        expect.any(Function),
      );
      return expect(actual).resolves.toBe(jwt);
    });

    it('returns a promise with the token when jwtConfig is present (organizationName)', () => {
      const jwt = {
        jwt: 'jwt',
        organizationName: 'stuff',
      };
      mocked(oliveHelps.user.jwtWithUserDetails).mockImplementation((unknow: unknown, callback) =>
        callback(undefined, jwt),
      );

      const actual = user.jwtWithUserDetails({ includeOrganizationName: true });

      expect(oliveHelps.user.jwtWithUserDetails).toHaveBeenCalledWith(
        {
          includeOrganizationName: true,
        },
        expect.any(Function),
      );
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
