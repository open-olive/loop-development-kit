import React from "react"

export interface LDKLinks {
  node: string
  go: string
  dotnet: string
}

export type LDKLinkActive = Partial<LDKLinks>

export interface ISensorData {
  name: string
  description: React.ReactNode
  capabilities: ISensorCapabilityData[]
  links?: LDKLinkActive
}

export interface ISensorCapabilityData {
  name: string
  description: React.ReactNode
  links?: LDKLinkActive
}

export const sensors: { [sensor: string]: ISensorData } = {
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