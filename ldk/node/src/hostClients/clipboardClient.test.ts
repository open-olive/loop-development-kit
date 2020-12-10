import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/clipboard_grpc_pb';
import * as Messages from '../grpc/clipboard_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { ClipboardClient } from './clipboardClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import {
  captureMockArgument,
  createCallbackHandler,
  createStreamingHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../jest.helpers';

jest.mock('../grpc/clipboard_grpc_pb');

const MockClientClass = mocked(Services.ClipboardClient);

const logger = new Logger('test-logger');

describe('ClipboardClient', () => {
  let subject: ClipboardClient;
  let mockGRPCClient: jest.Mocked<Services.ClipboardClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new ClipboardClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.ClipboardClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#queryClipboard', () => {
    let sentRequest: Messages.ClipboardReadRequest;
    let sentResponse: Messages.ClipboardReadResponse;
    let queryResult: Promise<string>;

    beforeEach(async () => {
      sentResponse = new Messages.ClipboardReadResponse();

      mockGRPCClient.clipboardRead.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryClipboard();

      sentRequest = captureMockArgument(mockGRPCClient.clipboardRead);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toBe(sentResponse.getText());
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.clipboardRead).toHaveBeenCalledWith(
        expect.any(Messages.ClipboardReadRequest),
        expect.any(Function),
      );
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamClipboard', () => {
    let sentRequest: Messages.ClipboardReadStreamRequest;

    beforeEach(async () => {
      mockGRPCClient.clipboardReadStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamClipboard(identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.clipboardReadStream);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
