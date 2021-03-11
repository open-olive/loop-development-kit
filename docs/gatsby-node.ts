import { buildAptitudeId, buildAptitudePath } from './src/components/aptitudes/aptitudePaths';
import { aptitudes } from './src/components/aptitudes/aptitudeData';
import { CreatePagesArgs } from 'gatsby';

const buildAptitudePages = (args: CreatePagesArgs) => {
  const blogPostTemplate = require.resolve(`./src/templates/aptitudeTemplate.tsx`);
  Object.values(aptitudes).forEach((aptitude) => {
    args.actions.createPage({
      path: buildAptitudePath(aptitude),
      component: blogPostTemplate,
      context: {
        aptitudeId: buildAptitudeId(aptitude),
      },
    });
  });
};

interface IMarkdownRemarkQuery<T> {
  allMarkdownRemark: {
    edges: {
      node: {
        frontmatter: T;
      };
    }[];
  };
}

interface IGuideFrontMatter {
  slug: string;
  title: string;
}

export const createPages = async (args: CreatePagesArgs) => {
  const {
    actions: { createPage },
    graphql,
    reporter,
  } = args;
  buildAptitudePages(args);

  const guideTemplate = require.resolve(`./src/templates/guideTemplate.tsx`);

  const result = await graphql<IMarkdownRemarkQuery<IGuideFrontMatter>>(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___title] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: guideTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    });
  });
};
