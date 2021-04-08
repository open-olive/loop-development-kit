import React from 'react';
import styles from './aptitudeTemplate.module.scss';
import { Menu } from '../components/menu/menu';

interface StandardLayoutProps {
  path: string;
}

export const StandardLayout: React.FunctionComponent<StandardLayoutProps> = (props) => {
  return (
    <>
      <div className={styles.layout}>
        <Menu currentPath={props.path} />
        <div className={styles.contentContainer}>
          <div className={styles.contentWrapper}>{props.children}</div>
        </div>
      </div>
    </>
  );
};
