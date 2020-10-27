/**
 * The StreamListener type is a function provided to start a stream. It accepts two parameters and returns nothing.
 *
 * @typeParam T - The type of the messages sent.
 * @param error - Null, unless an error is present.
 * @param input - The event that's being generated.
 */
export declare type StreamListener<T> = (error: string | null, input?: T) => void;
/**
 * @typeParam T - The type of the messages sent.
 */
export interface StoppableStream<T> {
    stop(): void;
    setListener(callback: StreamListener<T>): void;
}
