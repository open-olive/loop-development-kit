import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Aptitude } from '../components/aptitudes/aptitude';
import { aptitudes } from '../components/aptitudes/aptitudeData';
import { StandardLayout } from './standard-layout';

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
  const aptitudeId = props.pageContext.aptitudeId;
  return (
    <StandardLayout path={props.path}>
      <Aptitude {...aptitudes[aptitudeId]} />
    </StandardLayout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    aptitude(internalName: { eq: $slug }) {
      markdown {
        html
        frontmatter {
          name
          links_go
          links_node
        }
      }
    }
  }
`;
