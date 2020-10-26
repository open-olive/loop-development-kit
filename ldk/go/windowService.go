package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// WindowService is an interface that defines what methods plugins can expect from the host
type WindowService interface {
	ActiveWindow() (WindowInfo, error)
	ListenActiveWindow(context.Context, ListenActiveWindowHandler) error
	State() ([]WindowInfo, error)
	ListenState(context.Context, ListenWindowStateHandler) error
}

type WindowAction int

const (
	WindowActionUnknown   = 0
	WindowActionFocused   = 1
	WindowActionUnfocused = 2
	WindowActionOpened    = 3
	WindowActionClosed    = 4
)

func protoWindowActionToAction(a proto.WindowAction) WindowAction {
	switch a {
	case proto.WindowAction_WINDOW_ACTION_UNKNOWN:
		return WindowActionUnknown
	case proto.WindowAction_WINDOW_ACTION_FOCUSED:
		return WindowActionFocused
	case proto.WindowAction_WINDOW_ACTION_UNFOCUSED:
		return WindowActionUnfocused
	case proto.WindowAction_WINDOW_ACTION_OPENED:
		return WindowActionOpened
	case proto.WindowAction_WINDOW_ACTION_CLOSED:
		return WindowActionClosed
	default:
		return WindowActionUnknown
	}
}

type WindowInfo struct {
	Title  string
	Path   string
	PID    int
	X      int
	Y      int
	Width  int
	Height int
}

type WindowEvent struct {
	Window WindowInfo
	Action WindowAction
}

type ListenActiveWindowHandler func(WindowInfo, error)
type ListenWindowStateHandler func(WindowEvent, error)

func convertWindowInfoToProto(resp WindowInfo) *proto.WindowInfo {
	return &proto.WindowInfo{
		Title:  resp.Title,
		Path:   resp.Path,
		Pid:    int64(resp.PID),
		X:      int32(resp.X),
		Y:      int32(resp.Y),
		Width:  int32(resp.Width),
		Height: int32(resp.Height),
	}
}

func convertWindowActionToProtoAction(wa WindowAction) proto.WindowAction {
	switch wa {
	case WindowActionFocused:
		return proto.WindowAction_WINDOW_ACTION_FOCUSED
	case WindowActionUnfocused:
		return proto.WindowAction_WINDOW_ACTION_UNFOCUSED
	case WindowActionOpened:
		return proto.WindowAction_WINDOW_ACTION_OPENED
	case WindowActionClosed:
		return proto.WindowAction_WINDOW_ACTION_CLOSED
	case WindowActionUnknown:
		return proto.WindowAction_WINDOW_ACTION_UNKNOWN
	default:
		return proto.WindowAction_WINDOW_ACTION_UNKNOWN
	}
}
