import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/filesystem_grpc_pb';
import * as Messages from '../grpc/filesystem_pb';
import { ConnInfo } from '../grpc/broker_pb';
import { FileSystemClient } from './filesystemClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import {
  FilesystemDirRequest,
  FilesystemDirStreamRequest,
  FilesystemFileRequest,
  FilesystemFileStreamRequest,
} from '../grpc/filesystem_pb';
import { TransformingStream } from './transformingStream';
import {
  captureMockArgument,
  createCallbackHandler,
  createStreamingHandler,
  identityCallback,
} from '../jest.helpers';

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

  beforeEach(() => {
    jest.resetAllMocks();
    subject = new FileSystemClient();
    connInfo = {
      address: 'a',
      serviceId: 1,
      network: 'n',
    };
    session = {
      loopid: 'LOOP_ID',
      token: 'TOKEN',
    };
    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());

    hostClient.mockImplementation(() => {
      return {
        waitForReady: waitForReadyMock,
        filesystemDir: queryDirectoryMock,
        filesystemFile: queryFileMock,
        filesystemDirStream: streamDirectoryMock,
        filesystemFileStream: streamFileMock,
      } as any;
    });
  });

  describe('#connect', () => {
    it('instantiates a new host client and waits for it to be ready', async () => {
      await expect(subject.connect(connInfo, session, logger)).resolves.toBe(
        undefined,
      );
    });
  });
  describe('#queryDirectory', () => {
    const directory = 'a-directory';

    beforeEach(async () => {
      const directoryResponse = new Messages.FilesystemDirResponse();
      queryDirectoryMock = jest
        .fn()
        .mockImplementation(createCallbackHandler(directoryResponse));
      await subject.connect(connInfo, session, logger);
      await expect(
        subject.queryDirectory({ directory }),
      ).resolves.toStrictEqual({ files: [] });
    });

    it('should call client.queryDirectory and resolve successfully', async () => {
      expect(queryDirectoryMock).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemDirRequest),
        expect.any(Function),
      );
    });
    it('should have configured the request with the right directory', () => {
      const request = captureMockArgument<FilesystemDirRequest>(
        queryDirectoryMock,
      );
      expect(request.getDirectory()).toBe(directory);
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<FilesystemDirRequest>(
        queryDirectoryMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#queryFile', () => {
    const file = '/a-directory/a-file';

    beforeEach(async () => {
      const fileResponse = new Messages.FilesystemFileResponse();
      queryFileMock = jest
        .fn()
        .mockImplementation(createCallbackHandler(fileResponse));
      await subject.connect(connInfo, session, logger);
      await expect(subject.queryFile({ file })).resolves.toStrictEqual({
        file: undefined,
      });
    });

    it('should call client.queryFile and resolve successfully', async () => {
      expect(queryFileMock).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemFileRequest),
        expect.any(Function),
      );
    });

    it('should have configured the request with the right path', () => {
      const request = captureMockArgument<FilesystemFileRequest>(queryFileMock);
      expect(request.getPath()).toBe(file);
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<FilesystemFileRequest>(queryFileMock);
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamFile', () => {
    const file = '/a-directory/a-file';

    beforeEach(async () => {
      const fileStreamResponse = new Messages.FilesystemFileStreamResponse();
      streamFileMock = jest
        .fn()
        .mockImplementation(createStreamingHandler(fileStreamResponse));
      await subject.connect(connInfo, session, logger);
      await expect(
        subject.streamFile({ file }, identityCallback),
      ).toBeInstanceOf(TransformingStream);
    });

    it('should call client.streamFile and resolve successfully', async () => {
      expect(streamFileMock).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemFileStreamRequest),
      );
    });

    it('should have configured the request with the right path', () => {
      const request = captureMockArgument<FilesystemFileStreamRequest>(
        streamFileMock,
      );
      expect(request.getPath()).toBe(file);
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<FilesystemFileStreamRequest>(
        streamFileMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });

  describe('#streamDirectory', () => {
    const directory = '/a-directory';

    beforeEach(async () => {
      const dirStreamResponse = new Messages.FilesystemDirStreamResponse();
      streamDirectoryMock = jest
        .fn()
        .mockImplementation(createStreamingHandler(dirStreamResponse));
      await subject.connect(connInfo, session, logger);
      await expect(
        subject.streamDirectory({ directory }, identityCallback),
      ).toBeInstanceOf(TransformingStream);
    });

    it('should call client.streamDir and resolve successfully', async () => {
      expect(streamDirectoryMock).toHaveBeenCalledWith(
        expect.any(Messages.FilesystemDirStreamRequest),
      );
    });

    it('should have configured the request with the right path', () => {
      const request = captureMockArgument<FilesystemDirStreamRequest>(
        streamDirectoryMock,
      );
      expect(request.getDirectory()).toBe(directory);
    });

    it('should have attached the initial connection session to the request', () => {
      const request = captureMockArgument<FilesystemDirStreamRequest>(
        streamDirectoryMock,
      );
      expect(request.getSession()?.toObject()).toStrictEqual(session);
    });
  });
});
