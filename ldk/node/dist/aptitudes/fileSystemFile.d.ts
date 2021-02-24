import * as grpc from '@grpc/grpc-js';
import { FileInfo, FileSystemFile, FileSystemFileChownParams } from './fileSystem';
import messages from '../grpc/filesystem_pb';
import { Session } from '../grpc/session_pb';
import { ILogger } from '../logging';
/**
 * @param fileInfo - The file info.
 * @internal
 */
export declare function parseFileInfo(fileInfo: messages.FileInfo): FileInfo;
export declare class FileSystemFileImpl implements FileSystemFile {
    private stream;
    streamPromise: Promise<void>;
    protected session: Session.AsObject;
    private status;
    private logger;
    private filePath;
    constructor(session: Session.AsObject, stream: grpc.ClientDuplexStream<messages.FilesystemFileStreamRequest, messages.FilesystemFileStreamResponse>, logger: ILogger);
    open(path: string): void;
    create(path: string): void;
    changeOwnership(params: FileSystemFileChownParams): Promise<void>;
    changePermissions(permissions: number): Promise<void>;
    close(): Promise<void>;
    info(): Promise<FileInfo>;
    read(): Promise<Uint8Array>;
    write(contents: Uint8Array): Promise<number>;
    private generateResponsePromise;
    private checkStatus;
    private setError;
    protected createSessionMessage(): Session;
}
