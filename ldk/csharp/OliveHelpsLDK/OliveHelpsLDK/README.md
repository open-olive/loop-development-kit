# Loop Development Kit (LDK) for NodeJS

## Developing

### Prerequisites

You should have the following installed:

- .Net
- The Visual Studio editor of your choice. 
- Olive Helps

### Setup

#### Setting Up Your Loop

Olive Helps expects your library to start its Loop server when launched. The LDK takes care of most of that for you, what you need to do is:

- Create your solution.
- Create a Console application Project.
- Download and reference the Olive Helps .Net LDK (TODO: Confirm package name) from NuGet in Console project.
- Create your Main method in your program:
    - Create a new instance of `Logger` from `OliveHelpsLDK.Logging`.
    - Create a class that implements `OliveHelpsLDK.ILoop`.
    - Implement the `ILoop` methods.
    - Call `OliveHelpsLDK.LoopServer.Start` with an instance of your Loop, and the `Logger` object. 

##### Example Loop

Here's an example Loop plugin:

```c#
using System.Threading.Tasks;
using OliveHelpsLDK;
using OliveHelpsLDK.Logging;

namespace Console {
    class Program
    {
        public static void Main(string[] args)
        {
            ILogger logger = new Logger("csharp-clipboard-example");
            LoopServer.Start(new Loop
            {
                Logger = logger
            }, logger);
        }
    }

    class Loop : ILoop {
        public ILogger Logger { get; set; }
        private IStreamingCall<string> Stream { get; set; }; 

        public Task Start(ILoopServices services) {
            Stream = services.Clipboard().Stream();
            Task.Run(async () => {
                while (await Stream.MoveNext()) {
                    Logger.Info($"Received Clipboard Event {Stream.Current()}");
                }
            });
            return Task.CompletedTask;
        }

        public Task Stop() {
            return Task.CompletedTask;
        }
     }
 }
```

### Running Locally

#### Local Plugin Command (Recommended)

Olive Helps lets you add a local command as Local Plugins:

1. Run your application and copy the command executed to start the program.
2. Open Olive Helps.
3. Open the Loop Library:
    1. Click the Hamburger icon.
    2. Click Loop Library.
4. Click the Install Local Plugin button:
5. Select the working directory for the command.
6. Paste the command from Step 1.
7. Click Install.

The command will be installed as a plugin. If you need to change the command or its arguments you'll need remove it and then add the new commands.

#### Packaged Command

Instructions to come! We're always working on improving the LDK developer experience and this section is empty while we're making some dramatic improvements to make your life easier.

### Troubleshooting and Debugging

Olive Helps logs are available in the following directories for your OS:

```shell
~/Library/Logs/Olive\ Helps # MacOS
/var/log/Olive\ Helps       # Linux
%AppData%/Olive\ Helps/Logs          # Windows
```

`tail -f` the log file (usually `Olive Helps-X.Y.Z.log`) to watch things happen!

## Deploying

Documentation to come!

## LDK Development

### Dependencies

The `.proto` files in `src/shared/proto` are inserted with Git subtrees. To update the subtree, and rebuild the protoc files, execute `npm run protoc`.

### Testing

Tests are written with NUnit.