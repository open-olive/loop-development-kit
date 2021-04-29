import { LoopPermissions } from './loop-permissions';

function isPermissionDefined(permission: string[]): boolean {
  if (permission.length === 0 || 
      permission === undefined) {
    return true;
  } 
  return false;
}

function buildUrlPermissions(permissions: LoopPermissions): string {
  if (isPermissionDefined(permissions.urlPermissions)) {
    throw new Error("No permission declaration found for URLs. Add Loop permissions for URLs.");
  } else {
    return permissions.urlPermissions.toString();
  }
}

function buildFilesystemPermissions(permissions: LoopPermissions): string {
  if (isPermissionDefined(permissions.filesystemPermissions)) {
    throw new Error("No permission declaration found for filesystem. Add Loop mermissions for Filesystem.");
  } else {
    return permissions.filesystemPermissions.toString();
  }
}

function buildAptitudePermissions(permissions: LoopPermissions): string {
  if (isPermissionDefined(permissions.aptitudePermissions)) {
    throw new Error("No permission declaration found for aptitudes. Add Loop mermissions for aptitudes.");
  } else {
    return permissions.aptitudePermissions.toString();
  } 
}

export function generateMetadata(loopPackage: LoopPermissions): string {
  const json = JSON.stringify({
    ldkVersion: '0.1.0',
    urlPermissions: buildUrlPermissions(loopPackage),
    filesystemPermissions: buildFilesystemPermissions(loopPackage),
    aptitudePermissions: buildAptitudePermissions(loopPackage)
  });
  return Buffer.from(json).toString('base64');
}

export function generateBanner(loopPackage: LoopPermissions): string {
  return `
  /*
  ---BEGIN-LOOP-JSON-BASE64---
  ${generateMetadata(loopPackage)}
  ---END-LOOP-JSON-BASE64---
  */
 `;
}