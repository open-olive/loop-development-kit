import BaseClient, { GRPCClientConstructor } from './baseClient';
import { HoverClient as HoverGRPCClient } from '../grpc/hover_grpc_pb';
import { HoverSensor, HoverReadRequest, HoverResponse } from './hoverSensor';
import { StoppableStream, StreamListener } from './stoppables';
/**
 * @internal
 */
export declare class HoverClient extends BaseClient<HoverGRPCClient> implements HoverSensor {
    protected generateClient(): GRPCClientConstructor<HoverGRPCClient>;
    queryHover(params: HoverReadRequest): Promise<HoverResponse>;
    streamHover(params: HoverReadRequest, listener: StreamListener<HoverResponse>): StoppableStream<HoverResponse>;
    protected sensorName(): string;
}
