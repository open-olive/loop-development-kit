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
  clipboard: {
    name: "Clipboard",
    description:
      "Allows Loops to read clipboard contents, be notified when clipboard contents change, and write to it.",
    capabilities: [
      {
        name: "Stream Changes",
        description:
          "Receive a message whenever the clipboard contents change.",
      },
      {
        name: "Read",
        description: "Read the current text contents of the clipboard.",
      },
      {
        name: "Write",
        description: "Write text content to the clipboard.",
      },
    ],
  },
  cursor: {
    name: "Cursor",
    description:
      "Allows Loops to get the current cursor position, and receive updates as the user moves the cursor.",
    capabilities: [
      {
        name: "Read",
        description: "Reads the current cursor position on screen.",
      },
      {
        name: "Stream Changes",
        description:
          "Receive a message whenever the user moves the cursor on screen.",
      },
    ],
  },
  filesystem: {
    name: "Filesystem",
    description:
      "Observe changes within directories and files, and interact with individual files.",
    capabilities: [
      {
        name: "List Directory",
        description: "List the contents of any given directory",
      },
      {
        name: "Stream Directory Changes",
        description:
          "Receive a message whenever any file changes inside a directory",
      },
      {
        name: "Create Directory",
        description: "Create a directory at the specified location.",
      },
      {
        name: "Copy",
        description: "Copy a file or directory.",
      },
      {
        name: "Move",
        description: "Move a file or directory.",
      },
      {
        name: "Remove",
        description: "Remove a file or directory",
      },
      {
        name: "Stream File Changes",
        description:
          "Receive a message whenever any change is made to a specified file.",
      },
      {
        name: "Create File",
        description:
          "Creates a file at the specified path and allows you to write to that file.",
      },
      {
        name: "Open File",
        description:
          "Opens a file at the specified path (if it exists) and allows you to write to that file.",
      },
    ],
  },
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
