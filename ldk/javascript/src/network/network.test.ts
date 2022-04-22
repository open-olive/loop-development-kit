import { TextEncoder, TextDecoder } from 'text-encoding-shim';
import { mocked } from 'ts-jest/utils';
import { isVoidExpression } from 'typescript';
import { stripBom } from './utils';
import * as network from '.';
import * as mapper from '../utils/mapper';

jest.mock('text-encoding-shim');
jest.mock('./utils');

describe('Network', () => {
  beforeEach(() => {
    oliveHelps.network = {
      httpRequest: jest.fn(),
      webSocketConnect: jest.fn(),
    };
    TextEncoder.prototype.encode = jest.fn();
    TextDecoder.prototype.decode = jest.fn();
    const stripBomMock = stripBom as jest.MockedFunction<typeof stripBom>;
    stripBomMock.mockImplementation((value: Uint8Array) => value);
  });

  describe('httpRequest', () => {
    it('returns a promise result with expected HTTPResponse', () => {
      const request: network.HTTPRequest = {
        body: new Uint8Array([44, 65]),
        headers: { x: ['x'] },
        method: 'GET',
        url: 'some url',
      };
      const expectedResponse: network.HTTPResponse = {
        statusCode: 200,
        body: new Uint8Array([102, 75]),
        headers: { x: ['x'] },
      };
      const oliveHelpsResponse: Network.HTTPResponse = {
        statusCode: expectedResponse.statusCode,
        body: expectedResponse.body.buffer,
        headers: expectedResponse.headers,
      };
      mocked(oliveHelps.network.httpRequest).mockImplementation((_request, callback) => {
        callback(undefined, oliveHelpsResponse);
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
      const text = 'some//text@@';
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

      const actual = network.encode('text');

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('decode', () => {
    it('returns a promise result with expected decoded string', () => {
      const encodedValue: Uint8Array = new Uint8Array(2);
      const expected = 'expected text';
      TextDecoder.prototype.decode.mockReturnValue(expected);

      const actual = network.decode(encodedValue);

      expect(stripBom).toHaveBeenCalledWith(encodedValue);
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

    describe('webSocket', () => {
      it('passed in callback function to olive helps', () => {
        const socketConfiguration: network.SocketConfiguration = {
          url: 'url',
        };

        network.webSocketConnect(socketConfiguration);

        expect(oliveHelps.network.webSocketConnect).toHaveBeenCalledWith(
          socketConfiguration,
          expect.any(Function),
        );
      });

      it('throws exception when passing in callback function', () => {
        const exception = 'Exception';
        mocked(oliveHelps.network.webSocketConnect).mockImplementation(() => {
          throw exception;
        });

        const actual = network.webSocketConnect({
          url: 'url',
        });

        return expect(actual).rejects.toBe(exception);
      });
    });
  });

  describe('webSocketConnect', () => {
    it('returns Network.Socket', async () => {
      const socket: Network.Socket = {
        writeMessage: () => isVoidExpression,
        close: () => isVoidExpression,
        listenMessage: () => isVoidExpression,
        onCloseHandler: () => isVoidExpression,
        onPongHandler: () => isVoidExpression,
        ping: () => isVoidExpression,
      };
      mocked(oliveHelps.network.webSocketConnect).mockImplementation((_socketConfig, callback) => {
        callback(undefined, socket);
      });

      const s = await network.webSocketConnect({} as Network.SocketConfiguration);

      expect(s.writeMessage).toBeDefined();
      expect(s.close).toBeDefined();
      expect(s.setCloseHandler).toBeDefined();
      expect(s.ping).toBeDefined();
      expect(s.setPongHandler).toBeDefined();
      expect(s.setMessageHandler).toBeDefined();
    });

    it('writeMessage calls callback with no error', async () => {
      const socket: Network.Socket = {
        writeMessage: (_messageType, _data, callback) => {
          callback(undefined);
        },
        close: () => isVoidExpression,
        listenMessage: () => isVoidExpression,
        onCloseHandler: () => isVoidExpression,
        onPongHandler: () => isVoidExpression,
        ping: () => isVoidExpression,
      };
      mocked(oliveHelps.network.webSocketConnect).mockImplementation((_socketConfig, callback) => {
        callback(undefined, socket);
      });

      const mock = jest.spyOn(mapper, 'mapToBinaryData');
      mock.mockReturnValue([]);

      const s = await network.webSocketConnect({} as Network.SocketConfiguration);

      try {
        await s.writeMessage('test');
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });

    it('writeMessage calls callback with error', async () => {
      const e = new Error('failed');
      const socket: Network.Socket = {
        writeMessage: (_messageType, _data, callback) => {
          callback(e);
        },
        close: () => isVoidExpression,
        listenMessage: () => isVoidExpression,
        onCloseHandler: () => isVoidExpression,
        onPongHandler: () => isVoidExpression,
        ping: () => isVoidExpression,
      };
      mocked(oliveHelps.network.webSocketConnect).mockImplementation((_socketConfig, callback) => {
        callback(undefined, socket);
      });

      const mock = jest.spyOn(mapper, 'mapToBinaryData');
      mock.mockReturnValue([]);

      const s = await network.webSocketConnect({} as Network.SocketConfiguration);

      try {
        await s.writeMessage('test');
      } catch (err: Error | unknown) {
        expect(err).toStrictEqual(e);
      }
    });

    it('close calls callback with error', async () => {
      const e = new Error('failed');
      const socket: Network.Socket = {
        writeMessage: () => isVoidExpression,
        close: (callback) => {
          callback(e);
        },
        listenMessage: () => isVoidExpression,
        onCloseHandler: () => isVoidExpression,
        onPongHandler: () => isVoidExpression,
        ping: () => isVoidExpression,
      };
      mocked(oliveHelps.network.webSocketConnect).mockImplementation((_socketConfig, callback) => {
        callback(undefined, socket);
      });

      const s = await network.webSocketConnect({} as Network.SocketConfiguration);

      try {
        await s.close();
      } catch (err: Error | unknown) {
        expect(err).toStrictEqual(e);
      }
    });

    it('setMessageHandler calls handler functions', async () => {
      const socket: Network.Socket = {
        writeMessage: () => isVoidExpression,
        close: () => isVoidExpression,
        listenMessage: (callback) => {
          callback(undefined, 1, Buffer.from('test'));
        },
        onCloseHandler: () => isVoidExpression,
        onPongHandler: () => isVoidExpression,
        ping: () => isVoidExpression,
      };
      mocked(oliveHelps.network.webSocketConnect).mockImplementation((_socketConfig, callback) => {
        callback(undefined, socket);
      });

      const s = await network.webSocketConnect({} as Network.SocketConfiguration);

      const handler = jest.fn();
      s.setMessageHandler(handler);

      expect(handler).toBeCalled();
    });

    it('setCloseHandler calls handler functions', async () => {
      const socket: Network.Socket = {
        writeMessage: () => isVoidExpression,
        close: () => isVoidExpression,
        listenMessage: () => isVoidExpression,
        onCloseHandler: (callback) => {
          callback(undefined, 1, 'closed');
        },
        onPongHandler: () => isVoidExpression,
        ping: () => isVoidExpression,
      };
      mocked(oliveHelps.network.webSocketConnect).mockImplementation((_socketConfig, callback) => {
        callback(undefined, socket);
      });

      const s = await network.webSocketConnect({} as Network.SocketConfiguration);

      const handler = jest.fn();
      s.setCloseHandler(handler);

      expect(handler).toBeCalled();
    });

    it('setPongHandler calls handler functions', async () => {
      const socket: Network.Socket = {
        writeMessage: () => isVoidExpression,
        close: () => isVoidExpression,
        listenMessage: () => isVoidExpression,
        onCloseHandler: () => isVoidExpression,
        onPongHandler: (callback) => {
          callback(undefined, 'pong');
        },
        ping: () => isVoidExpression,
      };
      mocked(oliveHelps.network.webSocketConnect).mockImplementation((_socketConfig, callback) => {
        callback(undefined, socket);
      });

      const s = await network.webSocketConnect({} as Network.SocketConfiguration);

      const handler = jest.fn();
      s.setPongHandler(handler);

      expect(handler).toBeCalled();
    });

    it('ping calls callback with no error', async () => {
      const socket: Network.Socket = {
        writeMessage: () => isVoidExpression,
        close: () => isVoidExpression,
        listenMessage: () => isVoidExpression,
        onCloseHandler: () => isVoidExpression,
        onPongHandler: () => isVoidExpression,
        ping: (callback) => {
          callback(undefined);
        },
      };
      mocked(oliveHelps.network.webSocketConnect).mockImplementation((_socketConfig, callback) => {
        callback(undefined, socket);
      });

      const mock = jest.spyOn(mapper, 'mapToBinaryData');
      mock.mockReturnValue([]);

      const s = await network.webSocketConnect({} as Network.SocketConfiguration);

      try {
        await s.ping();
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });

    it('ping calls callback with error', async () => {
      const e = new Error('failed');
      const socket: Network.Socket = {
        writeMessage: () => isVoidExpression,
        close: () => isVoidExpression,
        listenMessage: () => isVoidExpression,
        onCloseHandler: () => isVoidExpression,
        onPongHandler: () => isVoidExpression,
        ping: (callback) => {
          callback(e);
        },
      };
      mocked(oliveHelps.network.webSocketConnect).mockImplementation((_socketConfig, callback) => {
        callback(undefined, socket);
      });

      const s = await network.webSocketConnect({} as Network.SocketConfiguration);

      try {
        await s.ping();
      } catch (err: Error | unknown) {
        expect(err).toStrictEqual(e);
      }
    });

    it('returns error on webSocketConnect error', async () => {
      const e = new Error('Failed');
      mocked(oliveHelps.network.webSocketConnect).mockImplementation(() => {
        throw e;
      });

      try {
        await network.webSocketConnect({} as Network.SocketConfiguration);
      } catch (err: Error | unknown) {
        expect(err).toStrictEqual(e);
      }
    });
  });
});
