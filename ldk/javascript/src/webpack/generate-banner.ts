import { LdkSettings } from './ldk-settings';

export function generateMetadata(ldkSettings: LdkSettings): string {
  if(Object.keys(ldkSettings.ldk).length === 0) {
    throw new Error("Please provide LDK settings in your Loop package.json. See README for more information.")
  }
  const json = JSON.stringify({
    oliveHelpsContractVersion: '0.1.0',
    permissions: {
      clipboard: ldkSettings.ldk.permissions.clipboard || undefined,
      cursor: ldkSettings.ldk.permissions.cursor || undefined,
      filesystem: ldkSettings.ldk.permissions.filesystem || undefined,
      keyboard: ldkSettings.ldk.permissions.keyboard || undefined,
      network: ldkSettings.ldk.permissions.network || undefined,
      process: ldkSettings.ldk.permissions.process || undefined,
      ui: ldkSettings.ldk.permissions.ui || undefined,
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