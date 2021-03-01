import { StoppableStream, StreamListener } from './stoppables';
/**
 * The Clipboard Aptitude allows you to read, write and listen to the clipboard.
 */
export interface Clipboard {
    /**
     * @returns A Promise resolving with the current contents of the clipboard.
     */
    text(): Promise<string>;
    /**
     * Starts listening to changes to the clipboard.
     *
     * @param listener - A function that's called whenever the clipboard's contents change.
     * @returns A stream object that can be stopped.
     */
    listenText(listener: StreamListener<string>): StoppableStream<string>;
    /**
     * Writes the provided text into the clipboard.
     *
     * @param text
     */
    writeText(text: string): Promise<void>;
}
