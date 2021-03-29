package ldktest

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
)

type ClipboardService struct {
	Readf   func(context.Context) (string, error)
	Listenf func(context.Context, ldk.ReadListenHandler) error
	Writef  func(context.Context, string) error
}

func (c *ClipboardService) Read(ctx context.Context) (string, error) {
	return c.Readf(ctx)
}

func (c *ClipboardService) Listen(ctx context.Context, cb ldk.ReadListenHandler) error {
	return c.Listenf(ctx, cb)
}

func (c *ClipboardService) Write(ctx context.Context, s string) error {
	return c.Writef(ctx, s)
}
