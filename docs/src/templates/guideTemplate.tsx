import React from 'react';
import { graphql, PageProps } from 'gatsby';
import styles from './aptitudeTemplate.module.scss';
import { Aptitude } from '../components/aptitudes/aptitude';
import { aptitudes } from '../components/aptitudes/aptitudeData';
import { Menu } from '../components/menu/menu';
import { StandardLayout } from './standard-layout';

interface TemplateProps {
  markdownRemark: {
    html: string;
    frontmatter: {
      slug: string;
      title: string;
    };
  };
}

interface TemplatePageContext {
  aptitudeId: string;
}

export default function Template(props: PageProps<TemplateProps, TemplatePageContext>) {
  return (
    <StandardLayout path={props.path}>
      <h1>{props.data.markdownRemark.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
    </StandardLayout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`;
