# Loops

Loops receive events and use them to generate relevant whispers. Loops choose which events they want to use and which they want to ignore.

## Interface

Writing a loop boils down to writing an implementation for the `Loop` interface.

```go
type Loop interface {
	LoopStart(Sidekick) error
	LoopStop() error
}
```

**LoopStart** - The Loop should wait to start operating until this is called. The provided `Sidekick` reference should be stored in memory for continued use.

**LoopStop** - The Loop should stop operating when this is called.


## Subscribing to Sensors

Inside `LoopStart`, you can subscribe to various sensors. Here's an example of subscribing to a couple:

```go
func (c *Loop) LoopStart(sidekick ldk.Sidekick) error {
	// ...

	handler := func (text string, err error) {
		// Respond to sensor event here...
	}

	if err := sidekick.Clipboard().Listen(l.ctx, handler); err != nil {
		return err
	}

	if err := sidekick.UI().ListenSearchbar(l.ctx, handler); err != nil {
		return err
	}
}
```

Loops do not need to emit whispers in a 1:1 relationship with events. Loops may not use events at all. Loops may only use some events. Loops may keep a history of events and only emit whispers when several conditions are met.

## List of possible Sensors to subscribe to

	- Clipboard
	- Vault
	- Whisper
	- Keyboard
	- Process
	- Cursor
	- Filesystem
	- Window
	- UI
	- Network
}

## Lifecycle

1. Olive Helps executes plugin process.
1. Olive Helps calls `LoopStart`, sending the `Sidekick` reference to the plugin.
1. The loop subscribes to one or more sensors in `LoopStart`.
1. When the loop is notified of an sensor event, it processes it and calls the `Whisper` method on the `Sidekick` reference to emit a whisper.
1. On user disabling the loop, Olive Helps calls `LoopStop` then sends `sigterm` to the process.
1. On Olive Helps shutdown, Olive Helps calls `LoopStop` then sends `sigterm` to the process.

## An Example of a simple loop with Window State listener

```go
package main

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

// Main function to serve the loop
func main() {
	logger := ldk.NewLogger("demo-loop-go")
	var loop ldk.Loop
	loop = &Loop{
		logger:         logger,
	}

	ldk.ServeLoopPlugin(logger, loop)
}

// define structure of loop
type Loop struct {
	ctx              context.Context
	cancel           context.CancelFunc
	sidekick         ldk.Sidekick
	logger           *ldk.Logger
}

// LoopStart will be called by ldk when loop starts
func (loop *Loop) LoopStart(sidekick ldk.Sidekick) error {
	// store sidekick in memory to provide event handlers
	loop.sidekick = sidekick
	loop.ctx, loop.cancel = context.WithCancel(context.Background())

	// starting event listeners
	err := loop.startListeners()
	if err != nil {
		return err
	}

	return nil
}

// LoopStop will be called by ldk when loop stops
func (loop *Loop) LoopStop() error {
	// clean up activities
	loop.cancel()
	return nil
}

// starting all listeners
func (loop *Loop) startListeners() error {
	// starting window listeners
	err := loop.listenToWindow()
	if err != nil {
		return err
	}

	// more listeners could be started here ...

	loop.logger.Info("all listeners started")
	return nil
}

func (loop *Loop) listenToWindow() error {
	// providing active window handler
	err := loop.sidekick.Window().ListenActiveWindow(loop.ctx, loop.activeWindowHandler())
	if err != nil {
		loop.logger.Error("active window listen error", err)
		return err
	}

	// providing window state handler
	err = loop.sidekick.Window().ListenState(loop.ctx, loop.windowStateHandler())
	if err != nil {
		loop.logger.Error("window state listen error", err)
	}

	return err
}

func (loop *Loop) activeWindowHandler() ldk.ListenActiveWindowHandler {
	return func(windowInfo ldk.WindowInfo, err error) {
		if err != nil {
			loop.logger.Error("active window callback error", err)
			return
		}
		// window become active, do activities here...
		loop.logger.Info("active window", windowInfo.Title)
	}
}

func (loop *Loop) windowStateHandler() ldk.ListenWindowStateHandler {
	return func(event ldk.WindowEvent, err error) {
		if err != nil {
			loop.logger.Error("window state callback error", err)
			return
		}

	// window state changed, do activities here...
		loop.logger.Info("windowState" + event.Window.Title)
	}
}

```
