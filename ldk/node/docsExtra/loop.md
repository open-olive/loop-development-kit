# Loops

Your Loop decides what data it wants to receive, and what to do with that data.

## Quick Example

Here's a quick example of a {@link Loop} that listens to changes to your clipboard, and generates a whisper with your clipboard contents.

```javascript
class Loop {
  start(aptitudes) {
    this.aptitudes = aptitudes;
    // Listen to the clipboard as it changes.
    this.clipboardStream = this.aptitudes.clipboard.listenText((error, text) => {
      // Emit a whisper containing the clipboard's contents.
      this.aptitudes.whisper.markdown({
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

**Start** - The Loop should wait to start operating until this is called. The provided {@link Aptitudes} should be stored in memory for continued use.

**Stop** - The Loop should stop operating when this is called. You should terminate any timers and other long-running processes.


## Loops, Explained

### Conceptually

A Loop:
 
- **Listens** to the sensors it cares about.
- **Decides** what to do with the information it gets from the sensors.
- **Whispers** to the user with context-relevant information.

### Using Sensors

Olive Helps has Sensors that lets the Loop observe what's taking place in the user's system:

- {@link Clipboard | Clipboard Contents}: Know when the user's clipboard's contents change.
- {@link Cursor | Cursor Movement}: Know where the user's cursor is.
- {@link FileSystem | File System Changes}: Know when files change.
- {@link Keyboard | Keyboard Entry}: Know what keystrokes the user is typing.
- {@link Process | Process Changes}: Know what processes are active, starting, or stopping.
- {@link Network | Network}: Make HTTP requests.
- {@link Ui | Olive Helps Search}: Know when users are searching with the Olive Helps Global Search or Searchbar.

The following Sensors are under development and are not yet available:

- {@link Browser | Browser Activity}: Know when the user changes URLs and selects text in their browser (plugin must be installed).
- {@link Window | Windows}: Know what windows are open, which one is active, and when they change.
- {@link Hover | Text Hover}: Know what text the user's cursor is hovering over.

Sensors are directly accessible from the {@link Aptitudes} object provided to your Loop when it starts.

Sensors let you **text** the current state, and **listenText** changes as they happen. Some sensor methods require configuration to listenText, others don't. Query methods return a Promise that resolves with the current state. Stream methods require a listener function that's called with updates, and returns a {@link StoppableStream} object.

Here's an example:

```typescript
class MyLoop {
    start(aptitudes) {
        this.aptitudes = aptitudes;
        // Result generated only once.
        this.aptitudes.clipboard.text().then((clipboardContents) => {
            this.aptitudes.whisper.markdown({
                markdown: `Starting with ${clipboardContents}`,
                label: 'Starting Contents',
            });
        });
        // Listener function generating whispers.
        const clipboardListener = (errorOrNull, clipboardContents) => {
          this.aptitudes.whisper.markdown({
              markdown: `Contents changed to ${clipboardContents}`,
              label: 'Clipboard Change',
          });
        };   
        // Start listening to clipboard changes.
        this.clipboardStream = this.aptitudes.clipboard.listenText(clipboardListener);
    }

    stop() {
      this.clipboardStream.stop();
    }
}

```

### Whispers

Whispers are how you present information to users. The {@link Whisper} is accessible on {@link Aptitudes.whisper}.

You can create different types of Whispers:

- {@link Whisper.markdown | Markdown}: A Whisper presenting content formatted with Markdown.
- {@link Whisper.confirm | Confirm}: A Whisper presenting the user with the choice to say Yes (Confirm) or No (Reject) to a prompt.
- {@link Whisper.listWhisper | List}: A Whisper presenting a data list, with the ability to expand the list and show additional data.
- {@link Whisper.form | Form}: A Whisper presenting a form that the user can complete, and then submit (or reject).
- {@link Whisper.disambiguation | Disambiguation}: A Whisper presenting a list of links that the user can click on and send an event back to the Loop.


```typescript

const whisperId = await this.aptitudes.whisper.markdown({
    markdown: "The Message Contents in Markdown",
    label: "The Title at the Cards Top Left",
});
```

### The Vault

You can store and retrieve user credentials and other sensitive data with the {@link Vault} accessible from {@link Aptitudes.vault}.

```javascript

const key = 'user-id';
const result = await this.aptitudes.vault.read(key);
await this.aptitudes.vault.write(key, "abcd");
```