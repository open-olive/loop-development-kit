package ldk

import (
	"context"

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
	uiConn         *grpc.ClientConn
}

type LoopSession struct {
	loopID string
	token  string
}

func (s LoopSession) toProto() *proto.Session {
	return &proto.Session{
		LoopID: s.loopID,
		Token:  s.token,
	}
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (m *LoopServer) LoopStart(ctx context.Context, req *proto.LoopStartRequest) (*emptypb.Empty, error) {
	var err error

	hosts := req.ServiceHosts
	session := LoopSession{
		loopID: req.Session.LoopID,
		token:  req.Session.Token,
	}

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

	m.uiConn, err = m.broker.Dial(hosts.HostUI)
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
		ui: &UIClient{
			client:  proto.NewUIClient(m.uiConn),
			session: session,
		},
	}

	return &emptypb.Empty{}, m.Impl.LoopStart(
		sidekickClient,
	)
}

// LoopStop is called by the host when the plugin is stopped
func (m *LoopServer) LoopStop(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {

	// close service connections
	if err := m.clipboardConn.Close(); err != nil {
		return &emptypb.Empty{}, err
	}

	if err := m.storageConn.Close(); err != nil {
		return &emptypb.Empty{}, err
	}

	if err := m.whisperConn.Close(); err != nil {
		return &emptypb.Empty{}, err
	}

	if err := m.keyboardConn.Close(); err != nil {
		return &emptypb.Empty{}, err
	}

	if err := m.processConn.Close(); err != nil {
		return &emptypb.Empty{}, err
	}

	if err := m.cursorConn.Close(); err != nil {
		return &emptypb.Empty{}, err
	}

	if err := m.filesystemConn.Close(); err != nil {
		return &emptypb.Empty{}, err
	}

	if err := m.uiConn.Close(); err != nil {
		return &emptypb.Empty{}, err
	}

	err := m.Impl.LoopStop()
	return &emptypb.Empty{}, err
}
