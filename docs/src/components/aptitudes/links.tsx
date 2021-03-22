import React from 'react';
import { IAptitudeData, ICapabilityData, LDKLinkActive } from './aptitudeData';
import styles from './links.module.scss';
import { SupportedLanguage } from '../../references';
import { GolangLogo } from './golang-logo';
import { NodeLogo } from './node-logo';
import { DotNetLogo } from './dot-net-logo';

export const languages: SupportedLanguage[] = ['go', 'node', 'dotnet'];

function languageLogo(language: SupportedLanguage): React.ReactNode {
  const color = '#000000';
  switch (language) {
    case 'go':
      return <GolangLogo fillColor={color} />;
    case 'node':
      return <NodeLogo fillColor={color} />;
    case 'dotnet':
      return <DotNetLogo fillColor={color} />;
  }
}

function buildGoLink(interfaceName: string, methodName?: string): string {
  const renderedMethodName = methodName ? `.${methodName}` : '';
  return `https://pkg.go.dev/github.com/open-olive/loop-development-kit/ldk/go#${interfaceName}${renderedMethodName}`;
}

function buildNodeLink(interfaceName: string, methodName?: string): string {
  const renderedInterfaceName = interfaceName.toLowerCase();
  const renderedMethodName = methodName ? `#${methodName.toLowerCase()}` : '';
  return `https://open-olive.github.io/loop-development-kit/ldk/node/interfaces/${renderedInterfaceName}.html${renderedMethodName}`;
}

function linkBuilder(
  language: SupportedLanguage,
  aptitude: IAptitudeData,
  capability?: ICapabilityData,
  link?: string,
): string | undefined {
  if (link && link.startsWith('https')) {
    return link;
  }
  const aptitudeLink = aptitude.links?.[language];
  if (aptitudeLink == null) {
    return undefined;
  }
  const capabilityLink = capability?.links?.[language];
  switch (language) {
    case 'go':
      return buildGoLink(aptitudeLink, capabilityLink);
    case 'node':
      return buildNodeLink(aptitudeLink, capabilityLink);
    case 'dotnet':
      return undefined;
  }
}

export interface ILinkProps {
  links: LDKLinkActive | undefined;
  aptitude: IAptitudeData;
  capability?: ICapabilityData;
}

export const Links: React.FunctionComponent<ILinkProps> = (props) => {
  if (props.links == undefined) {
    return null;
  }
  return (
    <ul className={styles.ldkLinks}>
      {languages.map((language) => {
        const link = props.links![language];
        const href = linkBuilder(language, props.aptitude, props.capability, link);
        if (href == null) {
          return;
        }
        return (
          <li className={styles.ldkLink}>
            <a href={href} target="_blank" className={styles.ldkLinkInternal}>
              {languageLogo(language)}
              <span className={styles.ldkLinkName}>{language}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
