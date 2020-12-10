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
    let sentRequest: Messages.FilesystemDirRequest;
    let sentResponse: Messages.FilesystemDirResponse;
    let queryResult: Promise<FileSystemQueryDirectoryResponse>;
    const directory = 'a-directory';

    beforeEach(async () => {
      sentResponse = new Messages.FilesystemDirResponse();

      mockGRPCClient.filesystemDir.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryDirectory({ directory });

      sentRequest = captureMockArgument(mockGRPCClient.filesystemDir);
    });

    it('should return a transformed response', async () => {
      const directoryInfo = {
        files: sentResponse.getFilesList(),
      };
      await expect(queryResult).resolves.toStrictEqual(directoryInfo);
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.filesystemDir).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemDirRequest),
        expect.any(Function),
      );
    });

    it('should have configured the request with the right directory', () => {
      expect(sentRequest.getDirectory()).toBe(directory);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#queryFile', () => {
    let sentRequest: Messages.FilesystemFileRequest;
    let sentResponse: Messages.FilesystemFileResponse;
    let queryResult: Promise<FileSystemQueryFileResponse>;
    const file = '/a-directory/a-file';

    beforeEach(async () => {
      sentResponse = new Messages.FilesystemFileResponse();

      mockGRPCClient.filesystemFile.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryFile({ file });

      sentRequest = captureMockArgument(mockGRPCClient.filesystemFile);
    });

    it('should return a transformed response', async () => {
      const fileInfo = {
        file: sentResponse.getFile(),
      };
      await expect(queryResult).resolves.toStrictEqual(fileInfo);
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.filesystemFile).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemFileRequest),
        expect.any(Function),
      );
    });

    it('should have configured the request with the right path', () => {
      expect(sentRequest.getPath()).toBe(file);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamFile', () => {
    let sentRequest: Messages.FilesystemFileStreamRequest;
    const file = '/a-directory/a-file';

    beforeEach(async () => {
      mockGRPCClient.filesystemFileStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamFile({ file }, identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.filesystemFileStream);
    });

    it('should call grpc client function', async () => {
      expect(mockGRPCClient.filesystemFileStream).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemFileStreamRequest),
      );
    });

    it('should have configured the request with the right path', () => {
      expect(sentRequest.getPath()).toBe(file);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamDirectory', () => {
    let sentRequest: Messages.FilesystemDirStreamRequest;
    const directory = '/a-directory';

    beforeEach(async () => {
      mockGRPCClient.filesystemDirStream.mockImplementation(
        createStreamingHandler(),
      );

      subject.streamDirectory({ directory }, identityCallback);

      sentRequest = captureMockArgument(mockGRPCClient.filesystemDirStream);
    });

    it('should have configured the request with the right path', () => {
      expect(sentRequest.getDirectory()).toBe(directory);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
