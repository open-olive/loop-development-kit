import { StoppableStream, StreamListener } from './stoppables';
/**
 * Response object containing the cursor position, where 0,0 is the top-left of the screen.
 */
export interface CursorResponse {
    x: number;
    y: number;
    /**
     * The screen identifier.
     */
    screen: number;
}
/**
 * The CursorSensor provides access to the cursor position.
 */
export interface CursorSensor {
    /**
     * @returns Promise resolving with the cursor position.
     */
    queryCursorPosition(): Promise<CursorResponse>;
    /**
     * Establishes a stream calling the listener function whenever the cursor position changes.
     *
     * @param listener - The listener function called when the function changes.
     * @returns a StoppableStream object that can be stopped.
     */
    streamCursorPosition(listener: StreamListener<CursorResponse>): StoppableStream<CursorResponse>;
}
