import * as grpc from '@grpc/grpc-js';
import {
  FileInfo,
  FileSystemFile,
  FileSystemFileChownParams,
} from './fileSystemService';
import messages, { FilesystemFileStreamRequest } from '../grpc/filesystem_pb';
import { Session } from '../grpc/session_pb';

enum FilesystemFileStatus {
  Pending,
  Initialized,
  Closed,
}

/**
 * @param fileInfo - The file info.
 * @internal
 */
export function parseFileInfo(fileInfo: messages.FileInfo): FileInfo {
  return {
    name: fileInfo.getName(),
    size: fileInfo.getSize(),
    mode: fileInfo.getMode(),
    updated: fileInfo.getUpdated()?.toDate(),
    isDir: fileInfo.getIsdir(),
  };
}

export class FileSystemFileImpl implements FileSystemFile {
  private stream: grpc.ClientDuplexStream<
    messages.FilesystemFileStreamRequest,
    messages.FilesystemFileStreamResponse
  >;

  protected session: Session.AsObject;

  private status: FilesystemFileStatus = FilesystemFileStatus.Pending;

  constructor(
    session: Session.AsObject,
    stream: grpc.ClientDuplexStream<
      messages.FilesystemFileStreamRequest,
      messages.FilesystemFileStreamResponse
    >,
  ) {
    this.session = session;
    this.stream = stream;
  }

  open(path: string): void {
    this.checkStatus(true);
    const openMsg = new FilesystemFileStreamRequest.Open()
      .setPath(path)
      .setSession(this.createSessionMessage());
    const message = new FilesystemFileStreamRequest().setOpen(openMsg);
    this.stream.write(message);
    this.status = FilesystemFileStatus.Initialized;
  }

  create(path: string): void {
    this.checkStatus(true);
    const createMsg = new FilesystemFileStreamRequest.Create()
      .setPath(path)
      .setSession(this.createSessionMessage());
    const message = new FilesystemFileStreamRequest().setCreate(createMsg);
    this.stream.write(message);
    this.status = FilesystemFileStatus.Initialized;
  }

  changeOwnership(params: FileSystemFileChownParams): Promise<void> {
    this.checkStatus();
    const msg = new FilesystemFileStreamRequest.Chown()
      .setUid(params.owner)
      .setGid(params.group);
    const request = new FilesystemFileStreamRequest().setChown(msg);
    return this.generateResponsePromise(
      request,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (response) => response.getChown()!,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  changePermissions(permissions: number): Promise<void> {
    this.checkStatus();
    const msg = new FilesystemFileStreamRequest.Chmod().setMode(permissions);
    const request = new FilesystemFileStreamRequest().setChmod(msg);
    return this.generateResponsePromise(
      request,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (response) => response.getChmod()!,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  close(): Promise<void> {
    this.checkStatus();
    const msg = new FilesystemFileStreamRequest.Close();
    const request = new FilesystemFileStreamRequest().setClose(msg);
    this.stream.write(request);
    this.status = FilesystemFileStatus.Closed;
    return Promise.resolve();
  }

  info(): Promise<FileInfo> {
    this.checkStatus();
    const msg = new FilesystemFileStreamRequest.Stat();
    const request = new FilesystemFileStreamRequest().setStat(msg);
    return this.generateResponsePromise(
      request,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (response) => response.getStat()!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (input) => parseFileInfo(input.getInfo()!),
    );
  }

  read(): Promise<Uint8Array> {
    this.checkStatus();
    const msg = new FilesystemFileStreamRequest.Read();
    const request = new FilesystemFileStreamRequest().setRead(msg);
    return this.generateResponsePromise(
      request,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (response) => response.getRead()!,
      (input) => input.getData_asU8(),
    );
  }

  write(contents: Uint8Array): Promise<number> {
    this.checkStatus();
    const msg = new FilesystemFileStreamRequest.Write().setData(contents);
    const request = new FilesystemFileStreamRequest().setWrite(msg);
    return this.generateResponsePromise(
      request,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (response) => response.getWrite()!,
      (input) => input.getNumofbytes(),
    );
  }

  private generateResponsePromise<TResponse, TOutput>(
    message: messages.FilesystemFileStreamRequest,
    responseReader: (
      response: messages.FilesystemFileStreamResponse,
    ) => TResponse,
    transformer: (input: TResponse) => TOutput,
  ): Promise<TOutput> {
    this.stream.write(message);
    return new Promise<TOutput>((resolve, reject) => {
      try {
        const read = this.stream.read();
        const response = responseReader(read);
        const transformed = transformer(response);
        resolve(transformed);
      } catch (e) {
        reject();
      }
    });
  }

  private checkStatus(expectPending = false): void {
    if (expectPending && this.status !== FilesystemFileStatus.Pending) {
      throw new Error('File is not pending');
    } else if (this.status !== FilesystemFileStatus.Initialized) {
      throw new Error('File is not open');
    }
  }

  protected createSessionMessage(): Session {
    const session = new Session();
    session.setLoopid(this.session.loopid);
    session.setToken(this.session.token);
    return session;
  }
}
