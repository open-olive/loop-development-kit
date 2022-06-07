declare namespace Network {
  interface Aptitude {
    httpRequest: Common.ReadableWithParam<HTTPRequest, HTTPResponse>;
    webSocketConnect: Common.ReadableWithParam<SocketConfiguration, Socket>;
  }

  interface SocketConfiguration {
    url: string;
    headers?: Record<string, string[]>;
    useCompression?: boolean;
    subprotocols?: Array<string>;
  }

  type MessageTypeText = 1;
  type MessageTypeBinary = 2;
  type MessageType = MessageTypeText | MessageTypeBinary;

  interface Socket {
    writeMessage(
      messageType: MessageType,
      data: Array<number>,
      callback: (error: Error | undefined) => void,
    ): void;

    close(callback: (error: Error | undefined) => void): void;

    listenMessage: (
      callback: (error: Error | undefined, messageType: MessageType, data: ArrayBuffer) => void,
      returnCb: Common.ReturnCallback,
    ) => void;

    onCloseHandler(callback: (error: Error | undefined, code: number, text: string) => void): void;

    onPongHandler(callback: (error: Error | undefined, msg: string) => void): void;
    ping(callback: (error: Error | undefined) => void): void;
  }

  interface HTTPRequest {
    body?: Array<number>;
    headers?: Record<string, string[]>;
    method: string;
    url: string;
    timeoutMs?: number;
  }

  interface HTTPResponse {
    statusCode: number;
    body: ArrayBuffer;
    headers: Record<string, string[]>;
  }
}
