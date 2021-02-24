import { StoppableStream, StreamListener } from './stoppables';
export interface HoverResponse {
    text: string;
}
/**
 * This parameter object defines the size of the region to read around the cursor. Values are resolution scaling independent.
 */
export interface HoverReadRequest {
    xFromCenter: number;
    yFromCenter: number;
}
/**
 * The HoverServices watches the cursor move and uses OCR to read the text in an area around the cursor position.
 *
 * This service is not yet implemented.
 */
export interface Hover {
    /**
     * Queries the text currently under the cursor.
     *
     * @param params - The size of the window to read around the cursor.
     * @returns Promise resolving with the text under the cursor.
     */
    queryHover(params: HoverReadRequest): Promise<HoverResponse>;
    /**
     * Starts streaming the text under the cursor as it changes.
     *
     * @param params - The size of the window to read around the cursor.
     * @param listener - The listener function called whenever the text under the cursor changes.
     * @returns a StoppableStream object that can be stopped.
     */
    streamHover(params: HoverReadRequest, listener: StreamListener<HoverResponse>): StoppableStream<HoverResponse>;
}
