import { IAptitudeData } from '../aptitudes/aptitudeData';
import {
  IGuideFrontMatter,
  IMarkdownEdgeQuery,
  IMarkdownRemarkQuery,
  QueryEdge,
} from '../../queries';

export interface IMenuProps {
  currentPath: string;
}

export type IGuideQuery = IMarkdownRemarkQuery<IGuideFrontMatter>;

export interface IMenuDetailProps extends IMenuProps {
  aptitudes: IAptitudeData[];
  guideList: IGuideQuery;
}

export interface IMenuAptitudeProps {
  aptitude: IAptitudeData;
  current: boolean;
}

export const mapRemarkEdges: <T>(
  queryResults: IMarkdownRemarkQuery<T>,
  mapFn: (edge: QueryEdge<T>) => T,
) => T[] = (queryResults, mapFn) => {
  return queryResults.allMarkdownRemark.edges.map(mapFn);
};

export const mapGuidePages = (queryResults: IGuideQuery): IGuideFrontMatter[] => {
  return mapRemarkEdges(queryResults, (edge) => ({
    slug: '/' + edge.node.frontmatter.slug,
    title: edge.node.frontmatter.title,
    description: edge.node.frontmatter.description,
  }));
};
