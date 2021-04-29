import { LdkAptitude, LdkFilesystem, LdkNetwork, LdkPermissions, LdkSettings } from './ldk-settings';

function isPermissionUndefined(permission: string[]): boolean {
  if (permission === undefined || 
      permission.length === 0 ) {
    return true;
  } 
  return false;
}

function buildNetworkPermissions(ldkPermissions: LdkPermissions): LdkNetwork {
  return ldkPermissions.network;
  // TODO: Error handling
  //   throw new Error("No permission declaration found for URLs. Add Loop permissions for URLs.");
}

function buildFilesystemPermissions(ldkPermissions: LdkPermissions): LdkFilesystem {
  return ldkPermissions.filesystem;
  // TODO: Error handling
  //   throw new Error("No permission declaration found for filesystem. Add Loop permissions for Filesystem.");
}

function validateAptitudePermissions(ldkPermissions: LdkAptitude): LdkAptitude {
  return ldkPermissions;
  // TODO: Error handling || return nil
}

export function generateMetadata(ldkSettings: LdkSettings): string {
  const json = JSON.stringify({
    ldkVersion: '0.1.0',
    permissions: {
      clipboard: ldkSettings.ldk.permissions.clipboard,
      cursor: ldkSettings.ldk.permissions.cursor,
      filesystem: buildFilesystemPermissions(ldkSettings.ldk.permissions),
      keyboard: ldkSettings.ldk.permissions.keyboard,
      network: buildNetworkPermissions(ldkSettings.ldk.permissions),
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