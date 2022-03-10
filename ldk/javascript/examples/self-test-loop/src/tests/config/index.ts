import { config } from '@oliveai/ldk';

export const testLoopConfig = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    config
      .getLoopConfig()
      .then((loopConfig) => {
        console.log(loopConfig);

        if (loopConfig instanceof Object) {
          console.log('Success: loopConfig is an object');

          const EXPECTED_VARIABLE_NAMES = [
            'testBoolean',
            'testNumber',
            'testNumberArray',
            'testNumberEnum',
            'testObject',
            'testString',
            'testStringArray',
            'testStringEnum',
          ];

          const actualVariableNames = Object.keys(loopConfig).sort();

          if (JSON.stringify(EXPECTED_VARIABLE_NAMES) === JSON.stringify(actualVariableNames)) {
            console.log('Success: loopConfig keys match expected schema');
            resolve(true);
          }

          reject(
            new Error(
              "Loop config keys don't match the expected output. Did the Self Test Loop's configSchema in the package.json change?",
            ),
          );
        }

        reject(new Error('Loop config returned from getLoopConfig is not an object'));
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
