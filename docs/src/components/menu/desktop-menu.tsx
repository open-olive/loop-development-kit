import React from 'react';
import { getPages, IMenuAptitudeProps, IMenuDetailProps } from './shared-menu';
import { buildAptitudePath, buildCapabilityPath } from '../aptitudes/aptitudePaths';
import styles from './menu.module.scss';
import { Link } from 'gatsby';
import { OliveHelpsLogoSmall } from '../olive-helps-logo-small';

export const MenuAptitude: React.FunctionComponent<IMenuAptitudeProps> = (props) => {
  const sensor = props.aptitude;
  const capabilities = sensor.capabilities.map((capability) => {
    return (
      <li className={styles.sectionSubItem}>
        <Link to={buildCapabilityPath(capability, sensor)}>{capability.name}</Link>
      </li>
    );
  });

  return (
    <li className={styles.sectionItem}>
      <Link to={buildAptitudePath(sensor)}>
        <h2 className={styles.sectionItemHeader}>{sensor.name}</h2>
      </Link>
      {props.current && <ul className={styles.sectionSubItems}>{capabilities}</ul>}
    </li>
  );
};
export const DesktopMenu: React.FunctionComponent<IMenuDetailProps> = (props) => {
  const aptitudes = props.aptitudes.map((aptitude) => {
    const aptitudeId = buildAptitudePath(aptitude);
    return (
      <MenuAptitude
        aptitude={aptitude}
        key={aptitudeId}
        current={props.currentPath == aptitudeId}
      />
    );
  });
  const guides = getPages(props.guideList).map((guide) => (
    <li className={styles.sectionItem}>
      <Link to={guide.slug}>
        <h2 className={styles.sectionItemHeader}>{guide.title}</h2>
      </Link>
    </li>
  ));
  return (
    <div className={styles.desktopMenu}>
      <section className={styles.menuSection}>
        <h1 className={styles.menuTitle}>
          <Link to="/">
            <OliveHelpsLogoSmall className={styles.menuLogo} />
            Developer Hub
          </Link>
        </h1>
      </section>
      <section className={styles.menuSection}>
        <h1 className={styles.sectionTitle}>Aptitudes</h1>
        <ul className={styles.sectionItems}>{aptitudes}</ul>
      </section>
      <section className={styles.menuSection}>
        <h1 className={styles.sectionTitle}>Guides</h1>
        <ul className={styles.sectionItems}>{guides}</ul>
      </section>
    </div>
  );
};