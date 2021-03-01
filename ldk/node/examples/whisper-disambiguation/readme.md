## Whisper Disambiguation LDK Usage Example
This NodeJS module utilizes the Olive Helps NodeJS LDK to demonstrate the usage of Whisper Disambiguation.

### Modifying
The Loop itself is defined in `src/index.ts`

Install dependencies
```shell
npm install
```

Modify `src/index.ts` as desired.

### Running Locally

#### Local Plugin Command (Recommended)

Olive Helps lets you add a local command as a Local Loop:

1. Open Olive Helps.
2. Open the Loop Library:
   1. Click the Hamburger icon.
   2. Click Loop Library.
3. Click the "Install Local Loop" button:
4. Select the working directory for the Loop (the directory this README is in).
5. Enter the command to be executed, including any arguments. For this example the command will be `./node_modules/.bin/ts-node src/index.ts`
6. Click Install.

The command will be installed as a Loop. If you need to change the command or its arguments you'll need remove it and then add the new commands.

Otherwise, if you instead want to make changes to the Loop itself, you can:
- Modify `src/index.ts`
- Restart Olive Helps
