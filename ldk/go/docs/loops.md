# An Example of a simple loop with Window State listener

```go
package main

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
)

// main function to serve the loop
func main() {
	logger := ldk.NewLogger("demo-loop-go")
	var loop ldk.Loop
	loop = &Loop{
		logger:         logger,
	}

	// serve the loop implementation
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
func (l *Loop) LoopStart(sidekick ldk.Sidekick) error {
	// store sidekick in memory to provide event handlers
	l.sidekick = sidekick
	l.ctx, l.cancel = context.WithCancel(context.Background())

	// starting event listeners
	err := l.startListeners()
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
