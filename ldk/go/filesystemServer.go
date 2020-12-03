package ldk

import (
	"context"
	"fmt"

	"github.com/golang/protobuf/ptypes"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// FilesystemServer is used by the controller plugin host to receive plugin initiated communication
type FilesystemServer struct {
	Impl FilesystemService
}

// FilesystemDir list the contents of a directory
func (f *FilesystemServer) FilesystemDir(ctx context.Context, req *proto.FilesystemDirRequest) (*proto.FilesystemDirResponse, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	files, err := f.Impl.Dir(
		context.WithValue(ctx, Session{}, session),
		req.GetDirectory(),
	)
	if err != nil {
		return nil, err
	}

	pbFiles := make([]*proto.FileInfo, 0, len(files))
	for _, f := range files {
		ptime, err := ptypes.TimestampProto(f.Updated)
		if err != nil {
			return nil, err
		}
		file := &proto.FileInfo{
			Name:    f.Name,
			Size:    int64(f.Size),
			Mode:    uint32(f.Mode),
			Updated: ptime,
			IsDir:   f.IsDir,
		}
		pbFiles = append(pbFiles, file)
	}

	return &proto.FilesystemDirResponse{
		Files: pbFiles,
	}, nil
}

// FilesystemDirStream stream any updates to the contents of a directory
func (f *FilesystemServer) FilesystemDirStream(req *proto.FilesystemDirStreamRequest, stream proto.Filesystem_FilesystemDirStreamServer) error {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return err
	}

	handler := func(fe FileEvent, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}
		t, err := ptypes.TimestampProto(fe.Info.Updated)
		// TODO: this should never happen...  not sure what to really do with the error
		if err != nil {
			fmt.Printf("error: ldk.FilesystemServer.FilesystemDirStream -> invalid proto time: %v - %v", fe.Info.Updated, err)
		}
		if e := stream.Send(&proto.FilesystemDirStreamResponse{
			Error: errText,
			File: &proto.FileInfo{
				Name:    fe.Info.Name,
				Size:    int64(fe.Info.Size),
				Mode:    uint32(fe.Info.Mode),
				Updated: t,
			},
			Action: fe.Action.toProto(),
		}); e != nil {
			// This should only happen if the context was cancelled for some reason and the stream shuts down.
			fmt.Println("error: ldk.FilesystemServer.FilesystemDirStream -> stream.Send:", e)
		}
	}

	go func() {
		err := f.Impl.ListenDir(
			context.WithValue(stream.Context(), Session{}, session),
			req.GetDirectory(),
			handler,
		)
		// TODO: move this to a real logger once we move this into sidekick
		if err != nil {
			fmt.Println("error: ldk.FilesystemServer.FilesystemDirStream -> Listen:", err)
		}
	}()

	// don't exit this method until context is cancelled
	// if you do, the handler called above that tries to call `Send` will fail as the context will be cancelled due to leaving method scope
	<-stream.Context().Done()
	return nil
}

// FilesystemFileInfo gets information about a file
func (f *FilesystemServer) FilesystemFileInfo(ctx context.Context, req *proto.FilesystemFileInfoRequest) (*proto.FilesystemFileInfoResponse, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	file, err := f.Impl.File(
		context.WithValue(ctx, Session{}, session),
		req.GetPath(),
	)
	if err != nil {
		return nil, err
	}

	ptime, err := ptypes.TimestampProto(file.Updated)
	if err != nil {
		return nil, err
	}
	fi := &proto.FileInfo{
		Name:    file.Name,
		Size:    int64(file.Size),
		Mode:    uint32(file.Mode),
		Updated: ptime,
		IsDir:   file.IsDir,
	}

	return &proto.FilesystemFileInfoResponse{
		File: fi,
	}, nil

}

// FilesystemFileInfoStream stream any updates to a file
func (f *FilesystemServer) FilesystemFileInfoStream(req *proto.FilesystemFileInfoStreamRequest, stream proto.Filesystem_FilesystemFileInfoStreamServer) error {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return err
	}

	handler := func(fe FileEvent, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}
		t, err := ptypes.TimestampProto(fe.Info.Updated)
		// TODO: this should never happen...  not sure what to really do with the error
		if err != nil {
			fmt.Printf("error: ldk.FilesystemServer.FilesystemDirStream -> invalid proto time: %v - %v", fe.Info.Updated, err)
		}
		if e := stream.Send(&proto.FilesystemFileInfoStreamResponse{
			Error: errText,
			File: &proto.FileInfo{
				Name:    fe.Info.Name,
				Size:    int64(fe.Info.Size),
				Mode:    uint32(fe.Info.Mode),
				Updated: t,
			},
			Action: fe.Action.toProto(),
		}); e != nil {
			// This should only happen if the context was cancelled for some reason and the stream shuts down.
			fmt.Println("error: ldk.FilesystemServer.FilesystemDirStream -> stream.Send:", e)
		}
	}

	go func() {
		err := f.Impl.ListenFile(
			context.WithValue(stream.Context(), Session{}, session),
			req.GetPath(),
			handler,
		)
		// TODO: move this to a real logger once we move this into sidekick
		if err != nil {
			fmt.Println("error: ldk.FilesystemServer.FilesystemFileStream -> Listen:", err)
		}
	}()

	// don't exit this method until context is cancelled
	// if you do, the handler called above that tries to call `Send` will fail as the context will be cancelled due to leaving method scope
	<-stream.Context().Done()
	return nil
}

// FilesystemFileReadStream - TODO

// FilesystemFileWriteStream - TODO

// FilesystemMakeDir creates new directory
func (f *FilesystemServer) FilesystemMakeDir(ctx context.Context, req *proto.FilesystemMakeDirRequest) (*emptypb.Empty, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	err = f.Impl.MakeDir(
		context.WithValue(ctx, Session{}, session),
		req.GetPath(),
		req.GetPerm(),
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

// FilesystemCopy copies a file or directory to a new directory
func (f *FilesystemServer) FilesystemCopy(ctx context.Context, req *proto.FilesystemCopyRequest) (*emptypb.Empty, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	err = f.Impl.Copy(
		context.WithValue(ctx, Session{}, session),
		req.GetSource(),
		req.GetDest(),
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

// FilesystemMove moves a file or directory to a new directory
func (f *FilesystemServer) FilesystemMove(ctx context.Context, req *proto.FilesystemMoveRequest) (*emptypb.Empty, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	err = f.Impl.Move(
		context.WithValue(ctx, Session{}, session),
		req.GetSource(),
		req.GetDest(),
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

// FilesystemRemove removes a file or directory to a new directory
func (f *FilesystemServer) FilesystemRemove(ctx context.Context, req *proto.FilesystemRemoveRequest) (*emptypb.Empty, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	err = f.Impl.Remove(
		context.WithValue(ctx, Session{}, session),
		req.GetPath(),
		req.GetRecursive(),
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

// FilesystemChmod changes file permissions
func (f *FilesystemServer) FilesystemChmod(ctx context.Context, req *proto.FilesystemChmodRequest) (*emptypb.Empty, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	err = f.Impl.Chmod(
		context.WithValue(ctx, Session{}, session),
		req.GetPath(),
		req.GetMode(),
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

// FilesystemChown changes file owner
func (f *FilesystemServer) FilesystemChown(ctx context.Context, req *proto.FilesystemChownRequest) (*emptypb.Empty, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	err = f.Impl.Chown(
		context.WithValue(ctx, Session{}, session),
		req.GetPath(),
		req.GetUid(),
		req.GetGid(),
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}
