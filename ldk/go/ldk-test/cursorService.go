package ldktest

import (
	"context"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

type CursorService struct {
	PositionF       func(context.Context) (ldk.CursorPosition, error)
	ListenPositionF func(context.Context, ldk.ListenPositionHandler) error
}

func (c *CursorService) Position(ctx context.Context) (ldk.CursorPosition, error) {
	return c.PositionF(ctx)
}
func (c *CursorService) ListenPosition(ctx context.Context, handler ldk.ListenPositionHandler) error {
	return c.ListenPositionF(ctx, handler)
}
