import * as us from 'underscore.string';
import { aptitudes, IAptitudeData, ICapabilityData } from './components/aptitudes/aptitudeData';
import * as path from 'path';
import * as fs from "fs";

const renderAptitude = (data: IAptitudeData): string => {
  return `---
name: "${data.name}"
links_go: "${data.links?.go}"
links_node: "${data.links?.node}"
---
${data.description}
`;
};

const renderCapability = (data: ICapabilityData): string => {
  return `---
name: "${data.name}"
links_go: "${data.links?.go}"
links_node: "${data.links?.node}"
---
${data.description}
`;
};

Object.values(aptitudes).forEach((aptitude) => {
  const aptitudeInternalName = us.dasherize(aptitude.name.toLowerCase());
  const aptitudeFileName = `${aptitudeInternalName}.md`;
  const aptitudePath = path.resolve(__dirname, 'markdown-pages', 'aptitudes', aptitudeFileName);
  const renderedAptitudeFile = renderAptitude(aptitude);
  console.log('---');
  console.log('RENDERING TO', aptitudePath);
  console.log(renderedAptitudeFile);
  fs.writeFileSync(aptitudePath, renderedAptitudeFile);
  aptitude.capabilities.forEach((capability) => {
    const capabilityInternalName = us.dasherize(capability.name.toLowerCase());
    const capabilityFileName = `${aptitudeInternalName}.${capabilityInternalName}.md`;
    const capabilityPath = path.resolve(
      __dirname,
      'markdown-pages',
      'aptitudes',
      capabilityFileName,
    );
    const renderedCapabilityFile = renderCapability(capability);
    console.log('---');
    console.log('RENDERING TO', capabilityPath);
    console.log(renderedCapabilityFile);
    fs.writeFileSync(capabilityPath, renderedCapabilityFile);
  });
});
