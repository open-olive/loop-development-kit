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
  httpRequest(req: HTTPRequest): Promise<HTTPResponse>;
}

function httpRequest(req: HTTPRequest): Promise<HTTPResponse> {
  return promisifyWithParam(req, oliveHelps.network.httpRequest);
}

export const network: Network = {
  httpRequest,
};
