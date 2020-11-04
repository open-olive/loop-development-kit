import BaseClient, { GRPCClientConstructor } from './baseClient';
import { HoverClient as HoverGRPCClient } from '../grpc/hover_grpc_pb';
import { HoverService, HoverReadRequest, HoverResponse } from './hoverService';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class HoverClient extends BaseClient<HoverGRPCClient> implements HoverService {
    protected generateClient(): GRPCClientConstructor<HoverGRPCClient>;
    queryHover(params: HoverReadRequest): Promise<HoverResponse>;
    streamHover(params: HoverReadRequest, listener: StreamListener<HoverResponse>): StoppableStream<HoverResponse>;
}
