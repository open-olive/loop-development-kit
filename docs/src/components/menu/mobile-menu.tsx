import React, { ChangeEvent } from 'react';
import { getPages, IMenuDetailProps } from './shared-menu';
import { navigate } from 'gatsby';
import { buildAptitudePath } from '../aptitudes/aptitudePaths';
import styles from './menu.module.scss';
import mobileStyles from './mobile-menu.module.scss';

export const MobileMenu: React.FunctionComponent<IMenuDetailProps> = (props) => {
  const onChange = (newValue: ChangeEvent<HTMLSelectElement>) => {
    navigate(newValue.target.value);
  };
  const sensorOptions = props.aptitudes.map((apt) => (
    <option value={buildAptitudePath(apt)}>{apt.name}</option>
  ));
  const guides = getPages(props.guideList).map((guide) => (
    <option value={guide.slug}>{guide.title}</option>
  ));
  return (
    <div className={styles.mobileMenu}>
      <h1 className={mobileStyles.mobileTitleMark}>Olive Helps Developer Hub</h1>
      <select
        onChange={onChange}
        value={props.currentPath}
        className={mobileStyles.mobileNavigation}
      >
        <option value="/">Home</option>
        <optgroup label="Aptitudes">{sensorOptions}</optgroup>
        <optgroup label="Guides">{guides}</optgroup>
      </select>
    </div>
  );
};
