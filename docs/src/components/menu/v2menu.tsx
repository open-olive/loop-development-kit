import * as React from 'react';
import styles from './v2menu.module.scss';
import OliveHelpsLogo from '../olive-helps-logo';

interface LinksProps {
  listClass: string;
  itemClass: string;
}

const Links: React.FunctionComponent<LinksProps> = (props) => (
  <ul className={props.listClass}>
    <li className={props.itemClass}>
      <a href="https://open-olive.github.io/loop-development-kit/ldk/javascript/" target="_blank">
        LDK
      </a>
    </li>
    <li className={props.itemClass}>
      <a href="https://coda.io/@olive-helps-design/design-system">Design system</a>
    </li>
    <li className={props.itemClass}>
      <a href="https://github.com/open-olive/loop-development-kit/issues">Support</a>
    </li>
  </ul>
);

const MobileV2Menu: React.FunctionComponent = (props) => (
  <div className={styles.mobileMenu}>
    <div className={styles.mobileMenuLogo}>
      <OliveHelpsLogo />
    </div>
    <Links itemClass={styles.mobileMenuLink} listClass={styles.mobileMenuLinks} />
  </div>
);

const DesktopV2Menu: React.FunctionComponent = (props) => (
  <div className={styles.desktopMenu}>
    <div className={styles.desktopMenuLogo}>
      <OliveHelpsLogo />
    </div>
    <div className={styles.desktopMenuTitle}>Developer Hub</div>
    <Links itemClass={styles.desktopMenuLink} listClass={styles.desktopMenuLinks} />
  </div>
);

export const V2Menu: React.FunctionComponent = (props) => (
  <>
    <DesktopV2Menu />
    <MobileV2Menu />
  </>
);
