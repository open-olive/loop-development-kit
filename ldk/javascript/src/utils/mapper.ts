import { HTTPResponse, Socket, SocketConfig } from '../network';

export const mapToUint8Array = (data: ArrayBuffer): Uint8Array => new Uint8Array(data);

export const mapToHttpResponse = (response: OliveHelps.HTTPResponse): HTTPResponse => ({
  statusCode: response.statusCode,
  body: new Uint8Array(response.body),
  headers: response.headers,
});

const mapOnBinaryMessage = (socketConfig: SocketConfig) => {
  if (socketConfig.onBinaryMessage === undefined) {
    return undefined;
  }
  return (data: ArrayBuffer) => {
    if (socketConfig.onBinaryMessage) {
      socketConfig.onBinaryMessage(mapToUint8Array(data));
    }
  };
};

export const mapToSocket = (socket: OliveHelps.Socket): Socket => ({
  connect: (socketConfig: SocketConfig, callback) => {
    socket.connect(
      {
        options: socketConfig.options,
        headers: socketConfig.headers,
        onTextMessage: socketConfig.onTextMessage,
        onBinaryMessage: mapOnBinaryMessage(socketConfig),
        onConnectError: socketConfig.onConnectError,
        onDisconnected: socketConfig.onConnectError,
      },
      callback,
    );
  },
  sendText: socket.sendText,
  sendBinary: (data: Uint8Array) => {
    socket.sendBinary([...data]);
  },
  close: socket.close,
});
