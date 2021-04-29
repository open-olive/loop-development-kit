import { LdkPermissions, LdkSettings } from './ldk-settings';

function isPermissionUndefined(permission: string[]): boolean {
  if (permission === undefined || 
      permission.length === 0 ) {
    return true;
  } 
  return false;
}

function buildUrlPermissions(ldkPermissions: LdkPermissions): string[] {
  if (isPermissionUndefined(ldkPermissions.url)) {
    throw new Error("No permission declaration found for URLs. Add Loop permissions for URLs.");
  } else {
    return ldkPermissions.url;
  }
}

function buildFilesystemPermissions(ldkPermissions: LdkPermissions): string[] {
  if (isPermissionUndefined(ldkPermissions.filesystem)) {
    throw new Error("No permission declaration found for filesystem. Add Loop permissions for Filesystem.");
  } else {
    return ldkPermissions.filesystem;
  }
}

function buildAptitudePermissions(permissions: LdkPermissions): string[] {
    return permissions.aptitude;
}

export function generateMetadata(ldkSettings: LdkSettings): string {
  const json = JSON.stringify({
    ldkVersion: '0.1.0',
    permissions: {
      urlPermissions: buildUrlPermissions(ldkSettings.ldk.permissions),
      filesystemPermissions: buildFilesystemPermissions(ldkSettings.ldk.permissions),
      aptitudePermissions: buildAptitudePermissions(ldkSettings.ldk.permissions)
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