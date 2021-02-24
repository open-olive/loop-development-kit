import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/window_grpc_pb';
import * as Messages from '../grpc/window_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { WindowClient } from './windowClient';
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
import { WindowInfoResponse } from './window';

jest.mock('../grpc/window_grpc_pb');

const MockClientClass = mocked(Services.WindowClient);
const logger = buildLogger();

describe('WindowClient', () => {
  let subject: WindowClient;
  let mockGRPCClient: jest.Mocked<Services.WindowClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  const windowHeight = 100;
  const windowWidth = 200;
  const windowX = 50;
  const windowY = 75;
  const windowPid = 10;
  const windowPath = '/index.html';
  const windowTitle = 'OliveHelps';

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new WindowClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.WindowClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#activeWindow', () => {
    let sentResponse: Messages.WindowActiveWindowResponse;
    let queryResult: Promise<WindowInfoResponse>;

    beforeEach(async () => {
      sentResponse = new Messages.WindowActiveWindowResponse().setWindow(
        new Messages.WindowInfo()
          .setHeight(windowHeight)
          .setWidth(windowWidth)
          .setX(windowX)
          .setY(windowY)
          .setPid(windowPid)
          .setPath(windowPath)
          .setTitle(windowTitle),
      );

      mockGRPCClient.windowActiveWindow.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.activeWindow();
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toMatchObject({
        title: windowTitle,
        path: windowPath,
        pid: windowPid,
        x: windowX,
        y: windowY,
        width: windowWidth,
        height: windowHeight,
      });
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.windowActiveWindow).toHaveBeenCalledWith(
        expect.any(Messages.WindowActiveWindowRequest),
        expect.any(Function),
      );
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.WindowActiveWindowRequest = captureMockArgument(
        mockGRPCClient.windowActiveWindow,
      );

      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#windows', () => {
    let sentResponse: Messages.WindowStateResponse;
    let queryResult: Promise<WindowInfoResponse[]>;

    beforeEach(async () => {
      sentResponse = new Messages.WindowStateResponse().setWindowList([
        new Messages.WindowInfo()
          .setHeight(windowHeight)
          .setWidth(windowWidth)
          .setX(windowX)
          .setY(windowY)
          .setPid(windowPid)
          .setPath(windowPath)
          .setTitle(windowTitle),
      ]);

      mockGRPCClient.windowState.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.windows();
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toContainEqual(
        expect.objectContaining({
          title: windowTitle,
          path: windowPath,
          pid: windowPid,
          x: windowX,
          y: windowY,
          width: windowWidth,
          height: windowHeight,
        }),
      );
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.windowState).toHaveBeenCalledWith(
        expect.any(Messages.WindowStateRequest),
        expect.any(Function),
      );
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.WindowStateRequest = captureMockArgument(
        mockGRPCClient.windowState,
      );

      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#listenActiveWindow', () => {
    beforeEach(async () => {
      mockGRPCClient.windowActiveWindowStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.listenActiveWindow(identityCallback);
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.WindowActiveWindowStreamRequest = captureMockArgument(
        mockGRPCClient.windowActiveWindowStream,
      );

      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#listenWindows', () => {
    beforeEach(async () => {
      mockGRPCClient.windowStateStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.listenWindows(identityCallback);
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.WindowActiveWindowStreamRequest = captureMockArgument(
        mockGRPCClient.windowStateStream,
      );

      expect(sentRequest.getSession()).toBeDefined();
    });
  });
});
