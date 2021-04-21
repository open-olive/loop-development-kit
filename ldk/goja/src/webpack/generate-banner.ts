export function generateMetadata(): string {
  const json = JSON.stringify({
    ldkVersion: process.env.npm_package_dependencies__oliveai_ldk,
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
