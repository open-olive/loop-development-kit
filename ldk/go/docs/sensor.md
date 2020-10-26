# Sensor

A Sensor is a type of plugin that generates events.  Events can be as simple as a chunk of text but allow for complicated information. Sensors do not choose which controllers get their events. They are simply emitting the events. The decision about which events to use is left to the controller.

## Interface

Writing a Sensor plugin boils down to writing an implementation for the Sensor interface.

```go
type Sensor interface {
	Start(SensorHost) error
	Stop() error
	OnEvent(Event) error
}
```

**Start** - The Sensor should wait to start operating until this is called. The provided `SensorHost` should be stored in memory for continued use.

**Stop** - The Sensor should stop operating when this is called.

**OnEvent** - The sensor can use this to handle events from the Sidekick UI. Many sensors will not care about UI events, and in that case the function should just return `nil`.

## Lifecycle

1. Sidekick executes plugin process
1. Sidekick calls `Start`, sending the host connection information to the plugin. This connection information is used to create the `SensorHost`. The `SensorHost` interface allows the plugin to emit events.
1. On Sensor wanting to emit an event, the Sensor calls the `EmitEvent` method on the host interface.
1. On Sidekick UI event, Sidekick calls `OnEvent`, passing the event to the Sensor. These events can be ignore or used at the Sensor's choice.
1. On User disabling the Sensor, Sidekick calls `Stop` then sends `sigterm` to the process.
1. On Sidekick shutdown, Sidekick calls `Stop` then sends `sigterm` to the process.
