import React from "react"
import { graphql, PageProps } from "gatsby"
import styles from "./aptitudeTemplate.module.scss"
import { Aptitude } from "../components/aptitudes/aptitude"
import { aptitudes } from "../components/aptitudes/aptitudeData"
import { Menu } from "../components/menu/menu"

interface TemplateProps {
  markdownRemark: {
    html: string
    frontmatter: {
      slug: string
      aptitude: string
    }
  }
}

export default function Template(props: PageProps<TemplateProps>) {
  console.log(props)
  let aptitudeData = Object.values(aptitudes)
  const aptitudeId = props.data.markdownRemark.frontmatter.aptitude
  return (
    <>
      <div className={styles.layout}>
        <Menu currentPath={props.path} aptitudes={aptitudeData} />
        <div className={styles.content}>
          <Aptitude {...aptitudes[aptitudeId]} />
        </div>
      </div>
    </>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        aptitude
      }
    }
  }
`
