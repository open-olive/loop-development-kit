package ldk

import "context"

// WindowService is an interface that defines what methods plugins can expect from the host
type WindowService interface {
	ActiveWindow() (WindowInfo, error)
	ListenActiveWindow(context.Context, ListenActiveWindowHandler) error
	State() ([]WindowInfo, error)
	ListenState(context.Context, ListenWindowStateHandler) error
}

// ListenActiveWindowHandler is the signature for a handler than handles changes to the active window
type ListenActiveWindowHandler func(WindowInfo, error)

// ListenWindowStateHandler is the signature for a handler than handles changes to window state
type ListenWindowStateHandler func(WindowEvent, error)
