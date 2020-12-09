import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/keyboard_grpc_pb';
import * as Messages from '../grpc/keyboard_pb';
import { ConnInfo } from '../grpc/broker_pb';
import KeyboardClient from './keyboardClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import { TransformingStream } from './transformingStream';
import {
  captureMockArgument,
  createCallbackHandler,
  createEmptyStream,
  createStreamingHandler,
  identityCallback,
} from '../jest.helpers';
import { KeyboardHotkey } from '../grpc/keyboard_pb';

jest.mock('../grpc/keyboard_grpc_pb');

const hostClient = mocked(Services.KeyboardClient);

const logger = new Logger('test-logger');

describe('KeyboardClient', () => {
  let subject: KeyboardClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let streamHotKeyMock: jest.Mock;
  let streamTextMock: jest.Mock;
  let streamCharMock: jest.Mock;
  let streamScanCodeMock: jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    subject = new KeyboardClient();
    connInfo = {
      address: 'a',
      serviceId: 1,
      network: 'n',
    };
    session = {
      loopid: 'LOOP_ID',
      token: 'TOKEN',
    };
    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());

    hostClient.mockImplementation(() => {
      return {
        waitForReady: waitForReadyMock,
        keyboardHotkeyStream: streamHotKeyMock,
        keyboardTextStream: streamTextMock,
        keyboardCharacterStream: streamCharMock,
        keyboardScancodeStream: streamScanCodeMock,
      } as any;
    });
  });

  describe('#connect', () => {
    it('instantiates a new host client and waits for it to be ready', async () => {
      await expect(
        subject.connect(connInfo, session, logger),
      ).resolves.toBeUndefined();
    });
  });

  describe('#streamHotKey', () => {
    const key = 'a';
    const modifiers = { ctrlL: true };
    const convertedModifiers = 8;

    beforeEach(async () => {
      streamHotKeyMock = jest.fn().mockImplementation(createStreamingHandler());
      await subject.connect(connInfo, session, logger);
      await expect(
        subject.streamHotKey({ key, modifiers }, identityCallback),
      ).toBeInstanceOf(TransformingStream);
    });

    it('should have configured the request with the right key and modifiers', () => {
      const hotKey = new KeyboardHotkey()
        .setKey(key)
        .setModifiers(convertedModifiers);
      const request = captureMockArgument<Messages.KeyboardHotkeyStreamRequest>(
        streamHotKeyMock,
      );
      expect(request.getHotkey()).toStrictEqual(hotKey);
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<Messages.KeyboardHotkeyStreamRequest>(
        streamHotKeyMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamText', () => {
    let streamCallback: jest.Mock;
    const text = 'hello';

    beforeEach(async () => {
      const response = new Messages.KeyboardTextStreamResponse().setText(text);
      const stream = createEmptyStream();

      streamCallback = jest.fn().mockImplementation(identityCallback);
      streamTextMock = jest
        .fn()
        .mockImplementation(createStreamingHandler(stream));
      await subject.connect(connInfo, session, logger);
      await expect(subject.streamText(streamCallback)).toBeInstanceOf(
        TransformingStream,
      );

      stream.emit('data', response);
    });

    it('should stream the text back to the callback', () => {
      expect(streamCallback).toHaveBeenCalledWith(null, text);
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<Messages.KeyboardTextStreamRequest>(
        streamTextMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamChar', () => {
    beforeEach(async () => {
      streamCharMock = jest.fn().mockImplementation(createStreamingHandler());
      await subject.connect(connInfo, session, logger);
      await expect(subject.streamChar(identityCallback)).toBeInstanceOf(
        TransformingStream,
      );
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<
        Messages.KeyboardCharacterStreamRequest
      >(streamCharMock);
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamScanCode', () => {
    beforeEach(async () => {
      streamScanCodeMock = jest
        .fn()
        .mockImplementation(createStreamingHandler());
      await subject.connect(connInfo, session, logger);
      await expect(subject.streamScanCode(identityCallback)).toBeInstanceOf(
        TransformingStream,
      );
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<
        Messages.KeyboardScancodeStreamRequest
      >(streamScanCodeMock);
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
