package ldk

import (
	"context"
	"os"
	"time"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

// FilesystemService is an interface that defines what methods plugins can expect from the host
type FilesystemService interface {
	Dir(context.Context, string) ([]os.FileInfo, error)
	ListenDir(context.Context, string, ListenDirHandler) error
	ListenFile(context.Context, string, ListenFileHandler) error
	Open(context.Context, string) (File, error)
	Create(context.Context, string) (File, error)
	MakeDir(context.Context, string, uint32) error
	Copy(context.Context, string, string) error
	Move(context.Context, string, string) error
	Remove(context.Context, string, bool) error
}

type FileInfo struct {
	name    string
	mode    int
	size    int
	updated time.Time
	isDir   bool
}

func (f *FileInfo) IsDir() bool {
	return f.isDir
}

func (f *FileInfo) Name() string {
	return f.name
}
func (f *FileInfo) Size() int64 {
	return int64(f.size)
}

func (f *FileInfo) Mode() os.FileMode {
	return os.FileMode(f.mode)
}

func (f *FileInfo) ModTime() time.Time {
	return f.updated
}

func (f *FileInfo) Sys() interface{} {
	return nil
}

func NewFileInfo(name string, mode, size int, updated time.Time, isDir bool) FileInfo {
	return FileInfo{
		name:    name,
		mode:    mode,
		size:    size,
		updated: updated,
		isDir:   isDir,
	}
}

type FileAction int

func (f FileAction) String() string {
	switch f {
	case FileActionUnknown:
		return "Unknown"
	case FileActionCreate:
		return "Create"
	case FileActionWrite:
		return "Write"
	case FileActionRemove:
		return "Remove"
	case FileActionRename:
		return "Rename"
	case FileActionChmod:
		return "Chmod"
	default:
		return "Unknown"
	}
}

const (
	FileActionUnknown FileAction = 0
	FileActionCreate  FileAction = 1
	FileActionWrite   FileAction = 2
	FileActionRemove  FileAction = 3
	FileActionRename  FileAction = 4
	FileActionChmod   FileAction = 5
)

func (f FileAction) toProto() proto.FileAction {
	switch f {
	case FileActionCreate:
		return proto.FileAction_FILE_ACTION_CREATE
	case FileActionWrite:
		return proto.FileAction_FILE_ACTION_WRITE
	case FileActionRemove:
		return proto.FileAction_FILE_ACTION_REMOVE
	case FileActionRename:
		return proto.FileAction_FILE_ACTION_RENAME
	case FileActionChmod:
		return proto.FileAction_FILE_ACTION_CHMOD
	case FileActionUnknown:
		return proto.FileAction_FILE_ACTION_UNKNOWN
	default:
		return proto.FileAction_FILE_ACTION_UNKNOWN
	}
}

type FileEvent struct {
	Info   os.FileInfo
	Action FileAction
}

type ListenDirHandler func(FileEvent, error)
type ListenFileHandler func(FileEvent, error)

func protoActionToAction(action proto.FileAction) FileAction {
	switch action {
	case proto.FileAction_FILE_ACTION_CREATE:
		return FileActionCreate
	case proto.FileAction_FILE_ACTION_WRITE:
		return FileActionWrite
	case proto.FileAction_FILE_ACTION_REMOVE:
		return FileActionRemove
	case proto.FileAction_FILE_ACTION_RENAME:
		return FileActionRename
	case proto.FileAction_FILE_ACTION_CHMOD:
		return FileActionChmod
	case proto.FileAction_FILE_ACTION_UNKNOWN:
		return FileActionUnknown
	default:
		return FileActionUnknown
	}
}
