import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/hover_grpc_pb';
import * as Messages from '../grpc/hover_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { HoverClient } from './hoverClient';
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
import { HoverResponse } from './hover';

jest.mock('../grpc/hover_grpc_pb');

const MockClientClass = mocked(Services.HoverClient);

const logger = buildLogger();

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
    let sentResponse: Messages.HoverReadResponse;
    let queryResult: Promise<HoverResponse>;
    const xFromCenter = 10;
    const yFromCenter = 20;

    beforeEach(async () => {
      sentResponse = new Messages.HoverReadResponse().setText(
        'you hovered on me',
      );

      mockGRPCClient.hoverRead.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryHover({ xFromCenter, yFromCenter });
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

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.HoverReadRequest = captureMockArgument(
        mockGRPCClient.hoverRead,
      );

      expect(sentRequest.getXfromcenter()).toBe(xFromCenter);
      expect(sentRequest.getXfromcenter()).toBe(xFromCenter);
      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#streamHover', () => {
    const xFromCenter = 10;
    const yFromCenter = 20;

    beforeEach(async () => {
      mockGRPCClient.hoverReadStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamHover({ xFromCenter, yFromCenter }, identityCallback);
    });

    it('should have configured the request with the right x coordinates', () => {
      const sentRequest: Messages.HoverReadStreamRequest = captureMockArgument(
        mockGRPCClient.hoverReadStream,
      );

      expect(sentRequest.getXfromcenter()).toBe(xFromCenter);
      expect(sentRequest.getYfromcenter()).toBe(yFromCenter);
      expect(sentRequest.getSession()).toBeDefined();
    });
  });
});
