import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/filesystem_grpc_pb';
import * as Messages from '../grpc/filesystem_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { FileSystemClient } from './fileSystemClient';
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
} from '../test.helpers';
import {
  FileSystemQueryDirectoryResponse,
  FileSystemQueryFileResponse,
} from './fileSystemService';

jest.mock('../grpc/filesystem_grpc_pb');

const MockClientClass = mocked(Services.FilesystemClient);

const logger = new Logger('test-logger');

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

  describe('#queryDirectory', () => {
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

      queryResult = subject.queryDirectory({ directory });
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

  describe('#queryFile', () => {
    let sentResponse: Messages.FilesystemFileResponse;
    let queryResult: Promise<FileSystemQueryFileResponse>;
    const fileName = 'a-file';
    const file = `/a-directory/${fileName}`;

    beforeEach(async () => {
      sentResponse = new Messages.FilesystemFileResponse().setFile(
        new Messages.FileInfo().setName(fileName),
      );

      mockGRPCClient.filesystemFile.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryFile({ file });
    });

    it('should return a transformed response', async () => {
      const fileInfo = {
        file: {
          name: fileName,
        },
      };
      await expect(queryResult).resolves.toMatchObject(fileInfo);
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.filesystemFile).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemFileRequest),
        expect.any(Function),
      );
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.FilesystemFileRequest = captureMockArgument(
        mockGRPCClient.filesystemFile,
      );

      expect(sentRequest.getPath()).toBe(file);
      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#streamFile', () => {
    const file = '/a-directory/a-file';

    beforeEach(async () => {
      mockGRPCClient.filesystemFileStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamFile({ file }, identityCallback);
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.filesystemFileStream).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemFileStreamRequest),
      );
    });

    it('should have configured the request correctly', () => {
      const sentRequest: Messages.FilesystemFileStreamRequest = captureMockArgument(
        mockGRPCClient.filesystemFileStream,
      );

      expect(sentRequest.getPath()).toBe(file);
      expect(sentRequest.getSession()).toBeDefined();
    });
  });

  describe('#streamDirectory', () => {
    const directory = '/a-directory';

    beforeEach(async () => {
      mockGRPCClient.filesystemDirStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamDirectory({ directory }, identityCallback);
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
