import { TextEncoder, TextDecoder } from 'text-encoding-shim';
import * as mapper from '../utils/mapper';
import { Cancellable } from '../cancellable';
import { promisifyMappedWithParam } from '../promisify';

/**
 * The HTTP Request configuration.
 */
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

/**
 * a simplified representation of a callback which take error
 */
export type CallbackError = (error: Error | undefined) => void;

/**
 * configuration object to configure a websocket handshake
 */
export interface SocketConfiguration {
  /**
   * websocket server endpoint url: '{schema}://{host}:{port}' - schema could be ws or wss
   */
  url: string;
  /**
   * collection of the handshake headers
   */
  headers?: Record<string, string[]>;
  /**
   * specifies if compression is used
   */
  useCompression?: boolean;
  /**
   * specifies the client's requested subprotocols.
   */
  subprotocols?: Array<string>;
}

/**
 * Object to communicate with the websocket
 */
export interface Socket {
  /**
   * writes message to a websocket
   * @param message text or data message
   * @param callback function to call if error occured
   */
  writeMessage(message: string | Uint8Array, callback: CallbackError): Promise<void>;
  /**
   * closes websocket
   * @param callback function to call if error occured
   */
  close(callback: CallbackError): Promise<void>;
  /**
   * allows to listen for a websocket message (there should be only 1 listen message callback per socket to allow messages being fully received)
   * @param callback receives text or data message from websocket and error if occures
   */
  listenMessage: (
    callback: (error: Error | undefined, message: string | Uint8Array) => void,
  ) => Promise<Cancellable>;
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
   * @param socketConfiguration a configuration object defines websocket
   * @returns a promise with Socket
   */
  webSocketConnect(socketConfiguration: SocketConfiguration): Promise<Socket>;
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

export function webSocketConnect(socketConfiguration: SocketConfiguration): Promise<Socket> {
  return promisifyMappedWithParam(
    socketConfiguration,
    mapper.mapToSocket,
    oliveHelps.network.webSocketConnect,
  );
}
