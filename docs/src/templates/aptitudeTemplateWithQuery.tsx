import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Aptitude } from '../components/aptitudes/aptitude';
import { aptitudes, IAptitudeData } from '../components/aptitudes/aptitudeData';
import { StandardLayout } from './standard-layout';

interface AptitudeMarkdown {
  html: string;
  frontmatter: {
    name: string;
    links_go: string | undefined;
    links_node: string | undefined;
  };
}

interface TemplateProps {
  aptitude: {
    internalName: string;
    markdown: AptitudeMarkdown;
    capabilities: {
      markdown: AptitudeMarkdown;
    }[];
  };
}

interface TemplatePageContext {
  aptitudeId: string;
}

export default function Template(props: PageProps<TemplateProps, TemplatePageContext>) {
  const data = props.data.aptitude;
  const aptitudeFrontMatter = data.markdown.frontmatter;
  const aptitudeData: IAptitudeData = {
    name: aptitudeFrontMatter.name,
    description: data.markdown.html,
    links: {
      node: aptitudeFrontMatter.links_node,
      go: aptitudeFrontMatter.links_go,
    },
    capabilities: data.capabilities.map((capability) => ({
      name: capability.markdown.frontmatter.name,
      description: capability.markdown.html,
      links: {
        node: capability.markdown.frontmatter.links_node,
        go: capability.markdown.frontmatter.links_go,
      },
    })),
  };
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
