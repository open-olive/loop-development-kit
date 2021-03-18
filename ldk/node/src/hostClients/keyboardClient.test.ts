import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import { ClientReadableStream } from '@grpc/grpc-js/build/src/call';
import * as Services from '../grpc/keyboard_grpc_pb';
import * as Messages from '../grpc/keyboard_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { KeyboardClient } from './keyboardClient';
import { Session } from '../grpc/session_pb';
import {
  buildLogger,
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

const logger = buildLogger();

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

    beforeEach(async () => {
      mockGRPCClient.keyboardHotkeyStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamHotKey({ key, modifiers }, identityCallback);
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.KeyboardHotkeyStreamRequest = captureMockArgument(
        mockGRPCClient.keyboardHotkeyStream,
      );

      const hotKey = new KeyboardHotkey()
        .setKey(key)
        .setModifiers(convertedModifiers);

      expect(sentRequest.getHotkey()).toStrictEqual(hotKey);
      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#streamText', () => {
    let stream: ClientReadableStream<Messages.KeyboardTextStreamResponse>;
    let streamCallback: jest.Mock;
    let sentResponse: Messages.KeyboardTextStreamResponse;

    beforeEach(async () => {
      sentResponse = new Messages.KeyboardTextStreamResponse().setText('hello');
      stream = createEmptyStream();

      streamCallback = jest.fn().mockImplementation(identityCallback);
      mockGRPCClient.keyboardTextStream.mockImplementation(
        createStreamingHandler(stream),
      );

      subject.streamText(streamCallback);
    });

    it('should stream the text back to the callback', () => {
      stream.emit('data', sentResponse);

      expect(streamCallback).toHaveBeenCalledWith(null, sentResponse.getText());
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.KeyboardTextStreamRequest = captureMockArgument(
        mockGRPCClient.keyboardTextStream,
      );

      expect(sentRequest.getSession()).toBeDefined();
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
      expect(sentRequest.getSession()).toBeDefined();
    });
  });
});
