# Loop Development Kit (LDK) for NodeJS

## Developing

### Prerequisites

You should have the following installed:

- Node 10+
- Olive Helps

### Setup

#### Setting Up Your Loop

Olive Helps expects your library to start its Loop server when launched. The LDK takes care of most of that for you, what you need to do is:

- Create your `package.json` file.
- Import the LDK.
- Create your `main` script (usually `index.js` or `src/index.js`):
    - Create an implementation object that satisfies the [[Loop]] interfaces.
    - Initialize the appropriate plugin with your implementation and call `.serve` on it.

#### Install the Package

Install this library as a dependency:

```shell
npm i @oliveai/ldk -P
```

##### Example Loop

Here's an example main script for a Loop plugin:

```javascript
const { serveLoop, Logger } = require('@oliveai/ldk');
const Loop = require('./loop'); // Constructor that generates objects meeting the Loop interface.

const logger = new Logger('example-loop');
const loop = new Loop(logger);
serveLoop(loop);
```

### Running Locally

#### Local Plugin Command (Recommended)

Olive Helps lets you add a local command as Local Plugins:

1. Open Olive Helps.
2. Open the Loop Library:
    1. Click the Hamburger icon.
    2. Click Loop Library.
3. Click the Install Local Plugin button:
4. Select the working directory for the command.
5. Enter the command to be executed, including any arguments.
6. Click Install.

The command will be installed as a plugin. If you need to change the command or its arguments you'll need remove it and then add the new commands.

#### Packaged Command

Instructions to come! We're always working on improving the LDK developer experience and this section is empty while we're making some dramatic improvements to make your life easier.

### Troubleshooting and Debugging

Olive Helps logs are available in the following directories for your OS:

```shell
~/Library/Logs/Sidekick # MacOS
/var/log/Sidekick       # Linux
%AppData%/Logs          # Windows
```

`tail -f` the log file (usually `Sidekick-X.Y.Z.log`) to watch things happen!

## Deploying

Olive Helps expects the following files when running a plugin:

`plugin` - An executable that runs your plugin.
`plugin.json` - Your plugin configuration file.

### Configuration

#### `plugin.json`

```json
{
  "author": "Your Name",
  "created": "2020-06-22T00:00:00Z",
  "dependencies": [],
  "description": "Your Loop's Description",
  "id": "A UNIQUE UUID",
  "name": "Your Loop Name",
  "organization": "Your Organization",
  "specification": "1",
  "updated": "2020-07-23T00:00:00Z",
  "version": "Version Number (preferably SemVer)"
}
```

## Concepts

### Plugins

The LDK is a plugin system for Olive Helps. The LDK is built with [go-plugin](https://github.com/hashicorp/go-plugin), a HashiCorp plugin system used in several of their projects.

Plugins developed with this library are executed by Olive Helps as separate processes. This ensures that crashes or instability in the plugin will not destabilize the Olive Helps process.

Communication between Olive Helps and the plugin is first initialized over stdio and then performed using [GRPC](https://grpc.io/). On mac and linux the GRPC communication is sent over unix domain socket and on windows over local TCP socket.

> NOTE: Currently, communication from Olive Helps to the plugin, takes place over local TCP socket on mac and linux. Communication from the plugin back to Sidekick still takes place over unix domain socket. This is due to a limitation of the GRPC libraries for NodeJS and will hopefully be fixed in the future.

### Loops

This LDK can be used to writeText Loops for Olive Helps. More detail about Loops is available on the {@page Loops} page.

- [Basic Loops Example](https://github.com/open-olive/sidekick-controller-examplenode) - Recommend using as a starting point for new Loops.

TODO: Change this link

## LDK Development

### Dependencies

The `.proto` files in `src/shared/proto` are inserted with Git subtrees. To update the subtree, and rebuild the protoc files, execute `npm run protoc`.

### Testing

Tests are written with [`ts-jest`](https://kulshekhar.github.io/ts-jest/).

Set `TEST_LOGGING` environment variable to a non-empty value to get Logger output when running tests.