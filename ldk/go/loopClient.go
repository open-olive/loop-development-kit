package ldk

import (
	"context"
	"time"

	"github.com/hashicorp/go-multierror"

	"github.com/hashicorp/go-plugin"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
)

const grpcTimeout = 5 * time.Second

// LoopClient is used by the controller plugin host to facilitate host initiated communication with controller plugins
type LoopClient struct {
	Authority Authority
	LoopID    string
	broker    *plugin.GRPCBroker
	client    proto.LoopClient
	s         *grpc.Server
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (m *LoopClient) LoopStart(host Sidekick) error {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	// create session
	session, err := m.Authority.NewSession(m.LoopID)
	if err != nil {
		return err
	}

	// setup whisper server
	whisperHostServer := &WhisperServer{
		Authority: m.Authority,
		Impl:      host.Whisper(),
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
		Authority: m.Authority,
		Impl:      host.Storage(),
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
		Authority: m.Authority,
		Impl:      host.Clipboard(),
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
		Authority: m.Authority,
		Impl:      host.Keyboard(),
	}

	keyboardServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterKeyboardServer(m.s, keyboardHostServer)
		return m.s
	}

	keyboardBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(keyboardBrokerID, keyboardServerFunc)

	processHostServer := &ProcessServer{
		Authority: m.Authority,
		Impl:      host.Process(),
	}

	processServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterProcessServer(m.s, processHostServer)
		return m.s
	}

	processBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(processBrokerID, processServerFunc)

	cursorHostServer := &CursorServer{
		Authority: m.Authority,
		Impl:      host.Cursor(),
	}

	cursorServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterCursorServer(m.s, cursorHostServer)
		return m.s
	}

	cursorBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(cursorBrokerID, cursorServerFunc)

	filesystemHostServer := &FilesystemServer{
		Authority: m.Authority,
		Impl:      host.Filesystem(),
	}

	filesystemServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterFilesystemServer(m.s, filesystemHostServer)
		return m.s
	}

	filesystemBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(filesystemBrokerID, filesystemServerFunc)

	windowHostServer := &WindowServer{
		Authority: m.Authority,
		Impl:      host.Window(),
	}

	windowServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterWindowServer(m.s, windowHostServer)
		return m.s
	}

	windowBrokerID := m.broker.NextId()
	go m.broker.AcceptAndServe(windowBrokerID, windowServerFunc)

	_, err = m.client.LoopStart(ctx, &proto.LoopStartRequest{
		ServiceHosts: &proto.ServiceHosts{
			HostStorage:    storageBrokerID,
			HostWhisper:    whisperBrokerID,
			HostClipboard:  clipboardBrokerID,
			HostKeyboard:   keyboardBrokerID,
			HostProcess:    processBrokerID,
			HostCursor:     cursorBrokerID,
			HostFilesystem: filesystemBrokerID,
			HostWindow:     windowBrokerID,
		},
		Session: session.ToProto(),
	})

	return err
}

// LoopStop is called by the host when the plugin is stopped
func (m *LoopClient) LoopStop() error {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	var multiErr error

	_, err := m.client.LoopStop(ctx, &emptypb.Empty{})
	if err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	m.s.Stop()

	err = m.Authority.CancelSession(m.LoopID)
	if err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	return multiErr
}
