import { FilesystemClient as FilesystemGRPCClient } from '../grpc/filesystem_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { FileSystemService, FileSystemQueryDirectoryParams, FileSystemQueryDirectoryResponse, FileSystemQueryFileParams, FileSystemQueryFileResponse, FileSystemStreamDirectoryResponse, FileSystemStreamFileResponse } from './fileSystemService';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class FileSystemClient extends BaseClient<FilesystemGRPCClient> implements FileSystemService {
    protected generateClient(): GRPCClientConstructor<FilesystemGRPCClient>;
    queryDirectory(params: FileSystemQueryDirectoryParams): Promise<FileSystemQueryDirectoryResponse>;
    queryFile(params: FileSystemQueryFileParams): Promise<FileSystemQueryFileResponse>;
    streamDirectory(params: FileSystemQueryDirectoryParams, listener: StreamListener<FileSystemStreamDirectoryResponse>): StoppableStream<FileSystemStreamDirectoryResponse>;
    streamFile(params: FileSystemQueryFileParams, listener: StreamListener<FileSystemStreamFileResponse>): StoppableStream<FileSystemStreamFileResponse>;
}
