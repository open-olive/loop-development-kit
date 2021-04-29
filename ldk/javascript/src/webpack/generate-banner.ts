export function generateMetadata(loopPackage: any): string {
  const json = JSON.stringify({
    ldkVersion: '0.1.0',
    urlPermissions: buildUrlPermissions(loopPackage.permissions),
    filesystemPermissions: buildFilesystemPermissions(loopPackage.permissions),
    aptitudePermissions: buildAptitudePermissions(loopPackage.permissions)
  });
  return Buffer.from(json).toString('base64');
}

export function generateBanner(loopPackage: any): string {
  return `
  /*
  ---BEGIN-LOOP-JSON-BASE64---
  ${generateMetadata(loopPackage)}
  ---END-LOOP-JSON-BASE64---
  */
 `;
}

function buildUrlPermissions(permissions: any): string {
  if (isPermissionDefined(permissions.urlPermissions)) {
    throw new Error("No permission declaration found for URLs. Add Loop permissions for URLs.");
  } else {
    return permissions.urlPermissions;
  }
}

function buildFilesystemPermissions(permissions: any): string {
  if (isPermissionDefined(permissions.filesystemPermissions)) {
    throw new Error("No permission declaration found for filesystem. Add Loop mermissions for Filesystem.");
  } else {
    return permissions.filesystemPermissions;
  }
}

function buildAptitudePermissions(permissions: any): string {
  if (isPermissionDefined(permissions.aptitudePermissions)) {
    throw new Error("No permission declaration found for aptitudes. Add Loop mermissions for aptitudes.");
  } else {
    return permissions.aptitudePermissions;
  } 
}

function isPermissionDefined(permission: any): boolean {
  if (permission === "" || 
      permission === undefined) {
    return true;
  } else {
    return false;
  }
}