package ldk

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"os"

	"github.com/golang/protobuf/ptypes"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// FilesystemClient is used by the controller plugin to facilitate plugin initiated communication with the host
type FilesystemClient struct {
	client  proto.FilesystemClient
	session *Session
}

// Dir list the contents of a directory
func (f *FilesystemClient) Dir(ctx context.Context, dir string) ([]FileInfo, error) {
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

// ListenDir stream any updates to the contents of a directory
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

// File get information about a file
func (f *FilesystemClient) File(ctx context.Context, path string) (FileInfo, error) {
	resp, err := f.client.FilesystemFileInfo(ctx, &proto.FilesystemFileInfoRequest{
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

// ListenFile stream any updates to a file
func (f *FilesystemClient) ListenFile(ctx context.Context, path string, handler ListenFileHandler) error {
	client, err := f.client.FilesystemFileInfoStream(ctx, &proto.FilesystemFileInfoStreamRequest{
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

type gRPCReadWriter struct {
	err error
	rw  bytes.Buffer
}

func (g *gRPCReadWriter) Read(b []byte) (int, error) {
	fmt.Println("GRPC READ ATTEMPT 1 ================> ")
	if g.err != nil {
		fmt.Println("GRPC READ ATTEMPT 2 ================> ")
		return 0, g.err
	}
	fmt.Println("GRPC READ ATTEMPT 3 ================> ")
	n, err := g.rw.Read(b)
	fmt.Println("GRPC READ ATTEMPT 4 ================> ")
	return n, err

}

func (g *gRPCReadWriter) Write(b []byte, err error) (int, error) {
	if err != nil {
		g.err = err
	}
	return g.rw.Write(b)
}

func newGRPCReadWriter() *gRPCReadWriter {

	return &gRPCReadWriter{
		// rw: bufio.NewReadWriter(&reader, &writer),
	}
}

// ReadFile reads file
func (f *FilesystemClient) ReadFile(ctx context.Context, path string) (io.Reader, error) {
	logFile, err := os.Create("/Users/scottkipfer/olive/sidekick/log_file.txt")
	if err != nil {
		return nil, err
	}
	defer logFile.Close()

	_, err = logFile.Write([]byte(fmt.Sprintf("TOP OF FILE ================> \n")))
	if err != nil {
		return nil, err
	}

	fileReadStreamClient, err := f.client.FilesystemFileReadStream(ctx, &proto.FilesystemFileReadStreamRequest{
		Session: f.session.ToProto(),
		Path:    path,
	})
	if err != nil {
		return nil, err
	}

	rw := newGRPCReadWriter()

	logFile.Write([]byte(fmt.Sprintf("AAAAAAAAAAAAAAAAA ================> \n")))

	func() {
		// logFile.Write([]byte(fmt.Sprintf("READ START ================> \n")))
		for {

			select {
			case <-ctx.Done():
				// logFile.Write([]byte(fmt.Sprintf("CTX CLOSE ================> \n")))
				return
			case <-fileReadStreamClient.Context().Done():
				// logFile.Write([]byte(fmt.Sprintf("CLIENT CLOSE ================> \n")))
				return
			default:
				// logFile.Write([]byte(fmt.Sprintf("READ ATTEMPT ================> \n")))

				resp, err := fileReadStreamClient.Recv()
				if err != nil && err != io.EOF {
					// logFile.Write([]byte(fmt.Sprintf("READ ERROR ================> \n")))
					rw.Write(nil, err)
					return
				}
				if err == io.EOF {
					// logFile.Write([]byte(fmt.Sprintf("EOF ================> \n")))
					return
				}

				// logFile.Write([]byte(fmt.Sprintf("Before WRite ================> \n")))
				_, err = rw.Write(resp.Data, nil)
				if err != nil {
					// logFile.Write([]byte(fmt.Sprintf("WRITE Failed ================> \n")))
					// logFile.WriteString(spew.Sdump(err))
				}
				// logFile.Write([]byte(fmt.Sprintf("PAST WRite ================> \n")))

			}
		}
	}()
	logFile.Write([]byte(fmt.Sprintf("BBBBBBBBBBBBBBBB ================> \n")))

	return rw, nil

}

// MakeDir create new directory
func (f *FilesystemClient) MakeDir(ctx context.Context, path string, perm uint32) error {
	_, err := f.client.FilesystemMakeDir(ctx, &proto.FilesystemMakeDirRequest{
		Session: f.session.ToProto(),
		Path:    path,
		Perm:    perm,
	})
	if err != nil {
		return err
	}

	return nil
}

// Copy file or directory
func (f *FilesystemClient) Copy(ctx context.Context, source, dest string) error {
	_, err := f.client.FilesystemCopy(ctx, &proto.FilesystemCopyRequest{
		Session: f.session.ToProto(),
		Source:  source,
		Dest:    dest,
	})
	if err != nil {
		return err
	}

	return nil
}

// Move file or directory
func (f *FilesystemClient) Move(ctx context.Context, source, dest string) error {
	_, err := f.client.FilesystemMove(ctx, &proto.FilesystemMoveRequest{
		Session: f.session.ToProto(),
		Source:  source,
		Dest:    dest,
	})
	if err != nil {
		return err
	}

	return nil
}

// Remove file or directory
func (f *FilesystemClient) Remove(ctx context.Context, path string, recursive bool) error {
	_, err := f.client.FilesystemRemove(ctx, &proto.FilesystemRemoveRequest{
		Session:   f.session.ToProto(),
		Path:      path,
		Recursive: recursive,
	})
	if err != nil {
		return err
	}

	return nil
}

// Chmod change permissions of file
func (f *FilesystemClient) Chmod(ctx context.Context, path string, mode uint32) error {
	_, err := f.client.FilesystemChmod(ctx, &proto.FilesystemChmodRequest{
		Session: f.session.ToProto(),
		Path:    path,
		Mode:    mode,
	})
	if err != nil {
		return err
	}

	return nil
}

// Chown change owner of file
func (f *FilesystemClient) Chown(ctx context.Context, path string, uid, gid int32) error {
	_, err := f.client.FilesystemChown(ctx, &proto.FilesystemChownRequest{
		Session: f.session.ToProto(),
		Path:    path,
		Uid:     uid,
		Gid:     gid,
	})
	if err != nil {
		return err
	}

	return nil
}
