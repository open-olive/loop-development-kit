---
name: "Create"
links_js: "create"
---
Adds a new whisper to Olive Helps based on the configuration provided. Returns a promise which provides a reference to the newly created whisper.

The following component types are available:

* Box - A container component for formatting other components. 
* Button - A container component for formatting other components.
* Checkbox - A container component for formatting other components.
* CollapseBox - A container component to allow content to be opened and closed with a button click.
* Divider - This component shows a horizontal divider to separate different kinds on content in a whisper. This component has no options.
* Email - The text input field allows the user to provide an email address.
* Link - This component shows a link that can either open a link in the user's default browser or function as an `onClick` to allow for loops to do things like send a new whisper.
* ListPair - This component shows a two column view of information typically used for lists of information.
* Markdown - Renders a message as Markdown.
    * Markdown syntax for the Markdown Component Type is defined by to the [CommonMark](https://commonmark.org/) specification. 
    * Tip: if using a Template Literal for specifying markdown `body`, leading spaces (including those suggested by code indentation) will be treated as spaces by markdown. As a consequence of this, markdown specified with tab whitespace (spaces, tabs, etc.) at the beginning of a line will **not** be rendered as markdown. One way to avoid this situation, is to use a library like `stripIndent` from the [common-tags library](https://www.npmjs.com/package/common-tags#stripindent). For example:
    ```
    stripIndent`
      A paragraph with *emphasis* and **strong importance**.
      > A block quote with ~strikethrough~ and a URL: https://oliveai.com/`;
    ```
* Message - This component shows a banner in the whisper that functions as a call to action to the user.
* Number - The text input field allows the user to provide a number within the parameters provided.
* Password - The password input field allows the user to provide a password. This field protects the user by obscuring what they type. Showing each character as a solid black dot.
* RadioGroup - The radio group allows a loop to provide the user with a collection of options in which they select a single result. The result is selected by clicking one of the radio elements in the radio group. A selected value of -1 indicates that nothing is selected.
* Select - A selected value of -1 indicates that nothing is selected.
* Telephone - The text input field allows the user to provide a telephone number.
* TextInput - The text input field allows the user to provide text information. The text can be pre-populated by the loop

## Whisper Data Entry
Provided on each newly created whisper is `componentState` property that is of `type StateMap = Map<string, string | boolean | number>`.

When any of the following user editable components are assigned a **unique** `id` property, state will be tracked upon user interaction on `componentState`:

* Checkbox
* Email
* Number
* Password
* RadioGroup
* Select
* Telephone
* TextInput

If `id` properties are not provided, component state will not be tracked. If duplicate component `id` properties are sent, then only the most recently assigned `id` will be tracked.

`componentState` is returned as part of the whisper object during `onClick`, `onChange` events and with `whisper.Create()`.

For example:

```
const textInputId = '123';

const myWhisper = await whisper.create({
  label: "Component State Whisper",
  onClose: () => {},
  components: [
    {
      type: WhisperComponentType.TextInput,
      id: textInputId,
      label: "Text Input",
      onChange: (
          error: Error | undefined,
          value: string,
          whisper: Whisper
      ) => {
        console.log(whisper.componentState.get(textInputId));
      }
    }
  ],
});

myWhisper.componentState.forEach((value: any, key: string) => console.log(key, value));
```

### Whisper Data Entry Across Whisper Updates
If a whisper update is performed, all previously tracked component state will also persist. If new components are added to the update whisper, they will follow the rules for initial component state. If it is no longer desired to keep component state across a whisper update, then new component `id` properties should be assigned.

## Component Keys
Each component has an optional `key` property. The `key` property is used by our React front-end to retain the state of our presentational components across Whisper updates. If provided, keys must be unique across your component's siblings otherwise the Promise returned from `whisper.create` will reject with an error.

You should provide keys for your components if you are updating Whispers and adding components or changing their state.

You do not need to provide keys if:

- You never update the Whisper.
- You only add components to the end of the component list during your updates.

## Component Validation
Text inputs and selectable components provide a `validationError` field which could be used to display a custom validation error:

* Checkbox
* Email
* Number
* Password
* RadioGroup
* Select
* Telephone
* TextInput
* DateTime

If `validationError` field is provided then component will be displayed in the error state along with the custom validation message.
A good example of how a simple form validation could be implemented could be found [here](https://github.com/open-olive/loop-development-kit/tree/main/ldk/javascript/examples/form-validation-loop)