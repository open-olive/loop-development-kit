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
