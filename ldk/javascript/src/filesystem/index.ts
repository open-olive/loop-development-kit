import {
  promisifyListenableWithParam,
  promisifyWithFourParams,
  promisifyWithParam,
  promisifyWithTwoParams,
  promisifyWithMapper,
} from '../promisify';
import { Cancellable } from '../cancellable';

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
   */
  mode: string;
  /**
   * The last updated time, if present.
   */
  modTime: string;
  /**
   * Whether the entry is a directory.
   */
  isDir: boolean;
}

/**
 * An object representing an action and the file details which action were applied to.
 */
export interface FileEvent {
  action: string;
  info: FileInfo;
}

/**
 * An object representing the action to execute while writing to the file system
 */
export enum WriteOperation {
  overwrite = 1,
  append = 2,
}

/**
 * Represents file mode and permission bits
 */
export type WriteMode = number;

export interface WriteFileParams {
  /**
   * path to the file location to be written
   */
  path: string;
  /**
   * byte array data
   */
  data: Uint8Array;
  /**
   * indicates if file should be overwritten or appended with the provided data
   */
  writeOperation: WriteOperation;
  /**
   * file mode and permission bits
   */
  writeMode: WriteMode;
}

/**
 * The FileSystem interfaces provides access to the ability to read, write, delete files.
 */
export interface Filesystem {
  /**
   * Copies a file from one location to another.
   * @param source - path to the file to copy from
   * @param destination - path to the file to copy to
   */
  copy(source: string, destination: string): Promise<void>;

  /**
   * Returns all files in the specified directory
   * @param path - path of the specified directory
   */
  dir(path: string): Promise<FileInfo[]>;

  /**
   * Return true if a file or directory exists at the specified location.
   * @param path - path to the specified file or directory
   */
  exists(path: string): Promise<boolean>;

  /**
   * Listen changes to the contents of the directory.
   *
   * @param path - path of directory to listen.
   * @param callback - the callback function that's called when a file in the directory changes.
   */
  listenDir(path: string, callback: (fileEvent: FileEvent) => void): Promise<Cancellable>;

  /**
   * Listen changes to a specific file.
   *
   * @param path - path of file to listen.
   * @param callback - the callback function called when the file changes.
   */
  listenFile(path: string, callback: (fileEvent: FileEvent) => void): Promise<Cancellable>;

  /**
   * Makes a directory at the specified location.
   * @param destination - destination of where directory needs to be created at
   * @param writeMode - file mode and permission bits
   */
  makeDir(destination: string, writeMode: WriteMode): Promise<void>;

  /**
   * Moves a file from one location to another.
   * @param source - path of where to move the file from
   * @param destination - path of where to move the file to
   */
  move(source: string, destination: string): Promise<void>;

  /**
   * Returns the contents of the specified file.
   * @param path - path of the specified file
   */
  readFile(path: string): Promise<Uint8Array>;

  /**
   * Removes a file/directory at the specified path.
   * @param source - path of the file or directory to remove
   */
  remove(source: string): Promise<void>;

  /**
   * Returns info about a specified file/directory.
   * @param path - path to the specified file or directory
   */
  stat(path: string): Promise<FileInfo>;

  /**
   * Writes (overwrites or appends) data to the specified file with specific permissions. New file will be created if file not exist
   */
  writeFile(params: WriteFileParams): Promise<void>;

  /**
   * Join joins an array of path elements into a single path, separating them with an OS specific Separator.
   * Empty elements are ignored. The result is Cleaned. However, if the argument list is empty or all its elements are empty,
   * Join returns an empty string. On Windows, the result will only be a UNC path if the first non-empty element is a UNC path.
   *
   * @param segments - an array of path segments to join
   * @returns - a single path seperated with an OS specific Separator
   */
  join(segments: string[]): Promise<string>;
}

export function copy(source: string, destination: string): Promise<void> {
  return promisifyWithTwoParams(source, destination, oliveHelps.filesystem.copy);
}

export function dir(path: string): Promise<FileInfo[]> {
  return promisifyWithParam(path, oliveHelps.filesystem.dir);
}

export function exists(path: string): Promise<boolean> {
  return promisifyWithParam(path, oliveHelps.filesystem.exists);
}

export function listenDir(
  path: string,
  callback: (fileEvent: FileEvent) => void,
): Promise<Cancellable> {
  return promisifyListenableWithParam(path, callback, oliveHelps.filesystem.listenDir);
}

export function listenFile(
  path: string,
  callback: (fileEvent: FileEvent) => void,
): Promise<Cancellable> {
  return promisifyListenableWithParam(path, callback, oliveHelps.filesystem.listenFile);
}

export function makeDir(destination: string, writeMode: WriteMode): Promise<void> {
  return promisifyWithTwoParams(destination, writeMode, oliveHelps.filesystem.makeDir);
}

export function move(source: string, destination: string): Promise<void> {
  return promisifyWithTwoParams(source, destination, oliveHelps.filesystem.move);
}

const mapToUint8Array = (data: ArrayBuffer) => (new Uint8Array(data));

export function readFile(path: string): Promise<Uint8Array> {
  return promisifyWithMapper(path, mapToUint8Array, oliveHelps.filesystem.readFile);
}

export function remove(source: string): Promise<void> {
  return promisifyWithParam(source, oliveHelps.filesystem.remove);
}

export function stat(path: string): Promise<FileInfo> {
  return promisifyWithParam(path, oliveHelps.filesystem.stat);
}

export function writeFile({
  path,
  data,
  writeOperation,
  writeMode,
}: WriteFileParams): Promise<void> {
  // converting to a simplified array to satisfy sidekick contract as goja has major issues with regular Uint8Array
  const simplifiedArray = [...data];
  return promisifyWithFourParams(
    path,
    simplifiedArray,
    writeOperation,
    writeMode,
    oliveHelps.filesystem.writeFile,
  );
}

export function join(segments: string[]): Promise<string> {
  return promisifyWithParam(segments, oliveHelps.filesystem.join);
}
