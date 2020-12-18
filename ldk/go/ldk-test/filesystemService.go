package ldktest

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

type FilesystemService struct {
	Dirf        func(context.Context, string) ([]ldk.FileInfo, error)
	ListenDirf  func(context.Context, string, ldk.ListenDirHandler) error
	ListenFilef func(context.Context, string, ldk.ListenFileHandler) error
	Openf       func(context.Context, string) (ldk.File, error)
	Createf     func(context.Context, string) (ldk.File, error)
	MakeDirf    func(context.Context, string, uint32) error
	Copyf       func(context.Context, string, string) error
	Movef       func(context.Context, string, string) error
	Removef     func(context.Context, string, bool) error
}

func (f *FilesystemService) Dir(ctx context.Context, dir string) ([]ldk.FileInfo, error) {
	return f.Dirf(ctx, dir)
}

func (f *FilesystemService) ListenDir(ctx context.Context, dir string, handler ldk.ListenDirHandler) error {
	return f.ListenDirf(ctx, dir, handler)
}

func (f *FilesystemService) ListenFile(ctx context.Context, file string, handler ldk.ListenFileHandler) error {
	return f.ListenFilef(ctx, file, handler)
}

func (f *FilesystemService) Open(ctx context.Context, name string) (ldk.File, error) {
	return f.Openf(ctx, name)
}

func (f *FilesystemService) Create(ctx context.Context, name string) (ldk.File, error) {
	return f.Createf(ctx, name)
}

func (f *FilesystemService) MakeDir(ctx context.Context, name string, mode uint32) error {
	return f.MakeDirf(ctx, name, mode)
}

func (f *FilesystemService) Copy(ctx context.Context, source, dest string) error {
	return f.Copyf(ctx, source, dest)
}

func (f *FilesystemService) Move(ctx context.Context, source, dest string) error {
	return f.Movef(ctx, source, dest)
}

func (f *FilesystemService) Remove(ctx context.Context, path string, recursive bool) error {
	return f.Removef(ctx, path, recursive)
}
