import { TextEncoder, TextDecoder } from 'text-encoding-shim';
import * as mapper from './mapper';
import { Cancellable } from '../cancellable';
import { promisifyMappedBothWithParams, promisifyMappedWithParam } from '../promisify';

/**
 * The HTTP Request configuration.
 */
export interface HTTPRequest {
  /**
   * Request Body to send to the provided url
   */
  body?: string | Uint8Array;
  /**
   * Collection of request headers
   */
  headers?: Record<string, string[]>;
  /**
   * Request method type
   */
  method: string;
  /**
   * Endpoint url
   */
  url: string;
    /**
   * HttpRequest timeout 
   */
  timeoutMs?: number;
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
 * A simplified representation of a callback which take error
 */
export type CallbackError = (error: Error | undefined) => void;

/**
 * Configuration object to configure a websocket handshake
 */
export interface SocketConfiguration {
  /**
   * Websocket server endpoint url: '{schema}://{host}:{port}' - schema should be wss
   */
  url: string;
  /**
   * Collection of the handshake headers
   */
  headers?: Record<string, string[]>;
  /**
   * Specifies if compression is used
   */
  useCompression?: boolean;
  /**
   * Specifies the client's requested subprotocols
   */
  subprotocols?: Array<string>;
}

/**
 * Object to communicate with the websocket
 */
export interface Socket {
  /**
   * Writes message to a websocket
   * @param message Text or data message
   */
  writeMessage(message: string | Uint8Array): Promise<void>;
  /**
   * Closes websocket
   */
  close(): Promise<void>;
  /**
   * Allows to listen for a websocket message (there must be only one listener registered per socket for messages to be fully received)
   * @param handler Receives text or data message from websocket and error if occurs (error could be returned if reading from the closed connection)
   */
  setMessageHandler: (
    handler: (error: Error | undefined, message: string | Uint8Array) => void,
  ) => Promise<Cancellable>;
  /**
   * Allows to provide handler when websocket closing
   * @param handler Receives code status and text received from the peer
   */
  setCloseHandler(
    handler: (error: Error | undefined, code: number, text: string) => void,
  ): Promise<void>;
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
