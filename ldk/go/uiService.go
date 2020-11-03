package ldk

import "context"

// UIService is an interface that defines what methods plugins can expect from the UI
type UIService interface {
	ListenSearchbar(context.Context, ListenSearchHandler) error
	ListenGlobalSearch(context.Context, ListenSearchHandler) error
}

type ListenSearchHandler func(string, error)
