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
    description: "Observe keyboard activity.",
    capabilities: [
      {
        name: "Stream Text",
        description:
          "Receive a notification whenever the user types text. Notifications are sent whenever the user stops typing for one second and contain all the text entered since the last notification.",
        links: {
          node:
            "https://open-olive.github.io/loop-development-kit/ldk/node/interfaces/keyboardservice.html#streamtext",
        },
      },
      {
        name: "Stream Hot Key Combinations",
        description:
          "Allows Loops to observe when a specific hotkey combination (letter/number + modifier keys like Ctrl, Alt, Shift) are pressed or released.",
      },
      {
        name: "Stream Character Entry",
        description:
          "Receive a notification for every character that is entered. A separate notification is sent for each character entered as it happens.",
      },
    ],
    links: {
      node:
        "https://open-olive.github.io/loop-development-kit/ldk/node/interfaces/keyboardservice.html",
      go:
        "https://pkg.go.dev/github.com/open-olive/loop-development-kit/ldk/go#KeyboardService",
    },
  },
  network: {
    name: "Network",
    description: "Allows Loops to make network requests to external services",
    capabilities: [
      {
        name: "HTTP Request",
        description:
          "Initiates a HTTPS request to a network address and returns the response body and headers. Only HTTPS addresses are supported.",
      },
    ],
  },
  process: {
    name: "Process",
    description: "Allows Loops to observe processes running on the system.",
    capabilities: [
      {
        name: "Read Processes",
        description: "Get all the current processes running on the system.",
      },
      {
        name: "Stream Processes",
        description:
          "Receive a notification whenever a process starts or stops on the system.",
      },
    ],
  },
  vault: {
    name: "Vault",
    description:
      "Allows Loops to retrieve and store strings in the system's secure storage (Keychain for MacOS, Credential Manager for Windows).",
    capabilities: [
      {
        name: "Delete",
        description: "Deletes a certain key",
      },
      {
        name: "Exists",
        description: "Returns whether the key exists",
      },
      {
        name: "Read",
        description: "Reads the value from the given key.",
      },
      {
        name: "Write",
        description:
          "Writes a value to a given key, overwriting any existing value.",
      },
    ],
  },
  ui: {
    name: "UI",
    description:
      "Allows Loops to receive a notification whenever the user interacts with UI elements in Olive Helps",
    capabilities: [
      {
        name: "Searchbar",
        description:
          "Get notified when the user searches for a value in the Sidebar",
      },
      {
        name: "Global Search",
        description:
          "Get notified when the user uses the Olive Helps global search.",
      },
    ],
    links: {},
  },
  whisper: {
    name: "Whisper",
    description:
      "Allows Loops to display interactive information in a variety of formats in the Olive Helps Sidebar",
    capabilities: [
      {
        name: "Markdown",
        description: "Displays a Whisper formatted using the Markdown syntax.",
      },
      {
        name: "Confirmation",
        description:
          "Displays a Whisper with a message formatted using Markdown, and two buttons for the user to click on. Clicking on either button will dismiss the Whisper and the Loop will receive whether the user clicked on the Confirm button (true) or Reject button (false).",
      },
      {
        name: "Disambiguation",
        description:
          "Displays a Whisper with a list of entries the user can click on. When the user clicks on an entry the Loop receives a notification that an entry has been clicked on, and the entry's ID.",
      },
      {
        name: "Form",
        description:
          "Displays a Whisper with a set of form inputs that can be prepopulated. When the user changes a value in the form the Loop receives an update notification. When the user submits or cancels the form the Loop receives a notification and all the values of the form fields.",
      },
      {
        name: "List",
        description: (
          <>
            <p>
              Displays a list of values with corresponding labels. Each entry
              can have styles attached (Success, Warn, Error), and aligned
              (Left, Center, Right).
            </p>
            <p>
              The following types are available:
              <ul>
                <li>Pair - Renders a label value pair.</li>
                <li>Message - Renders a message header and body.</li>
                <li>Divider - A visual dividing element.</li>
                <li>
                  Link - A link that the user can click that opens up the
                  supplied URL in the browser.
                </li>
              </ul>
            </p>
          </>
        ),
      },
    ],
  },
  window: {
    name: "Window",
    description:
      "Allows Loops to see what application windows are open in the system.",
    capabilities: [
      {
        name: "Get Active Window",
        description: "Get the currently focused window and it's data.",
      },
      {
        name: "Stream Active Window",
        description:
          "Receive notifications whenever the currently focused window changes.",
      },
      {
        name: "Get All Windows",
        description: "Get a list of all the windows and their information.",
      },
      {
        name: "Stream Windows",
        description:
          "Receive a notification whenever a window is opened, closed, focused, unfocused, moved, resized, or its title changes. A window that is opened with focus will generate an Opened event and a Focused event.",
      },
    ],
  },
}
