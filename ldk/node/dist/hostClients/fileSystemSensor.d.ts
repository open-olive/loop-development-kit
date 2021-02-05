import { StoppableStream, StreamListener } from './stoppables';
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
export declare enum FileSystemStreamAction {
    Unknown = "unknown",
    Create = "create",
    Write = "write",
    Remove = "remove",
    Rename = "rename",
    Chmod = "chmod"
}
export interface FileSystemStreamDirectoryResponse {
    files: FileInfo;
    action: FileSystemStreamAction;
}
export interface FileSystemQueryFileResponse {
    file: FileInfo | undefined;
}
export interface FileSystemStreamFileInfoResponse {
    file: FileInfo;
    action: FileSystemStreamAction;
}
export interface FileSystemCopyOrMoveParams {
    source: string;
    destination: string;
}
export interface FileSystemRemoveParams {
    path: string;
    recursive?: boolean;
}
export interface FileSystemMakeDirectoryParams {
    path: string;
    permissions: number;
}
export interface FileSystemFileChownParams {
    owner: number;
    group: number;
}
/**
 * The FileSystemFile interfaces provides access to the ability to write files.
 */
export interface FileSystemFile {
    read(): Promise<Uint8Array>;
    write(contents: Uint8Array): Promise<number>;
    close(): Promise<void>;
    info(): Promise<FileInfo>;
    changePermissions(permissions: number): Promise<void>;
    changeOwnership(params: FileSystemFileChownParams): Promise<void>;
    /**
     * The streamPromise will resolve when the stream is closed properly, or reject if the stream is closed due to an error.
     *
     * Trying to open a file that does not exist will return an error.
     */
    streamPromise: Promise<void>;
}
/**
 * The FileSystemSensor provides access to updates made to the file system
 */
export interface FileSystemSensor {
    /**
     * Queries the directory's contents.
     *
     * @param params - The parameters for the query.
     */
    queryDirectory(params: FileSystemQueryDirectoryParams): Promise<FileSystemQueryDirectoryResponse>;
    /**
     * Stream changes to the contents of this directory.
     *
     * @param params - The parameters for the stream.
     * @param listener - The listener function that's called when the file changes.
     */
    streamDirectory(params: FileSystemQueryDirectoryParams, listener: StreamListener<FileSystemStreamDirectoryResponse>): StoppableStream<FileSystemStreamDirectoryResponse>;
    /**
     * Streams changes to a specific file.
     *
     * @param params - The parameters for the stream.
     * @param listener - The listener function called when the file changes.
     */
    streamFileInfo(params: FileSystemQueryFileParams, listener: StreamListener<FileSystemStreamFileInfoResponse>): StoppableStream<FileSystemStreamFileInfoResponse>;
    /**
     * Creates a File object to work with.
     *
     * @param path - The path of the file to open.
     */
    openFile(path: string): FileSystemFile;
    /**
     * Creates a file and
     *
     * @param path - The path of the file to open.
     */
    createFile(path: string): FileSystemFile;
    /**
     * Creates a directory.
     *
     * @param path - Path of the directory to be created.
     * @returns Promise resolving when the directory has been created.
     */
    makeDirectory(path: FileSystemMakeDirectoryParams): Promise<void>;
    /**
     * Copies a file.
     *
     * @param params - The parameters for the copy operation.
     * @returns Promise resolving when the file has been copied.
     * TODO: Can we copy files only, or directories too?
     */
    copyFile(params: FileSystemCopyOrMoveParams): Promise<void>;
    /**
     * Moves a file.
     *
     * @param params - The parameters for the move operation.
     * @returns Promise resolving when the file has been moved.
     * TODO: Can we move files only, or directories too?
     */
    moveFile(params: FileSystemCopyOrMoveParams): Promise<void>;
    /**
     * Removes a file or directory.
     *
     * @param params - The parameters for the move operation.
     * @returns Promise resolving when the file or directory has been deleted.
     */
    removeFile(params: FileSystemRemoveParams): Promise<void>;
}
