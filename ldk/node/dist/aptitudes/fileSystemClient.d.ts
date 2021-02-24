import { FilesystemClient as FilesystemGRPCClient } from '../grpc/filesystem_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { FileSystemCopyOrMoveParams, FileSystemFile, FileSystemMakeDirectoryParams, FileSystemQueryDirectoryParams, FileSystemQueryDirectoryResponse, FileSystemQueryFileParams, FileSystemRemoveParams, FileSystem, FileSystemStreamDirectoryResponse, FileSystemStreamFileInfoResponse } from './fileSystem';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class FileSystemClient extends BaseClient<FilesystemGRPCClient> implements FileSystem {
    protected generateClient(): GRPCClientConstructor<FilesystemGRPCClient>;
    directory(params: FileSystemQueryDirectoryParams): Promise<FileSystemQueryDirectoryResponse>;
    listenDirectory(params: FileSystemQueryDirectoryParams, listener: StreamListener<FileSystemStreamDirectoryResponse>): StoppableStream<FileSystemStreamDirectoryResponse>;
    listenFile(params: FileSystemQueryFileParams, listener: StreamListener<FileSystemStreamFileInfoResponse>): StoppableStream<FileSystemStreamFileInfoResponse>;
    copy(params: FileSystemCopyOrMoveParams): Promise<void>;
    move(params: FileSystemCopyOrMoveParams): Promise<void>;
    makeDir(path: FileSystemMakeDirectoryParams): Promise<void>;
    open(path: string): FileSystemFile;
    create(path: string): FileSystemFile;
    remove(params: FileSystemRemoveParams): Promise<void>;
    protected serviceName(): string;
}
