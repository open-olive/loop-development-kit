import { HTTPResponse, Socket } from '../network';
import { Cancellable } from '../cancellable';

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

const cancellable = (obj: OliveHelps.Cancellable) => ({
  cancel: obj.cancel(),
});

export const mapToSocket = (socket: OliveHelps.Socket): Socket => ({
  writeMessage: (message: string | Uint8Array, callback) => {
    socket.writeMessage(mapToMessageType(message), mapToBinaryMessage(message), callback);
  },
  close: () => socket.close,
  listenMessage: (cb: (error: Error | undefined, message: Uint8Array | string) => void) => {
    socket.listenMessage(
      (error: Error | undefined, messageType: OliveHelps.MessageType, data: ArrayBuffer) => {
        cb(error, mapToResponseMessage(messageType, data));
      },
      (obj: Cancellable) => {
        return cancellable(obj);
      }
    );
  },
});

// callback: socket.listenMessage(
//   (error: Error | undefined, messageType: OliveHelps.MessageType, data: ArrayBuffer) => {
//     cb(error, mapToResponseMessage(messageType, data));
//   }),
//   returnCb: cancellable,
// })

// listenMessage: (
//   callback: (error: Error | undefined, message: string | Uint8Array) => void,
// ) => Promise<Cancellable>;

// connect: (socketConfiguration: SocketConfiguration, callback) => {
//   socket.connect(
//     {
//       options: socketConfig.options,
//       headers: socketConfig.headers,
//       onTextMessage: socketConfig.onTextMessage,
//       onBinaryMessage: mapOnBinaryMessage(socketConfig),
//       onConnectError: socketConfig.onConnectError,
//       onDisconnected: socketConfig.onConnectError,
//     },
//     callback,
//   );
// },
// sendText: socket.sendText,
// sendBinary: (data: Uint8Array) => {
//   socket.sendBinary([...data]);
// },

// writeMessage(message: Uint8Array | string, callback: CallbackError): void;
// close(callback: CallbackError): void;
// listenMessage: (
//   callback: (error: Error | undefined, message: Uint8Array | string) => void,
