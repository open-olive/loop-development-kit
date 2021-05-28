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
* Message - This component shows a banner in the whisper that functions as a call to action to the user.
* Number - The text input field allows the user to provide a number within the parameters provided.
* Password - The password input field allows the user to provide a password. This field protects the user by obscuring what they type. Showing each character as a solid black dot.
* RadioGroup - The radio group allows a loop to provide the user with a collection of options in which they select a single result. The result is selected by clicking one of the radio elements in the radio group. A selected value of -1 indicates that nothing is selected.
* Select - A selected value of -1 indicates that nothing is selected.
* Telephone - The text input field allows the user to provide a telephone number.
* TextInput - The text input field allows the user to provide text information. The text can be pre-populated by the loop
* Form - This component takes a collection of child components, and a function that returns each provided component's current value upon submission. A submit button will be generated for each form. Any number of forms are allowed, but forms cannot be inside of other forms.
