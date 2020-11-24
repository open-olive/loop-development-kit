import { KeyboardClient as KeyboardGRPCClient } from '../grpc/keyboard_grpc_pb';
import messages from '../grpc/keyboard_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { StreamTransformer, TransformingStream } from './transformingStream';
import { StoppableStream, StreamListener } from './stoppables';
import {
  HotKeyEvent,
  HotKeyRequest,
  KeyboardService,
  KeyboardModifiers,
  ScanCodeEvent,
  TextStream,
} from './keyboardService';

/**
 * @internal
 * @param modifiers - The modifiers to generate flags for.
 */
const generateModifierFlag = (
  modifiers: Partial<KeyboardModifiers>,
): number => {
  return (
    /* eslint-disable no-bitwise */
    (modifiers?.altL ? 1 << 0 : 0) +
    (modifiers?.altR ? 1 << 1 : 0) +
    (modifiers?.alt ? 1 << 2 : 0) +
    (modifiers?.ctrlL ? 1 << 3 : 0) +
    (modifiers?.ctrlR ? 1 << 4 : 0) +
    (modifiers?.ctrl ? 1 << 5 : 0) +
    (modifiers?.metaL ? 1 << 6 : 0) +
    (modifiers?.metaR ? 1 << 7 : 0) +
    (modifiers?.meta ? 1 << 8 : 0) +
    (modifiers?.shiftL ? 1 << 9 : 0) +
    (modifiers?.shiftR ? 1 << 10 : 0) +
    (modifiers?.shift ? 1 << 10 : 0)
    /* eslint-enable no-bitwise */
  );
};

/**
 * @internal
 * @param message - The message to transform.
 */
const transformTextStream: StreamTransformer<
  messages.KeyboardTextStreamResponse,
  TextStream
> = (message) => {
  return {
    text: message.getText(),
  };
};

/**
 * @internal
 * @param message - The message to transform.
 */
const transformScanCodeStream: StreamTransformer<
  messages.KeyboardScancodeStreamResponse,
  ScanCodeEvent
> = (message) => {
  return {
    scanCode: message.getScancode(),
    direction: message.getPressed() ? 'down' : 'up',
  };
};

/**
 * @internal
 * @param keyRequest - The key request to generate a stream for.
 */
function generateHotkeyStreamRequest(
  keyRequest: HotKeyRequest,
): messages.KeyboardHotkeyStreamRequest {
  const request = new messages.KeyboardHotkey();
  request.setKey(keyRequest.key);
  request.setModifiers(generateModifierFlag(keyRequest.modifiers));
  const message = new messages.KeyboardHotkeyStreamRequest();
  message.setHotkey(request);
  return message;
}

/**
 * @internal
 * @param message - The message to transform.
 */
const transformHotKeyEvent: StreamTransformer<
  messages.KeyboardHotkeyStreamResponse,
  HotKeyEvent
> = (message) => {
  return {
    direction: message.getScanned() ? 'down' : 'up',
  };
};

/**
 * @internal
 */
export default class KeyboardClient
  extends BaseClient<KeyboardGRPCClient>
  implements KeyboardService {
  streamHotKey(
    hotKeys: HotKeyRequest,
    listener: StreamListener<HotKeyEvent>,
  ): StoppableStream<HotKeyEvent> {
    const message = generateHotkeyStreamRequest(hotKeys);
    return new TransformingStream(
      this.client.keyboardHotkeyStream(message),
      transformHotKeyEvent,
      listener,
    );
  }

  streamText(): StoppableStream<string> {
    return new TransformingStream(
      this.client.keyboardTextStream(
        new messages.KeyboardTextStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      (response) => response.getText(),
    );
  }

  streamChar(
    listener: StreamListener<TextStream>,
  ): StoppableStream<TextStream> {
    return new TransformingStream(
      this.client.keyboardCharacterStream(
        new messages.KeyboardCharacterStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      transformTextStream,
      listener,
    );
  }

  streamScanCode(
    listener: StreamListener<ScanCodeEvent>,
  ): StoppableStream<ScanCodeEvent> {
    return new TransformingStream(
      this.client.keyboardScancodeStream(
        new messages.KeyboardScancodeStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      transformScanCodeStream,
      listener,
    );
  }

  protected generateClient(): GRPCClientConstructor<KeyboardGRPCClient> {
    return KeyboardGRPCClient;
  }
}
