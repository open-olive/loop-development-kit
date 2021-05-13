import { TextEncoder, TextDecoder } from 'text-encoding-shim';
import * as mapper from '../utils/mapper';

/**
 * The HTTP Request configuration.
 */
import { promisifyMappedWithParam } from '../promisify';

export interface HTTPRequest {
  body?: Uint8Array;
  headers?: Record<string, string[]>;
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
   let decodedText = network.decode(data);
   * ```
   */
  body: Uint8Array;
  headers: Record<string, string[]>;
}

export interface ConnectionOptions {
  useCompression?: boolean;
  useSSL?: boolean;
  subprotocols?: Array<string>;
}

export type CallbackError = (error: Error | undefined) => void;

export interface SocketConfig {
  options?: ConnectionOptions;
  headers?: Record<string, string[]>;
  onTextMessage?: (message: string) => void;
  onBinaryMessage?: (data: Uint8Array) => void;
  onConnectError?: CallbackError;
  onDisconnected?: CallbackError;
}

export interface Socket {
  connect(socketConfig: SocketConfig, callback: CallbackError): void;
  sendText(text: string): void;
  sendBinary(data: Uint8Array): void;
  close(): void;
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

  /**
   *
   * @param url websocket server endpoint url: '{schema}://{host}:{port}' - schema could be ws or wss
   * @returns a promise with sendable function
   */
  webSocket(url: string): Promise<Socket>;
}

export function httpRequest(request: HTTPRequest): Promise<HTTPResponse> {
  const bodyData = request.body ? [...request.body] : undefined;
  return promisifyMappedWithParam(
    {
      body: bodyData,
      headers: request.headers,
      method: request.method,
      url: request.url,
    },
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
      resolve(new TextDecoder().decode(encodedValue));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export function webSocket(url: string): Promise<Socket> {
  return promisifyMappedWithParam(url, mapper.mapToSocket, oliveHelps.network.webSocket);
}
