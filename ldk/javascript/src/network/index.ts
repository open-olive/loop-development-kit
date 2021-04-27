import { TextEncoder, TextDecoder } from 'text-encoding-shim';

/**
 * The HTTP Request configuration.
 */
import { promisifyWithParam } from '../promisify';

export interface HTTPRequest {
  body: Uint8Array;
  headers: Record<string, string[]>;
  method: string;
  url: string;
}

/**
 * The HTTP Response data.
 */
export interface HTTPResponse {
  statusCode: number;
  /**
   * The HTTP response as a byte array. To decode into a UTF-8 string you can:
   * ```
   * import * as util from 'util';
   * ...
   * var string = new TextDecoder("utf-8").decode(uint8array);
   * ```
   */
  data: Uint8Array;
  headers: Record<string, string[]>;
}

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
}

export function httpRequest(req: HTTPRequest): Promise<HTTPResponse> {
  return promisifyWithParam(req, oliveHelps.network.httpRequest);
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
      resolve(new TextDecoder().decode(encodedValue));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}
