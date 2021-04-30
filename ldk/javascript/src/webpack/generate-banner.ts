import { LdkSettings } from './ldk-settings';

export function generateMetadata(ldkSettings: LdkSettings): string {
  if(Object.keys(ldkSettings.ldk).length === 0 || Object.keys(ldkSettings.ldk.permissions).length === 0) {
    throw new Error("Please provide LDK settings and permissions in your Loop package.json. See README for more information.")
  }
  const json = JSON.stringify({
    ldkVersion: '0.1.0',
    permissions: {
      clipboard: ldkSettings.ldk.permissions.clipboard,
      cursor: ldkSettings.ldk.permissions.cursor,
      filesystem: ldkSettings.ldk.permissions.filesystem,
      keyboard: ldkSettings.ldk.permissions.keyboard,
      network: ldkSettings.ldk.permissions.network,
      process: ldkSettings.ldk.permissions.process,
      ui: ldkSettings.ldk.permissions.ui,
      vault: ldkSettings.ldk.permissions.vault,
      whisper: ldkSettings.ldk.permissions.whisper,
      window: ldkSettings.ldk.permissions.window,
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