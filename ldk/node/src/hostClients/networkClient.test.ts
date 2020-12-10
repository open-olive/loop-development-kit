import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/network_grpc_pb';
import * as Messages from '../grpc/network_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { NetworkClient } from './networkClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import {
  captureMockArgument,
  createCallbackHandler,
  defaultConnInfo,
  defaultSession,
} from '../jest.helpers';
import { HttpResponse } from './networkService';

jest.mock('../grpc/network_grpc_pb');

const hostClient = mocked(Services.NetworkClient);

const logger = new Logger('test-logger');

describe('NetworkClient', () => {
  let subject: NetworkClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let httpRequestMock: jest.Mock;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new NetworkClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());
    httpRequestMock = jest.fn();

    hostClient.mockImplementation(() => {
      return {
        waitForReady: waitForReadyMock,
        hTTPRequest: httpRequestMock,
      } as any;
    });

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#httpRequest', () => {
    let sentRequest: Messages.HTTPRequestMsg;
    let sentResponse: Messages.HTTPResponseMsg;
    let queryResult: Promise<HttpResponse>;
    const request = {
      url: 'http://test.example.com',
      method: 'GET',
      body: '',
    };

    beforeEach(async () => {
      sentResponse = new Messages.HTTPResponseMsg();

      httpRequestMock.mockImplementation(createCallbackHandler(sentResponse));

      queryResult = subject.httpRequest(request);

      sentRequest = captureMockArgument(httpRequestMock);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toStrictEqual({
        statusCode: sentResponse.getResponsecode(),
        data: sentResponse.getData(),
      });
    });

    it('should call grpc client function', async () => {
      expect(httpRequestMock).toHaveBeenCalledWith(
        expect.any(Messages.HTTPRequestMsg),
        expect.any(Function),
      );
    });

    it('should have configured the request with the right url', () => {
      expect(sentRequest.getUrl()).toBe(request.url);
    });

    it('should have configured the request with the right method', () => {
      expect(sentRequest.getMethod()).toBe(request.method);
    });

    it('should have configured the request with the right body', () => {
      expect(sentRequest.getBody()).toBe(request.body);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
