import React, { ChangeEvent } from 'react';
import {
  buildAptitudeId,
  buildAptitudePath,
  buildCapabilityPath,
} from '../aptitudes/aptitudePaths';
import styles from './menu.module.scss';
import { Link, navigate } from 'gatsby';
import { aptitudes, IAptitudeData } from "../aptitudes/aptitudeData";
import { OliveHelpsLogoSmall } from "../olive-helps-logo-small";

interface IMenuProps {
  currentPath: string;
}

interface IMenuDetailProps extends IMenuProps {
  aptitudes: IAptitudeData[];
}

interface IMenuAptitudeProps {
  aptitude: IAptitudeData;
  current: boolean;
}

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

export const MobileMenuSelect: React.FunctionComponent<IMenuDetailProps> = (props) => {
  const onChange = (newValue: ChangeEvent<HTMLSelectElement>) => {
    navigate(newValue.target.value);
  };
  const sensorOptions = props.aptitudes.map((apt) => (
    <option value={buildAptitudePath(apt)}>{apt.name}</option>
  ));
  return (
    <div className={styles.mobileMenu}>
      <h1 className={styles.mobileTitleMark}>Olive Helps Developer Hub</h1>
      <select onChange={onChange} value={props.currentPath} className={styles.mobileNavigation}>
        <option value="/">Home</option>
        <optgroup label="Aptitudes">{sensorOptions}</optgroup>
      </select>
    </div>
  );
};

export const DesktopMenu: React.FunctionComponent<IMenuDetailProps> = (props) => {
  let elements = props.aptitudes.map((aptitude) => {
    const aptitudeId = buildAptitudePath(aptitude);
    return (
      <MenuAptitude
        aptitude={aptitude}
        key={aptitudeId}
        current={props.currentPath == aptitudeId}
      />
    );
  });
  return (
    <div className={styles.desktopMenu}>
      <section className={styles.menuSection}>
        <h1 className={styles.menuTitle}>
          <Link to="/"><OliveHelpsLogoSmall className={styles.menuLogo}/>Developer Hub</Link>
        </h1>
      </section>
      <section className={styles.menuSection}>
        <h1 className={styles.sectionTitle}>Aptitudes</h1>
        <ul className={styles.sectionItems}>{elements}</ul>
      </section>
    </div>
  );
};

export const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  const aptitudeData = Object.values(aptitudes);
  return (
    <>
      <MobileMenuSelect aptitudes={aptitudeData} currentPath={props.currentPath} />
      <DesktopMenu aptitudes={aptitudeData} currentPath={props.currentPath} />
    </>
  );
};
