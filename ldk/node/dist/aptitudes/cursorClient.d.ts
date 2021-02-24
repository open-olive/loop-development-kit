import BaseClient, { GRPCClientConstructor } from './baseClient';
import { CursorClient as CursorGRPCClient } from '../grpc/cursor_grpc_pb';
import { Cursor, CursorResponse } from './cursor';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class CursorClient extends BaseClient<CursorGRPCClient> implements Cursor {
    protected generateClient(): GRPCClientConstructor<CursorGRPCClient>;
    position(): Promise<CursorResponse>;
    listenPosition(listener: StreamListener<CursorResponse>): StoppableStream<CursorResponse>;
    protected serviceName(): string;
}
