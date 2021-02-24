import { Loop } from './loop';
/**
 * The Plugin class is responsible for establishing the connection to Olive Helps.
 */
declare class Plugin {
    private server;
    private broker;
    private loopServer;
    /**
     * Create a Plugin.
     *
     * @param impl - The implementation of the Loop.
     * ```
     * new Plugin(myLoop);
     * ```
     */
    constructor(impl: Loop);
    /**
     * Starts the GRPC server and writeText connection information to stdout.
     *
     * @returns Promise resolving when the server starts.
     */
    serve(): Promise<void>;
}
export default Plugin;
