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

export interface FileEvent {
  action: string;
  info: FileInfo;
}

export enum WriteOperation {
  overwrite = 1,
  append = 2,
}

export type WriteMode = number;

// TODO: finish comments documentation

/**
 * The FileSystem interfaces provides access to the ability to read, write, delete files.
 */
export interface Filesystem {
  /**
   * Copies a file from one location to another.
   * @param source
   * @param destination
   */
  copy(source: string, destination: string): Promise<void>;

  /**
   * Returns all files in the specified directory
   * @param path - path of the specified directory
   */
  dir(path: string): Promise<FileInfo[]>;

  /**
   * Return true if a file or directory exists at the specified location.
   * @param path
   */
  exists(path: string): Promise<boolean>;

  /**
   * Listen changes to the contents of the directory.
   *
   * @param path - path of directory to listen.
   * @param callback - The callback function that's called when a file in the directory changes.
   */
  listenDir(path: string, callback: (fileEvent: FileEvent) => void): void;

  /**
   * Listen changes to a specific file.
   *
   * @param Path - path of file to listen.
   * @param callback - The callback function called when the file changes.
   */
  listenFile(path: string, callback: (fileEvent: FileEvent) => void): void;

  /**
   * Makes a directory at the specified location.
   * @param destination
   * @param writeMode
   */
  makeDir(destination: string, writeMode: WriteMode): Promise<void>;

  /**
   * Moves a file from one location to another.
   * @param source
   * @param destination
   */
  move(source: string, destination: string): Promise<void>;

  /**
   * Returns the contents of the specified file.
   * @param path
   */
  readFile(path: string): Promise<Uint8Array>;

  /**
   * Removes a file/directory at the specified path.
   * @param source
   */
  remove(source: string): Promise<void>;

  /**
   * Returns info about a specified file/directory.
   * @param path
   */
  stat(path: string): Promise<FileInfo>;

  /**
   * Writes (overwrites or appends) data to the specified file with specific permissions.
   * @param path
   * @param data
   * @param writeOperation
   * @param writeMode
   */
  writeFile(
    path: string,
    data: Uint8Array,
    writeOperation: WriteOperation,
    writeMode: WriteMode,
  ): Promise<void>;
}

export function copy(source: string, destination: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      oliveHelps.filesystem.copy(source, destination, () => resolve());
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function dir(path: string): Promise<FileInfo[]> {
  return new Promise<FileInfo[]>((resolve, reject) => {
    try {
      oliveHelps.filesystem.dir(path, (fileInfo: FileInfo[]) => resolve(fileInfo));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function exists(path: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      oliveHelps.filesystem.exists(path, (result: boolean) => resolve(result));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function listenDir(path: string, callback: (fileEvent: FileEvent) => void): void {
  return oliveHelps.filesystem.listenDir(path, callback);
}

export function listenFile(path: string, callback: (fileEvent: FileEvent) => void): void {
  return oliveHelps.filesystem.listenFile(path, callback);
}

export function makeDir(destination: string, permissions: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      oliveHelps.filesystem.makeDir(destination, permissions, () => resolve());
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function move(source: string, destination: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      oliveHelps.filesystem.move(source, destination, () => resolve());
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function readFile(path: string): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    try {
      oliveHelps.filesystem.readFile(path, (data: Uint8Array) => resolve(data));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function remove(source: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      oliveHelps.filesystem.remove(source, () => resolve());
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function stat(path: string): Promise<FileInfo> {
  return new Promise<FileInfo>((resolve, reject) => {
    try {
      oliveHelps.filesystem.stat(path, (fileInfo) => resolve(fileInfo));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function writeFile(
  path: string,
  data: Uint8Array,
  writeOperation: WriteOperation,
  writeMode: WriteMode,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      oliveHelps.filesystem.writeFile(path, data, writeOperation, writeMode, () => resolve());
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export const filesystem: Filesystem = {
  copy,
  dir,
  exists,
  listenDir,
  listenFile,
  makeDir,
  move,
  readFile,
  remove,
  stat,
  writeFile,
};
