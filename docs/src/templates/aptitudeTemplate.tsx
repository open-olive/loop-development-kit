import React from "react"
import { graphql, Link } from "gatsby"
import styles from "./aptitudeTemplate.module.scss"
import { Aptitude } from "../components/aptitudes/aptitude"
import {
  buildCapabilityPath,
  buildAptitudeId,
  buildAptitudePath,
} from "../components/aptitudes/aptitudePaths"
import { aptitudes, IAptitudeData } from "../components/aptitudes/aptitudeData"

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

interface IMenuProps {
  aptitudes: IAptitudeData[]
  currentAptitudeId: string
}

interface IMenuAptitudeProps {
  aptitude: IAptitudeData
  current: boolean
}

export const MenuAptitude: React.FunctionComponent<IMenuAptitudeProps> = props => {
  const sensor = props.aptitude
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
      <Link to={buildAptitudePath(sensor)}>
        <h2 className={styles.sectionItemHeader}>{sensor.name}</h2>
      </Link>
      {props.current && (
        <ul className={styles.sectionSubItems}>{capabilities}</ul>
      )}
    </li>
  )
}

export const Menu: React.FunctionComponent<IMenuProps> = props => {
  let elements = props.aptitudes.map(aptitude => {
    const aptitudeId = buildAptitudeId(aptitude)
    return (
      <MenuAptitude
        aptitude={aptitude}
        key={aptitudeId}
        current={props.currentAptitudeId == aptitudeId}
      />
    )
  })
  return (
    <div className={styles.menu}>
      <section className={styles.menuSection}>
        <h1 className={styles.sectionTitle}>Aptitudes</h1>
        <ul className={styles.sectionItems}>{elements}</ul>
      </section>
    </div>
  )
}

export default function Template(props: TemplateProps) {
  let aptitudeData = Object.values(aptitudes)
  const aptitudeId = props.data.markdownRemark.frontmatter.aptitude
  return (
    <>
      <div className={styles.layout}>
        <Menu currentAptitudeId={aptitudeId} aptitudes={aptitudeData} />
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
