package ldk

import (
	"context"
	"time"

	"github.com/hashicorp/go-plugin"
	"github.com/open-olive/loop-development-kit-go/proto"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
)

const grpcTimeout = 5 * time.Second

// LoopClient is used by the controller plugin host to facilitate host initiated communication with controller plugins
type LoopClient struct {
	broker *plugin.GRPCBroker
	client proto.LoopClient
	s      *grpc.Server
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (m *LoopClient) LoopStart(host Sidekick) error {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	// setup whisper server
	whisperHostServer := &WhisperServer{
		Impl: host.Whisper(),
	}

	whisperServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterWhisperServer(m.s, whisperHostServer)
		return m.s
	}

	whisperBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(whisperBrokerID, whisperServerFunc)

	// setup storage server
	storageHostServer := &StorageServer{
		Impl: host.Storage(),
	}

	storageServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterStorageServer(m.s, storageHostServer)
		return m.s
	}

	storageBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(storageBrokerID, storageServerFunc)

	// setup clipboard server
	clipboardHostServer := &ClipboardServer{
		Impl: host.Clipboard(),
	}

	clipboardServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterClipboardServer(m.s, clipboardHostServer)
		return m.s
	}

	clipboardBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(clipboardBrokerID, clipboardServerFunc)

	//setup keyboard server
	keyboardHostServer := &KeyboardServer{
		Impl: host.Keyboard(),
	}

	keyboardServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterKeyboardServer(m.s, keyboardHostServer)
		return m.s
	}

	keyboardBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(keyboardBrokerID, keyboardServerFunc)

	processHostServer := &ProcessServer{
		Impl: host.Process(),
	}

	processServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterProcessServer(m.s, processHostServer)
		return m.s
	}

	processBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(processBrokerID, processServerFunc)

	cursorHostServer := &CursorServer{
		Impl: host.Cursor(),
	}

	cursorServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterCursorServer(m.s, cursorHostServer)
		return m.s
	}

	cursorBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(cursorBrokerID, cursorServerFunc)

	filesystemHostServer := &FilesystemServer{
		Impl: host.Filesystem(),
	}

	filesystemServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterFilesystemServer(m.s, filesystemHostServer)
		return m.s
	}

	filesystemBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(filesystemBrokerID, filesystemServerFunc)

	_, err := m.client.LoopStart(ctx, &proto.LoopStartRequest{
		HostStorage:    storageBrokerID,
		HostWhisper:    whisperBrokerID,
		HostClipboard:  clipboardBrokerID,
		HostKeyboard:   keyboardBrokerID,
		HostProcess:    processBrokerID,
		HostCursor:     cursorBrokerID,
		HostFilesystem: filesystemBrokerID,
	})

	return err
}

// LoopStop is called by the host when the plugin is stopped
func (m *LoopClient) LoopStop() error {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	m.s.Stop()

	_, err := m.client.LoopStop(ctx, &emptypb.Empty{})
	return err
}
