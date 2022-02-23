import Ajv from 'ajv';
import { LdkSettings } from './ldk-settings';

const permissionsErrorMessage = `Please add a "ldk" object to your package.json file with a permission property:
    "ldk": {
        "permissions": {}
    }
See README for more information.`;

export function generateMetadata(ldkSettings: LdkSettings): string {
  if (!ldkSettings || !ldkSettings.ldk || Object.keys(ldkSettings.ldk).length === 0) {
    throw new Error(permissionsErrorMessage);
  }

  if (ldkSettings.ldk.configSchema) {
    const ajv = new Ajv();
    const errors: string[] = [];

    Object.values(ldkSettings.ldk.configSchema).forEach((configChild) => {
      try {
        ajv.compile(configChild);

        const { default: defaultValue, type } = configChild;

        // Only allow types supported by Loop Library form
        if (type !== 'string' && type !== 'object') {
          errors.push(
            `Error: The LDK does not currently support ${type} types in the config schema`,
          );
        }

        // Check to make sure default value matches type because ajv won't
        if (defaultValue && typeof defaultValue !== type) {
          errors.push(`Error: The default value ${defaultValue} does not match the type ${type}`);
        }
      } catch (error) {
        errors.push(error as string);
      }
    });

    if (errors.length) {
      throw new Error(`There was an error with your LDK config:\n${errors.join('\n')}`);
    }
  }

  const json = JSON.stringify({
    oliveHelpsContractVersion: '0.3.0',
    configSchema: ldkSettings.ldk.configSchema || undefined,
    permissions: {
      browser: ldkSettings.ldk.permissions.browser || undefined,
      clipboard: ldkSettings.ldk.permissions.clipboard || undefined,
      config: ldkSettings.ldk.permissions.config || undefined,
      cursor: ldkSettings.ldk.permissions.cursor || undefined,
      document: ldkSettings.ldk.permissions.document || undefined,
      filesystem: ldkSettings.ldk.permissions.filesystem || undefined,
      keyboard: ldkSettings.ldk.permissions.keyboard || undefined,
      network: ldkSettings.ldk.permissions.network || undefined,
      process: ldkSettings.ldk.permissions.process || undefined,
      screen: ldkSettings.ldk.permissions.screen || undefined,
      search: ldkSettings.ldk.permissions.search || undefined,
      system: ldkSettings.ldk.permissions.system || undefined,
      ui: ldkSettings.ldk.permissions.ui || undefined,
      user: ldkSettings.ldk.permissions.user || undefined,
      vault: ldkSettings.ldk.permissions.vault || undefined,
      whisper: ldkSettings.ldk.permissions.whisper || undefined,
      window: ldkSettings.ldk.permissions.window || undefined,
    },
  });

  return Buffer.from(json).toString('base64');
}

export function generateBanner(ldkSettings: LdkSettings): string {
  return `
/*
---BEGIN-LOOP-JSON-BASE64---
${generateMetadata(ldkSettings)}
---END-LOOP-JSON-BASE64---
*/
`;
}
