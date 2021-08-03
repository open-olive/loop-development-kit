import { TextEncoder, TextDecoder } from 'text-encoding-shim';
import * as mapper from './mapper';
import { promisifyMappedBothWithParams, promisifyMappedWithParam } from '../promisify';
import { stripBom } from './utils';
import { HTTPRequest, HTTPResponse, Socket, SocketConfiguration } from './types';

export * from './types';

/**
 * The Network Aptitude provides access to network calls through Olive Helps
 */
export interface Network {
  /**
   * Generates a HTTP request with the provided configuration.
   *
   * @param request - The HTTP request to make.
   * @returns A Promise resolving with the response.
   */
  httpRequest(request: HTTPRequest): Promise<HTTPResponse>;

  /**
   * Encoding provided text
   *
   * @param text - Specified text to encode
   * @returns A promise resolving with the encoded Uint8Array
   */
  encode(text: string, encoding: string): Promise<Uint8Array>;

  /**
   * Decoding provided value
   *
   * @param encodedValue - Specified encoded value to decode
   * @returns A promise resolving with the decoded text
   */
  decode(encodedValue: Uint8Array, encoding: string): Promise<string>;

  /**
   *  Connects to a specified websocket
   *
   * @param socketConfiguration A configuration object defines websocket
   * @returns A promise with Socket
   */
  webSocketConnect(socketConfiguration: SocketConfiguration): Promise<Socket>;
}

export function httpRequest(request: HTTPRequest): Promise<HTTPResponse> {
  return promisifyMappedBothWithParams(
    request,
    mapper.mapToHttpRequest,
    mapper.mapToHttpResponse,
    oliveHelps.network.httpRequest,
  );
}

export function encode(text: string): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    try {
      resolve(new TextEncoder().encode(text));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export function decode(encodedValue: Uint8Array): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      resolve(new TextDecoder().decode(stripBom(encodedValue)));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export function webSocketConnect(socketConfiguration: SocketConfiguration): Promise<Socket> {
  return promisifyMappedWithParam(
    socketConfiguration,
    mapper.mapToSocket,
    oliveHelps.network.webSocketConnect,
  );
}
