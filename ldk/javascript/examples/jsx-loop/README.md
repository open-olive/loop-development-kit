# Building and running Loop in Olive Helps

## Build a Loop
To build a Loop, create a new project modeled after this example.

Note that your Loop project will require a `package.json`. See "Producing Loop Compilations" in the main LDK readme for more information.

All of your Loop code will begin with an `index.js` file. In this file, you define all of your Loop business logic, leveraging the LDK Aptitudes.

## Transpile the Loop for Olive Helps
From `examples/typescript-loop`
- `npm i`
- `npm run build`

This will generate a `./dist` directory from your `index.js` that containes your transpiled Loop.

You can now load this Loop into Olive Helps.