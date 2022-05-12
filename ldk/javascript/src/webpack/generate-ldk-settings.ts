import { readFileSync } from 'fs';
import { join as joinPath } from 'path';
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
  // Need to dynamically refer to Loop's package.json (from cwd).
  let ldkSettings: LdkSettings = JSON.parse(
    readFileSync(
      joinPath(
        process.cwd(),
        'package.json'
      ),
      { encoding: 'utf8', flag: 'r' }
    )
  );

  // Check for environment config.
  if (process.env.LDK_CONFIG !== undefined) {
    try {
      // Need to dynamically refer to Loop's file (from cwd).
      const ldkOverrides: LdkSettings = JSON.parse(
        readFileSync(
          joinPath(
            process.cwd(),
            `ldk-config.${process.env.LDK_CONFIG}.json`,
          ),
          { encoding: 'utf8', flag: 'r' }
        )
      );
      ldkSettings = mergeLdkSettings(ldkSettings, ldkOverrides);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(`Failed to load environment config for LDK_CONFIG=${process.env.LDK_CONFIG}.`);
      console.error(err.message);
    }
  }

  return ldkSettings;
}
