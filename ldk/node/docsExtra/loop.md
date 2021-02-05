# Loops

Your Loop decides what data it wants to receive, and what to do with that data.

## Quick Example

Here's a quick example of a {@link Loop} that listens to changes to your clipboard, and generates a whisper with your clipboard contents.

```javascript
class Loop {
  start(sensors) {
    this.sensors = sensors;
    // Listen to the clipboard as it changes.
    this.clipboardStream = this.sensors.clipboard.streamClipboard((error, text) =>  {
      // Emit a whisper containing the clipboard's contents.
      this.sensors.whisper.markdownWhisper({
        markdown: `Clipboard Contents: ${text}`,
        label: 'Clipboard Change!'
      });
    });  
  }

  stop() {
    this.clipboardStream.stop();
  }
}
```

**Start** - The Loop should wait to start operating until this is called. The provided {@link HostSensors} should be stored in memory for continued use.

**Stop** - The Loop should stop operating when this is called. You should terminate any timers and other long-running processes.


## Loops, Explained

### Conceptually

A Loop:
 
- **Listens** to the sensors it cares about.
- **Decides** what to do with the information it gets from the sensors.
- **Whispers** to the user with context-relevant information.

### Using Sensors

Olive Helps has Sensors that lets the Loop observe what's taking place in the user's system:

- {@link BrowserSensor | Browser Activity}: Know when the user changes URLs and selects text in their browser (plugin must be installed).
- {@link ClipboardSensor | Clipboard Contents}: Know when the user's clipboard's contents change.
- {@link CursorSensor | Cursor Movement}: Know where the user's cursor is.
- {@link FileSystemSensor | File System Changes}: Know when files change.
- {@link HoverSensor | Text Hover}: Know what text the user's cursor is hovering over.
- {@link KeyboardSensor | Keyboard Entry}: Know what keystrokes the user is typing.
- {@link ProcessSensor | Process Changes}: Know what processes are active, starting, or stopping.
- {@link WindowSensor | Windows}: Know what windows are open, which one is active, and when they change.

Sensors are directly accessible from the {@link HostSensors} object provided to your Loop when it starts.

Sensors let you **query** the current state, and **stream** changes as they happen. Some sensor methods require configuration to listen, others don't. Query methods return a Promise that resolves with the current state. Stream methods require a listener function that's called with updates, and returns a {@link StoppableStream} object.

Here's an example:

```typescript
class MyLoop {
    start(sensors) {
        this.sensors = sensors;
        // Result generated only once.
        this.sensors.clipboard.queryClipboard().then((clipboardContents) => {
            this.sensors.whisper.emitWhisper({
                markdown: `Starting with ${clipboardContents}`,
                label: 'Starting Contents',
            });
        });
        // Listener function generating whispers.
        const clipboardListener = (errorOrNull, clipboardContents) => {
          this.sensors.whisper.emitWhisper({
              markdown: `Contents changed to ${clipboardContents}`,
              label: 'Clipboard Change',
          });
        };   
        // Start listening to clipboard changes.
        this.clipboardStream = this.sensors.clipboard.streamClipboard(clipboardListener);
    }

    stop() {
      this.clipboardStream.stop();
    }
}

```

### Whispers

Whispers are how you present information to users. The {@link WhisperSensor} is accessible on {@link HostSensors.whisper}.

To emit a whisper, call {@link WhisperSensor.emitWhisper} with the whisper display data. The call will return with the whisper ID.

To update that whisper, call {@link WhisperSensor.updateWhisper} with the updated whisper data. 

Note: The request will succeed even if the Whisper has been dismissed by the user.

```typescript

const whisperId = await this.sensors.whisper.emitWhisper({
    markdown: "The Message Contents in Markdown",
    label: "The Title at the Cards Top Left",
});

this.sensors.whisper.updateWhisper(whisperId, 
  {
    markdown: "The Message Contents in Markdown",
    label: "The Title at the Cards Top Left",
  }
);
```

### Storage

You can store and retrieve user credentials and other data with the {@link StorageSensor} accessible from {@link HostSensors.storage}.

```javascript

const key = 'user-id';
const result = await this.sensors.storage.storageRead(key);
await this.sensors.storage.storageWrite(key, "abcd");
```