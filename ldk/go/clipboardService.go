package ldk

import "context"

// ClipboardService is an interface that defines what methods plugins can expect from the host
type ClipboardService interface {
	Read() (string, error)
	Listen(context.Context, ReadListenHandler) error
	Write(string) error
}

type ReadListenHandler func(string, error)
