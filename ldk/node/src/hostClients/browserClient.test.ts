import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/browser_grpc_pb';
import * as Messages from '../grpc/browser_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { BrowserClient } from './browserClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import { TransformingStream } from './transformingStream';
import {
  captureMockArgument,
  createCallbackHandler,
  createStreamingHandler,
  identityCallback,
} from '../jest.helpers';

jest.mock('../grpc/browser_grpc_pb');

const hostClient = mocked(Services.BrowserClient);

const logger = new Logger('test-logger');

describe('BrowserClient', () => {
  let subject: BrowserClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let queryActiveURLMock: jest.Mock;
  let streamActiveURLMock: jest.Mock;
  let querySelectedTextMock: jest.Mock;
  let streamSelectedTextMock: jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    subject = new BrowserClient();
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
        browserActiveURL: queryActiveURLMock,
        browserActiveURLStream: streamActiveURLMock,
        browserSelectedText: querySelectedTextMock,
        browserSelectedTextStream: streamSelectedTextMock,
      } as any;
    });
  });

  describe('#connect', () => {
    it('instantiates a new host client and waits for it to be ready', async () => {
      await expect(subject.connect(connInfo, session, logger)).resolves.toBe(
        undefined,
      );
    });
  });

  describe('#queryActiveURL', () => {
    beforeEach(async () => {
      const response = new Messages.BrowserActiveURLResponse();
      queryActiveURLMock = jest
        .fn()
        .mockImplementation(createCallbackHandler(response));
      await subject.connect(connInfo, session, logger);
      await expect(subject.queryActiveURL()).resolves.toBeDefined();
    });

    it('should call client.browserActiveURL and resolve successfully', async () => {
      expect(queryActiveURLMock).toHaveBeenCalledWith(
        expect.any(Messages.BrowserActiveURLRequest),
        expect.any(Function),
      );
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<Messages.BrowserActiveURLRequest>(
        queryActiveURLMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#querySelectedText', () => {
    beforeEach(async () => {
      const response = new Messages.BrowserSelectedTextResponse();
      querySelectedTextMock = jest
        .fn()
        .mockImplementation(createCallbackHandler(response));
      await subject.connect(connInfo, session, logger);
      await expect(subject.querySelectedText()).resolves.toBeDefined();
    });

    it('should call client.browserSelectedText and resolve successfully', async () => {
      expect(querySelectedTextMock).toHaveBeenCalledWith(
        expect.any(Messages.BrowserSelectedTextRequest),
        expect.any(Function),
      );
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<Messages.BrowserSelectedTextRequest>(
        querySelectedTextMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamActiveURL', () => {
    beforeEach(async () => {
      const response = new Messages.BrowserActiveURLStreamResponse();
      streamActiveURLMock = jest
        .fn()
        .mockImplementation(createStreamingHandler(response));
      await subject.connect(connInfo, session, logger);
      await expect(subject.streamActiveURL(identityCallback)).toBeInstanceOf(
        TransformingStream,
      );
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<
        Messages.BrowserActiveURLStreamRequest
      >(streamActiveURLMock);
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamSelectedText', () => {
    beforeEach(async () => {
      const response = new Messages.BrowserSelectedTextStreamResponse();
      streamSelectedTextMock = jest
        .fn()
        .mockImplementation(createStreamingHandler(response));
      await subject.connect(connInfo, session, logger);
      await expect(subject.streamSelectedText(identityCallback)).toBeInstanceOf(
        TransformingStream,
      );
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<
        Messages.BrowserSelectedTextStreamRequest
      >(streamSelectedTextMock);
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
