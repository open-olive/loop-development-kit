import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/ui_grpc_pb';
import * as Messages from '../grpc/ui_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { UIClient } from './uiClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import {
  captureMockArgument,
  createStreamingHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../test.helpers';

jest.mock('../grpc/ui_grpc_pb');

const MockClientClass = mocked(Services.UIClient);

const logger = new Logger('test-logger');

describe('UIClient', () => {
  let subject: UIClient;
  let mockGRPCClient: jest.Mocked<Services.UIClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new UIClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.UIClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#streamSearchbar', () => {
    let sentRequest: Messages.SearchbarStreamRequest;

    beforeEach(async () => {
      mockGRPCClient.searchbarStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamSearchbar(identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.searchbarStream);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamGlobalSearch', () => {
    let sentRequest: Messages.GlobalSearchStreamRequest;

    beforeEach(async () => {
      mockGRPCClient.globalSearchStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamGlobalSearch(identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.globalSearchStream);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
