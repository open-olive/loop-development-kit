# React Whispers

You can now use React to manage your Whispers! In just the same way you can use React to create and update complex user interfaces in HTML, you can use React to create and update Whispers in Olive Helps. Visit the [documentation](https://docs.oliveai.dev/aptitudes/whisper/jsx-whispers) to learn how to use them.

## Technical Summary

We've developed a custom React Host Configuration that handles creating and updating Whispers. It treats each Whisper as a separate container.


## Using React Whispers

### Getting Started

Content engagement is improved by both cats and memes, so here's a basic example:

```typescript jsx
import * as ldk from "@oliveai/ldk";
import * as React from 'react';
import * as ReactWhisper from "@oliveai/ldk/dist/whisper/react/renderer" // this file is the equivalent of the `react-dom` package and you'll use it to render new whispers.

const Incrementer = (props) => {
  const [count, updateCount] = React.useState(1000);

  const miette = `
  you KICK miette? you kick her body like the football? oh! oh! jail for mother! jail for mother for ${count} years
  `
  return <oh-whisper label="Miette, Her Eyes Enormous" onClose={() => {
  }}>
    <oh-markdown body={miette}/>
    <oh-button onClick={() => {
      updateCount(count + 1)
    }} label="Another year of jail for Mother!"/>
  </oh-whisper>
};

function main() {
  let listener = (textEntry: boolean) => {
    if (textEntry) {
      return;
    }
    ReactWhisper.renderNewWhisper(<Incrementer onClose={() => console.log('closed')} />)
  };
  ldk.keyboard.listenHotkey({control: true, key: 'a'}, listener);
}

main();
```

### Guidelines / Advice

* You can only use `oh-*` elements; standard HTML elements are not available (and will probably cause a crash somewhere). You can see a list of those elements in [this file](./component-types.ts) in the `JSX.IntrinsicElements` interface.
* Each whisper **must** contain an `oh-whisper` element as the root node. It'll throw an error if you don't.
* Hooks, class lifecycles, context all work as they do in other React environments.
* Use the `ReactWhisper.renderNewWhisper` function to render a new Whisper, and the returned object to update that Whisper. Unlike `ReactDOM.render` you cannot call `ReactWhisper.renderNewWhisper` again to update an existing Whisper.
* Set your webpack config to development mode if you want to get detailed error messages in the logs.
* We have targeted specific `react` and `react-reconciler` versions in the LDK. Weird things may happen if you use another version.
* If you are using a local build of the LDK that's symlinked into your Loop's repo, you'll need to use a Webpack `resolve` alias to ensure that both the LDK and your Loop are using the same `react` library.
* Text nodes are automatically converted into Markdown components. If you plan on using interpolation, we recommend that you use explicit Markdown components (`oh-markdown` element) and supply the Markdown text to be rendered in the `body` prop.