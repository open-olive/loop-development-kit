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
  listenDir(path: string, callback: (fileEvent: FileEvent) => void): void;

  /**
   * Listen changes to a specific file.
   *
   * @param Path - path of file to listen.
   * @param callback - the callback function called when the file changes.
   */
  listenFile(path: string, callback: (fileEvent: FileEvent) => void): void;

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
   * @param path - path to the file location to be written
   * @param data - byte array data
   * @param writeOperation - indicates if file shold be ovewritten or appended with the provided data
   * @param writeMode - file mode and permission bits
   */
  writeFile(
    path: string,
    data: Uint8Array,
    writeOperation: WriteOperation,
    writeMode: WriteMode,
  ): Promise<void>;

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

export function listenDir(path: string, callback: (fileEvent: FileEvent) => void): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      oliveHelps.filesystem.listenDir(path, callback);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });  
}

export function listenFile(path: string, callback: (fileEvent: FileEvent) => void): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      oliveHelps.filesystem.listenFile(path, callback);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function makeDir(destination: string, writeMode: WriteMode): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      oliveHelps.filesystem.makeDir(destination, writeMode, () => resolve());
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
      oliveHelps.filesystem.readFile(path, (data: ArrayBuffer) => resolve(new Uint8Array(data)));
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

export function join(segments: string[]): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      oliveHelps.filesystem.join(segments, (path: string) => resolve(path));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}