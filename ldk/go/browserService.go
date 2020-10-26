package ldk

import "context"

// BrowserService is an interface that defines what methods are made available to the loops for interacting with a browser
type BrowserService interface {
	ActiveURL() (string, error)
	ListenActiveURL(context.Context, ListenActiveURLHandler) error
	SelectedText() (SelectedText, error)
	ListenSelectedText(context.Context, ListenSelectedTextHandler) error
}

// SelectedText is a struct containing information about the text selected by the user in the browser
type SelectedText struct {
	TabTitle string
	Text     string
	URL      string
}

// ListenActiveURLHandler is the signature for a handler than handles changes to the Active URL
type ListenActiveURLHandler func(string, error)

// ListenSelectedTextHandler is the signature for a handler than handles changes to the selected text
type ListenSelectedTextHandler func(SelectedText, error)
