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
    * Tip: if using a Template Literal for specifying markdown `body`, it should be noted that whitespace will be preserved when rendering markdown. As a consequence of this, markdown specified with tab whitespace (spaces, tabs, etc.) at the beginning of a line will **not** be interpreted as markdown. One way to avoid this situation, is to use a regular expression replacement function with Template Literals like `.replace(/(\n)\s+/g, '$1')` to replace all line breaks followed by whitespace with only a line break. For example:
    ```
    `A paragraph with *emphasis* and **strong importance**.
        > A block quote with ~strikethrough~ and a URL: https://oliveai.com/
    `.replace(/(\n)\s+/g, '$1')
    ```
* Message - This component shows a banner in the whisper that functions as a call to action to the user.
* Number - The text input field allows the user to provide a number within the parameters provided.
* Password - The password input field allows the user to provide a password. This field protects the user by obscuring what they type. Showing each character as a solid black dot.
* RadioGroup - The radio group allows a loop to provide the user with a collection of options in which they select a single result. The result is selected by clicking one of the radio elements in the radio group. A selected value of -1 indicates that nothing is selected.
* Select - A selected value of -1 indicates that nothing is selected.
* Telephone - The text input field allows the user to provide a telephone number.
* TextInput - The text input field allows the user to provide text information. The text can be pre-populated by the loop
