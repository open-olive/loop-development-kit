import { TextEncoder, TextDecoder } from 'text-encoding-shim';
import { mocked } from 'ts-jest/utils';
import * as network from '.';

jest.mock('text-encoding-shim');

describe('Network', () => {
  beforeEach(() => {
    oliveHelps.network = {
      httpRequest: jest.fn(),
    };
    TextEncoder.prototype.encode = jest.fn();
    TextDecoder.prototype.decode = jest.fn();
  });

  describe('httpRequest', () => {
    it('returns a promise result with expected httpresponse', () => {
      const request: network.HTTPRequest = {
        body: new Uint8Array([44, 65]),
        headers: { x: ['x'] },
        method: 'GET',
        url: 'some url',
      };
      const expectedResponse: network.HTTPResponse = {
        statusCode: 200,
        data: new Uint8Array([102, 75]),
        headers: { x: ['x'] },
      };
      const oliveHelpsResponse: OliveHelps.HTTPResponse = {
        statusCode: expectedResponse.statusCode,
        data: expectedResponse.data.buffer,
        headers: expectedResponse.headers,
      };
      mocked(oliveHelps.network.httpRequest).mockImplementation((_request, callback) => {
        callback(oliveHelpsResponse);
      });

      const actual = network.httpRequest(request);

      return expect(actual).resolves.toEqual(expectedResponse);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      const request: network.HTTPRequest = {
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

  describe('encode', () => {
    it('returns a promise result with expected encoded value', () => {
      const text = "some//text@@";
      const expected: Uint8Array = new Uint8Array(2);
      TextEncoder.prototype.encode.mockReturnValue(expected);
    
      const actual = network.encode(text);

      expect(TextEncoder.prototype.encode).toBeCalledWith(text);
      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(TextEncoder.prototype.encode).mockImplementation(() => {
        throw exception;
      });
      
      const actual = network.encode("text");

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('decode', () => {
    it('returns a promise result with expected decoded string', () => {
      const encodedValue: Uint8Array = new Uint8Array(2);
      const expected = "expected text";
      TextDecoder.prototype.decode.mockReturnValue(expected);
    
      const actual = network.decode(encodedValue);

      expect(TextDecoder.prototype.decode).toBeCalledWith(encodedValue);
      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(TextDecoder.prototype.decode).mockImplementation(() => {
        throw exception;
      });
      
      const actual = network.decode(new Uint8Array(2));

      return expect(actual).rejects.toBe(exception);
    });
  });
});
