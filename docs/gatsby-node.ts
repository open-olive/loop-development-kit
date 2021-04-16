import * as crypto from 'crypto';
import { CreatePagesArgs, CreateSchemaCustomizationArgs } from 'gatsby';
import { IAllFileQuery, IGuideFrontMatter } from './src/queries';
import { createNodeId } from 'gatsby/dist/utils/create-node-id';

const buildAptitudeTypes = (args: CreateSchemaCustomizationArgs) => {
  const typeDefs = `
  """
  Aptitude Node
  """
  type Aptitude implements Node @infer {
    capabilities: [Capability] @link(by: "aptitudeInternalName", from: "internalName")
    markdown: MarkdownRemark @link(from: "markdownNodeId")
    markdownNodeId: String
    internalName: String
  }
  
  type Capability implements Node @infer {
    markdown: MarkdownRemark @link(from: "markdownNodeId")
    markdownNodeId: String
    aptitudeInternalName: String
    aptitude: Aptitude @link(from: "aptitudeInternalName", by: "internalName")
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
      const aptitudeName = node.name.split('.')[0];
      const fieldData = {
        id: createNodeId(`${node.name}`, 'capability'),
        aptitudeInternalName: aptitudeName,
        markdownNodeId: markdownNodeId,
      };
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
        internalName: node.name,
        markdownNodeId: markdownNodeId,
      };
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

const buildAptitudePagesWithQuery = async (args: CreatePagesArgs) => {
  const template = require.resolve('./src/templates/aptitudeTemplateWithQuery.tsx');
  const result = await args.graphql(`
    {
      allAptitude {
        edges {
          node {
            internalName
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    args.reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  (result.data as any).allAptitude.edges.forEach(({ node }) => {
    const path = `/app/aptitudes/${node.internalName}`;
    args.actions.createPage({
      path: path,
      component: template,
      context: {
        // additional data can be passed via context
        slug: node.internalName,
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
  await buildAptitudePagesWithQuery(args);
  await buildGuidePages(args);
};

export const createSchemaCustomization = (args: CreateSchemaCustomizationArgs) => {
  buildAptitudeTypes(args);
};
