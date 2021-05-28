import * as React from 'react';
import styles from './v2menu.module.scss';
import OliveHelpsLogo from '../olive-helps-logo';

const DesktopV2Menu: React.FunctionComponent = (props) => (
  <div className={styles.desktopMenu}>
    <div className={styles.desktopMenuLogo}>
      <OliveHelpsLogo />
    </div>z
    <div className={styles.desktopMenuTitle}>Developer Hub</div>
    <ul className={styles.desktopMenuLinks}>
      <li className={styles.desktopMenuLink}>
        <a href="https://open-olive.github.io/loop-development-kit/ldk/javascript/" target="_blank">
          LDK
        </a>
      </li>
      <li className={styles.desktopMenuLink}>
        <a href="https://coda.io/@olive-helps-design/design-system">Design system</a>
      </li>
      <li className={styles.desktopMenuLink}>
        <a href="https://github.com/open-olive/loop-development-kit/issues">Support</a>
      </li>
    </ul>
  </div>
);

export const V2Menu: React.FunctionComponent = (props) => (
  <>
    <DesktopV2Menu />
  </>
);
