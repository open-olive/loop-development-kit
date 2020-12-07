package ldk

import (
	"context"
	"io"
	"time"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// FilesystemService is an interface that defines what methods plugins can expect from the host
type FilesystemService interface {
	Dir(context.Context, string) ([]FileInfo, error)
	ListenDir(context.Context, string, ListenDirHandler) error
	File(context.Context, string) (FileInfo, error)
	ListenFile(context.Context, string, ListenFileHandler) error

	ReadFile(context.Context, string) (io.Reader, error)
	MakeDir(context.Context, string, uint32) error
	Copy(context.Context, string, string) error
	Move(context.Context, string, string) error
	Remove(context.Context, string, bool) error
	Chmod(context.Context, string, uint32) error
	Chown(context.Context, string, int32, int32) error
}

type FileInfo struct {
	Name    string
	Mode    int
	Size    int
	Updated time.Time
	IsDir   bool
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
	Info   FileInfo
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
