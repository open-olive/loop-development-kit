import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
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
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../test.helpers';
import { CursorResponse } from './cursorService';

jest.mock('../grpc/cursor_grpc_pb');

const MockClientClass = mocked(Services.CursorClient);

const logger = new Logger('test-logger');

describe('CursorClient', () => {
  let subject: CursorClient;
  let mockGRPCClient: jest.Mocked<Services.CursorClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new CursorClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.CursorClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#queryCursorPosition', () => {
    let sentRequest: Messages.CursorPositionRequest;
    let sentResponse: Messages.CursorPositionResponse;
    let queryResult: Promise<CursorResponse>;

    beforeEach(async () => {
      sentResponse = new Messages.CursorPositionResponse();

      mockGRPCClient.cursorPosition.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryCursorPosition();

      sentRequest = captureMockArgument(mockGRPCClient.cursorPosition);
    });

    it('should return a transformed response', async () => {
      const cursorResponse = {
        x: sentResponse.getX(),
        y: sentResponse.getY(),
        screen: sentResponse.getScreen(),
      };

      await expect(queryResult).resolves.toStrictEqual(cursorResponse);
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.cursorPosition).toHaveBeenCalledWith(
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
      mockGRPCClient.cursorPositionStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamCursorPosition(identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.cursorPositionStream);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
