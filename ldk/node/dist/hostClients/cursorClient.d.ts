import BaseClient, { GRPCClientConstructor } from './baseClient';
import { CursorClient as CursorGRPCClient } from '../grpc/cursor_grpc_pb';
import { CursorService, CursorResponse } from './cursorService';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class CursorClient extends BaseClient<CursorGRPCClient> implements CursorService {
    protected generateClient(): GRPCClientConstructor<CursorGRPCClient>;
    queryCursorPosition(): Promise<CursorResponse>;
    streamCursorPosition(listener: StreamListener<CursorResponse>): StoppableStream<CursorResponse>;
}
