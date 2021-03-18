import { WindowClient as WindowGRPCClient } from '../grpc/window_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { WindowInfoResponse, WindowInfoStreamResponse, WindowService } from './windowService';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class WindowClient extends BaseClient<WindowGRPCClient> implements WindowService {
    protected generateClient(): GRPCClientConstructor<WindowGRPCClient>;
    queryActiveWindow(): Promise<WindowInfoResponse>;
    queryWindows(): Promise<WindowInfoResponse[]>;
    streamActiveWindow(listener: StreamListener<WindowInfoResponse>): StoppableStream<WindowInfoResponse>;
    streamWindows(listener: StreamListener<WindowInfoStreamResponse>): StoppableStream<WindowInfoStreamResponse>;
    protected serviceName(): string;
}
