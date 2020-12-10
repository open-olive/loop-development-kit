import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/hover_grpc_pb';
import * as Messages from '../grpc/hover_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { HoverClient } from './hoverClient';
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
import { HoverResponse } from './hoverService';

jest.mock('../grpc/hover_grpc_pb');

const hostClient = mocked(Services.HoverClient);

const logger = new Logger('test-logger');

describe('HoverClient', () => {
  let subject: HoverClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let queryHoverMock: jest.Mock;
  let streamHoverMock: jest.Mock;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new HoverClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());
    queryHoverMock = jest.fn();
    streamHoverMock = jest.fn();

    hostClient.mockImplementation(() => {
      return {
        waitForReady: waitForReadyMock,
        hoverRead: queryHoverMock,
        hoverReadStream: streamHoverMock,
      } as any;
    });

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#queryHover', () => {
    let sentRequest: Messages.HoverReadRequest;
    let sentResponse: Messages.HoverReadResponse;
    let queryResult: Promise<HoverResponse>;
    const xFromCenter = 10;
    const yFromCenter = 20;

    beforeEach(async () => {
      sentResponse = new Messages.HoverReadResponse();

      queryHoverMock.mockImplementation(createCallbackHandler(sentResponse));

      queryResult = subject.queryHover({ xFromCenter, yFromCenter });

      sentRequest = captureMockArgument(queryHoverMock);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toStrictEqual({
        text: sentResponse.getText(),
      });
    });

    it('should call grpc client function', async () => {
      expect(queryHoverMock).toHaveBeenCalledWith(
        expect.any(Messages.HoverReadRequest),
        expect.any(Function),
      );
    });

    it('should have configured the request with the right x coordinates', () => {
      expect(sentRequest.getXfromcenter()).toBe(xFromCenter);
    });

    it('should have configured the request with the right y coordinates', () => {
      expect(sentRequest.getXfromcenter()).toBe(xFromCenter);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamHover', () => {
    let sentRequest: Messages.HoverReadStreamRequest;
    const xFromCenter = 10;
    const yFromCenter = 20;

    beforeEach(async () => {
      streamHoverMock.mockImplementation(createStreamingHandler());

      subject.streamHover({ xFromCenter, yFromCenter }, identityCallback);

      sentRequest = captureMockArgument(streamHoverMock);
    });

    it('should have configured the request with the right x coordinates', () => {
      expect(sentRequest.getXfromcenter()).toBe(xFromCenter);
    });

    it('should have configured the request with the right y coordinates', () => {
      expect(sentRequest.getYfromcenter()).toBe(yFromCenter);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
