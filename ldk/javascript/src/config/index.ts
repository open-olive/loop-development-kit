export type LdkConfigObject = {
  [key: string]: LdkConfigSchema;
};

export type LdkConfigSchema = LdkConfigObject | string;

/**
 * The Config aptitude allows Loops to retrieve config variables defined by an
 * organizational admin in the Loop Library, or by the developer in a local loop
 * installation.
 */
export interface Config {
  /**
   * Retrieves the Loop config
   * @returns - A promise containing an object
   */
  getLoopConfig(): Promise<LdkConfigObject>;
}

export function getLoopConfig(): Promise<LdkConfigObject> {
  // This block below replicates promisify and promiseResolver in promisify.ts, but
  // JSON.parses the returned value
  return new Promise((resolve, reject) => {
    try {
      oliveHelps.loopconfig.getLoopConfig((error, value) => {
        if (error) {
          console.error(`Received error on result: ${error.message}`);
          reject(error);
          return;
        }
        resolve(JSON.parse(value));
      });
    } catch (error) {
      console.error(`Received error calling service ${(error as Error).message}`);
      reject(error);
    }
  });
}
