import { WindowClient as WindowGRPCClient } from '../grpc/window_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { WindowInfoResponse, WindowInfoStreamResponse, Window } from './window';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class WindowClient extends BaseClient<WindowGRPCClient> implements Window {
    protected generateClient(): GRPCClientConstructor<WindowGRPCClient>;
    activeWindow(): Promise<WindowInfoResponse>;
    windows(): Promise<WindowInfoResponse[]>;
    listenActiveWindow(listener: StreamListener<WindowInfoResponse>): StoppableStream<WindowInfoResponse>;
    listenWindows(listener: StreamListener<WindowInfoStreamResponse>): StoppableStream<WindowInfoStreamResponse>;
    protected serviceName(): string;
}
