import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import { ClientReadableStream } from '@grpc/grpc-js';
import * as Services from '../grpc/process_grpc_pb';
import * as Messages from '../grpc/process_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { ProcessClient } from './processClient';
import { Session } from '../grpc/session_pb';
import {
  buildLogger,
  captureMockArgument,
  createCallbackHandler,
  createEmptyStream,
  createStreamingHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../test.helpers';
import { ProcessListResponse, ProcessStreamResponse } from './process';

jest.mock('../grpc/process_grpc_pb');

const MockClientClass = mocked(Services.ProcessClient);

const logger = buildLogger();

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
    let sentResponse: Messages.ProcessStateResponse;
    let queryResult: Promise<ProcessListResponse>;

    beforeEach(async () => {
      sentResponse = new Messages.ProcessStateResponse();

      mockGRPCClient.processState.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.readProcesses();
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

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.ProcessStateRequest = captureMockArgument(
        mockGRPCClient.processState,
      );

      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#streamProcess', () => {
    let stream: ClientReadableStream<Messages.ProcessStateStreamResponse>;
    let streamCallback: jest.Mock;
    let sentResponse: Messages.ProcessStateStreamResponse;

    beforeEach(async () => {
      sentResponse = new Messages.ProcessStateStreamResponse().setProcess(
        new Messages.ProcessInfo(),
      );

      stream = createEmptyStream();

      streamCallback = jest.fn().mockImplementation(identityCallback);
      mockGRPCClient.processStateStream.mockImplementation(
        createStreamingHandler(stream),
      );

      subject.listenProcesses(streamCallback);
    });

    it('should listenText the process info back to the callback', () => {
      stream.emit('data', sentResponse);

      const transformedProcessInfo: ProcessStreamResponse = captureMockArgument(
        streamCallback,
        { position: 1 },
      );

      expect(transformedProcessInfo).toMatchObject({
        process: expect.anything(),
        action: expect.anything(),
      });
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.ProcessStateStreamRequest = captureMockArgument(
        mockGRPCClient.processStateStream,
      );

      expect(sentRequest.getSession()).toBeDefined();
    });
  });
});
