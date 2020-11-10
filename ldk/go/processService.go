package ldk

import "context"

// ProcessService is an interface that defines what methods plugins can expect from the host
type ProcessService interface {
	State(context.Context) ([]ProcessInfo, error)
	ListenState(context.Context, ListenProcessStateHandler) error
}

type ProcessInfo struct {
	Arguments string
	Command   string
	PID       int
}

type ProcessAction int

const (
	ProcessActionUnknown = 0
	ProcessActionStarted = 1
	ProcessActionStopped = 2
)

type ProcessEvent struct {
	Process ProcessInfo
	Action  ProcessAction
}

type ListenProcessStateHandler func(ProcessEvent, error)
