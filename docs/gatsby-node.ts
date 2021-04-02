import { buildAptitudeId, buildAptitudePath } from './src/components/aptitudes/aptitudePaths';
import { aptitudes } from './src/components/aptitudes/aptitudeData';
import { CreatePagesArgs } from 'gatsby';
import { IAllFileQuery, IGuideFrontMatter} from "./src/queries";

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

const buildGuidePages = async (args: CreatePagesArgs) => {
  const {
    actions: { createPage },
    graphql,
    reporter,
  } = args;
  const guideTemplate = require.resolve(`./src/templates/guideTemplate.tsx`);
  const result = await graphql<IAllFileQuery<IGuideFrontMatter>>(`
    {
      allFile(filter: { relativeDirectory: { eq: "guides" } }) {
        edges {
          node {
            id
            childMarkdownRemark {
              frontmatter {
                description
                slug
                title
              }
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
  result.data!.allFile.edges.forEach(({ node }) => {
    const frontMatter = node.childMarkdownRemark?.frontmatter;
    if (frontMatter?.slug == null) {
      return;
    }
    createPage({
      path: frontMatter.slug,
      component: guideTemplate,
      context: {
        // additional data can be passed via context
        slug: frontMatter.slug,
      },
    });
  });
};

export const createPages = async (args: CreatePagesArgs) => {
  buildAptitudePages(args);
  await buildGuidePages(args);
};
