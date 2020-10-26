# Controller

Controllers receive events and use them to generate relevant whispers. Controllers choose which events they want to use and which they want to ignore.

## Interface

Writing a Controller plugin boils down to writing an implementation for the Controller interface.

```go
type Controller interface {
	OnEvent(Event) error
	Start(ControllerHost) error
	Stop() error
}
```

**Start** - The Controller should wait to start operating until this is called. The provided `ControllerHost` should be stored in memory for continued use.

**Stop** - The Controller should stop operating when this is called.

**OnEvent** - The controller can use this to handle events that are broadcast by Sensors. Controllers do not need to emit events in a 1:1 relationship with events. Controllers may not use events at all. Controllers may only use some events. Controllers may keep a history of events and only emit whispers when several conditions are met.

## Lifecycle

1. Sidekick executes plugin process
1. Sidekick calls `Start`, sending the host connection information to the plugin. This connection information is used to create the `ControllerHost`. The `ControllerHost` interface allows the plugin to emit whispers.
1. On Controller wanting to emit a whisper, the Controller calls the `EmitWhisper` method on the host interface.
1. On Sensor event, Sidekick calls `OnEvent`, passing the event from the Sensor to the Controller. These events can be ignored or used at the Controller's choice.
1. On User disabling the Controller, Sidekick calls `Stop` then sends `sigterm` to the process.
1. On Sidekick shutdown, Sidekick calls `Stop` then sends `sigterm` to the process.