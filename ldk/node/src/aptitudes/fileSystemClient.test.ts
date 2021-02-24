import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/filesystem_grpc_pb';
import * as Messages from '../grpc/filesystem_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { FileSystemClient } from './fileSystemClient';
import { Session } from '../grpc/session_pb';
import {
  buildLogger,
  captureMockArgument,
  createCallbackHandler,
  createStreamingHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../test.helpers';
import { FileSystemQueryDirectoryResponse } from './fileSystem';

jest.mock('../grpc/filesystem_grpc_pb');

const MockClientClass = mocked(Services.FilesystemClient);

const logger = buildLogger();

describe('FileSystemClient', () => {
  let subject: FileSystemClient;
  let mockGRPCClient: jest.Mocked<Services.FilesystemClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new FileSystemClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.FilesystemClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });

  describe('#directory', () => {
    let sentResponse: Messages.FilesystemDirResponse;
    let queryResult: Promise<FileSystemQueryDirectoryResponse>;
    const directory = '/a-directory';
    const fileInDirectory = 'file-one.txt';

    beforeEach(async () => {
      sentResponse = new Messages.FilesystemDirResponse().setFilesList([
        new Messages.FileInfo().setName(fileInDirectory),
      ]);

      mockGRPCClient.filesystemDir.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.directory({ directory });
    });

    it('should return a transformed response', async () => {
      const directoryInfo = {
        files: sentResponse
          .getFilesList()
          .map((info) => ({ name: info.getName() })),
      };
      await expect(queryResult).resolves.toMatchObject(directoryInfo);
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.filesystemDir).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemDirRequest),
        expect.any(Function),
      );
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.FilesystemDirRequest = captureMockArgument(
        mockGRPCClient.filesystemDir,
      );

      expect(sentRequest.getDirectory()).toBe(directory);
      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#streamFileInfoInfo', () => {
    const file = '/a-directory/a-file';

    beforeEach(async () => {
      mockGRPCClient.filesystemFileInfoStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.listenFile({ file }, identityCallback);
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.filesystemFileInfoStream).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemFileInfoStreamRequest),
      );
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.FilesystemFileInfoStreamRequest = captureMockArgument(
        mockGRPCClient.filesystemFileInfoStream,
      );

      expect(sentRequest.getPath()).toBe(file);
      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#listenDirectory', () => {
    const directory = '/a-directory';

    beforeEach(async () => {
      mockGRPCClient.filesystemDirStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.listenDirectory({ directory }, identityCallback);
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.FilesystemDirStreamRequest = captureMockArgument(
        mockGRPCClient.filesystemDirStream,
      );

      expect(sentRequest.getDirectory()).toBe(directory);
      expect(sentRequest.getSession()).toBeDefined();
    });
  });
});
