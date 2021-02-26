import React from "react"
import { slugify } from "underscore.string"
import styles from "./sensor.module.scss"
import { buildCapabilityId, buildCapabilityPath } from "./sensorPaths"
import {
  ISensorCapabilityData,
  ISensorData,
  LDKLinkActive,
  LDKLinks,
} from "./sensorData"

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
  capability: ISensorCapabilityData
  sensor: ISensorData
}> = props => {
  const id = buildCapabilityId(props.capability)
  return (
    <section className={styles.capability}>
      <h2 className={styles.capabilityName}>
        <a id={id} href={buildCapabilityPath(props.capability, props.sensor)}>
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

export const Sensor: React.FunctionComponent<ISensorData> = props => {
  return (
    <article className={styles.sensor}>
      <h1 className={styles.sensorName}>{props.name}</h1>
      <Links links={props.links} />
      <p className={styles.sensorDescription}>{props.description}</p>
      <div className={styles.capabilities}>
        {props.capabilities?.map(capability => (
          <Capability
            capability={capability}
            key={slugify(capability.name)}
            sensor={props}
          />
        ))}
      </div>
    </article>
  )
}
