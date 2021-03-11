import { IGuideFrontMatter, IMarkdownRemarkQuery } from '../../../gatsby-node';
import { IAptitudeData } from '../aptitudes/aptitudeData';

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

export const getPages = (queryResults: IGuideQuery): IGuideFrontMatter[] => {
  return queryResults.allMarkdownRemark.edges.map((edge) => ({
    slug: '/' + edge.node.frontmatter.slug,
    title: edge.node.frontmatter.title,
  }));
};