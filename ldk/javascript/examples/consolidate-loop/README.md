# Building and running Loop in Olive Helps

### What is consolidate loop?

Consolidate loop demonstrates the capabilities of Olive Helps used in conjunction with each other.

### When to use consolidate loop?

New patient appointment scheduling as a 2-step process: 1) Patient calls, scheduling staff schedules appointment. 2) Registration staff uses this information to contact patients before their appointments to confirm the appointment and provide instructions.

### How to use consolidate loop?

1. Hit Ctrl + N to open Consolidate Loop - Form Whisper
2. Input patient information and submit. 
    Please note that firstname, lastname, telephone number, email and appointmentDate are required fields. 
3. Use firstname, lastname, date of birth, phone number or appointment date to search for patients using search bar, choose the right one if multiple records are returned.

## Build a Loop
To build a Loop, create a new project modeled after this example.

Note that your Loop project will require a `package.json`. See "Producing Loop Compilations" in the main LDK readme for more information.

All of your Loop code will begin with an `index.js` file. In this file, you define all of your Loop business logic, leveraging the LDK Aptitudes.

## Transpile the Loop for Olive Helps
From `examples/consolidate-loop`
- `npm i`
- `npm run build`

This will generate a `./dist` directory from your `index.js` that containes your transpiled Loop.

You can now load this Loop into Olive Helps.