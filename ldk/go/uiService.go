package ldk

import "context"

// ProcessService is an interface that defines what methods plugins can expect from the host
type UIService interface {
	ListenSearchbar(context.Context, ListenSearchHandler) error
	ListenGlobalSearch(context.Context, ListenSearchHandler) error
}

type ListenSearchHandler func(string, error)
