package loop_test

import (
	"context"
	"testing"

	"github.com/google/go-cmp/cmp"
	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/search-global/loop"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/v2/ldk-test"
)

func TestSearchResponse(t *testing.T) {
	markdownDoneChan := make(chan bool)

	sidekick := &ldktest.Sidekick{
		UIService: &ldktest.UIService{
			ListenGlobalSearchf: func(ctx context.Context, cb ldk.ListenSearchHandler) error {
				cb("This is a test event", nil)
				return nil
			},
		},
		WhisperService: &ldktest.WhisperService{
			Markdownf: func(ctx context.Context, w *ldk.WhisperContentMarkdown) error {
				exp := "Text from the global search bar: This is a test event"
				if got := w.Markdown; !cmp.Equal(got, exp) {
					t.Errorf("unexpected markdown:\n%s\n", cmp.Diff(got, exp))
				}
				markdownDoneChan <- true
				return nil
			},
		},
	}

	logger := ldk.NewLogger("loop-example")
	l, err := loop.NewLoop(logger)
	if err != nil {
		t.Fatal(err)
	}
	if err := l.LoopStart(sidekick); err != nil {
		t.Fatal(err)
	}

	<-markdownDoneChan

	if err := l.LoopStop(); err != nil {
		t.Fatal(err)
	}
}
