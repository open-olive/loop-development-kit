import { StoppableStream, StreamListener } from './stoppables';
/**
 * The ClipboardSensor provides access to the OS's clipboard.
 */
export interface ClipboardSensor {
    /**
     * @returns A Promise resolving with the current contents of the clipboard.
     */
    queryClipboard(): Promise<string>;
    /**
     * Starts listening to changes to the clipboard.
     *
     * @param listener - A function that's called whenever the clipboard's contents change.
     * @returns A stream object that can be stopped.
     */
    streamClipboard(listener: StreamListener<string>): StoppableStream<string>;
    /**
     * Writes the provided text into the clipboard.
     *
     * @param text
     */
    writeClipboard(text: string): Promise<void>;
}
