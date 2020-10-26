package loop_test

import (
	"context"
	"testing"

	"github.com/google/go-cmp/cmp"
	ldk "github.com/open-olive/loop-development-kit-go"
	loop "github.com/open-olive/loop-development-kit-go/example/keyboard/loop"
	ldktest "github.com/open-olive/loop-development-kit-go/ldk-test"
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
			ListenTextf: func(ctx context.Context, cb ldk.ListenTextHandler) error {
				cb("Some keyboard text", nil)

				return nil
			},
		},
		WhisperService: &ldktest.WhisperService{
			Markdownf: func(ctx context.Context, w *ldk.WhisperContentMarkdown) error {
				exp := "Text from the keyboard: Some keyboard text"
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
