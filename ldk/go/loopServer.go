package ldk

import (
	"context"

	"github.com/hashicorp/go-multierror"

	"github.com/hashicorp/go-plugin"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
)

// LoopServer is used by the controller plugin to receive host initiated communication
type LoopServer struct {
	Impl Loop

	broker *plugin.GRPCBroker

	clipboardConn  *grpc.ClientConn
	storageConn    *grpc.ClientConn
	whisperConn    *grpc.ClientConn
	keyboardConn   *grpc.ClientConn
	processConn    *grpc.ClientConn
	cursorConn     *grpc.ClientConn
	filesystemConn *grpc.ClientConn
	networkConn    *grpc.ClientConn
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (m *LoopServer) LoopStart(_ context.Context, req *proto.LoopStartRequest) (*emptypb.Empty, error) {
	var err error

	hosts := req.ServiceHosts
	session := NewSessionFromProto(req.Session)

	m.storageConn, err = m.broker.Dial(hosts.HostStorage)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.whisperConn, err = m.broker.Dial(hosts.HostWhisper)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.clipboardConn, err = m.broker.Dial(hosts.HostClipboard)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.keyboardConn, err = m.broker.Dial(hosts.HostKeyboard)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.processConn, err = m.broker.Dial(hosts.HostProcess)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.cursorConn, err = m.broker.Dial(hosts.HostCursor)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.filesystemConn, err = m.broker.Dial(hosts.HostFilesystem)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.networkConn, err = m.broker.Dial(hosts.HostNetwork)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	sidekickClient := &SidekickClient{
		storage: &StorageClient{
			client:  proto.NewStorageClient(m.storageConn),
			session: session,
		},
		whisper: &WhisperClient{
			client:  proto.NewWhisperClient(m.whisperConn),
			session: session,
		},
		clipboard: &ClipboardClient{
			client:  proto.NewClipboardClient(m.clipboardConn),
			session: session,
		},
		keyboard: &KeyboardClient{
			client:  proto.NewKeyboardClient(m.keyboardConn),
			session: session,
		},
		process: &ProcessClient{
			client:  proto.NewProcessClient(m.processConn),
			session: session,
		},
		cursor: &CursorClient{
			client:  proto.NewCursorClient(m.cursorConn),
			session: session,
		},
		filesystem: &FilesystemClient{
			client:  proto.NewFilesystemClient(m.filesystemConn),
			session: session,
		},
		network: &NetworkClient{
			client:  proto.NewNetworkClient(m.networkConn),
			session: session,
		},
	}

	return &emptypb.Empty{}, m.Impl.LoopStart(
		sidekickClient,
	)
}

// LoopStop is called by the host when the plugin is stopped
func (m *LoopServer) LoopStop(_ context.Context, _ *emptypb.Empty) (*emptypb.Empty, error) {
	var multiErr error

	// stop loop
	if err := m.Impl.LoopStop(); err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	// close service connections
	if err := m.clipboardConn.Close(); err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	if err := m.storageConn.Close(); err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	if err := m.whisperConn.Close(); err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	if err := m.keyboardConn.Close(); err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	if err := m.processConn.Close(); err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	if err := m.cursorConn.Close(); err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	if err := m.filesystemConn.Close(); err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	return &emptypb.Empty{}, multiErr
}
