package ldk

import "context"

// BrowserService is an interface that defines what methods plugins can expect from the host
type BrowserService interface {
	ActiveURL() (string, error)
	ListenActiveURL(context.Context, ListenActiveURLHandler) error
	SelectedText() (SelectedText, error)
	ListenSelectedText(context.Context, ListenSelectedTextHandler) error
}

type SelectedText struct {
	TabTitle string
	Text     string
	URL      string
}

type ListenActiveURLHandler func(string, error)
type ListenSelectedTextHandler func(SelectedText, error)
