import { StoppableStream, StreamListener } from './stoppables';

export interface UIService {
  streamSearchbar(listener: StreamListener<string>): StoppableStream<string>;
  streamGlobalSearch(listener: StreamListener<string>): StoppableStream<string>;
}
