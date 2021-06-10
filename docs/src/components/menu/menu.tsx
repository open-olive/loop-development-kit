import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { IMenuProps } from './shared-menu';
import { DesktopMenu } from './desktop-menu';
import { MobileMenu } from './mobile-menu';
import { getAptitudeDataFromQuery } from '../../queries';

export const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  const guideQuery = graphql`
    query {
      allAptitude {
        edges {
          node {
            internalName
            capabilities {
              markdown {
                html
                frontmatter {
                  name
                  links_js
                }
              }
            }
            markdown {
              frontmatter {
                name
              }
            }
          }
        }
      }
      allFile(filter: { relativeDirectory: { eq: "guides" }, extension: { eq: "md" } }) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                slug
                title
              }
            }
            relativeDirectory
          }
        }
      }
    }
  `;
  return (
    <StaticQuery
      query={guideQuery}
      render={(data) => {
        const combinedData = data.allAptitude.edges.map((aptitude: any) =>
          getAptitudeDataFromQuery(aptitude.node),
        );
        return (
          <>
            <MobileMenu aptitudes={combinedData} currentPath={props.currentPath} guideList={data} />
            <DesktopMenu
              aptitudes={combinedData}
              currentPath={props.currentPath}
              guideList={data}
            />
          </>
        );
      }}
    />
  );
};
