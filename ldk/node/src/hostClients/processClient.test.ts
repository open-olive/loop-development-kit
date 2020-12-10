import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/process_grpc_pb';
import * as Messages from '../grpc/process_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { ProcessClient } from './processClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import {
  captureMockArgument,
  createCallbackHandler,
  createEmptyStream,
  createStreamingHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../jest.helpers';
import { ProcessListResponse, ProcessStreamResponse } from './processService';

jest.mock('../grpc/process_grpc_pb');

const MockClientClass = mocked(Services.ProcessClient);

const logger = new Logger('test-logger');

describe('ProcessClient', () => {
  let subject: ProcessClient;
  let mockGRPCClient: jest.Mocked<Services.ProcessClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new ProcessClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.ProcessClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#queryProcess', () => {
    let sentRequest: Messages.ProcessStateRequest;
    let sentResponse: Messages.ProcessStateResponse;
    let queryResult: Promise<ProcessListResponse>;

    beforeEach(async () => {
      sentResponse = new Messages.ProcessStateResponse();

      mockGRPCClient.processState.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryProcesses();

      sentRequest = captureMockArgument(mockGRPCClient.processState);
    });

    it('should return a transformed response', async () => {
      await expect(queryResult).resolves.toStrictEqual({
        processes: sentResponse.getProcessesList(),
      });
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.processState).toHaveBeenCalledWith(
        expect.any(Messages.ProcessStateRequest),
        expect.any(Function),
      );
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamProcess', () => {
    let streamCallback: jest.Mock;
    let sentRequest: Messages.ProcessStateStreamRequest;
    let sentResponse: Messages.ProcessStateStreamResponse;

    beforeEach(async () => {
      sentResponse = new Messages.ProcessStateStreamResponse().setProcess(
        new Messages.ProcessInfo(),
      );

      const stream = createEmptyStream<Messages.ProcessStateStreamResponse>();

      streamCallback = jest.fn().mockImplementation(identityCallback);
      mockGRPCClient.processStateStream.mockImplementation(
        createStreamingHandler(stream),
      );

      subject.streamProcesses(streamCallback);

      sentRequest = captureMockArgument(mockGRPCClient.processStateStream);
      stream.emit('data', sentResponse);
    });

    it('should stream the process info back to the callback', () => {
      const transformedProcessInfo: ProcessStreamResponse = captureMockArgument(
        streamCallback,
        { position: 1 },
      );

      expect(transformedProcessInfo).toMatchObject({
        process: expect.anything(),
        action: expect.anything(),
      });
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
