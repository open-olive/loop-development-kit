package loop_test

import (
	"context"
	"testing"

	"github.com/google/go-cmp/cmp"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/whisper-markdown/loop"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/ldk-test"
)

func TestController(t *testing.T) {
	sidekick := &ldktest.Sidekick{
		WhisperService: &ldktest.WhisperService{
			Markdownf: func(ctx context.Context, w *ldk.WhisperContentMarkdown) error {
				exp := &ldk.WhisperContentMarkdown{
					Icon:     "bathtub",
					Label:    "Example Controller Go",
					Markdown: "## MARKDOWN!",
					Style: ldk.Style{
						BackgroundColor: "#fff",
						HighlightColor:  "#651fff",
						PrimaryColor:    "#666",
					},
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
