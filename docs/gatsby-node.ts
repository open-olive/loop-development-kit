import * as crypto from 'crypto';
import { buildAptitudeId, buildAptitudePath } from './src/components/aptitudes/aptitudePaths';
import { aptitudes } from './src/components/aptitudes/aptitudeData';
import { CreatePagesArgs, CreateSchemaCustomizationArgs, SourceNodesArgs } from 'gatsby';
import { IAllFileQuery, IGuideFrontMatter } from './src/queries';
import { createNodeId } from 'gatsby/dist/utils/create-node-id';

const buildAptitudeTypes = (args: CreateSchemaCustomizationArgs) => {
  const typeDefs = `
  """
  Aptitude Node
  """
  type Aptitude implements Node @infer {
    capabilities: [Capability!]!
    markdown: MarkdownRemark @link(from: "markdownNodeId")
    markdownNodeId: String
  }
  
  type Capability implements Node @infer {
    markdown: MarkdownRemark @link(from: "markdownNodeId")
    markdownNodeId: String
  }
  
  `;
  args.actions.createTypes(typeDefs);
};

const buildAptitudeNodes = async (args: CreatePagesArgs) => {
  const result = await args.graphql<IAllFileQuery<{}>>(`
{
  allFile(filter: {relativeDirectory: {eq: "aptitudes"}}) {
    edges {
      node {
        id
        childMarkdownRemark {
          id
          frontmatter {
            name
            links_go
            links_node
          }
          html
        }
        name
      }
    }
  }
}
  `);
  result.data.allFile.edges.forEach((file) => {
    const node = file.node;
    const markdownNodeId = node.childMarkdownRemark.id;
    if (node.name.includes('.')) {
      // Link to Capability
      const fieldData = {
        id: createNodeId(`${node.name}`, 'capability'),
        markdown___NODE: markdownNodeId,
        markdownNodeId: markdownNodeId,
      };
      console.log(
        'Building Capability with ID',
        fieldData.id,
        'and markdown node ID',
        fieldData.markdown___NODE,
      );
      args.actions.createNode(
        {
          ...fieldData,
          parent: null,
          children: [],
          internal: {
            type: 'Capability',
            contentDigest: crypto.createHash('md5').update(JSON.stringify(fieldData)).digest('hex'),
          },
        },
        {
          name: 'gatsby-plugin-ts-config',
        },
      );
    } else {
      const fieldData = {
        id: createNodeId(`${node.name}`, 'aptitude'),
        markdown___NODE: markdownNodeId,
        markdownNodeId: markdownNodeId,
      };
      console.log(
        'Building Aptitude with ID',
        fieldData.id,
        'and markdown node ID',
        fieldData.markdown___NODE,
      );
      args.actions.createNode(
        {
          ...fieldData,
          parent: null,
          children: [],
          internal: {
            type: 'Aptitude',
            contentDigest: crypto.createHash('md5').update(JSON.stringify(fieldData)).digest('hex'),
          },
        },
        {
          name: 'gatsby-plugin-ts-config',
        },
      );
    }
  });
};

const buildAptitudePages = async (args: CreatePagesArgs) => {
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
            name
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
  await buildAptitudeNodes(args);
  await buildAptitudePages(args);
  await buildGuidePages(args);
};

export const createSchemaCustomization = (args: CreateSchemaCustomizationArgs) => {
  buildAptitudeTypes(args);
};
