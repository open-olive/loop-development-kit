import React, { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

export interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  className?: string;
}

export const Image: React.FunctionComponent<ImageProps> = ({ src, ...rest }) => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
        edges {
          node {
            relativePath
            extension
            publicURL
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const match = useMemo<any>(
    () => data.images.edges.find((data: any) => src === data.node.relativePath),
    [data, src],
  );

  if (!match) {
    console.log('Returning null', src);
    return null;
  }

  const { node } = match;

  if (node.extension === 'svg' || !node.childImageSharp) {
    return <img src={node.publicURL} {...rest} />;
  }

  return <Img fluid={node.childImageSharp.fluid} {...rest} />;
};

export default Image;
