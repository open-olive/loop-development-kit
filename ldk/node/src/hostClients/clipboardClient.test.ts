import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/clipboard_grpc_pb';
import * as Messages from '../grpc/clipboard_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { ClipboardClient } from './clipboardClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import { TransformingStream } from './transformingStream';
import {
  captureMockArgument,
  createCallbackHandler,
  createStreamingHandler,
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

  beforeEach(() => {
    jest.resetAllMocks();
    subject = new ClipboardClient();
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
        clipboardRead: queryClipboardMock,
        clipboardReadStream: streamClipboardMock,
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

  describe('#queryClipboard', () => {
    beforeEach(async () => {
      const response = new Messages.ClipboardReadResponse();
      queryClipboardMock = jest
        .fn()
        .mockImplementation(createCallbackHandler(response));
      await subject.connect(connInfo, session, logger);
      await expect(subject.queryClipboard()).resolves.toBeDefined();
    });

    it('should call client.clipboardRead and resolve successfully', async () => {
      expect(queryClipboardMock).toHaveBeenCalledWith(
        expect.any(Messages.ClipboardReadRequest),
        expect.any(Function),
      );
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<Messages.ClipboardReadRequest>(
        queryClipboardMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamClipboard', () => {
    beforeEach(async () => {
      const response = new Messages.ClipboardReadStreamResponse();
      streamClipboardMock = jest
        .fn()
        .mockImplementation(createStreamingHandler(response));
      await subject.connect(connInfo, session, logger);
      await expect(subject.streamClipboard(identityCallback)).toBeInstanceOf(
        TransformingStream,
      );
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<Messages.ClipboardReadStreamRequest>(
        streamClipboardMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
