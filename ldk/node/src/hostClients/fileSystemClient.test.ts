import { mocked } from 'ts-jest/utils';
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
  defaultConnInfo,
  defaultSession,
  identityCallback,
} from '../jest.helpers';
import {
  FileSystemQueryDirectoryResponse,
  FileSystemQueryFileResponse,
} from './fileSystemService';

jest.mock('../grpc/filesystem_grpc_pb');

const hostClient = mocked(Services.FilesystemClient);

const logger = new Logger('test-logger');

describe('FileSystemClient', () => {
  let subject: FileSystemClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let queryDirectoryMock: jest.Mock;
  let queryFileMock: jest.Mock;
  let streamDirectoryMock: jest.Mock;
  let streamFileMock: jest.Mock;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new FileSystemClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());
    queryDirectoryMock = jest.fn();
    queryFileMock = jest.fn();
    streamDirectoryMock = jest.fn();
    streamFileMock = jest.fn();

    hostClient.mockImplementation(() => {
      return {
        waitForReady: waitForReadyMock,
        filesystemDir: queryDirectoryMock,
        filesystemFile: queryFileMock,
        filesystemDirStream: streamDirectoryMock,
        filesystemFileStream: streamFileMock,
      } as any;
    });

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

      queryDirectoryMock.mockImplementation(
        createCallbackHandler(sentResponse),
      );

      queryResult = subject.queryDirectory({ directory });

      sentRequest = captureMockArgument(queryDirectoryMock);
    });

    it('should return a transformed response', async () => {
      const directoryInfo = {
        files: sentResponse.getFilesList(),
      };
      await expect(queryResult).resolves.toStrictEqual(directoryInfo);
    });

    it('should call client.filesystemDir and resolve successfully', async () => {
      expect(queryDirectoryMock).toHaveBeenCalledWith(
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

      queryFileMock.mockImplementation(createCallbackHandler(sentResponse));

      queryResult = subject.queryFile({ file });

      sentRequest = captureMockArgument(queryFileMock);
    });

    it('should return a transformed response', async () => {
      const fileInfo = {
        file: sentResponse.getFile(),
      };
      await expect(queryResult).resolves.toStrictEqual(fileInfo);
    });

    it('should call client.filesystemFile and resolve successfully', async () => {
      expect(queryFileMock).toHaveBeenCalledWith(
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
      streamFileMock.mockImplementation(createStreamingHandler());

      subject.streamFile({ file }, identityCallback);

      sentRequest = captureMockArgument(streamFileMock);
    });

    it('should call client.filesystemDirStream and resolve successfully', async () => {
      expect(streamFileMock).toHaveBeenCalledWith(
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
      streamDirectoryMock.mockImplementation(createStreamingHandler());

      subject.streamDirectory({ directory }, identityCallback);

      sentRequest = captureMockArgument(streamDirectoryMock);
    });

    it('should have configured the request with the right path', () => {
      expect(sentRequest.getDirectory()).toBe(directory);
    });

    it('should have attached the initial connection session to the request', () => {
      expect(sentRequest.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
