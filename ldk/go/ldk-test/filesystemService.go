package ldktest

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

type FilesystemService struct {
	Dirf        func(context.Context, string) ([]ldk.FileInfo, error)
	ListenDirf  func(context.Context, string, ldk.ListenDirHandler) error
	Filef       func(context.Context, string) (ldk.FileInfo, error)
	ListenFilef func(context.Context, string, ldk.ListenFileHandler) error
}

func (f *FilesystemService) Dir(ctx context.Context, dir string) ([]ldk.FileInfo, error) {
	return f.Dirf(ctx, dir)
}

func (f *FilesystemService) ListenDir(ctx context.Context, dir string, handler ldk.ListenDirHandler) error {
	return f.ListenDirf(ctx, dir, handler)
}

func (f *FilesystemService) File(ctx context.Context, name string) (ldk.FileInfo, error) {
	return f.Filef(ctx, name)
}

func (f *FilesystemService) ListenFile(ctx context.Context, file string, handler ldk.ListenFileHandler) error {
	return f.ListenFilef(ctx, file, handler)
}
