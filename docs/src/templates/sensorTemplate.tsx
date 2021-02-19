import React from "react"
import { graphql } from "gatsby"
import styles from "./sensorTemplate.module.scss"
import {Sensor, sensors} from "../components/sensors/sensor"

interface TemplateProps {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        slug: string
        title: string
      }
    }
  }
}

function renderSensors(): React.ReactNode {
  return sensors.map(sensor => {
    const capabilities = sensor.capabilities.map(capability => {
      return <li className={styles.sectionSubItem}>{capability.name}</li>
    })
    return (
      <li className={styles.sectionItem}>
        <h2 className={styles.sectionItemHeader}>{sensor.name}</h2>
        <ul className={styles.sectionSubItems}>{capabilities}</ul>
      </li>
    )
  })
}

export default function Template(props: TemplateProps) {
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.menu}>
          <section className={styles.menuSection}>
            <h1 className={styles.sectionTitle}>Sensors</h1>
            <ul className={styles.sectionItems}>{renderSensors()}</ul>
          </section>
        </div>
        <div className={styles.content}>
          <Sensor {...sensors[0]}/>
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
        title
      }
    }
  }
`
