package ldk

import (
	"context"
	"fmt"

	"github.com/golang/protobuf/ptypes"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// FilesystemServer is used by the controller plugin host to receive plugin initiated communication
type FilesystemServer struct {
	Impl FilesystemService
}

// list the contents of a directory
func (f *FilesystemServer) FilesystemDir(ctx context.Context, req *proto.FilesystemDirRequest) (*proto.FilesystemDirResponse, error) {
	files, err := f.Impl.Dir(req.GetDirectory())
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

// stream any updates to the contents of a directory
func (f *FilesystemServer) FilesystemDirStream(req *proto.FilesystemDirStreamRequest, stream proto.Filesystem_FilesystemDirStreamServer) error {
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
		err := f.Impl.ListenDir(stream.Context(), req.GetDirectory(), handler)
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

// get information about a file
func (f *FilesystemServer) FilesystemFile(ctx context.Context, req *proto.FilesystemFileRequest) (*proto.FilesystemFileResponse, error) {
	file, err := f.Impl.File(req.GetPath())
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

	return &proto.FilesystemFileResponse{
		File: fi,
	}, nil

}

// stream any updates to a file
func (f *FilesystemServer) FilesystemFileStream(req *proto.FilesystemFileStreamRequest, stream proto.Filesystem_FilesystemFileStreamServer) error {
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
		if e := stream.Send(&proto.FilesystemFileStreamResponse{
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
		err := f.Impl.ListenFile(stream.Context(), req.GetPath(), handler)
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
