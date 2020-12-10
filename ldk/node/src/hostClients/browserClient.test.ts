import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/browser_grpc_pb';
import * as Messages from '../grpc/browser_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { BrowserClient } from './browserClient';
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
import { BrowserSelectedTextResponse } from './browserService';

jest.mock('../grpc/browser_grpc_pb');

const MockClientClass = mocked(Services.BrowserClient);

const logger = new Logger('test-logger');

describe('BrowserClient', () => {
  let subject: BrowserClient;
  let mockGRPCClient: jest.Mocked<Services.BrowserClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new BrowserClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.BrowserClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#queryActiveURL', () => {
    let sentRequest: Messages.BrowserActiveURLRequest;
    let sentResponse: Messages.BrowserActiveURLResponse;
    let queryResult: Promise<string>;

    beforeEach(async () => {
      sentResponse = new Messages.BrowserActiveURLResponse();

      mockGRPCClient.browserActiveURL.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryActiveURL();

      sentRequest = captureMockArgument(mockGRPCClient.browserActiveURL);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toBe(sentResponse.getUrl());
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.browserActiveURL).toHaveBeenCalledWith(
        expect.any(Messages.BrowserActiveURLRequest),
        expect.any(Function),
      );
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#querySelectedText', () => {
    let sentRequest: Messages.BrowserSelectedTextRequest;
    let sentResponse: Messages.BrowserSelectedTextResponse;
    let queryResult: Promise<BrowserSelectedTextResponse>;

    beforeEach(async () => {
      sentResponse = new Messages.BrowserSelectedTextResponse();

      mockGRPCClient.browserSelectedText.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.querySelectedText();

      sentRequest = captureMockArgument(mockGRPCClient.browserSelectedText);
    });

    it('should return a transformed response', async () => {
      const selectedText = {
        text: sentResponse.getText(),
        url: sentResponse.getUrl(),
        tabTitle: sentResponse.getTabtitle(),
      };

      await expect(queryResult).resolves.toStrictEqual(selectedText);
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.browserSelectedText).toHaveBeenCalledWith(
        expect.any(Messages.BrowserSelectedTextRequest),
        expect.any(Function),
      );
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamActiveURL', () => {
    let sentRequest: Messages.BrowserActiveURLStreamRequest;

    beforeEach(async () => {
      mockGRPCClient.browserActiveURLStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamActiveURL(identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.browserActiveURLStream);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamSelectedText', () => {
    let sentRequest: Messages.BrowserSelectedTextStreamRequest;

    beforeEach(async () => {
      mockGRPCClient.browserSelectedTextStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamSelectedText(identityCallback);

      sentRequest = captureMockArgument(
        mockGRPCClient.browserSelectedTextStream,
      );
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
