import * as React from 'react';
import { IMenuProps } from './shared-menu';
import indexStyles from '../../pages/index.module.scss';
import styles from './v2menu.module.scss';
import OliveHelpsLogo from '../olive-helps-logo';

const DesktopV2Menu: React.FunctionComponent = (props) => (
  <div className={styles.desktopMenu}>
    <div className={styles.desktopMenuLogo}>
      <OliveHelpsLogo />
    </div>
    <div className={styles.desktopMenuTitle}>Developer Hub</div>
    <ul className={styles.desktopMenuLinks}>
      <li className={styles.desktopMenuLink}>LDK</li>
      <li className={styles.desktopMenuLink}>Design system</li>
      <li className={styles.desktopMenuLink}>Support</li>
    </ul>
  </div>
);

export const V2Menu: React.FunctionComponent = (props) => (
  <>
    <DesktopV2Menu />
  </>
);
