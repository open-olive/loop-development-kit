import { Cancellable } from '../cancellable';

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
