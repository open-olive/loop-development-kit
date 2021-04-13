import { network } from './';
import { mocked } from 'ts-jest/utils';
import any = jasmine.any;
import anything = jasmine.anything;

describe('Network', () => {
  beforeEach(() => {
    oliveHelps.network = {
      httpRequest: jest.fn(),
    };
  });

  describe('httpRequest', () => {
    it('returns a promise result with expected clipboard value', () => {
      const request: OliveHelps.HTTPRequest = {
        body: new Uint8Array(),
        headers: { x: ['x'] },
        method: 'GET',
        url: 'some url',
      };
      const response: OliveHelps.HTTPResponse = {
        statusCode: 200,
        data: new Uint8Array(),
        headers: { x: ['x'] },
      };
      mocked(oliveHelps.network.httpRequest).mockImplementation((request, callback) => {
        callback(response);
      });

      const actual = network.httpRequest(request);

      return expect(actual).resolves.toBe(response);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      const request: OliveHelps.HTTPRequest = {
        body: new Uint8Array(),
        headers: { x: ['x'] },
        method: 'GET',
        url: 'some url',
      };
      mocked(oliveHelps.network.httpRequest).mockImplementation((request, callback) => {
        throw exception;
      });

      const actual = network.httpRequest(request);

      return expect(actual).rejects.toBe(exception);
    });
  });
});
