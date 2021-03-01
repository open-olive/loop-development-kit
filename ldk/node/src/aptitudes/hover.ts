import { StoppableStream, StreamListener } from './stoppables';

export interface HoverResponse {
  text: string;
}

/**
 * This parameter object defines the size of the region to text around the cursor. Values are resolution scaling independent.
 */
export interface HoverReadRequest {
  xFromCenter: number;
  yFromCenter: number;
}

/**
 * The Hover Aptitude allows you to query and listen for text under the cursor.
 * It watches the cursor move and uses OCR to text the text in an area around the cursor position.
 *
 * This Aptitude is not yet implemented.
 */
export interface Hover {
  /**
   * Queries the text currently under the cursor.
   *
   * @param params - The size of the window to text around the cursor.
   * @returns Promise resolving with the text under the cursor.
   */
  text(params: HoverReadRequest): Promise<HoverResponse>;

  /**
   * Listens for changes to the text under the cursor.
   *
   * @param params - The size of the window to text around the cursor.
   * @param listener - The listener function called whenever the text under the cursor changes.
   * @returns a StoppableStream object that can be stopped.
   */
  listenText(
    params: HoverReadRequest,
    listener: StreamListener<HoverResponse>,
  ): StoppableStream<HoverResponse>;
}
