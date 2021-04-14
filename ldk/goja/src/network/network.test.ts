import { mocked } from 'ts-jest/utils';
import { network, HTTPRequest, HTTPResponse } from '.';

describe('Network', () => {
  beforeEach(() => {
    oliveHelps.network = {
      httpRequest: jest.fn(),
    };
  });

  describe('httpRequest', () => {
    it('returns a promise result with expected clipboard value', () => {
      const request: HTTPRequest = {
        body: new Uint8Array(),
        headers: { x: ['x'] },
        method: 'GET',
        url: 'some url',
      };
      const response: HTTPResponse = {
        statusCode: 200,
        data: new Uint8Array(),
        headers: { x: ['x'] },
      };
      mocked(oliveHelps.network.httpRequest).mockImplementation((_request, callback) => {
        callback(response);
      });

      const actual = network.httpRequest(request);

      return expect(actual).resolves.toBe(response);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      const request: HTTPRequest = {
        body: new Uint8Array(),
        headers: { x: ['x'] },
        method: 'GET',
        url: 'some url',
      };
      mocked(oliveHelps.network.httpRequest).mockImplementation(() => {
        throw exception;
      });

      const actual = network.httpRequest(request);

      return expect(actual).rejects.toBe(exception);
    });
  });
});
