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
export interface FileSystemPathParams {
    path: string;
}
export interface FileInfoList {
    files: FileInfo[];
}
export declare enum FileAction {
    Unknown = "unknown",
    Create = "create",
    Write = "write",
    Remove = "remove",
    Rename = "rename",
    Chmod = "chmod"
}
export interface DirectoryEvent {
    files: FileInfo;
    action: FileAction;
}
export interface FileEvent {
    file: FileInfo;
    action: FileAction;
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
 * The FileSystemFile allows you to read, write and change metadata for a file.
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
 * The File System Aptitude allows you to perform basic file and directory manipulation, as well as query and listen for file system updates.
 */
export interface FileSystem {
    /**
     * Queries the directory's contents.
     *
     * @param params - The parameters for the text.
     */
    directory(params: FileSystemPathParams): Promise<FileInfoList>;
    /**
     * Listen for changes to the contents of this directory.
     *
     * @param params - The parameters for the stream.
     * @param listener - The listener function that's called when the file changes.
     */
    listenDirectory(params: FileSystemPathParams, listener: StreamListener<DirectoryEvent>): StoppableStream<DirectoryEvent>;
    /**
     * Listen for changes to a specific file.
     *
     * @param params - The parameters for the stream.
     * @param listener - The listener function called when the file changes.
     */
    listenFile(params: FileSystemPathParams, listener: StreamListener<FileEvent>): StoppableStream<FileEvent>;
    /**
     * Opens a FileSystemFile object to work with.
     *
     * @param path - The path of the file to open.
     */
    open(path: string): FileSystemFile;
    /**
     * Creates a file and provides a FileSystemFile object to work with.
     *
     * @param path - The path of the file to create.
     */
    create(path: string): FileSystemFile;
    /**
     * Creates a directory.
     *
     * @param path - Path of the directory to be created.
     * @returns Promise resolving when the directory has been created.
     */
    makeDir(path: FileSystemMakeDirectoryParams): Promise<void>;
    /**
     * Copies a file.
     *
     * @param params - The parameters for the copy operation.
     * @returns Promise resolving when the file has been copied.
     * TODO: Can we copy files only, or directories too?
     */
    copy(params: FileSystemCopyOrMoveParams): Promise<void>;
    /**
     * Moves a file.
     *
     * @param params - The parameters for the move operation.
     * @returns Promise resolving when the file has been moved.
     * TODO: Can we move files only, or directories too?
     */
    move(params: FileSystemCopyOrMoveParams): Promise<void>;
    /**
     * Removes a file or directory.
     *
     * @param params - The parameters for the move operation.
     * @returns Promise resolving when the file or directory has been deleted.
     */
    remove(params: FileSystemRemoveParams): Promise<void>;
}
