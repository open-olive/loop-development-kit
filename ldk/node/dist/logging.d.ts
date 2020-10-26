/** @module logging */
/** Logger is a supported way to get logs to Olive Helps in the expected format. */
declare class Logger {
    private _name;
    private _fields;
    /**
     * Create a Logger.
     *
     * @param name - The name of the plugin.
     * @param fields - Additional fields to include with each log.
     * @example
     * ```
     * const package = require('./package.json');
     * const logger = new Logger(package.name);
     * ```
     */
    constructor(name: string, fields?: {});
    /**
     * with creates a new logger that will always have the key/value pairs.
     *
     * @param args - A list of alternating keys/values.
     * @returns - A new logger with the provided fields.
     *
     * ```
     * const logger2 = logger.with('persistentKey', 'persistentValue');
     * logger2.info('Yet another message', 'yetAnotherKey', 'yetAnotherValue');
     *
     * // {
     * //   "@timestamp": "2020-07-30T14:58:21.057000Z",
     * //   "@pid": 1234,
     * //   "@level": "INFO",
     * //   "@module": "my-plugin-name",
     * //   "@message": "Yet another message",
     * //   "persistentKey": "persistentValue",
     * //   "yetAnotherKey": "yetAnotherValue"
     * // }
     * ```
     */
    with(...args: any[]): Logger;
    /**
     * trace emits a message and key/value pairs at the TRACE level.
     *
     * @param msg - The message of the log.
     * @param args - A list of alternating keys/values.
     * @example
     * ```
     * logger.trace('Some message');
     * // {
     * //   "@timestamp": "2020-07-30T14:58:21.057000Z",
     * //   "@pid": 1234,
     * //   "@level": "TRACE",
     * //   "@module": "my-plugin-name",
     * //   "@message": "Some message"
     * // }
     * ```
     */
    trace(msg: string, ...args: string[]): void;
    /**
     * debug emits a message and key/value pairs at the DEBUG level.
     *
     * @param msg - The message of the log.
     * @param args - A list of alternating keys/values.
     * @example
     * ```
     * logger.debug('Some message');
     * // {
     * //   "@timestamp": "2020-07-30T14:58:21.057000Z",
     * //   "@pid": 1234,
     * //   "@level": "DEBUG",
     * //   "@module": "my-plugin-name",
     * //   "@message": "Some message"
     * // }
     * ```
     */
    debug(msg: string, ...args: string[]): void;
    /**
     * info emits a message and key/value pairs at the INFO level.
     *
     * @param msg - The message of the log.
     * @param args - A list of alternating keys/values.
     * @example
     * ```
     * logger.info('Some message');
     * // {
     * //   "@timestamp": "2020-07-30T14:58:21.057000Z",
     * //   "@pid": 1234,
     * //   "@level": "INFO",
     * //   "@module": "my-plugin-name",
     * //   "@message": "Some message"
     * // }
     * ```
     */
    info(msg: string, ...args: string[]): void;
    /**
     * warn emits a message and key/value pairs at the WARN level.
     *
     * @param msg - The message of the log.
     * @param args - A list of alternating keys/values.
     * @example
     * ```
     * logger.warn('Some message');
     * // {
     * //   "@timestamp": "2020-07-30T14:58:21.057000Z",
     * //   "@pid": 1234,
     * //   "@level": "WARN",
     * //   "@module": "my-plugin-name",
     * //   "@message": "Some message"
     * // }
     * ```
     */
    warn(msg: string, ...args: string[]): void;
    /**
     * error emits a message and key/value pairs at the ERROR level.
     *
     * @param msg - The message of the log.
     * @param args - A list of alternating keys/values.
     * @example
     * ```
     * logger.error('Some message');
     * // {
     * //   "@timestamp": "2020-07-30T14:58:21.057000Z",
     * //   "@pid": 1234,
     * //   "@level": "ERROR",
     * //   "@module": "my-plugin-name",
     * //   "@message": "Some message"
     * // }
     * ```
     */
    error(msg: string, ...args: string[]): void;
    /**
     * _write is the underlying implementation for writing a log message.
     *
     * @private
     * @param lvl - The level of the log.
     * @param msg - The message of the log.
     * @param  args - A list of alternating keys/values.
     */
    private _write;
    /**
     * _kvArgsWithFields converts a list of alternating keys/values to an object.
     *
     * @param args - A list of alternating keys/values.
     * @returns An object created by combining the alternating keys/values.
     * @example
     * ```
     * _kvArgsWithFields(['key1', 'value1', 'key2', 'value2', 'value3'])
     * // returns { 'key1': 'value1', 'key2': 'value2', 'EXTRA_VALUE_AT_END': 'value3' }
     * ```
     */
    private _kvArgsWithFields;
    /**
     * _getTimestamp creates a timestamp in the supported format.
     *
     * @returns A timestamp in a format compatible with the host process.
     */
    private _getTimestamp;
}
/**
 * prepareLogging overwrites basic console methods so they produce output in an expected format.
 * Also pushes all stdout to stderr.
 *
 * @internal
 */
declare const prepareLogging: () => void;
export { Logger, prepareLogging };
