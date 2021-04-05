export type QueryEdge<T> = {
  node: {
    frontmatter: T;
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
      }
    }
  }
}