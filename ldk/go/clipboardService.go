package ldk

import "context"

// ClipboardService is an interface that defines what methods are made available to the loops for interacting with the clipboard
type ClipboardService interface {
	Read(context.Context) (string, error)
	Listen(context.Context, ClipboardListenConfiguration) error
	Write(context.Context, string) error
}

// ReadListenHandler is the signature for a handler than handles changes to the clipboard text
type ReadListenHandler func(string, error)

type ClipboardListenConfiguration struct {
	Handler                 ReadListenHandler
	IncludeOliveHelpTraffic bool
}
