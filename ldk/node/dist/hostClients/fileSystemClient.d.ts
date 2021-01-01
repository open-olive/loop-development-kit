import { FilesystemClient as FilesystemGRPCClient } from '../grpc/filesystem_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { FileSystemCopyOrMoveParams, FileSystemFile, FileSystemMakeDirectoryParams, FileSystemQueryDirectoryParams, FileSystemQueryDirectoryResponse, FileSystemQueryFileParams, FileSystemRemoveParams, FileSystemService, FileSystemStreamDirectoryResponse, FileSystemStreamFileInfoResponse } from './fileSystemService';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class FileSystemClient extends BaseClient<FilesystemGRPCClient> implements FileSystemService {
    protected generateClient(): GRPCClientConstructor<FilesystemGRPCClient>;
    queryDirectory(params: FileSystemQueryDirectoryParams): Promise<FileSystemQueryDirectoryResponse>;
    streamDirectory(params: FileSystemQueryDirectoryParams, listener: StreamListener<FileSystemStreamDirectoryResponse>): StoppableStream<FileSystemStreamDirectoryResponse>;
    streamFileInfo(params: FileSystemQueryFileParams, listener: StreamListener<FileSystemStreamFileInfoResponse>): StoppableStream<FileSystemStreamFileInfoResponse>;
    copyFile(params: FileSystemCopyOrMoveParams): Promise<void>;
    moveFile(params: FileSystemCopyOrMoveParams): Promise<void>;
    makeDirectory(path: FileSystemMakeDirectoryParams): Promise<void>;
    openFile(path: string): FileSystemFile;
    createFile(path: string): FileSystemFile;
    removeFile(params: FileSystemRemoveParams): Promise<void>;
}
