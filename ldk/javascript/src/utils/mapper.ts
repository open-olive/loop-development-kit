import { HTTPResponse, Socket } from '../network';

export const mapToUint8Array = (data: ArrayBuffer): Uint8Array => new Uint8Array(data);

export const mapToHttpResponse = (response: OliveHelps.HTTPResponse): HTTPResponse => ({
  statusCode: response.statusCode,
  body: new Uint8Array(response.body),
  headers: response.headers,
});

const mapToBinaryMessage = (message: Uint8Array | string) =>
  typeof message === 'string' ? [...new TextEncoder().encode(message)] : [...message];

const mapToResponseMessage = (messageType: OliveHelps.MessageType, buffer: ArrayBuffer) => {
  const data = mapToUint8Array(buffer);
  return messageType === OliveHelps.MessageType.text ? new TextDecoder().decode(data) : data;
};

const mapToMessageType = (message: Uint8Array | string) =>
  typeof message === 'string' ? OliveHelps.MessageType.text : OliveHelps.MessageType.binary;

export const mapToSocket = (socket: OliveHelps.Socket): Socket => ({
  writeMessage: (message: string | Uint8Array, callback) => {
    socket.writeMessage(mapToMessageType(message), mapToBinaryMessage(message), callback);
  },
  close: () => socket.close,
  listenMessage: (cb: (error: Error | undefined, message: Uint8Array | string) => void) =>
    new Promise((resolve, reject) => {
      try {
        socket.listenMessage(
          (error: Error | undefined, messageType: OliveHelps.MessageType, data: ArrayBuffer) => {
            cb(error, mapToResponseMessage(messageType, data));
          },
          (obj) => resolve(obj),
        );
      } catch (e) {
        reject(e);
      }
    }),
});
