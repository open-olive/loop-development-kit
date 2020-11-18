/**
 * The StreamListener type is a function provided to start a stream. It accepts two parameters and returns nothing.
 *
 * @template T - The type of the messages sent.
 * @param error - Null, unless an error is present.
 * @param input - The event that's being generated.
 */
export declare type StreamListener<T> = (error: string | null, input?: T) => void;
/**
 * @template T - The type of the messages sent.
 */
export interface StoppableStream<T> {
    stop(): void;
    setListener(callback: StreamListener<T>): void;
}
/**
 * The StoppableMessage interface provides access to a promise that resolves when the message completes, and
 * to the ability to stop the message.
 *
 * @template T - The type of the messages sent.
 */
export interface StoppableMessage<T> {
    stop(): void;
    promise(): Promise<T>;
}
