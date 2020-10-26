package ldk

import "context"

// HoverService is an interface that defines what methods plugins can expect from the host
type HoverService interface {
	Read() (string, error)
	ListenRead(context.Context, ListenReadHandler) error
}

type ListenReadHandler func(string, error)
