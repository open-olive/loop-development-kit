import React from 'react';
import styles from './aptitudeTemplate.module.scss';
import { Menu } from '../components/menu/menu';
import { Aptitude } from '../components/aptitudes/aptitude';
import { aptitudes } from '../components/aptitudes/aptitudeData';
import { PageProps } from 'gatsby';

interface StandardLayoutProps {
  path: string;
}

export const StandardLayout: React.FunctionComponent<StandardLayoutProps> = (props) => {
  return (
    <>
      <div className={styles.layout}>
        <Menu currentPath={props.path} />
        <div className={styles.content}>{props.children}</div>
      </div>
    </>
  );
};
