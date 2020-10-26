package loop_test

import (
	"context"
	"testing"

	"github.com/google/go-cmp/cmp"
	ldk "github.com/open-olive/loop-development-kit-go"
	ldktest "github.com/open-olive/loop-development-kit-go/ldk-test"
	"github.com/open-olive/sidekick-controller-examplego/loop"
)

func TestController(t *testing.T) {
	sidekick := &ldktest.Sidekick{
		StorageService: &ldktest.StorageService{
			StorageHasKeyf: func(string) (bool, error) {
				return true, nil
			},
			StorageReadf: func(s string) (string, error) {
				return "10", nil
			},
			StorageWritef: func(s1 string, s2 string) error {
				return nil
			},
		},
		KeyboardService: &ldktest.KeyboardService{
			ListenCharacterf: func(ctx context.Context, cb ldk.ListenCharacterHandler) error {
				cb('A', nil)

				return nil
			},
		},
		WhisperService: &ldktest.WhisperService{
			WhisperMarkdownF: func(w ldk.WhisperMarkdown) error {
				exp := "# New Text Event\n```\nA\n```\n\nCounter: 10"
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
