package ldk

import "os"

// File this is a file
type File interface {
	Read([]byte) (int, error)
	Write([]byte) (int, error)
	Close() error
	Chmod(os.FileMode) error
	Chown(int, int) error
	Stat() (os.FileInfo, error)
	Sync() error
}
