package ldk

import (
	"context"
	"errors"
	"io"

	"github.com/golang/protobuf/ptypes"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// FilesystemClient is used by the controller plugin to facilitate plugin initiated communication with the host
type FilesystemClient struct {
	client  proto.FilesystemClient
	session *Session
}

// list the contents of a directory
func (f *FilesystemClient) Dir(dir string) ([]FileInfo, error) {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	resp, err := f.client.FilesystemDir(ctx, &proto.FilesystemDirRequest{
		Directory: dir,
		Session:   f.session.ToProto(),
	})
	if err != nil {
		return nil, err
	}

	files := resp.GetFiles()

	lfiles := make([]FileInfo, 0, len(files))
	for _, f := range files {
		t, err := ptypes.Timestamp(f.Updated)
		if err != nil {
			return nil, err
		}
		file := FileInfo{
			Name:    f.GetName(),
			Size:    int(f.GetSize()),
			Mode:    int(f.GetMode()),
			Updated: t,
			IsDir:   f.GetIsDir(),
		}
		lfiles = append(lfiles, file)

	}

	return lfiles, nil
}

// stream any updates to the contents of a directory
func (f *FilesystemClient) ListenDir(ctx context.Context, dir string, handler ListenDirHandler) error {
	client, err := f.client.FilesystemDirStream(ctx, &proto.FilesystemDirStreamRequest{
		Directory: dir,
		Session:   f.session.ToProto(),
	})
	if err != nil {
		return err
	}

	go func() {
		for {
			resp, err := client.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				handler(FileEvent{}, err)
				return
			}

			if resp.GetError() != "" {
				err = errors.New(resp.GetError())
				handler(FileEvent{}, err)
				continue
			}

			file := resp.GetFile()
			t, err := ptypes.Timestamp(file.Updated)
			if err != nil {
				handler(FileEvent{}, err)
				continue
			}

			fi := FileInfo{
				Name:    file.GetName(),
				Size:    int(file.GetSize()),
				Mode:    int(file.GetMode()),
				Updated: t,
				IsDir:   file.GetIsDir(),
			}
			handler(FileEvent{Info: fi, Action: protoActionToAction(resp.GetAction())}, err)
		}
	}()

	return nil
}

// get information about a file
func (f *FilesystemClient) File(path string) (FileInfo, error) {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	resp, err := f.client.FilesystemFile(ctx, &proto.FilesystemFileRequest{
		Path:    path,
		Session: f.session.ToProto(),
	})
	if err != nil {
		return FileInfo{}, err
	}

	file := resp.GetFile()

	t, err := ptypes.Timestamp(file.Updated)
	if err != nil {
		return FileInfo{}, err
	}
	fi := FileInfo{
		Name:    file.GetName(),
		Size:    int(file.GetSize()),
		Mode:    int(file.GetMode()),
		Updated: t,
		IsDir:   file.GetIsDir(),
	}

	return fi, nil
}

// stream any updates to a file
func (f *FilesystemClient) ListenFile(ctx context.Context, path string, handler ListenFileHandler) error {
	client, err := f.client.FilesystemFileStream(ctx, &proto.FilesystemFileStreamRequest{
		Path:    path,
		Session: f.session.ToProto(),
	})
	if err != nil {
		return err
	}

	go func() {
		for {
			resp, err := client.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				handler(FileEvent{}, err)
				return
			}

			if resp.GetError() != "" {
				err = errors.New(resp.GetError())
				handler(FileEvent{}, err)
				continue
			}

			file := resp.GetFile()
			t, err := ptypes.Timestamp(file.Updated)
			if err != nil {
				handler(FileEvent{}, err)
				continue
			}

			fi := FileInfo{
				Name:    file.GetName(),
				Size:    int(file.GetSize()),
				Mode:    int(file.GetMode()),
				Updated: t,
				IsDir:   file.GetIsDir(),
			}
			handler(FileEvent{Info: fi, Action: protoActionToAction(resp.GetAction())}, err)
		}
	}()

	return nil
}
