package loop_test

import (
	"context"
	"testing"

	"github.com/google/go-cmp/cmp"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/keyboard-character/loop"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/ldk-test"
)

func TestController(t *testing.T) {
	sidekick := &ldktest.Sidekick{
		KeyboardService: &ldktest.KeyboardService{
			ListenCharacterf: func(ctx context.Context, cb ldk.ListenCharacterHandler) error {
				cb('A', nil)

				return nil
			},
		},
		WhisperService: &ldktest.WhisperService{
			WhisperMarkdownF: func(w ldk.WhisperMarkdown) error {
				exp := "A character from the keyboard: A"
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
