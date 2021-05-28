import { IAptitudeData } from './components/aptitudes/aptitudeData';

export type QueryEdge<T> = {
  node: {
    childMarkdownRemark: {
      frontmatter: T;
      id: string;
    };
  };
};

export interface IMarkdownEdgeQuery<T> {
  edges: QueryEdge<T>[];
}

export interface IMarkdownRemarkQuery<T> {
  allMarkdownRemark: IMarkdownEdgeQuery<T>;
}

export interface IGuideFrontMatter {
  slug: string;
  title: string;
  description: string;
}

export interface IAllFileQuery<T> {
  allFile: {
    edges: {
      node: {
        id: string;
        childMarkdownRemark: {
          frontmatter: T;
          id: string;
        };
        name: string;
      };
    }[];
  };
}

export interface IAllAptitudeQuery {
  allAptitude: {
    edges: {
      node: {
        id: string;
        internalName: string;
        markdown: {
          frontmatter: {
            name: string;
            description: string;
          };
        };
      };
    }[];
  };
}

export interface AptitudeMarkdown {
  html: string;
  frontmatter: {
    name: string;
    description: string;
    links_js: string | undefined;
  };
}

export interface AptitudeQueryResult {
  internalName: string;
  markdown: AptitudeMarkdown;
  capabilities: {
    markdown: AptitudeMarkdown;
  }[];
}

export interface TemplateProps {
  aptitude: AptitudeQueryResult;
}

export function getAptitudeDataFromQuery(queryResult: AptitudeQueryResult): IAptitudeData {
  const aptitudeFrontMatter = queryResult.markdown.frontmatter;
  return {
    name: aptitudeFrontMatter.name,
    internalName: queryResult.internalName,
    shortDescription: aptitudeFrontMatter.description,
    description: queryResult.markdown.html,
    links: {
      js: aptitudeFrontMatter.links_js,
    },
    capabilities: queryResult.capabilities.map((capability) => ({
      name: capability.markdown.frontmatter.name,
      description: capability.markdown.html,
      links: {
        js: capability.markdown.frontmatter.links_js,
      },
    })),
  };
}
