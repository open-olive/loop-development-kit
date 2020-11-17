package loop_test

import (
	"context"
	"testing"

	"github.com/google/go-cmp/cmp"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/whisper-markdown/loop"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/ldk-test"
)

func TestLoop(t *testing.T) {
	sidekick := &ldktest.Sidekick{
		WhisperService: &ldktest.WhisperService{
			Listf: func(ctx context.Context, w *ldk.WhisperContentList) error {
				exp := &ldk.WhisperContentList{
					Icon:  "bathtub",
					Label: "Example Controller Go",
					Elements: map[string]ldk.WhisperContentListElement{
						"headerAlert": &ldk.WhisperContentListElementAlert{
							Body:      "This is an alert in the header! It should be highlighted green.",
							Highlight: ldk.WhisperContentListElementAlertHighlightGreen,
							Order:     0,
						},
						"myKey1": &ldk.WhisperContentListElementPair{
							Key:   "Key 1",
							Order: 1,
							Value: "This key is always shown and not highlighted.",
						},
						"myKey2": &ldk.WhisperContentListElementPair{
							Highlight: ldk.WhisperContentListElementPairHighlightYellow,
							Key:       "Key 2",
							Order:     2,
							Value:     "This key is always shown and highlighted yellow.",
						},
						"myKey3": &ldk.WhisperContentListElementPair{
							Extra:     true,
							Highlight: ldk.WhisperContentListElementPairHighlightYellow,
							Key:       "Key 3",
							Order:     3,
							Value:     "This key is hidden.",
						},
						"footerAlert": &ldk.WhisperContentListElementAlert{
							Extra:     true,
							Body:      "This is an alert in the footer! It is hidden by default. It should be highlighted red.",
							Highlight: ldk.WhisperContentListElementAlertHighlightRed,
							Order:     4,
						},
					},
				}
				if got := w; !cmp.Equal(got, exp) {
					t.Errorf("unexpected markdown:\n%s\n", cmp.Diff(got, exp))
				}
				return nil
			},
		},
	}
	l := ldk.NewLogger("example-whisper-list")
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
