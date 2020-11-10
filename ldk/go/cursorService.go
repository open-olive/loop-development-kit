package ldk

import "context"

// CursorService is an interface that defines what methods plugins can expect from the host
type CursorService interface {
	Position(context.Context) (CursorPosition, error)
	ListenPosition(context.Context, ListenPositionHandler) error
}

type CursorPosition struct {
	X      int
	Y      int
	Screen int
}

type ListenPositionHandler func(CursorPosition, error)
