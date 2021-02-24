import { StoppableStream, StreamListener } from './stoppables';

export interface SelectedText {
  text: string;
  url: string;
  tabTitle: string;
}

/**
 * The Browser provides access to the active URL and selected text.
 *
 * This service is not yet implemented.
 */
export interface Browser {
  /**
   * Queries for the active URL in the active tab.
   *
   * @returns Promise resolving with the active URL as a string;
   */
  activeURL(): Promise<string>;

  /**
   * Stream changes to the active URL in the active tab.
   *
   * @param listener - Listener function called whenever the active URL changes.
   * @returns Stream object.
   */
  listenActiveURL(listener: StreamListener<string>): StoppableStream<string>;

  /**
   * Queries the selected text (if any).
   *
   * @returns Promise resolving with the currently selected text.
   */
  selectedText(): Promise<SelectedText>;

  /**
   * Streams changes to the selected text.
   *
   * @param listener - Listener function called whenever the selected text changes.
   */
  listenActiveText(
    listener: StreamListener<SelectedText>,
  ): StoppableStream<SelectedText>;
}
