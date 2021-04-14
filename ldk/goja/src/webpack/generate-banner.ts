export function generateMetadata(): string {
  const json = JSON.stringify({
    ldkVersion: 'PLACEHOLDER',
  });
  return Buffer.from(json).toString('base64');
}

export function generateBanner(): string {
  return `
/*
---BEGIN-LOOP-JSON-BASE64---
${generateMetadata()}
---END-LOOP-JSON-BASE64---
*/
`;
}
