package loop_test

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
	"github.com/open-olive/loop-development-kit/ldk/go/examples/filesystem-listen-directory/loop"
	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/v2/ldk-test"
)

func TestController(t *testing.T) {
	markdownDoneChan := make(chan bool)

	sidekick := &ldktest.Sidekick{
		FilesystemService: &ldktest.FilesystemService{
			ListenDirf: func(ctx context.Context, dir string, cb ldk.ListenDirHandler) error {
				fi := ldk.NewFileInfo("foo.md", int(os.ModePerm), 1024, time.Date(2020, 10, 1, 2, 34, 0, 0, time.UTC), false)
				cb(ldk.FileEvent{Info: &fi, Action: ldk.FileActionCreate}, nil)
				return nil
			},
		},
		WhisperService: &ldktest.WhisperService{
			Markdownf: func(ctx context.Context, w *ldk.WhisperContentMarkdown) error {
				exp := "# New File Event\n```\nfoo.md\n1.0 kB\n-rwxrwxrwx\nOct  1 02:34:00\nfalse\nCreate\n```\n\n"
				if got := w.Markdown; !cmp.Equal(got, exp) {
					t.Errorf("unexpected markdown:\n%s\n", cmp.Diff(got, exp))
				}
				markdownDoneChan <- true
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
	<-markdownDoneChan
	if err := c.LoopStop(); err != nil {
		t.Fatal(err)
	}
}
