import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/window_grpc_pb';
import * as Messages from '../grpc/window_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { WindowClient } from './windowClient';
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
import { WindowInfoResponse } from './windowService';

jest.mock('../grpc/window_grpc_pb');

const hostClient = mocked(Services.WindowClient);

const logger = new Logger('test-logger');

describe('WindowClient', () => {
  let subject: WindowClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let queryActiveWindowMock: jest.Mock;
  let streamActiveWindowMock: jest.Mock;
  let queryWindowsMock: jest.Mock;
  let streamWindowsMock: jest.Mock;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new WindowClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());
    queryActiveWindowMock = jest.fn();
    streamActiveWindowMock = jest.fn();
    queryWindowsMock = jest.fn();
    streamWindowsMock = jest.fn();

    hostClient.mockImplementation(() => {
      return {
        waitForReady: waitForReadyMock,
        windowActiveWindow: queryActiveWindowMock,
        windowActiveWindowStream: streamActiveWindowMock,
        windowState: queryWindowsMock,
        windowStateStream: streamWindowsMock,
      } as any;
    });

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#queryActiveWindow', () => {
    let sentRequest: Messages.WindowActiveWindowRequest;
    let sentResponse: Messages.WindowActiveWindowResponse;
    let queryResult: Promise<WindowInfoResponse>;

    beforeEach(async () => {
      sentResponse = new Messages.WindowActiveWindowResponse()
        .setWindow(new Messages.WindowInfo());

      queryActiveWindowMock.mockImplementation(createCallbackHandler(sentResponse));

      queryResult = subject.queryActiveWindow();

      sentRequest = captureMockArgument(queryActiveWindowMock);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toMatchObject({
        title: expect.anything(),
        path: expect.anything(),
        pid: expect.anything(),
        x: expect.anything(),
        y: expect.anything(),
        width: expect.anything(),
        height: expect.anything(),
      });
    });

    it('should call grpc client function', async () => {
      expect(queryActiveWindowMock).toHaveBeenCalledWith(
        expect.any(Messages.WindowActiveWindowRequest),
        expect.any(Function),
      );
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#queryWindows', () => {
    let sentRequest: Messages.WindowStateRequest;
    let sentResponse: Messages.WindowStateResponse;
    let queryResult: Promise<WindowInfoResponse[]>;

    beforeEach(async () => {
      sentResponse = new Messages.WindowStateResponse()
        .setWindowList([new Messages.WindowInfo()]);

      queryWindowsMock.mockImplementation(createCallbackHandler(sentResponse));

      queryResult = subject.queryWindows();

      sentRequest = captureMockArgument(queryWindowsMock);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toContainEqual(expect.objectContaining({
        title: expect.anything(),
        path: expect.anything(),
        pid: expect.anything(),
        x: expect.anything(),
        y: expect.anything(),
        width: expect.anything(),
        height: expect.anything(),
      }));
    });

    it('should call grpc client function', async () => {
      expect(queryWindowsMock).toHaveBeenCalledWith(
        expect.any(Messages.WindowStateRequest),
        expect.any(Function),
      );
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamActiveWindow', () => {
    let sentRequest: Messages.WindowActiveWindowStreamRequest;

    beforeEach(async () => {
      streamActiveWindowMock.mockImplementation(createStreamingHandler());

      subject.streamActiveWindow(identityCallback);

      sentRequest = captureMockArgument(streamActiveWindowMock);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamWindows', () => {
    let sentRequest: Messages.WindowActiveWindowStreamRequest;

    beforeEach(async () => {
      streamWindowsMock.mockImplementation(createStreamingHandler());

      subject.streamWindows(identityCallback);

      sentRequest = captureMockArgument(streamWindowsMock);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
