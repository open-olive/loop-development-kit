import React from "react"
import { graphql, Link } from "gatsby"
import styles from "./aptitudeTemplate.module.scss"
import { Aptitude } from "../components/aptitudes/aptitude"
import {
  buildCapabilityPath,
  buildSensorId,
  buildSensorPath,
} from "../components/aptitudes/aptitudePaths"
import { aptitudes } from "../components/aptitudes/aptitudeData"

interface TemplateProps {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        slug: string
        aptitude: string
      }
    }
  }
}

function renderAptitudes(activeSensorId: string): React.ReactNode {
  return Object.values(aptitudes).map(sensor => {
    const capabilities = sensor.capabilities.map(capability => {
      return (
        <li className={styles.sectionSubItem}>
          <Link to={buildCapabilityPath(capability, sensor)}>
            {capability.name}
          </Link>
        </li>
      )
    })

    return (
      <li className={styles.sectionItem}>
        <Link to={buildSensorPath(sensor)}>
          <h2 className={styles.sectionItemHeader}>{sensor.name}</h2>
        </Link>
        {activeSensorId === buildSensorId(sensor) && (
          <ul className={styles.sectionSubItems}>{capabilities}</ul>
        )}
      </li>
    )
  })
}

export default function Template(props: TemplateProps) {
  const { markdownRemark } = props.data
  const aptitudeId = props.data.markdownRemark.frontmatter.aptitude
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.menu}>
          <section className={styles.menuSection}>
            <h1 className={styles.sectionTitle}>Aptitudes</h1>
            <ul className={styles.sectionItems}>
              {renderAptitudes(aptitudeId)}
            </ul>
          </section>
        </div>
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
