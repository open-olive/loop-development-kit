package ldktest

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
)

type WindowService struct {
	ActiveWindowf       func(ctx context.Context) (ldk.WindowInfo, error)
	ListenActiveWindowf func(ctx context.Context, handler ldk.ListenActiveWindowHandler) error
	Statef              func(ctx context.Context) ([]ldk.WindowInfo, error)
	ListenStatef        func(ctx context.Context, handler ldk.ListenWindowStateHandler) error
}

func (w *WindowService) ActiveWindow(ctx context.Context) (ldk.WindowInfo, error) {
	return w.ActiveWindowf(ctx)
}

func (w *WindowService) ListenActiveWindow(ctx context.Context, handler ldk.ListenActiveWindowHandler) error {
	return w.ListenActiveWindowf(ctx, handler)
}

func (w *WindowService) State(ctx context.Context) ([]ldk.WindowInfo, error) {
	return w.Statef(ctx)
}

func (w *WindowService) ListenState(ctx context.Context, handler ldk.ListenWindowStateHandler) error {
	return w.ListenStatef(ctx, handler)
}
