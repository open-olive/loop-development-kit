/** @module logging */

/**
 * @internal
 */
// Not destructuring so it respects the @internal command.
// eslint-disable-next-line prefer-destructuring
const pid = process.pid;

/**
 * @internal
 */
enum LogLevels {
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/** Logger is a supported way to get logs to Olive Helps in the expected format. */
class Logger {
  private _name: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fields: { [index: string]: any };

  /**
   * Create a Logger.
   *
   * @param name - The name of the plugin.
   * @param fields - Additional fields to include with each log.
   *
   * ```
   * const package = require('./package.json');
   * const logger = new Logger(package.name);
   * ```
   */
  constructor(name: string, fields = {}) {
    if (!name) {
      throw new Error('Invalid logger name');
    }

    this._name = name;
    this._fields = fields || {};
  }

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  with(...args: any[]): Logger {
    const fields = this._kvArgsWithFields(args);
    return new Logger(this._name, fields);
  }

  /**
   * trace emits a message and key/value pairs at the TRACE level.
   *
   * @param msg - The message of the log.
   * @param args - A list of alternating keys/values.
   *
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
  trace(msg: string, ...args: string[]): void {
    this._write(LogLevels.TRACE, msg, ...args);
  }

  /**
   * debug emits a message and key/value pairs at the DEBUG level.
   *
   * @param msg - The message of the log.
   * @param args - A list of alternating keys/values.
   *
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
  debug(msg: string, ...args: string[]): void {
    this._write(LogLevels.DEBUG, msg, ...args);
  }

  /**
   * info emits a message and key/value pairs at the INFO level.
   *
   * @param msg - The message of the log.
   * @param args - A list of alternating keys/values.
   *
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
  info(msg: string, ...args: string[]): void {
    this._write(LogLevels.INFO, msg, ...args);
  }

  /**
   * warn emits a message and key/value pairs at the WARN level.
   *
   * @param msg - The message of the log.
   * @param args - A list of alternating keys/values.
   *
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
  warn(msg: string, ...args: string[]): void {
    this._write(LogLevels.WARN, msg, ...args);
  }

  /**
   * error emits a message and key/value pairs at the ERROR level.
   *
   * @param msg - The message of the log.
   * @param args - A list of alternating keys/values.
   *
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
  error(msg: string, ...args: string[]): void {
    this._write(LogLevels.ERROR, msg, ...args);
  }

  /**
   * _write is the underlying implementation for writing a log message.
   *
   * @private
   * @param lvl - The level of the log.
   * @param msg - The message of the log.
   * @param  args - A list of alternating keys/values.
   */
  private _write(lvl: LogLevels, msg: string, ...args: string[]): void {
    let level = lvl;
    if (!level) {
      level = LogLevels.DEBUG;
    }

    if (!Object.values(LogLevels).includes(level)) {
      throw new Error(`Invalid log level: ${level}`);
    }

    const fields = this._kvArgsWithFields(args);

    const json = {
      ...fields,
      '@timestamp': this._getTimestamp(),
      '@pid': pid,
      '@level': level,
      '@module': this._name,
      '@message': msg,
    };

    const stringifyOrder = [
      '@timestamp',
      '@pid',
      '@level',
      '@module',
      '@message',
      ...Object.keys(fields).sort(),
    ];

    process.stdout.write(`${JSON.stringify(json, stringifyOrder)}\n`);
  }

  /**
   * _kvArgsWithFields converts a list of alternating keys/values to an object.
   *
   * @param args - A list of alternating keys/values.
   * @returns An object created by combining the alternating keys/values.
   *
   * ```
   * _kvArgsWithFields(['key1', 'value1', 'key2', 'value2', 'value3'])
   * // returns { 'key1': 'value1', 'key2': 'value2', 'EXTRA_VALUE_AT_END': 'value3' }
   * ```
   */
  private _kvArgsWithFields(
    args = [] as string[],
  ): { [index: string]: string } {
    const argsEven = args.slice(0);

    if (argsEven.length % 2 !== 0) {
      const extra = argsEven.pop();
      argsEven.push('EXTRA_VALUE_AT_END', extra as string);
    }

    const fields = argsEven.reduce(
      (acc: { [index: string]: string }, cur, idx, array) => {
        if (idx % 2 === 0) {
          const next = array[idx + 1];
          acc[cur] = next;
        }
        return acc;
      },
      {},
    );

    return {
      ...this._fields,
      ...fields,
    };
  }

  /**
   * _getTimestamp creates a timestamp in the supported format.
   *
   * @returns A timestamp in a format compatible with the host process.
   */
  private _getTimestamp(): string {
    // toISOString() is close, but the seconds value needs to have 6 decimal places.
    return new Date()
      .toISOString()
      .replace(/\.(\d+)Z$/, (_, p1) => `.${p1.padEnd(6, '0')}Z`);
  }
}

/**
 * prepareLogging overwrites basic console methods so they produce output in an expected format.
 * Also pushes all stdout to stderr.
 *
 * @internal
 */
const prepareLogging = (): void => {
  const consoleDebug = console.debug.bind(console);
  const consoleError = console.error.bind(console);
  const consoleInfo = console.info.bind(console);
  const consoleLog = console.log.bind(console);
  const consoleTrace = console.trace.bind(console);
  const consoleWarn = console.warn.bind(console);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Using any b/c console functions accept any type.
  console.debug = (msg: any, ...args: any[]) => {
    consoleDebug(`[DEBUG] ${msg}`, ...args);
  };

  console.error = (msg: any, ...args: any[]) => {
    consoleError(`[ERROR] ${msg}`, ...args);
  };

  console.info = (msg: any, ...args: any[]) => {
    consoleInfo(`[INFO] ${msg}`, ...args);
  };

  console.log = (msg: any, ...args: any[]) => {
    consoleLog(`[INFO] ${msg}`, ...args);
  };

  console.trace = (msg: any, ...args: any[]) => {
    consoleTrace(`[TRACE] ${msg}`, ...args);
  };

  console.warn = (msg: any, ...args: any[]) => {
    consoleWarn(`[WARN] ${msg}`, ...args);
  };

  process.stdout.write = (...args: any[]) =>
    (process.stderr.write as any)(...args);
  /* eslint-any @typescript-eslint/no-explicit-any */
};

export { Logger, prepareLogging };
