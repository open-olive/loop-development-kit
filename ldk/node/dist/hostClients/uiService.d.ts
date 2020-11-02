import { StoppableStream, StreamListener } from './stoppableStream';
export interface UIService {
    streamSearchbar(listener: StreamListener<string>): StoppableStream<string>;
    streamGlobalSearch(listener: StreamListener<string>): StoppableStream<string>;
}
