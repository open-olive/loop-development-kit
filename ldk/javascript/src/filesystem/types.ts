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
  modTime: Date; // convert the value to js date object
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
 * An object representing a file removed action and the file name which action were applied to.
 */
export interface RemovedFileEvent {
  action: 'Remove';
  name: string;
}

/**
 * An object representing a file renamed action and the file name which action were applied to.
 */
export interface RenamedFileEvent {
  action: 'Rename';
  name: string;
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
   * file data
   */
  data: string | Uint8Array;
  /**
   * indicates if file should be overwritten or appended with the provided data
   */
  writeOperation: WriteOperation;
  /**
   * file mode and permission bits. Should be provided as octal value (ex. 0o755, 0o777, ...)
   */
  writeMode: WriteMode;
}
