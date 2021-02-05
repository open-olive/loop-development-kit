import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { FilesystemClient as FilesystemGRPCClient } from '../grpc/filesystem_grpc_pb';
import messages, { FileAction } from '../grpc/filesystem_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import {
  FileSystemCopyOrMoveParams,
  FileSystemFile,
  FileSystemMakeDirectoryParams,
  FileSystemQueryDirectoryParams,
  FileSystemQueryDirectoryResponse,
  FileSystemQueryFileParams,
  FileSystemRemoveParams,
  FileSystemSensor,
  FileSystemStreamAction,
  FileSystemStreamDirectoryResponse,
  FileSystemStreamFileInfoResponse,
} from './fileSystemSensor';
import { StoppableStream, StreamListener } from './stoppables';
import { TransformingStream } from './transformingStream';
import { FileSystemFileImpl, parseFileInfo } from './fileSystemFile';

/**
 * @param action - The file action.
 * @internal
 */
function parseFileAction(action: FileAction): FileSystemStreamAction {
  switch (action) {
    case FileAction.FILE_ACTION_CREATE:
      return FileSystemStreamAction.Create;
    case FileAction.FILE_ACTION_WRITE:
      return FileSystemStreamAction.Write;
    case FileAction.FILE_ACTION_REMOVE:
      return FileSystemStreamAction.Remove;
    case FileAction.FILE_ACTION_RENAME:
      return FileSystemStreamAction.Rename;
    case FileAction.FILE_ACTION_CHMOD:
      return FileSystemStreamAction.Chmod;
    case FileAction.FILE_ACTION_UNKNOWN:
    default:
      return FileSystemStreamAction.Unknown;
  }
}

/**
 * @internal
 */
export class FileSystemClient
  extends BaseClient<FilesystemGRPCClient>
  implements FileSystemSensor {
  protected generateClient(): GRPCClientConstructor<FilesystemGRPCClient> {
    return FilesystemGRPCClient;
  }

  queryDirectory(
    params: FileSystemQueryDirectoryParams,
  ): Promise<FileSystemQueryDirectoryResponse> {
    return this.buildQuery<
      messages.FilesystemDirRequest,
      messages.FilesystemDirResponse,
      FileSystemQueryDirectoryResponse
    >(
      (message, callback) => {
        this.client.filesystemDir(message, callback);
      },
      () => new messages.FilesystemDirRequest().setDirectory(params.directory),
      (message) => ({
        files: message.getFilesList().map(parseFileInfo),
      }),
    );
  }

  streamDirectory(
    params: FileSystemQueryDirectoryParams,
    listener: StreamListener<FileSystemStreamDirectoryResponse>,
  ): StoppableStream<FileSystemStreamDirectoryResponse> {
    const message = new messages.FilesystemDirStreamRequest()
      .setDirectory(params.directory)
      .setSession(this.createSessionMessage());
    return new TransformingStream<
      messages.FilesystemDirStreamResponse,
      FileSystemStreamDirectoryResponse
    >(
      this.client.filesystemDirStream(message),
      (response) => {
        const fileInfo = response.getFile();
        if (fileInfo == null) {
          return undefined;
        }
        return {
          files: parseFileInfo(fileInfo),
          action: parseFileAction(response.getAction()),
        };
      },
      listener,
    );
  }

  streamFileInfo(
    params: FileSystemQueryFileParams,
    listener: StreamListener<FileSystemStreamFileInfoResponse>,
  ): StoppableStream<FileSystemStreamFileInfoResponse> {
    const message = new messages.FilesystemFileInfoStreamRequest()
      .setPath(params.file)
      .setSession(this.createSessionMessage());
    return new TransformingStream<
      messages.FilesystemFileInfoStreamResponse,
      FileSystemStreamFileInfoResponse
    >(
      this.client.filesystemFileInfoStream(message),
      (response) => {
        const fileInfo = response.getFile();
        if (fileInfo == null) {
          return undefined;
        }
        return {
          file: parseFileInfo(fileInfo),
          action: parseFileAction(response.getAction()),
        };
      },
      listener,
    );
  }

  copyFile(params: FileSystemCopyOrMoveParams): Promise<void> {
    const message = new messages.FilesystemCopyRequest()
      .setDest(params.destination)
      .setSource(params.source)
      .setSession(this.createSessionMessage());
    return this.buildQuery<messages.FilesystemCopyRequest, Empty, void>(
      (request, callback) => {
        this.client.filesystemCopy(request, callback);
      },
      () => message,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  moveFile(params: FileSystemCopyOrMoveParams): Promise<void> {
    const message = new messages.FilesystemMoveRequest()
      .setDest(params.destination)
      .setSource(params.source)
      .setSession(this.createSessionMessage());
    return this.buildQuery<messages.FilesystemMoveRequest, Empty, void>(
      (request, callback) => {
        this.client.filesystemMove(request, callback);
      },
      () => message,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  makeDirectory(path: FileSystemMakeDirectoryParams): Promise<void> {
    return this.buildQuery<messages.FilesystemMakeDirRequest, Empty, void>(
      (request, callback) => {
        this.client.filesystemMakeDir(request, callback);
      },
      () =>
        new messages.FilesystemMakeDirRequest()
          .setPath(path.path)
          .setPerm(path.permissions)
          .setSession(this.createSessionMessage()),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  openFile(path: string): FileSystemFile {
    const impl = new FileSystemFileImpl(
      this.session,
      this.client.filesystemFileStream(),
      this.logger,
    );
    impl.open(path);
    return impl;
  }

  createFile(path: string): FileSystemFile {
    const impl = new FileSystemFileImpl(
      this.session,
      this.client.filesystemFileStream(),
      this.logger,
    );
    impl.create(path);
    return impl;
  }

  removeFile(params: FileSystemRemoveParams): Promise<void> {
    return this.buildQuery<messages.FilesystemRemoveRequest, Empty, void>(
      (request, callback) => {
        this.client.filesystemRemove(request, callback);
      },
      () =>
        new messages.FilesystemRemoveRequest()
          .setPath(params.path)
          .setRecursive(params.recursive || false)
          .setSession(this.createSessionMessage()),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  protected sensorName(): string {
    return 'filesystem';
  }
}
