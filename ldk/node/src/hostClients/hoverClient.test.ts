import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/hover_grpc_pb';
import * as Messages from '../grpc/hover_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { HoverClient } from './hoverClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import { TransformingStream } from './transformingStream';
import {
  captureMockArgument,
  createCallbackHandler,
  createStreamingHandler,
  identityCallback,
} from '../jest.helpers';

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

  beforeEach(() => {
    jest.resetAllMocks();
    subject = new HoverClient();
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
        hoverRead: queryHoverMock,
        hoverReadStream: streamHoverMock,
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

  describe('#queryHover', () => {
    const xFromCenter = 10;
    const yFromCenter = 20;

    beforeEach(async () => {
      const response = new Messages.HoverReadResponse();
      queryHoverMock = jest
        .fn()
        .mockImplementation(createCallbackHandler(response));
      await subject.connect(connInfo, session, logger);
      await expect(
        subject.queryHover({ xFromCenter, yFromCenter }),
      ).resolves.toBeDefined();
    });

    it('should call client.hoverRead and resolve successfully', async () => {
      expect(queryHoverMock).toHaveBeenCalledWith(
        expect.any(Messages.HoverReadRequest),
        expect.any(Function),
      );
    });

    it('should have configured the request with the right x coordinates', () => {
      const request = captureMockArgument<Messages.HoverReadRequest>(
        queryHoverMock,
      );
      expect(request.getXfromcenter()).toBe(xFromCenter);
    });

    it('should have configured the request with the right y coordinates', () => {
      const request = captureMockArgument<Messages.HoverReadRequest>(
        queryHoverMock,
      );
      expect(request.getXfromcenter()).toBe(xFromCenter);
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<Messages.HoverReadRequest>(
        queryHoverMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamHover', () => {
    const xFromCenter = 10;
    const yFromCenter = 20;

    beforeEach(async () => {
      streamHoverMock = jest.fn().mockImplementation(createStreamingHandler());
      await subject.connect(connInfo, session, logger);
      await expect(
        subject.streamHover({ xFromCenter, yFromCenter }, identityCallback),
      ).toBeInstanceOf(TransformingStream);
    });

    it('should have configured the request with the right x coordinates', () => {
      const request = captureMockArgument<Messages.HoverReadStreamRequest>(
        streamHoverMock,
      );
      expect(request.getXfromcenter()).toBe(xFromCenter);
    });

    it('should have configured the request with the right y coordinates', () => {
      const request = captureMockArgument<Messages.HoverReadStreamRequest>(
        streamHoverMock,
      );
      expect(request.getYfromcenter()).toBe(yFromCenter);
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<Messages.HoverReadStreamRequest>(
        streamHoverMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
