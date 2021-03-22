# Loops

Your Loop decides what data it wants to receive, and what to do with that data.

## Quick Example

Here's a quick example of a {@link Loop} that listens to changes to your clipboard, and generates a whisper with your clipboard contents.

```javascript
class Loop {
  start(services) {
    this.services = services;
    // Listen to the clipboard as it changes.
    this.clipboardStream = this.services.clipboard.streamClipboard((error, text) =>  {
      // Emit a whisper containing the clipboard's contents.
      this.services.whisper.markdownWhisper({
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

**Start** - The Loop should wait to start operating until this is called. The provided {@link HostServices} should be stored in memory for continued use.

**Stop** - The Loop should stop operating when this is called. You should terminate any timers and other long-running processes.


## Loops, Explained

### Conceptually

A Loop:
 
- **Listens** to the aptitudes it cares about.
- **Decides** what to do with the information it gets from the aptitudes.
- **Whispers** to the user with context-relevant information.

### Using Sensors

Olive Helps has Sensors that lets the Loop observe what's taking place in the user's system:

- {@link ClipboardService | Clipboard Contents}: Know when the user's clipboard's contents change.
- {@link CursorService | Cursor Movement}: Know where the user's cursor is.
- {@link FileSystemService | File System Changes}: Know when files change.
- {@link KeyboardService | Keyboard Entry}: Know what keystrokes the user is typing.
- {@link ProcessService | Process Changes}: Know what processes are active, starting, or stopping.
- {@link NetworkService | Network}: Make HTTP requests.
- {@link UIService | Olive Helps Search}: Know when users are searching with the Olive Helps Global Search or Searchbar.

The following Sensors are under development and are not yet available:

- {@link BrowserService | Browser Activity}: Know when the user changes URLs and selects text in their browser (plugin must be installed).
- {@link WindowService | Windows}: Know what windows are open, which one is active, and when they change.
- {@link HoverService | Text Hover}: Know what text the user's cursor is hovering over.

Sensors are directly accessible from the {@link HostServices} object provided to your Loop when it starts.

Sensors let you **query** the current state, and **stream** changes as they happen. Some sensor methods require configuration to listen, others don't. Query methods return a Promise that resolves with the current state. Stream methods require a listener function that's called with updates, and returns a {@link StoppableStream} object.

Here's an example:

```typescript
class MyLoop {
    start(services) {
        this.services = services;
        // Result generated only once.
        this.services.clipboard.queryClipboard().then((clipboardContents) => {
            this.services.whisper.markdownWhisper({
                markdown: `Starting with ${clipboardContents}`,
                label: 'Starting Contents',
            });
        });
        // Listener function generating whispers.
        const clipboardListener = (errorOrNull, clipboardContents) => {
          this.services.whisper.markdownWhisper({
              markdown: `Contents changed to ${clipboardContents}`,
              label: 'Clipboard Change',
          });
        };   
        // Start listening to clipboard changes.
        this.clipboardStream = this.services.clipboard.streamClipboard(clipboardListener);
    }

    stop() {
      this.clipboardStream.stop();
    }
}

```

### Whispers

Whispers are how you present information to users. The {@link WhisperService} is accessible on {@link HostServices.whisper}.

You can create different types of Whispers:

- {@link WhisperService.markdownWhisper | Markdown}: A Whisper presenting content formatted with Markdown.
- {@link WhisperService.confirmWhisper | Confirm}: A Whisper presenting the user with the choice to say Yes (Confirm) or No (Reject) to a prompt.
- {@link WhisperService.listWhisper | List}: A Whisper presenting a data list, with the ability to expand the list and show additional data.
- {@link WhisperService.formWhisper | Form}: A Whisper presenting a form that the user can complete, and then submit (or reject).
- {@link WhisperService.disambiguationWhisper | Disambiguation}: A Whisper presenting a list of links that the user can click on and send an event back to the Loop.


```typescript

const whisperId = await this.services.whisper.markdownWhisper({
    markdown: "The Message Contents in Markdown",
    label: "The Title at the Cards Top Left",
});
```

### The Vault

You can store and retrieve user credentials and other sensitive data with the {@link VaultService} accessible from {@link HostServices.vault}.

```javascript

const key = 'user-id';
const result = await this.services.vault.vaultRead(key);
await this.services.vault.vaultWrite(key, "abcd");
```