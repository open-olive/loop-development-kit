import { StoppableStream, StreamListener } from './stoppableStream';

/**
 * An object containing file data.
 */
export interface FileInfo {
  /**
   * The file name, not including path.
   */
  name: string;
  /**
   * The file size in bytes.
   */
  size: number;
  /**
   * The access permissions for the file.
   * TODO: Determine representation for Windows vs MacOs vs Linux.
   */
  mode: number;
  /**
   * The last updated date, if present.
   */
  updated: Date | undefined;
  /**
   * Whether the entry is a directory.
   */
  isDir: boolean;
}

export interface FileSystemQueryDirectoryParams {
  directory: string;
}

export interface FileSystemQueryFileParams {
  file: string;
}

export interface FileSystemQueryDirectoryResponse {
  files: FileInfo[];
}

// This rule is triggering for some reason.
// eslint-disable-next-line no-shadow
export enum FileSystemStreamAction {
  Unknown = 'unknown',
  Create = 'create',
  Write = 'write',
  Remove = 'remove',
  Rename = 'rename',
  Chmod = 'chmod',
}

export interface FileSystemStreamDirectoryResponse {
  files: FileInfo;
  action: FileSystemStreamAction;
}

export interface FileSystemQueryFileResponse {
  file: FileInfo | undefined;
}

export interface FileSystemStreamFileResponse {
  file: FileInfo;
  action: FileSystemStreamAction;
}

/**
 * The FileSystemService provides access to updates made to the file system
 */
export interface FileSystemService {
  /**
   * Queries the directory's contents.
   *
   * @param params - The parameters for the query.
   */
  queryDirectory(
    params: FileSystemQueryDirectoryParams,
  ): Promise<FileSystemQueryDirectoryResponse>;

  /**
   * Stream changes to the contents of this directory.
   *
   * @param params - The parameters for the stream.
   * @param listener - The listener function that's called when the file changes.
   */
  streamDirectory(
    params: FileSystemQueryDirectoryParams,
    listener: StreamListener<FileSystemStreamDirectoryResponse>,
  ): StoppableStream<FileSystemStreamDirectoryResponse>;

  /**
   * Queries file data.
   *
   * @param params - The parameters for the query.
   * @returns a Promise resolving with the File Information.
   *
   * TODO: What happens if the file does not exist?
   */
  queryFile(
    params: FileSystemQueryFileParams,
  ): Promise<FileSystemQueryFileResponse>;

  /**
   * Streams changes to a specific file.
   *
   * @param params - The parameters for the stream.
   * @param listener - The listener function called when the file changes.
   */
  streamFile(
    params: FileSystemQueryFileParams,
    listener: StreamListener<FileSystemStreamFileResponse>,
  ): StoppableStream<FileSystemStreamFileResponse>;
}
