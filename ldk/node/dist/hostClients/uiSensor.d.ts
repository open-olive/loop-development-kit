import { StoppableStream, StreamListener } from './stoppables';
export interface UISensor {
    streamSearchbar(listener: StreamListener<string>): StoppableStream<string>;
    streamGlobalSearch(listener: StreamListener<string>): StoppableStream<string>;
}
