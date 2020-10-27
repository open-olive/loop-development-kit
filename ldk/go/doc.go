// Package ldk is an LDK (loop development kit) for plugins for the Sidekick project.
//
// The LDK is built with go-plugin (https://github.com/hashicorp/go-plugin), a HashiCorp plugin system used in several of their projects.
//
// Plugins developed with this library are executed by Sidekick as separate processes. This ensures that crashes or instability in the plugin will not destabilize the Sidekick process.
//
// Communication between Sidekick and the plugin is first initialized over stdio and then performed using gRPC (https://grpc.io/). On mac and linux the GRPC communication is sent over unix domain socket and on windows over local TCP socket.
//
// In order for Sidekick to use a plugin, it must be compiled. Sidekick does not compile or interpret source code at runtime. A consequence of this is that plugins will need to be compiled for each operating system that they want to support.
//
// Controllers
//
// Controllers receive events and use them to generate relevant whispers. Controllers choose which events they want to use and which they want to ignore.
//
// Controller Interface
//
// Writing a Controller plugin boils down to writing an implementation for the Controller interface.
//
//  type Controller interface {
//    OnEvent(Event) error
//    Start(ControllerHost) error
//    Stop() error
//  }
//
// Start() - The Controller should wait to start operating until this is called. The provided `ControllerHost` should be stored in memory for continued use.
//
// Stop() - The Controller should stop operating when this is called.
//
// OnEvent() - The controller can use this to handle events that are broadcast by Sensors. Controllers do not need to emit events in a 1:1 relationship with events. Controllers may not use events at all. Controllers may only use some events. Controllers may keep a history of events and only emit whispers when several conditions are met.
//
// Controller Lifecycle
//
// 1. Sidekick executes plugin process
//
// 2. Sidekick calls `Start`, sending the host connection information to the plugin. This connection information is used to create the `ControllerHost`. The `ControllerHost` interface allows the plugin to emit whispers.
//
// 3. On Controller wanting to emit a whisper, the Controller calls the `EmitWhisper` method on the host interface.
//
// 4. On Sensor event, Sidekick calls `OnEvent`, passing the event from the Sensor to the Controller. These events can be ignored or used at the Controller's choice.
//
// 5. On User disabling the Controller, Sidekick calls `Stop` then sends `sigterm` to the process.
//
// 6. On Sidekick shutdown, Sidekick calls `Stop` then sends `sigterm` to the process.*
//
// Basic Controller Example
//
// We recommend using this repo as a starting point when creating a new controller: https://github.com/open-olive/sidekick-controller-examplego
//
// Sensors
//
// A Sensor is a type of plugin that generates events.  Events can be as simple as a chunk of text but allow for complicated information. Sensors do not choose which controllers get their events. They are simply emitting the events. The decision about which events to use is left to the controller.
//
// Sensor Interface
//
// Writing a Sensor plugin boils down to writing an implementation for the Sensor interface.
//
//  type Sensor interface {
//    Start(SensorHost) error
//    Stop() error
//    OnEvent(Event) error
//  }
//
// Start() - The Sensor should wait to start operating until this is called. The provided `SensorHost` should be stored in memory for continued use.
//
// Stop() - The Sensor should stop operating when this is called.
//
// OnEvent() - The sensor can use this to handle events from the Sidekick UI. Many sensors will not care about UI events, and in that case the function should just return `nil`.
//
// Sensor Lifecycle
//
// 1. Sidekick executes plugin process
//
// 2. Sidekick calls `Start`, sending the host connection information to the plugin. This connection information is used to create the `SensorHost`. The `SensorHost` interface allows the plugin to emit events.
//
// 3. On Sensor wanting to emit an event, the Sensor calls the `EmitEvent` method on the host interface.
//
// 4. On Sidekick UI event, Sidekick calls `OnEvent`, passing the event to the Sensor. These events can be ignore or used at the Sensor's choice.
//
// 5. On User disabling the Sensor, Sidekick calls `Stop` then sends `sigterm` to the process.
//
// 6. On Sidekick shutdown, Sidekick calls `Stop` then sends `sigterm` to the process.
package ldk
