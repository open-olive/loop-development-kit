function generateMetadata() {
  const json = JSON.stringify({
    ldkVersion: "PLACEHOLDER",
  });
  return Buffer.from(json).toString("base64");
}

function generateBanner() {
  return `
/*
---BEGIN-LOOP-JSON-BASE64---
${generateMetadata()} 
---END-LOOP-JSON-BASE64---
*/
`;
}

module.exports = { generateBanner, generateMetadata };
