package ldktest

import (
	"bytes"
	"io"
	"os"
	"time"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

func CreateMockFile(rBytes []byte) MockFile {
	mock := MockFile{}
	fi := ldk.NewFileInfo(
		"test.file",
		42,
		1024,
		time.Date(2020, 10, 1, 2, 34, 0, 0, time.UTC),
		false,
	)
	mock.ReadBuf.Write(rBytes)
	mock.FileInfo = &fi
	return mock
}

type MockFile struct {
	ReadBuf  bytes.Buffer
	WriteBuf bytes.Buffer
	FileInfo os.FileInfo
}

func (m *MockFile) Read(b []byte) (int, error) {
	return 0, io.EOF
}

func (m *MockFile) Write(b []byte) (int, error) {
	return 0, nil
}

func (m *MockFile) Close() error {
	return nil
}

func (m *MockFile) Chown(uid, gid int) error {
	return nil
}

func (m *MockFile) Chmod(mode os.FileMode) error {
	return nil
}

func (m *MockFile) Stat() (os.FileInfo, error) {
	return m.FileInfo, nil
}

func (m *MockFile) Sync() error {
	return nil
}
