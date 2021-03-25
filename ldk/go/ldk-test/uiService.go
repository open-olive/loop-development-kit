package ldktest

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
)

type UIService struct {
	ListenSearchbarf    func(context.Context, ldk.ListenSearchHandler) error
	ListenGlobalSearchf func(context.Context, ldk.ListenSearchHandler) error
}

func (u *UIService) ListenSearchbar(ctx context.Context, cb ldk.ListenSearchHandler) error {
	return u.ListenSearchbarf(ctx, cb)
}

func (u *UIService) ListenGlobalSearch(ctx context.Context, cb ldk.ListenSearchHandler) error {
	return u.ListenGlobalSearchf(ctx, cb)
}
