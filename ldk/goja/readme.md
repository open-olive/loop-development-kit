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
 