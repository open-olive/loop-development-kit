package loop_test

import (
	"context"
	"testing"

	"github.com/google/go-cmp/cmp"
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/whisper-markdown/loop"
	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/v2/ldk-test"
)

func TestController(t *testing.T) {
	sidekick := &ldktest.Sidekick{
		WhisperService: &ldktest.WhisperService{
			Markdownf: func(ctx context.Context, w *ldk.WhisperContentMarkdown) error {
				exp := &ldk.WhisperContentMarkdown{
					Label:    "Example Controller Go",
					Markdown: "## MARKDOWN!",
				}
				if got := w; !cmp.Equal(got, exp) {
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
