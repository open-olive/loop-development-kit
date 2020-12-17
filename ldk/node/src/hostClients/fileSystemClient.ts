import { FilesystemClient as FilesystemGRPCClient } from '../grpc/filesystem_grpc_pb';
import messages, { FileAction } from '../grpc/filesystem_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import {
  FileInfo,
  FileSystemService,
  FileSystemQueryDirectoryParams,
  FileSystemQueryDirectoryResponse,
  FileSystemQueryFileParams,
  FileSystemQueryFileResponse,
  FileSystemStreamAction,
  FileSystemStreamDirectoryResponse,
  FileSystemStreamFileResponse,
} from './fileSystemService';
import { StoppableStream, StreamListener } from './stoppables';
import { TransformingStream } from './transformingStream';

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
 * @param fileInfo - The file info.
 * @internal
 */
function parseFileInfo(fileInfo: messages.FileInfo): FileInfo {
  return {
    name: fileInfo.getName(),
    size: fileInfo.getSize(),
    mode: fileInfo.getMode(),
    updated: fileInfo.getUpdated()?.toDate(),
    isDir: fileInfo.getIsdir(),
  };
}

/**
 * @internal
 */
export class FileSystemClient
  extends BaseClient<FilesystemGRPCClient>
  implements FileSystemService {
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

  queryFile(
    params: FileSystemQueryFileParams,
  ): Promise<FileSystemQueryFileResponse> {
    return this.buildQuery<
      messages.FilesystemFileRequest,
      messages.FilesystemFileResponse,
      FileSystemQueryFileResponse
    >(
      (message, callback) => this.client.filesystemFile(message, callback),
      () => new messages.FilesystemFileRequest().setPath(params.file),
      (message) => {
        const fileInfo = message.getFile();
        return { file: fileInfo ? parseFileInfo(fileInfo) : undefined };
      },
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

  streamFile(
    params: FileSystemQueryFileParams,
    listener: StreamListener<FileSystemStreamFileResponse>,
  ): StoppableStream<FileSystemStreamFileResponse> {
    const message = new messages.FilesystemFileStreamRequest()
      .setPath(params.file)
      .setSession(this.createSessionMessage());
    return new TransformingStream<
      messages.FilesystemFileStreamResponse,
      FileSystemStreamFileResponse
    >(
      this.client.filesystemFileStream(message),
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
}
