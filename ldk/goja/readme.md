## LDK Development

### Running from experimental branch

To work with the Goja LDK while we're in development, do the following:

1. Run `npm i` inside this directory.
2. Build the LDK (`npm run build`).
3. Switch to the `experiment-goja` branch in the sidekick repo.
4. Go to the `./experimentGoja/loopGoja` folder.
5. If necessary, replace references to the `ldk` package inside the `loopGoja` folder to `@oliveai/ldk`.
6. Replace the relative file reference in `./experimentGoja/loopGoja/package.json` to point to the location of the `ldk/goja` folder in your local instance of the LDK repo. (`"@oliveai/ldk": "file:../../../../GitHub/loop-development-kit/ldk/goja",`)
7. Execute `npm i` to install the dependencies in the `./experimentGoja/loopGoja` folder.
8. Run `npm run build` in the `./experimentGoja/loopGoja` folder.
9. Run Sidekick from the code (`make run` for the first time or if you run into any bugs, `make run-internal` for subsequent executions).

### Producing Loop Compilations

We recommend using Webpack 5 to compile your Loop code for you. Our Webpack configuration includes support for Typescript, and generates the Loop metadata required for installation.

Examples are provided in the `./ldk/goja/tests/` directory.

#### Using Our Configuration As-Is

Install Webpack 5 and its CLI, and add this build script to your `package.json`:

```shell
webpack --entry core-js/fn/promise --entry ./index.js --config ./node_modules/@oliveai/ldk/dist/webpack/config.js
```

This will use our configuration and compile the file to the `./dist/loop.js`.

#### Extending the Configuration

If you want to extend the Webpack configuration, create a webpack.config.js file and use `webpack-merge` to extend it:

```js
const path = require('path');
const merge = require('webpack-merge');
const ldkConfig = require('@oliveai/ldk/dist/webpack/config');

const merged = merge.merge(ldkConfig.default, {
  entry: [path.resolve(__dirname, './index.js')],
});

module.exports = merged;
```

#### Guidelines and Warnings

* The Goja runtime is not the same thing as the Node runtime, and built-in Node modules (like `fs`, `path`) are not available.
* You can install npm packages and use them in your code, however Webpack will not throw a compilation error if a package you import requires a Node built-in module. Instead it will generate an error at runtime.
* Olive Helps expects that the compilation folder is empty besides the `loop.js` file.
* Multiple file chunks are not supported.