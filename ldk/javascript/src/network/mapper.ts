import { TextDecoder } from 'text-encoding-shim';
import { HTTPResponse, Socket, HTTPRequest } from './index';
import { mapToUint8Array, mapToBinaryData } from '../utils/mapper';

export const mapToHttpResponse = (response: OliveHelps.HTTPResponse): HTTPResponse => ({
  statusCode: response.statusCode,
  body: new Uint8Array(response.body),
  headers: response.headers,
});

export const mapToHttpRequest = (request: HTTPRequest): OliveHelps.HTTPRequest => ({
  body: request.body ? mapToBinaryData(request.body) : undefined,
  headers: request.headers,
  method: request.method,
  url: request.url,
  timeoutMs: request.timeoutMs,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCaughtError = (reject: (reason?: any) => void, error: Error, type: string): void => {
  console.error(`Received error calling ${type}: ${error.message}`);
  reject(error);
};

enum MessageType {
  text = 1,
  binary = 2,
}

const mapToResponseMessage = (
  messageType: MessageType,
  buffer: ArrayBuffer,
): string | Uint8Array => {
  const data = mapToUint8Array(buffer);
  return messageType === MessageType.text ? new TextDecoder().decode(data) : data;
};

const mapToMessageType = (message: string | Uint8Array): MessageType =>
  typeof message === 'string' ? MessageType.text : MessageType.binary;

export const mapToSocket = (socket: OliveHelps.Socket): Socket => ({
  writeMessage: (message: string | Uint8Array) =>
    new Promise((resolve, reject) => {
      try {
        socket.writeMessage(
          mapToMessageType(message),
          mapToBinaryData(message),
          (error: Error | undefined) => {
            if (error) {
              console.error(`Received error on result: ${error.message}`);
              reject(error);
              return;
            }
            resolve();
          },
        );
      } catch (e) {
        handleCaughtError(reject, e, 'writeMessage');
      }
    }),
  close: () =>
    new Promise((resolve, reject) => {
      try {
        socket.close((error: Error | undefined) => {
          if (error) {
            console.error(`Received error on result: ${error.message}`);
            reject(error);
            return;
          }
          resolve();
        });
      } catch (e) {
        handleCaughtError(reject, e, 'close');
      }
    }),
  setMessageHandler: (handler: (error: Error | undefined, message: Uint8Array | string) => void) =>
    new Promise((resolve, reject) => {
      try {
        socket.listenMessage(
          (error: Error | undefined, messageType: MessageType, buffer: ArrayBuffer) => {
            handler(error, mapToResponseMessage(messageType, buffer));
          },
          (obj) => {
            resolve(obj);
          },
        );
      } catch (e) {
        handleCaughtError(reject, e, 'listenMessage');
      }
    }),
  setCloseHandler: (handler) =>
    new Promise((resolve, reject) => {
      try {
        socket.onCloseHandler(handler);
        resolve();
      } catch (e) {
        handleCaughtError(reject, e, 'onCloseHandler');
      }
    }),
});
