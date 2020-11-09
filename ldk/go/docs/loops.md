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

## Lifecycle

1. Sidekick executes plugin process.
1. Sidekick calls `LoopStart`, sending the Sidekick reference to the plugin.
1. The loop subscribes to one or more sensors in `LoopStart`.
1. When the loop is notified of a sensor event, it processes it and calls the `Whisper` method on the `sidekick` reference to emit a whisper.
1. On user disabling the loop, Sidekick calls `LoopStop` then sends `sigterm` to the process.
1. On Sidekick shutdown, Sidekick calls `LoopStop` then sends `sigterm` to the process.