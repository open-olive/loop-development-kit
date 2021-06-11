# Building and running Loop in Olive Helps

### What is The Universal Example Loop?

The Universal Example Loop demonstrates the capabilities of Olive Helps used in conjunction with each other.

### What does the Universal Example Loop do?

It's a patient appointment scheduling Loop that is a 2-step process: 1) Patient calls, scheduling staff schedules appointment. 2) Registration staff uses this information to contact patients before their appointments to confirm the appointment and provide instructions.

### How to use the Universal Example Loop?

1. Hit Ctrl + N to open Universal Example Loop - Form Whisper
2. Input patient information and submit.
   Please note that First Name, Last Name, Telephone, Email and Appointment Date are required fields.
3. Use First Name, Last Name, Date of Birth, Telephone or Appointment Date to search for patients using search bar, choose the right one if multiple records are returned.

## Building the Loop

To build the Loop, create a new project modeled after this example.

Note that your Loop project will require a `package.json`. See "Producing Loop Compilations" in the main LDK README for more information.

## Transpiling the Loop for Olive Helps

From `examples/universal-example-loop`

- `npm i`
- `npm run build`

This will generate a `./dist` directory from your `index.js` that contains your transpiled Loop.

You can now load this Loop into Olive Helps.
