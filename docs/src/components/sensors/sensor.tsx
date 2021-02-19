import React from "react"
import styles from "./sensor.module.scss"

interface LDKLinks {
  node: string
  go: string
  dotnet: string
}

type LDKLinkActive = Partial<LDKLinks>

interface Sensor {
  name: string
  description: React.ReactNode
  capabilities: Capability[]
  links?: LDKLinkActive
}

interface Capability {
  name: string
  description: React.ReactNode
  links?: LDKLinkActive
}

export const sensors: Sensor[] = [
  {
    name: "Keyboard",
    description: "Blah blah blah",
    capabilities: [
      {
        name: "Text Streaming",
        description: "Text stream streams text",
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
  {
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
]

const Links: React.FunctionComponent<LDKLinkActive> = props => {
  return (
    <>
      {["go", "node"].map(language => {
        if (props[language as keyof LDKLinks] == null) {
          return
        }
        return (
          <li>
            <a href={props[language as keyof LDKLinks]} target="_blank">
              {language}
            </a>
          </li>
        )
      })}
    </>
  )
}

export const Sensor: React.FunctionComponent<Sensor> = props => {
  return (
    <article>
      <h1>{props.name}</h1>
      <ul>
        <Links {...props.links} />
      </ul>
      <p>{props.description}</p>
      <div className={styles.capabilities}>
        {props.capabilities.map(capability => {
          return (
            <section className={styles.capability}>
              <h2>{capability.name}</h2>

              <p>{capability.description}</p>
            </section>
          )
        })}
      </div>
    </article>
  )
}
