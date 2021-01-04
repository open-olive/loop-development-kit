package ldk

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/golang/protobuf/ptypes"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// FilesystemServer is used by the controller plugin host to receive plugin initiated communication
type FilesystemServer struct {
	Impl FilesystemService
}

// ErrNoFile File is not initiated
var ErrNoFile = errors.New("a file has not been opened or created")

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
		ptime, err := ptypes.TimestampProto(f.ModTime())
		if err != nil {
			return nil, err
		}
		file := &proto.FileInfo{
			Name:    f.Name(),
			Size:    f.Size(),
			Mode:    uint32(f.Mode()),
			Updated: ptime,
			IsDir:   f.IsDir(),
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
		t, err := ptypes.TimestampProto(fe.Info.ModTime())
		// TODO: this should never happen...  not sure what to really do with the error
		if err != nil {
			fmt.Printf("error: ldk.FilesystemServer.FilesystemDirStream -> invalid proto time: %v - %v", fe.Info.ModTime(), err)
		}
		if e := stream.Send(&proto.FilesystemDirStreamResponse{
			Error: errText,
			File: &proto.FileInfo{
				Name:    fe.Info.Name(),
				Size:    fe.Info.Size(),
				Mode:    uint32(fe.Info.Mode()),
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
		t, err := ptypes.TimestampProto(fe.Info.ModTime())
		// TODO: this should never happen...  not sure what to really do with the error
		if err != nil {
			fmt.Printf("error: ldk.FilesystemServer.FilesystemDirStream -> invalid proto time: %v - %v", fe.Info.ModTime(), err)
		}
		if e := stream.Send(&proto.FilesystemFileInfoStreamResponse{
			Error: errText,
			File: &proto.FileInfo{
				Name:    fe.Info.Name(),
				Size:    fe.Info.Size(),
				Mode:    uint32(fe.Info.Mode()),
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

// FilesystemFileStream write data to a file
func (f *FilesystemServer) FilesystemFileStream(stream proto.Filesystem_FilesystemFileStreamServer) error {
	var file File
	defer func() {
		if file != nil {
			file.Close()
		}
	}()

	for {
		select {
		case <-stream.Context().Done():
			return nil
		default:
			request, err := stream.Recv()
			if err != nil {
				return err
			}

			switch req := request.RequestOneOf.(type) {
			case *proto.FilesystemFileStreamRequest_Open_:
				session, err := NewSessionFromProto(req.Open.Session)
				if err != nil {
					return err
				}

				file, err = f.Impl.Open(
					context.WithValue(stream.Context(), Session{}, session),
					req.Open.GetPath(),
				)

				if err != nil {
					return err
				}

			case *proto.FilesystemFileStreamRequest_Create_:
				session, err := NewSessionFromProto(req.Create.Session)
				if err != nil {
					return err
				}

				file, err = f.Impl.Create(
					context.WithValue(stream.Context(), Session{}, session),
					req.Create.GetPath(),
				)

				if err != nil {
					return err
				}

			case *proto.FilesystemFileStreamRequest_Read_:
				if file == nil {
					return ErrNoFile
				}
				buf := make([]byte, 512)
				var errorResponse string
				n, err := file.Read(buf)
				if err != nil {
					errorResponse = err.Error()
				}
				err = stream.Send(&proto.FilesystemFileStreamResponse{
					ResponseOneOf: &proto.FilesystemFileStreamResponse_Read_{
						Read: &proto.FilesystemFileStreamResponse_Read{
							Data:  buf[0:n],
							Error: errorResponse,
						},
					},
				})
				if err != nil {
					return err
				}

			case *proto.FilesystemFileStreamRequest_Write_:
				if file == nil {
					return ErrNoFile
				}
				var errorResponse string
				n, err := file.Write(req.Write.Data)
				if err != nil {
					errorResponse = err.Error()
				}
				err = stream.Send(&proto.FilesystemFileStreamResponse{
					ResponseOneOf: &proto.FilesystemFileStreamResponse_Write_{
						Write: &proto.FilesystemFileStreamResponse_Write{
							NumOfBytes: int32(n),
							Error:      errorResponse,
						},
					},
				})
				if err != nil {
					return err
				}

			case *proto.FilesystemFileStreamRequest_Chmod_:
				if file == nil {
					return ErrNoFile
				}
				var errorResponse string
				err := file.Chmod(os.FileMode(req.Chmod.Mode))
				if err != nil {
					errorResponse = err.Error()
				}
				err = stream.Send(&proto.FilesystemFileStreamResponse{
					ResponseOneOf: &proto.FilesystemFileStreamResponse_Chmod_{
						Chmod: &proto.FilesystemFileStreamResponse_Chmod{
							Error: errorResponse,
						},
					},
				})
				if err != nil {
					return err
				}

			case *proto.FilesystemFileStreamRequest_Chown_:
				if file == nil {
					return ErrNoFile
				}
				var errorResponse string
				err := file.Chown(int(req.Chown.Uid), int(req.Chown.Gid))
				if err != nil {
					errorResponse = err.Error()
				}
				err = stream.Send(&proto.FilesystemFileStreamResponse{
					ResponseOneOf: &proto.FilesystemFileStreamResponse_Chown_{
						Chown: &proto.FilesystemFileStreamResponse_Chown{
							Error: errorResponse,
						},
					},
				})
				if err != nil {
					return err
				}

			case *proto.FilesystemFileStreamRequest_Stat_:
				if file == nil {
					return ErrNoFile
				}
				var errorResponse string
				info, err := file.Stat()
				if err != nil {
					errorResponse = err.Error()
				}
				t, err := ptypes.TimestampProto(info.ModTime())
				if err != nil {
					errorResponse = err.Error()
				}
				err = stream.Send(&proto.FilesystemFileStreamResponse{
					ResponseOneOf: &proto.FilesystemFileStreamResponse_Stat_{
						Stat: &proto.FilesystemFileStreamResponse_Stat{
							Info: &proto.FileInfo{
								Name:    info.Name(),
								Size:    info.Size(),
								Mode:    uint32(info.Mode()),
								Updated: t,
								IsDir:   info.IsDir(),
							},
							Error: errorResponse,
						},
					},
				})
				if err != nil {
					return err
				}

			case *proto.FilesystemFileStreamRequest_Close_:
				// Closing the file is handled by the defer statement
				// at the beginning of the function
				return nil

			}
		}

	}
}

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
