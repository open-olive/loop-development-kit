import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/cursor_grpc_pb';
import * as Messages from '../grpc/cursor_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { CursorClient } from './cursorClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import {
  captureMockArgument,
  createCallbackHandler,
  createStreamingHandler,
  identityCallback,
} from '../jest.helpers';
import { CursorResponse } from './cursorService';

jest.mock('../grpc/cursor_grpc_pb');

const hostClient = mocked(Services.CursorClient);

const logger = new Logger('test-logger');

describe('CursorClient', () => {
  let subject: CursorClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let queryCursorPositionMock: jest.Mock;
  let streamCursorPositionMock: jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    subject = new CursorClient();
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
        cursorPosition: queryCursorPositionMock,
        cursorPositionStream: streamCursorPositionMock,
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

  describe('#queryCursorPosition', () => {
    let sentRequest: Messages.CursorPositionRequest;
    let sentResponse: Messages.CursorPositionResponse;
    let queryResult: Promise<CursorResponse>;

    beforeEach(async () => {
      sentResponse = new Messages.CursorPositionResponse();

      queryCursorPositionMock = jest
        .fn()
        .mockImplementation(createCallbackHandler(sentResponse));
      await subject.connect(connInfo, session, logger);

      queryResult = subject.queryCursorPosition();

      sentRequest = captureMockArgument(queryCursorPositionMock);
    });

    it('should return a transformed response', async () => {
      const cursorResponse = {
        x: sentResponse.getX(),
        y: sentResponse.getY(),
        screen: sentResponse.getScreen(),
      };

      await expect(queryResult).resolves.toStrictEqual(cursorResponse);
    });

    it('should call client.cursorPosition and resolve successfully', async () => {
      expect(queryCursorPositionMock).toHaveBeenCalledWith(
        expect.any(Messages.CursorPositionRequest),
        expect.any(Function),
      );
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamCursorPosition', () => {
    let sentRequest: Messages.CursorPositionStreamRequest;

    beforeEach(async () => {
      streamCursorPositionMock = jest
        .fn()
        .mockImplementation(createStreamingHandler());

      await subject.connect(connInfo, session, logger);

      subject.streamCursorPosition(identityCallback);

      sentRequest = captureMockArgument(streamCursorPositionMock);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
