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
  const json = JSON.stringify({
    oliveHelpsContractVersion: '0.1.7',
    permissions: {
      browser: ldkSettings.ldk.permissions.browser || undefined,
      clipboard: ldkSettings.ldk.permissions.clipboard || undefined,
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
