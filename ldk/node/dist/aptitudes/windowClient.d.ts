import { WindowClient as WindowGRPCClient } from '../grpc/window_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { WindowInfo, WindowEvent, Window } from './window';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class WindowClient extends BaseClient<WindowGRPCClient> implements Window {
    protected generateClient(): GRPCClientConstructor<WindowGRPCClient>;
    activeWindow(): Promise<WindowInfo>;
    windows(): Promise<WindowInfo[]>;
    listenActiveWindow(listener: StreamListener<WindowInfo>): StoppableStream<WindowInfo>;
    listenWindows(listener: StreamListener<WindowEvent>): StoppableStream<WindowEvent>;
    protected serviceName(): string;
}
