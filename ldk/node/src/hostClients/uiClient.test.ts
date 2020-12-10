import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/ui_grpc_pb';
import * as Messages from '../grpc/ui_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { UIClient } from './uiClient';
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

jest.mock('../grpc/ui_grpc_pb');

const hostClient = mocked(Services.UIClient);

const logger = new Logger('test-logger');

describe('UIClient', () => {
  let subject: UIClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let streamSearchbarMock: jest.Mock;
  let streamGlobalSearchMock: jest.Mock;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new UIClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());
    streamSearchbarMock = jest.fn();
    streamGlobalSearchMock = jest.fn();

    hostClient.mockImplementation(() => {
      return {
        waitForReady: waitForReadyMock,
        searchbarStream: streamSearchbarMock,
        globalSearchStream: streamGlobalSearchMock,
      } as any;
    });

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#streamSearchbar', () => {
    let sentRequest: Messages.SearchbarStreamRequest;

    beforeEach(async () => {
      streamSearchbarMock.mockImplementation(createStreamingHandler());

      subject.streamSearchbar(identityCallback);

      sentRequest = captureMockArgument(streamSearchbarMock);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamGlobalSearch', () => {
    let sentRequest: Messages.GlobalSearchStreamRequest;

    beforeEach(async () => {
      streamGlobalSearchMock.mockImplementation(createStreamingHandler());

      subject.streamGlobalSearch(identityCallback);

      sentRequest = captureMockArgument(streamGlobalSearchMock);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
