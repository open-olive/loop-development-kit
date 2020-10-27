package ldk

import "context"

// WindowService is an interface that defines what methods plugins can expect from the host
type WindowService interface {
	ActiveWindow() (WindowInfo, error)
	ListenActiveWindow(context.Context, ListenActiveWindowHandler) error
	State() ([]WindowInfo, error)
	ListenState(context.Context, ListenWindowStateHandler) error
}

// WindowAction is a type that defines what type of action experienced by the window
type WindowAction int

const (
	// WindowActionUnknown is the state for an unknown window action
	WindowActionUnknown = 0

	// WindowActionFocused is the state for a window becoming focused
	WindowActionFocused = 1

	// WindowActionUnfocused is the state for a window becoming unfocused
	WindowActionUnfocused = 2

	// WindowActionOpened is the state for a window being opened
	WindowActionOpened = 3

	// WindowActionClosed is the state for a window being closed
	WindowActionClosed = 4
)

// WindowInfo contains information about window geometry, position, and metadata
type WindowInfo struct {
	Title  string
	Path   string
	PID    int
	X      int
	Y      int
	Width  int
	Height int
}

// WindowEvent is a struct containing information about a change in window state
type WindowEvent struct {
	Window WindowInfo
	Action ProcessAction
}

// ListenActiveWindowHandler is the signature for a handler than handles changes to the active window
type ListenActiveWindowHandler func(WindowInfo, error)

// ListenWindowStateHandler is the signature for a handler than handles changes to window state
type ListenWindowStateHandler func(WindowAction, error)
