/**
 * The StreamListener type is a function provided to start a stream. It accepts two parameters and returns nothing.
 *
 * @param error - Null, unless an error is present.
 * @param input - The event that's being generated.
 */
export type StreamListener<T> = (error: string | null, input?: T) => void;

export interface StoppableStream<T> {
  stop(): void;

  setListener(callback: StreamListener<T>): void;
}

/**
 * The StoppableMessage interface provides access to a promise that resolves when the message completes, and
 * to the ability to stop the message.
 */
export interface StoppableMessage<T> {
  stop(): void;

  promise(): Promise<T>;
}
