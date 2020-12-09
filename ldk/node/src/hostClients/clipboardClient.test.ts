import { mocked } from 'ts-jest/utils';
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
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../jest.helpers';

jest.mock('../grpc/clipboard_grpc_pb');

const hostClient = mocked(Services.ClipboardClient);

const logger = new Logger('test-logger');

describe('ClipboardClient', () => {
  let subject: ClipboardClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let queryClipboardMock: jest.Mock;
  let streamClipboardMock: jest.Mock;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new ClipboardClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());
    queryClipboardMock = jest.fn();
    streamClipboardMock = jest.fn();

    hostClient.mockImplementation(() => {
      return {
        waitForReady: waitForReadyMock,
        clipboardRead: queryClipboardMock,
        clipboardReadStream: streamClipboardMock,
      } as any;
    });

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

      queryClipboardMock.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryClipboard();

      sentRequest = captureMockArgument(queryClipboardMock);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toBe(sentResponse.getText());
    });

    it('should call client.clipboardRead and resolve successfully', async () => {
      expect(queryClipboardMock).toHaveBeenCalledWith(
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
      streamClipboardMock.mockImplementation(createStreamingHandler());

      subject.streamClipboard(identityCallback);

      sentRequest = captureMockArgument(streamClipboardMock);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
