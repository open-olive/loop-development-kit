import { IAptitudeData } from '../aptitudes/aptitudeData';
import { IAllFileQuery, IGuideFrontMatter, QueryEdge } from '../../queries';

export interface IMenuProps {
  currentPath: string;
}

export type IGuideQuery = IAllFileQuery<IGuideFrontMatter>;

export interface IMenuDetailProps extends IMenuProps {
  aptitudes: IAptitudeData[];
  guideList: IGuideQuery;
}

export interface IMenuAptitudeProps {
  aptitude: IAptitudeData;
  current: boolean;
}

export const mapRemarkEdges: <T>(
  queryResults: IAllFileQuery<T>,
  mapFn: (edge: QueryEdge<T>) => T,
) => T[] = (queryResults, mapFn) => {
  return queryResults.allFile.edges.map(mapFn);
};

export const mapGuidePages = (queryResults: IGuideQuery): IGuideFrontMatter[] => {
  return mapRemarkEdges(queryResults, (edge) => ({
    slug: '/' + edge.node.childMarkdownRemark.frontmatter.slug,
    title: edge.node.childMarkdownRemark.frontmatter.title,
    description: edge.node.childMarkdownRemark.frontmatter.description,
  }));
};
