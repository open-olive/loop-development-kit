import React from 'react';

export interface LDKLinks {
  node: string;
  go: string;
  dotnet: string;
}

export type LDKLinkActive = Partial<LDKLinks>;

export interface IAptitudeData {
  name: string;
  description: React.ReactNode;
  capabilities: ICapabilityData[];
  links?: LDKLinkActive;
}

export interface ICapabilityData {
  name: string;
  description: React.ReactNode;
  links?: LDKLinkActive;
}

export const aptitudes: { [sensor: string]: IAptitudeData } = {
  clipboard: {
    name: 'Clipboard',
    links: {
      go: 'ClipboardClient',
      node: 'ClipboardService',
    },
    description:
      'Allows Loops to read clipboard contents, be notified when clipboard contents change, and write to it.',
    capabilities: [
      {
        name: 'Stream Changes',
        description: 'Receive a message whenever the clipboard contents change.',
        links: {
          go: 'Listen',
          node: 'streamClipboard',
        },
      },
      {
        name: 'Read',
        description: 'Read the current text contents of the clipboard.',
        links: {
          node: 'queryClipboard',
          go: 'Read',
        },
      },
      {
        name: 'Write',
        description: 'Write text content to the clipboard.',
        links: {
          node: 'writeClipboard',
          go: 'Write',
        },
      },
    ],
  },
  cursor: {
    name: 'Cursor',
    links: {
      go: 'CursorClient',
      node: 'CursorService',
    },
    description:
      'Allows Loops to get the current cursor position, and receive updates as the user moves the cursor.',
    capabilities: [
      {
        name: 'Read',
        description: 'Reads the current cursor position on screen.',
        links: {
          node: 'queryCursorPosition',
          go: 'Position',
        },
      },
      {
        name: 'Stream Changes',
        description: 'Receive a message whenever the user moves the cursor on screen.',
        links: {
          node: 'streamCursorPosition',
          go: 'ListenPosition',
        },
      },
    ],
  },
  filesystem: {
    name: 'Filesystem',
    links: {
      node: 'FileSystemService',
      go: 'FilesystemClient',
    },
    description:
      'Observe changes within directories and files, and interact with individual files.',
    capabilities: [
      {
        name: 'List Directory',
        description: 'List the contents of any given directory',
        links: {
          go: 'Dir',
          node: 'queryDirectory',
        },
      },
      {
        name: 'Stream Directory Changes',
        description: 'Receive a message whenever any file changes inside a directory',
        links: {
          go: 'ListenDir',
          node: 'streamDirectory',
        },
      },
      {
        name: 'Create Directory',
        description: 'Create a directory at the specified location.',
        links: {
          go: 'MakeDir',
          node: 'makeDirectory',
        },
      },
      {
        name: 'Copy',
        description: 'Copy a file or directory.',
        links: {
          go: 'Copy',
          node: 'copyFile',
        },
      },
      {
        name: 'Move',
        description: 'Move a file or directory.',
        links: {
          go: 'Move',
          node: 'moveFile',
        },
      },
      {
        name: 'Remove',
        description: 'Remove a file or directory',
        links: {
          go: 'Remove',
          node: 'removeFile',
        },
      },
      {
        name: 'Stream File Changes',
        description: 'Receive a message whenever any change is made to a specified file.',
        links: {
          go: 'ListenFile',
          node: 'streamFileInfo',
        },
      },
      {
        name: 'Create File',
        description: 'Creates a file at the specified path and allows you to write to that file.',
        links: {
          go: 'Create',
          node: 'createFile',
        },
      },
      {
        name: 'Open File',
        description:
          'Opens a file at the specified path (if it exists) and allows you to write to that file.',
        links: {
          go: 'Open',
          node: 'openFile',
        },
      },
    ],
  },
  keyboard: {
    name: 'Keyboard',
    description: 'Observe keyboard activity.',
    links: {
      node: 'KeyboardService',
      go: 'KeyboardClient',
    },
    capabilities: [
      {
        name: 'Stream Text',
        description:
          'Receive a notification whenever the user types text. Notifications are sent whenever the user stops typing for one second and contain all the text entered since the last notification.',
        links: {
          node: 'streamText',
          go: 'ListenText',
        },
      },
      {
        name: 'Stream Hot Key Combinations',
        description:
          'Allows Loops to observe when a specific hotkey combination (letter/number + modifier keys like Ctrl, Alt, Shift) are pressed or released.',
        links: {
          go: 'ListenHotkey',
          node: 'streamHotKey',
        },
      },
      {
        name: 'Stream Character Entry',
        description:
          'Receive a notification for every character that is entered. A separate notification is sent for each character entered as it happens.',
        links: {
          go: 'ListenCharacter',
          node: 'streamChar',
        },
      },
    ],
  },
  network: {
    name: 'Network',
    description: 'Allows Loops to make network requests to external services',
    links: {
      go: 'NetworkClient',
      node: 'NetworkService',
    },
    capabilities: [
      {
        name: 'HTTP Request',
        description:
          'Initiates a HTTPS request to a network address and returns the response body and headers. Only HTTPS addresses are supported.',
        links: {
          go: 'HTTPRequest',
          node: 'httpRequest',
        },
      },
    ],
  },
  process: {
    name: 'Process',
    description: 'Allows Loops to observe processes running on the system.',
    links: {
      go: 'ProcessClient',
      node: 'ProcessService',
    },
    capabilities: [
      {
        name: 'Read Processes',
        description: 'Get all the current processes running on the system.',
        links: {
          go: 'State',
          node: 'queryProcesses',
        },
      },
      {
        name: 'Stream Processes',
        description: 'Receive a notification whenever a process starts or stops on the system.',
        links: {
          go: 'ListenState',
          node: 'streamProcesses',
        },
      },
    ],
  },
  vault: {
    name: 'Vault',
    description:
      "Allows Loops to retrieve and store strings in the system's secure storage (Keychain for MacOS, Credential Manager for Windows).",
    links: {
      go: 'VaultClient',
      node: 'VaultService',
    },
    capabilities: [
      {
        name: 'Delete',
        description: 'Deletes a certain key',
        links: {
          go: 'Delete',
          node: 'vaultDelete',
        },
      },
      {
        name: 'Exists',
        description: 'Returns whether the key exists',
        links: {
          go: 'Exists',
          node: 'vaultExists',
        },
      },
      {
        name: 'Read',
        description: 'Reads the value from the given key.',
        links: {
          go: 'Read',
          node: 'vaultRead',
        },
      },
      {
        name: 'Write',
        description: 'Writes a value to a given key, overwriting any existing value.',
        links: {
          go: 'Write',
          node: 'vaultWrite',
        },
      },
    ],
  },
  ui: {
    name: 'UI',
    description:
      'Allows Loops to receive a notification whenever the user interacts with UI elements in Olive Helps',
    links: {
      go: 'UIClient',
      node: 'UIService',
    },
    capabilities: [
      {
        name: 'Searchbar',
        description: 'Get notified when the user searches for a value in the Sidebar',
        links: {
          go: 'ListenSearchbar',
          node: 'streamSearchbar',
        },
      },
      {
        name: 'Global Search',
        description: 'Get notified when the user uses the Olive Helps global search.',
        links: {
          go: 'ListenGlobalSearch',
          node: 'streamGlobalSearch',
        },
      },
    ],
  },
  whisper: {
    name: 'Whisper',
    description:
      'Allows Loops to display interactive information in a variety of formats in the Olive Helps Sidebar',
    links: {
      go: 'WhisperClient',
      node: 'WhisperService',
    },

    capabilities: [
      {
        name: 'Markdown',
        description: 'Displays a Whisper formatted using the Markdown syntax.',
        links: {
          go: 'Markdown',
          node: 'markdownWhisper',
        },
      },
      {
        name: 'Confirmation',
        description:
          'Displays a Whisper with a message formatted using Markdown, and two buttons for the user to click on. Clicking on either button will dismiss the Whisper and the Loop will receive whether the user clicked on the Confirm button (true) or Reject button (false).',
        links: {
          go: 'Confirm',
          node: 'confirmWhisper',
        },
      },
      {
        name: 'Disambiguation',
        description:
          "Displays a Whisper with a list of entries the user can click on. When the user clicks on an entry the Loop receives a notification that an entry has been clicked on, and the entry's ID.",
        links: {
          go: 'Disambiguation',
          node: 'disambiguationWhisper',
        },
      },
      {
        name: 'Form',
        description:
          'Displays a Whisper with a set of form inputs that can be prepopulated. When the user changes a value in the form the Loop receives an update notification. When the user submits or cancels the form the Loop receives a notification and all the values of the form fields.',
        links: {
          go: 'Form',
          node: 'formWhisper',
        },
      },
      {
        name: 'List',
        description: (
          <>
            <p>
              Displays a list of values with corresponding labels. Each entry can have styles
              attached (Success, Warn, Error), and aligned (Left, Center, Right).
            </p>
            <p>
              The following types are available:
              <ul>
                <li>Pair - Renders a label value pair.</li>
                <li>Message - Renders a message header and body.</li>
                <li>Divider - A visual dividing element.</li>
                <li>
                  Link - A link that the user can click that opens up the supplied URL in the
                  browser.
                </li>
              </ul>
            </p>
          </>
        ),
        links: {
          go: 'List',
          node: 'listWhisper',
        },
      },
    ],
  },
  window: {
    name: 'Window',
    description: 'Allows Loops to see what application windows are open in the system.',
    links: {
      go: 'WindowClient',
      node: 'WindowService',
    },
    capabilities: [
      {
        name: 'Get Active Window',
        description: "Get the currently focused window and it's data.",
        links: {
          go: 'ActiveWindow',
          node: 'queryActiveWindow',
        },
      },
      {
        name: 'Stream Active Window',
        description: 'Receive notifications whenever the currently focused window changes.',
        links: {
          go: 'ListenActiveWindow',
          node: 'streamActiveWindow',
        },
      },
      {
        name: 'Get All Windows',
        description: 'Get a list of all the windows and their information.',
        links: {
          go: 'State',
          node: 'queryWindows',
        },
      },
      {
        name: 'Stream Windows',
        description:
          'Receive a notification whenever a window is opened, closed, focused, unfocused, moved, resized, or its title changes. A window that is opened with focus will generate an Opened event and a Focused event.',
        links: {
          go: 'ListenState',
          node: 'streamWindows',
        },
      },
    ],
  },
};
