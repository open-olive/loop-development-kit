import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/keyboard_grpc_pb';
import * as Messages from '../grpc/keyboard_pb';
import { ConnInfo } from '../grpc/broker_pb';
import KeyboardClient from './keyboardClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import {
  captureMockArgument,
  createEmptyStream,
  createStreamingHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../test.helpers';
import { KeyboardHotkey } from '../grpc/keyboard_pb';

jest.mock('../grpc/keyboard_grpc_pb');

const MockClientClass = mocked(Services.KeyboardClient);

const logger = new Logger('test-logger');

describe('KeyboardClient', () => {
  let subject: KeyboardClient;
  let mockGRPCClient: jest.Mocked<Services.KeyboardClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new KeyboardClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.KeyboardClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#streamHotKey', () => {
    const key = 'a';
    const modifiers = { ctrlL: true };
    const convertedModifiers = 8;
    let sentRequest: Messages.KeyboardHotkeyStreamRequest;

    beforeEach(async () => {
      mockGRPCClient.keyboardHotkeyStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamHotKey({ key, modifiers }, identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.keyboardHotkeyStream);
    });

    it('should have configured the request with the right key and modifiers', () => {
      const hotKey = new KeyboardHotkey()
        .setKey(key)
        .setModifiers(convertedModifiers);

      expect(sentRequest.getHotkey()).toStrictEqual(hotKey);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamText', () => {
    let streamCallback: jest.Mock;
    let sentRequest: Messages.KeyboardTextStreamRequest;
    let sentResponse: Messages.KeyboardTextStreamResponse;

    beforeEach(async () => {
      sentResponse = new Messages.KeyboardTextStreamResponse().setText('hello');
      const stream = createEmptyStream<Messages.KeyboardTextStreamResponse>();

      streamCallback = jest.fn().mockImplementation(identityCallback);
      mockGRPCClient.keyboardTextStream.mockImplementation(
        createStreamingHandler(stream),
      );

      subject.streamText(streamCallback);

      sentRequest = captureMockArgument(mockGRPCClient.keyboardTextStream);
      stream.emit('data', sentResponse);
    });

    it('should stream the text back to the callback', () => {
      expect(streamCallback).toHaveBeenCalledWith(null, sentResponse.getText());
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamChar', () => {
    let sentRequest: Messages.KeyboardCharacterStreamRequest;

    beforeEach(async () => {
      mockGRPCClient.keyboardCharacterStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamChar(identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.keyboardCharacterStream);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamScanCode', () => {
    let sentRequest: Messages.KeyboardScancodeStreamRequest;

    beforeEach(async () => {
      mockGRPCClient.keyboardScancodeStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamScanCode(identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.keyboardScancodeStream);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
