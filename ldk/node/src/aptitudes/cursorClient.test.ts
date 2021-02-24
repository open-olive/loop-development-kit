import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/cursor_grpc_pb';
import * as Messages from '../grpc/cursor_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { CursorClient } from './cursorClient';
import { Session } from '../grpc/session_pb';
import {
  buildLogger,
  captureMockArgument,
  createCallbackHandler,
  createStreamingHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../test.helpers';
import { CursorPosition } from './cursor';

jest.mock('../grpc/cursor_grpc_pb');

const MockClientClass = mocked(Services.CursorClient);

const logger = buildLogger();

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

  describe('#position', () => {
    let sentResponse: Messages.CursorPositionResponse;
    let queryResult: Promise<CursorPosition>;

    beforeEach(async () => {
      sentResponse = new Messages.CursorPositionResponse()
        .setX(100)
        .setY(200)
        .setScreen(0);

      mockGRPCClient.cursorPosition.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.position();
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

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.CursorPositionRequest = captureMockArgument(
        mockGRPCClient.cursorPosition,
      );

      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#listenPosition', () => {
    beforeEach(async () => {
      mockGRPCClient.cursorPositionStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.listenPosition(identityCallback);
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.CursorPositionStreamRequest = captureMockArgument(
        mockGRPCClient.cursorPositionStream,
      );

      expect(sentRequest.getSession()).toBeDefined();
    });
  });
});
