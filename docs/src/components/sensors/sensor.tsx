import React from "react"
import { slugify } from "underscore.string"
import styles from "./sensor.module.scss"

interface LDKLinks {
  node: string
  go: string
  dotnet: string
}

interface Dictionary<T> {
  [key: string]: T
}

type LDKLinkActive = Partial<LDKLinks>

interface ISensorData {
  name: string
  description: React.ReactNode
  capabilities: ISensorCapabilityData[]
  links?: LDKLinkActive
}

interface ISensor {
  name: string
  description: React.ReactNode
  links?: LDKLinkActive
  capabilities: ISensorCapability[]
  id: string
  pagePath(): string
}

interface ISensorCapabilityData {
  name: string
  description: React.ReactNode
  links?: LDKLinkActive
}

interface ISensorCapability extends ISensorCapabilityData {
  id: string
  pagePath(): string
}

class SensorCapability implements ISensorCapability {
  description: React.ReactNode
  links: LDKLinkActive | undefined
  name: string
  private sensor: SensorData

  constructor(data: ISensorCapabilityData, sensor: SensorData) {
    this.description = data.description
    this.links = data.links
    this.name = data.name
    this.sensor = sensor
  }

  get id(): string {
    return slugify(this.name)
  }

  pagePath(): string {
    return `${this.sensor.pagePath()}#${this.id}`
  }
}

class SensorData implements ISensor {
  private data: ISensorData
  public links: LDKLinkActive | undefined
  constructor(data: ISensorData) {
    this.data = data
    this.capabilities = data.capabilities.map(
      c => new SensorCapability(c, this)
    )
    this.description = data.description
    this.name = data.name
    this.links = data.links
  }

  capabilities: ISensorCapability[]
  description: React.ReactNode
  name: string

  get id(): string {
    return slugify(this.name)
  }

  pagePath(): string {
    return `/app/sensors/${this.id}`
  }
}

const sensorData: { [sensor: string]: ISensorData } = {
  keyboard: {
    name: "Keyboard",
    description: "Blah blah blah",
    capabilities: [
      {
        name: "Text Streaming",
        description: "Text stream streams text",
        links: {
          node:
            "https://open-olive.github.io/loop-development-kit/ldk/node/interfaces/keyboardservice.html#streamtext",
        },
      },
      {
        name: "Hot Key Streaming",
        description: "Hot key stream streams hot key events",
      },
    ],
    links: {
      node:
        "https://open-olive.github.io/loop-development-kit/ldk/node/interfaces/keyboardservice.html",
      go:
        "https://pkg.go.dev/github.com/open-olive/loop-development-kit/ldk/go#KeyboardService",
    },
  },
  ui: {
    name: "UI",
    description: "UI Sensor blah blah",
    capabilities: [
      {
        name: "Searchbar",
        description: "Get notified when someone users a searchbar",
      },
      {
        name: "Global Search",
        description: "Get notified when someone uses global search",
      },
    ],
    links: {},
  },
}

export const sensors: Dictionary<ISensor> = Object.entries(sensorData).reduce<
  Dictionary<ISensor>
>((previousValues, currentValue) => {
  const [currentKey, currentData] = currentValue
  return { ...previousValues, [currentKey]: new SensorData(currentData) }
}, {})

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

export const Capability: React.FunctionComponent<ISensorCapability> = props => {
  return (
    <section className={styles.capability}>
      <h2 className={styles.capabilityName} id={props.id}>
        {props.name}
      </h2>
      <Links links={props.links} />
      <p className={styles.capabilityDescription}>{props.description}</p>
    </section>
  )
}

export const Sensor: React.FunctionComponent<ISensor> = props => {
  return (
    <article className={styles.sensor}>
      <h1 className={styles.sensorName}>{props.name}</h1>
      <Links links={props.links} />
      <p className={styles.sensorDescription}>{props.description}</p>
      <div className={styles.capabilities}>
        {props.capabilities?.map(capability => (
          <Capability {...capability} key={capability.id} />
        ))}
      </div>
    </article>
  )
}
