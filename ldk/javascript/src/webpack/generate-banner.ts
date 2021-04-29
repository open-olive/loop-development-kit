export function generateMetadata(loopPackage: any): string {
  const json = JSON.stringify({
    ldkVersion: '0.1.0',
    urlPermissions: loopPackage.permissions.urlPermissions,
    filesystemPermissions: loopPackage.permissions.filesystemPermissions,
    aptitudePermissions: loopPackage.permissions.aptitudePermissions
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