# Sidekick Loop Example in Go

This is a very simple loop to use as a starting point. This loop watches for text events and emits a whisper every time it receives an event.

## Developers

### Install

Ensure Go is installed and working ([Instructions](https://golang.org/doc/install)). Go v1.14 or higher is recommended.

This project uses [Go Modules](https://blog.golang.org/using-go-modules). You should clone it outside of your gopath. For example, your home directory.

To install dependencies, run the following command:

```shell
make install
```

### Build

Build will compile an executable and output it to the `/build` directory.

Run the following command to build:

```shell
make build
```

### Deploy

Deploying will first build, then copy the built files to the correct location for Sidekick to use them. You do not need to run the build command first, deploying will do it automatically.

This is useful for testing with Sidekick.

Run the following command to deploy:

```shell
make deploy
```

### Quality

The project uses a collection of tools to ensure code standards are maintained.

Run the following command to execute the quality checking tools:

```shell
make quality
```

### Test

This project has a test to ensure the loop text matching is working as expected.

Run the following command to execute tests:

```shell
make test
```
