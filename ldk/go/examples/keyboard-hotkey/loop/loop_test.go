package loop_test

import (
	"context"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/open-olive/loop-development-kit/ldk/go/examples/keyboard-hotkey/loop"
	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/v2/ldk-test"
)

func TestController(t *testing.T) {
	sidekick := &ldktest.Sidekick{
		KeyboardService: &ldktest.KeyboardService{
			ListenHotkeyf: func(ctx context.Context, hk ldk.Hotkey, cb ldk.ListenHotkeyHandler) error {
				cb(true, nil)

				return nil
			},
		},
		WhisperService: &ldktest.WhisperService{
			Markdownf: func(ctx context.Context, w *ldk.WhisperContentMarkdown) error {
				exp := "hotkey: {97 8}, scanned: true"
				if got := w.Markdown; !cmp.Equal(got, exp) {
					t.Errorf("unexpected markdown:\n%s\n", cmp.Diff(got, exp))
				}
				return nil
			},
		},
	}
	l := ldk.NewLogger("loop-example")
	c, err := loop.NewLoop(l)
	if err != nil {
		t.Fatal(err)
	}
	if err := c.LoopStart(sidekick); err != nil {
		t.Fatal(err)
	}
	if err := c.LoopStop(); err != nil {
		t.Fatal(err)
	}
}
