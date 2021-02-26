import React from "react"
import { slugify } from "underscore.string"
import styles from "./aptitude.module.scss"
import { buildCapabilityId, buildCapabilityPath } from "./aptitudePaths"
import {
  ICapabilityData,
  IAptitudeData,
  LDKLinkActive,
  LDKLinks,
} from "./aptitudeData"

const Links: React.FunctionComponent<{ links?: LDKLinkActive }> = props => {
  if (props.links == undefined) {
    return null
  }
  return (
    <ul className={styles.ldkLinks}>
      {["go", "node"].map(language => {
        const link = props.links![language as keyof LDKLinks]
        if (link == null) {
          return
        }
        return (
          <li className={styles.ldkLink}>
            <a href={link} target="_blank">
              {language}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export const Capability: React.FunctionComponent<{
  capability: ICapabilityData
  aptitude: IAptitudeData
}> = props => {
  const id = buildCapabilityId(props.capability)
  return (
    <section className={styles.capability}>
      <h2 className={styles.capabilityName}>
        <a id={id} href={buildCapabilityPath(props.capability, props.aptitude)}>
          {props.capability.name}
        </a>
      </h2>
      <Links links={props.capability.links} />
      <p className={styles.capabilityDescription}>
        {props.capability.description}
      </p>
    </section>
  )
}

export const Aptitude: React.FunctionComponent<IAptitudeData> = props => {
  return (
    <article className={styles.aptitude}>
      <h1 className={styles.aptitudeName}>{props.name}</h1>
      <Links links={props.links} />
      <p className={styles.aptitudeDescription}>{props.description}</p>
      <div className={styles.capabilities}>
        {props.capabilities?.map(capability => (
          <Capability
            capability={capability}
            key={slugify(capability.name)}
            aptitude={props}
          />
        ))}
      </div>
    </article>
  )
}
