import React from "react"
import { graphql, Link } from "gatsby"
import styles from "./sensorTemplate.module.scss"
import { Sensor, sensors } from "../components/sensors/sensor"

interface TemplateProps {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        slug: string
        sensor: string
      }
    }
  }
}

function renderSensors(activeSensorId: string): React.ReactNode {
  return Object.values(sensors).map(sensor => {
    const capabilities = sensor.capabilities.map(capability => {
      return <li className={styles.sectionSubItem}><Link to={capability.pagePath()}> {capability.name}</Link></li>
    })
    const to = sensor.pagePath();
    return (
      <li className={styles.sectionItem}>
        <Link to={to}><h2 className={styles.sectionItemHeader}>{sensor.name}</h2></Link>
        {activeSensorId === sensor.id && (
          <ul className={styles.sectionSubItems}>{capabilities}</ul>
        )}
      </li>
    )
  })
}

export default function Template(props: TemplateProps) {
  const { markdownRemark } = props.data
  const sensorId = props.data.markdownRemark.frontmatter.sensor
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.menu}>
          <section className={styles.menuSection}>
            <h1 className={styles.sectionTitle}>Sensors</h1>
            <ul className={styles.sectionItems}>{renderSensors(sensorId)}</ul>
          </section>
        </div>
        <div className={styles.content}>
          <Sensor {...sensors[sensorId]} />
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
        sensor
      }
    }
  }
`
