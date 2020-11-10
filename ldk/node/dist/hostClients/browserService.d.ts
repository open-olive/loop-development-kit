import { StoppableStream, StreamListener } from './stoppables';
export interface BrowserSelectedTextResponse {
    text: string;
    url: string;
    tabTitle: string;
}
/**
 * The BrowserService provides access to the active URL and selected text.
 */
export interface BrowserService {
    /**
     * Queries for the active URL in the active tab.
     *
     * @returns Promise resolving with the active URL as a string;
     */
    queryActiveURL(): Promise<string>;
    /**
     * Stream changes to the active URL in the active tab.
     *
     * @param listener - Listener function called whenever the active URL changes.
     * @returns Stream object.
     */
    streamActiveURL(listener: StreamListener<string>): StoppableStream<string>;
    /**
     * Queries the selected text (if any).
     *
     * @returns Promise resolving with the currently selected text.
     */
    querySelectedText(): Promise<BrowserSelectedTextResponse>;
    /**
     * Streams changes to the selected text.
     *
     * @param listener - Listener function called whenever the selected text changes.
     */
    streamSelectedText(listener: StreamListener<BrowserSelectedTextResponse>): StoppableStream<BrowserSelectedTextResponse>;
}
