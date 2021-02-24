import { FilesystemClient as FilesystemGRPCClient } from '../grpc/filesystem_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { FileSystemCopyOrMoveParams, FileSystemFile, FileSystemMakeDirectoryParams, FileInfoList, FileSystemRemoveParams, FileSystem, DirectoryEvent, FileEvent, FileSystemPathParams } from './fileSystem';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class FileSystemClient extends BaseClient<FilesystemGRPCClient> implements FileSystem {
    protected generateClient(): GRPCClientConstructor<FilesystemGRPCClient>;
    directory(params: FileSystemPathParams): Promise<FileInfoList>;
    listenDirectory(params: FileSystemPathParams, listener: StreamListener<DirectoryEvent>): StoppableStream<DirectoryEvent>;
    listenFile(params: FileSystemPathParams, listener: StreamListener<FileEvent>): StoppableStream<FileEvent>;
    copy(params: FileSystemCopyOrMoveParams): Promise<void>;
    move(params: FileSystemCopyOrMoveParams): Promise<void>;
    makeDir(path: FileSystemMakeDirectoryParams): Promise<void>;
    open(path: string): FileSystemFile;
    create(path: string): FileSystemFile;
    remove(params: FileSystemRemoveParams): Promise<void>;
    protected serviceName(): string;
}
