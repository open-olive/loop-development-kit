import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import * as grpc from '@grpc/grpc-js';
import { Deadline } from '@grpc/grpc-js';

/**
 * @internal
 */
export type Request<TRequestType = Empty, TResponseType = Empty> = (
  request: TRequestType,
  callback: (error: grpc.ServiceError | null, response: TResponseType) => void,
) => void;

/**
 * @internal
 */
export interface CommonHostServer {
  waitForReady(deadline: Deadline, callback: (error?: Error) => void): void;
}
