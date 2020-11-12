package loop_test

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	"github.com/open-olive/loop-development-kit/ldk/go/examples/filesystem-directory/loop"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/ldk-test"
)

func TestController(t *testing.T) {
	sidekick := &ldktest.Sidekick{
		FilesystemService: &ldktest.FilesystemService{
			Dirf: func(ctx context.Context, dir string) ([]ldk.FileInfo, error) {
				fi := []ldk.FileInfo{
					{
						Name:    "foo.md",
						Size:    1024,
						Mode:    int(os.ModePerm),
						Updated: time.Date(2020, 10, 1, 2, 34, 0, 0, time.UTC),
						IsDir:   false,
					},
				}
				return fi, nil
			},
		},
		WhisperService: &ldktest.WhisperService{
			Markdownf: func(ctx context.Context, w *ldk.WhisperContentMarkdown) error {
				exp := "# New File Event\n```\nfoo.md\n1.0 kB\n-rwxrwxrwx\nOct  1 02:34:00\nfalse\n```\n\n"
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
