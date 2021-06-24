package loop_test

import (
	"context"
	"testing"

	"github.com/open-olive/loop-development-kit/ldk/go/examples/filesystem-file/loop"
	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/v2/ldk-test"
)

func TestController(t *testing.T) {
	sidekick := &ldktest.Sidekick{
		FilesystemService: &ldktest.FilesystemService{
			Openf: func(ctx context.Context, dir string) (ldk.File, error) {
				readBytes := []byte("Hello World")
				mockFile := ldktest.CreateMockFile(readBytes)
				return &mockFile, nil
			},
			Createf: func(ctx context.Context, dir string) (ldk.File, error) {
				readBytes := []byte("Hello World")
				mockFile := ldktest.CreateMockFile(readBytes)
				return &mockFile, nil
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
