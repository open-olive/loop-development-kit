import React from 'react';
import { PageProps } from 'gatsby';
import styles from './aptitudeTemplate.module.scss';
import { Aptitude } from '../components/aptitudes/aptitude';
import { aptitudes } from '../components/aptitudes/aptitudeData';
import { Menu } from '../components/menu/menu';

interface TemplateProps {
  markdownRemark: {
    html: string;
    frontmatter: {
      slug: string;
      aptitude: string;
    };
  };
}

interface TemplatePageContext {
  aptitudeId: string;
}

export default function Template(props: PageProps<TemplateProps, TemplatePageContext>) {
  const aptitudeData = Object.values(aptitudes);
  const aptitudeId = props.pageContext.aptitudeId;
  return (
    <>
      <div className={styles.layout}>
        <Menu currentPath={props.path} aptitudes={aptitudeData} />
        <div className={styles.content}>
          <Aptitude {...aptitudes[aptitudeId]} />
        </div>
      </div>
    </>
  );
}
