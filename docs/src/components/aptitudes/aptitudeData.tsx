import React from "react"

export interface LDKLinks {
  node: string
  go: string
  dotnet: string
}

export type LDKLinkActive = Partial<LDKLinks>

export interface IAptitudeData {
  name: string
  description: React.ReactNode
  capabilities: ICapabilityData[]
  links?: LDKLinkActive
}

export interface ICapabilityData {
  name: string
  description: React.ReactNode
  links?: LDKLinkActive
}

export const aptitudes: { [sensor: string]: IAptitudeData } = {
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
