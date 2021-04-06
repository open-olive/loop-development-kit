import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Aptitude } from '../components/aptitudes/aptitude';
import { StandardLayout } from './standard-layout';
import { getAptitudeDataFromQuery, TemplateProps } from '../queries';

export interface TemplatePageContext {
  aptitudeId: string;
}

export default function Template(props: PageProps<TemplateProps, TemplatePageContext>) {
  const dataProp = props.data;
  const aptitudeData = getAptitudeDataFromQuery(dataProp.aptitude);
  return (
    <StandardLayout path={props.path}>
      <Aptitude {...aptitudeData} />
    </StandardLayout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    aptitude(internalName: { eq: $slug }) {
      internalName
      capabilities {
        markdown {
          html
          frontmatter {
            name
            links_go
            links_node
          }
        }
      }
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
