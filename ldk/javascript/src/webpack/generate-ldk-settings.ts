import * as path from 'path';
import { customizeArray, CustomizeRule, mergeWithCustomize } from 'webpack-merge';
import { LdkSettings } from './ldk-settings';

export function mergeLdkSettings(
  baseSettings: LdkSettings,
  overrideSettings: LdkSettings,
): LdkSettings {
  return mergeWithCustomize<LdkSettings>({
    customizeArray: customizeArray({
      'ldk.permissions.network.urlDomains.*': CustomizeRule.Replace,
      'ldk.permissions.filesystem.pathGlobs.*': CustomizeRule.Replace,
    }),
  })(baseSettings, overrideSettings);
}

export function generateLdkSettings(): LdkSettings {
  // Need to dynamically refer to Loop's package.json
  // Suppressing rule as we intentionally want a dynamic require.
  // eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require,global-require
  let ldkSettings: LdkSettings = require(path.join(process.cwd(), '/package.json'));

  if (process.env.LDK_CONFIG !== undefined) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require,global-require
      const ldkOverrides: LdkSettings = require(path.join(
        process.cwd(),
        `/ldk-config.${process.env.LDK_CONFIG}.json`,
      ));
      ldkSettings = mergeLdkSettings(ldkSettings, ldkOverrides);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(`Failed to load environment config for LDK_CONFIG=${process.env.LDK_CONFIG}.`);
      console.error(err.message);
    }
  }

  return ldkSettings;
}
