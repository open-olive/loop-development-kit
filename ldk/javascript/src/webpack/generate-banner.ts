export function generateMetadata(): string {
  const json = JSON.stringify({
    oliveHelpsContractVersion: '0.1.0',
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
