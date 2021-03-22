import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

export const OliveHelpsLogoSmall = ({ className }: { className?: string }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "olive-helps-logo-white.png" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return <Img fluid={data.file.childImageSharp.fluid} className={className} />;
};
