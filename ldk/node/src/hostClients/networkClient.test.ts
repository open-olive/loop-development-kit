import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/network_grpc_pb';
import * as Messages from '../grpc/network_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { NetworkClient } from './networkClient';
import { Session } from '../grpc/session_pb';
import {
  buildLogger,
  captureMockArgument,
  createCallbackHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
} from '../test.helpers';
import { HttpResponse } from './networkService';
import { HTTPHeader } from '../grpc/network_pb';

jest.mock('../grpc/network_grpc_pb');

const MockClientClass = mocked(Services.NetworkClient);

const logger = buildLogger();

describe('NetworkClient', () => {
  let subject: NetworkClient;
  let mockGRPCClient: jest.Mocked<Services.NetworkClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new NetworkClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.NetworkClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#httpRequest', () => {
    let sentResponse: Messages.HTTPResponseMsg;
    let queryResult: Promise<HttpResponse>;

    const request = {
      url: 'http://test.example.com',
      method: 'GET',
      body: '',
      headers: {
        Cookie: ['monster=false'],
      },
    };
    const encoder = new TextEncoder();

    beforeEach(async () => {
      sentResponse = new Messages.HTTPResponseMsg()
        .setData(encoder.encode('response data'))
        .setResponsecode(200);

      sentResponse
        .getHeadersMap()
        .set('Set-Cookie', new HTTPHeader().setValuesList(['monster=true']));

      mockGRPCClient.hTTPRequest.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.httpRequest(request);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toMatchObject({
        statusCode: sentResponse.getResponsecode(),
        data: sentResponse.getData(),
        headers: expect.any(Object),
      });
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.hTTPRequest).toHaveBeenCalledWith(
        expect.any(Messages.HTTPRequestMsg),
        expect.any(Function),
      );
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.HTTPRequestMsg = captureMockArgument(
        mockGRPCClient.hTTPRequest,
      );

      expect(sentRequest.getUrl()).toBe(request.url);
      expect(sentRequest.getMethod()).toBe(request.method);
      expect(sentRequest.getBody()).toBe(request.body);
      expect(sentRequest.getHeadersMap()).toBeDefined();
      expect(sentRequest.getSession()).toBeDefined();
    });
  });
});
