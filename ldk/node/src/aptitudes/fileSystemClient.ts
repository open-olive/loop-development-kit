import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { FilesystemClient as FilesystemGRPCClient } from '../grpc/filesystem_grpc_pb';
import messages, { FileAction as FileActionPB } from '../grpc/filesystem_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import {
  FileSystemCopyOrMoveParams,
  FileSystemFile,
  FileSystemMakeDirectoryParams,
  FileInfoList,
  FileSystemRemoveParams,
  FileSystem,
  FileAction,
  DirectoryEvent,
  FileEvent, FileSystemPathParams,
} from './fileSystem';
import { StoppableStream, StreamListener } from './stoppables';
import { TransformingStream } from './transformingStream';
import { FileSystemFileImpl, parseFileInfo } from './fileSystemFile';

/**
 * @param action - The file action.
 * @internal
 */
function parseFileAction(action: FileActionPB): FileAction {
  switch (action) {
    case FileActionPB.FILE_ACTION_CREATE:
      return FileAction.Create;
    case FileActionPB.FILE_ACTION_WRITE:
      return FileAction.Write;
    case FileActionPB.FILE_ACTION_REMOVE:
      return FileAction.Remove;
    case FileActionPB.FILE_ACTION_RENAME:
      return FileAction.Rename;
    case FileActionPB.FILE_ACTION_CHMOD:
      return FileAction.Chmod;
    case FileActionPB.FILE_ACTION_UNKNOWN:
    default:
      return FileAction.Unknown;
  }
}

/**
 * @internal
 */
export class FileSystemClient
  extends BaseClient<FilesystemGRPCClient>
  implements FileSystem {
  protected generateClient(): GRPCClientConstructor<FilesystemGRPCClient> {
    return FilesystemGRPCClient;
  }

  directory(
    params: FileSystemPathParams,
  ): Promise<FileInfoList> {
    return this.buildQuery<
      messages.FilesystemDirRequest,
      messages.FilesystemDirResponse,
      FileInfoList
    >(
      (message, callback) => {
        this.client.filesystemDir(message, callback);
      },
      () => new messages.FilesystemDirRequest().setDirectory(params.path),
      (message) => ({
        files: message.getFilesList().map(parseFileInfo),
      }),
    );
  }

  listenDirectory(
    params: FileSystemPathParams,
    listener: StreamListener<DirectoryEvent>,
  ): StoppableStream<DirectoryEvent> {
    const message = new messages.FilesystemDirStreamRequest()
      .setDirectory(params.path)
      .setSession(this.createSessionMessage());
    return new TransformingStream<
      messages.FilesystemDirStreamResponse,
      DirectoryEvent
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

  listenFile(
    params: FileSystemPathParams,
    listener: StreamListener<FileEvent>,
  ): StoppableStream<FileEvent> {
    const message = new messages.FilesystemFileInfoStreamRequest()
      .setPath(params.path)
      .setSession(this.createSessionMessage());
    return new TransformingStream<
      messages.FilesystemFileInfoStreamResponse,
      FileEvent
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

  copy(params: FileSystemCopyOrMoveParams): Promise<void> {
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

  move(params: FileSystemCopyOrMoveParams): Promise<void> {
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

  makeDir(path: FileSystemMakeDirectoryParams): Promise<void> {
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

  open(path: string): FileSystemFile {
    const impl = new FileSystemFileImpl(
      this.session,
      this.client.filesystemFileStream(),
      this.logger,
    );
    impl.open(path);
    return impl;
  }

  create(path: string): FileSystemFile {
    const impl = new FileSystemFileImpl(
      this.session,
      this.client.filesystemFileStream(),
      this.logger,
    );
    impl.create(path);
    return impl;
  }

  remove(params: FileSystemRemoveParams): Promise<void> {
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

  protected serviceName(): string {
    return 'filesystem';
  }
}
