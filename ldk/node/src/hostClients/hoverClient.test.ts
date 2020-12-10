import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
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
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../jest.helpers';
import { HoverResponse } from './hoverService';

jest.mock('../grpc/hover_grpc_pb');

const MockClientClass = mocked(Services.HoverClient);

const logger = new Logger('test-logger');

describe('HoverClient', () => {
  let subject: HoverClient;
  let mockGRPCClient: jest.Mocked<Services.HoverClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new HoverClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.HoverClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

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

      mockGRPCClient.hoverRead.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryHover({ xFromCenter, yFromCenter });

      sentRequest = captureMockArgument(mockGRPCClient.hoverRead);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toStrictEqual({
        text: sentResponse.getText(),
      });
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.hoverRead).toHaveBeenCalledWith(
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
      mockGRPCClient.hoverReadStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamHover({ xFromCenter, yFromCenter }, identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.hoverReadStream);
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
