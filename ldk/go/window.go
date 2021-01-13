package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

// WindowAction is a type that defines what type of action experienced by the window
type WindowAction int

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
	Action WindowAction
}

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

	// WindowActionMoved is the state for a window being moved
	WindowActionMoved = 5

	// WindowActionResized is the state for a window being resized
	WindowActionResized = 6

	// WindowActionTitleChanged is the state for a window title being changed
	WindowActionTitleChanged = 7
)

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
	case proto.WindowAction_WINDOW_ACTION_MOVED:
		return WindowActionMoved
	case proto.WindowAction_WINDOW_ACTION_RESIZED:
		return WindowActionResized
	case proto.WindowAction_WINDOW_ACTION_TITLE_CHANGED:
		return WindowActionTitleChanged
	default:
		return WindowActionUnknown
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
	case WindowActionMoved:
		return proto.WindowAction_WINDOW_ACTION_MOVED
	case WindowActionResized:
		return proto.WindowAction_WINDOW_ACTION_RESIZED
	case WindowActionTitleChanged:
		return proto.WindowAction_WINDOW_ACTION_TITLE_CHANGED
	case WindowActionUnknown:
		return proto.WindowAction_WINDOW_ACTION_UNKNOWN
	default:
		return proto.WindowAction_WINDOW_ACTION_UNKNOWN
	}
}
