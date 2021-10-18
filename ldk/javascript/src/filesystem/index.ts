import {
  promisify,
  promisifyWithFourParams,
  promisifyWithParam,
  promisifyWithTwoParams,
  promisifyMappedWithParam,
  promisifyMappedListenableWithParam,
} from '../promisify';
import { Cancellable } from '../cancellable';
import * as mapper from '../utils/mapper';
import { mapToFileInfo, mapToFileEvent, mapToFileInfoArray } from './mapper';
import {
  FileInfo,
  FileEvent,
  RenamedFileEvent,
  RemovedFileEvent,
  WriteMode,
  WriteFileParams,
} from './types';

export * from './types';

/**
 *  The FileSystem aptitude provides access to the ability to read, write, delete files.
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
  listenDir(
    path: string,
    callback: (fileEvent: FileEvent | RenamedFileEvent | RemovedFileEvent) => void,
  ): Promise<Cancellable>;

  /**
   * Listen changes to a specific file.
   *
   * @param path - path of file to listen.
   * @param callback - the callback function called when the file changes.
   */
  listenFile(
    path: string,
    callback: (fileEvent: FileEvent | RenamedFileEvent | RemovedFileEvent) => void,
  ): Promise<Cancellable>;

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
   * @returns - a single path separated with an OS specific Separator
   */
  join(segments: string[]): Promise<string>;

  /**
   * Unzips sourced file to a specified directory.
   * @param zipFilePath - path to the file to unzip. File has to have .zip extension.
   * @param outputDirPath - path to the output directory. If the unzipped file already exists in the output directory, the file will be overwritten.
   */
  unzip(zipFilePath: string, outputDirPath: string): Promise<void>;

  /**
   * Opens a file using the default tool for the extension provided in the
   * path parameter, including directories. Limited to .csv, .doc, .docx,
   * .pdf, .txt, .xls, .xlsx
   *
   * @param path - a string providing the path to the file to open
   */
  openWithDefaultApplication(path: string): Promise<void>;

  /**
   * Get the Loop's working directory
   *
   * @returns - the fully qualified path of the Loop's working directory as a string
   */
  workDir(): Promise<string>;
}

export function copy(source: string, destination: string): Promise<void> {
  return promisifyWithTwoParams(source, destination, oliveHelps.filesystem.copy);
}

export function dir(path: string): Promise<FileInfo[]> {
  return promisifyMappedWithParam(path, mapToFileInfoArray, oliveHelps.filesystem.dir);
}

export function exists(path: string): Promise<boolean> {
  return promisifyWithParam(path, oliveHelps.filesystem.exists);
}

export function listenDir(
  path: string,
  callback: (fileEvent: FileEvent | RenamedFileEvent | RemovedFileEvent) => void,
): Promise<Cancellable> {
  return promisifyMappedListenableWithParam(
    path,
    mapToFileEvent,
    callback,
    oliveHelps.filesystem.listenDir,
  );
}

export function listenFile(
  path: string,
  callback: (fileEvent: FileEvent | RenamedFileEvent | RemovedFileEvent) => void,
): Promise<Cancellable> {
  return promisifyMappedListenableWithParam(
    path,
    mapToFileEvent,
    callback,
    oliveHelps.filesystem.listenFile,
  );
}

export function makeDir(destination: string, writeMode: WriteMode): Promise<void> {
  return promisifyWithTwoParams(destination, writeMode, oliveHelps.filesystem.makeDir);
}

export function move(source: string, destination: string): Promise<void> {
  return promisifyWithTwoParams(source, destination, oliveHelps.filesystem.move);
}

export function readFile(path: string): Promise<Uint8Array> {
  return promisifyMappedWithParam(path, mapper.mapToUint8Array, oliveHelps.filesystem.readFile);
}

export function remove(source: string): Promise<void> {
  return promisifyWithParam(source, oliveHelps.filesystem.remove);
}

export function stat(path: string): Promise<FileInfo> {
  return promisifyMappedWithParam(path, mapToFileInfo, oliveHelps.filesystem.stat);
}

export function writeFile({
  path,
  data,
  writeOperation,
  writeMode,
}: WriteFileParams): Promise<void> {
  return promisifyWithFourParams(
    path,
    mapper.mapToBinaryData(data),
    writeOperation,
    writeMode,
    oliveHelps.filesystem.writeFile,
  );
}

export function join(segments: string[]): Promise<string> {
  return promisifyWithParam(segments, oliveHelps.filesystem.join);
}

export function unzip(zipFilePath: string, outputDirPath: string): Promise<void> {
  return promisifyWithTwoParams(zipFilePath, outputDirPath, oliveHelps.filesystem.unzip);
}

export function openWithDefaultApplication(path: string): Promise<void> {
  return promisifyWithParam(path, oliveHelps.filesystem.openWithDefaultApplication);
}

export function workDir(): Promise<string> {
  return promisify(oliveHelps.filesystem.workDir);
}
