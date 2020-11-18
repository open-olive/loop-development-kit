# Sidekick Controller Example Go

This is a very simple controller to use as a starting point. This controller watches for text events and emits a whisper every time it receives an event.

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

### Test

This project has a test to ensure the controller text matching is working as expected.

Run the following command to execute tests:

```shell
make test
```
