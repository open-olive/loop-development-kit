import { mocked } from 'ts-jest/utils';
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
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../jest.helpers';
import { BrowserSelectedTextResponse } from './browserService';

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

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new BrowserClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());
    queryActiveURLMock = jest.fn();
    streamActiveURLMock = jest.fn();
    querySelectedTextMock = jest.fn();
    streamSelectedTextMock = jest.fn();

    hostClient.mockImplementation(() => {
      return {
        waitForReady: waitForReadyMock,
        browserActiveURL: queryActiveURLMock,
        browserActiveURLStream: streamActiveURLMock,
        browserSelectedText: querySelectedTextMock,
        browserSelectedTextStream: streamSelectedTextMock,
      } as any;
    });

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

      queryActiveURLMock.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryActiveURL();

      sentRequest = captureMockArgument(queryActiveURLMock);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toBe(sentResponse.getUrl());
    });

    it('should call client.browserActiveURL and resolve successfully', async () => {
      expect(queryActiveURLMock).toHaveBeenCalledWith(
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

      querySelectedTextMock.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.querySelectedText();

      sentRequest = captureMockArgument(querySelectedTextMock);
    });

    it('should return a transformed response', async () => {
      const selectedText = {
        text: sentResponse.getText(),
        url: sentResponse.getUrl(),
        tabTitle: sentResponse.getTabtitle(),
      };

      await expect(queryResult).resolves.toStrictEqual(selectedText);
    });

    it('should call client.browserSelectedText and resolve successfully', async () => {
      expect(querySelectedTextMock).toHaveBeenCalledWith(
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
      streamActiveURLMock.mockImplementation(createStreamingHandler());

      subject.streamActiveURL(identityCallback);

      sentRequest = captureMockArgument(streamActiveURLMock);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamSelectedText', () => {
    let sentRequest: Messages.BrowserSelectedTextStreamRequest;

    beforeEach(async () => {
      streamSelectedTextMock.mockImplementation(createStreamingHandler());

      subject.streamSelectedText(identityCallback);

      sentRequest = captureMockArgument(streamSelectedTextMock);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
