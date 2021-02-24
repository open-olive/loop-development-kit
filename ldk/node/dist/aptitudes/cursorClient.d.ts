import BaseClient, { GRPCClientConstructor } from './baseClient';
import { CursorClient as CursorGRPCClient } from '../grpc/cursor_grpc_pb';
import { Cursor, CursorPosition } from './cursor';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class CursorClient extends BaseClient<CursorGRPCClient> implements Cursor {
    protected generateClient(): GRPCClientConstructor<CursorGRPCClient>;
    position(): Promise<CursorPosition>;
    listenPosition(listener: StreamListener<CursorPosition>): StoppableStream<CursorPosition>;
    protected serviceName(): string;
}
