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
	filesystemConn *grpc.ClientConn
	windowConn     *grpc.ClientConn
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (m *LoopServer) LoopStart(ctx context.Context, req *proto.LoopStartRequest) (*emptypb.Empty, error) {
	var err error
	m.storageConn, err = m.broker.Dial(req.HostStorage)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.whisperConn, err = m.broker.Dial(req.HostWhisper)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.clipboardConn, err = m.broker.Dial(req.HostClipboard)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.keyboardConn, err = m.broker.Dial(req.HostKeyboard)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.processConn, err = m.broker.Dial(req.HostProcess)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.filesystemConn, err = m.broker.Dial(req.HostFilesystem)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	m.windowConn, err = m.broker.Dial(req.HostWindow)
	if err != nil {
		return &emptypb.Empty{}, err
	}

	sidekickClient := &SidekickClient{
		storage: &StorageClient{
			proto.NewStorageClient(m.storageConn),
		},
		whisper: &WhisperClient{
			proto.NewWhisperClient(m.whisperConn),
		},
		clipboard: &ClipboardClient{
			proto.NewClipboardClient(m.clipboardConn),
		},
		keyboard: &KeyboardClient{
			proto.NewKeyboardClient(m.keyboardConn),
		},
		process: &ProcessClient{
			proto.NewProcessClient(m.processConn),
		},
		filesystem: &FilesystemClient{
			proto.NewFilesystemClient(m.filesystemConn),
		},
		window: &WindowClient{
			proto.NewWindowClient(m.windowConn),
		},
	}

	return &emptypb.Empty{}, m.Impl.LoopStart(
		sidekickClient,
	)
}

// LoopStop is called by the host when the plugin is stopped
func (m *LoopServer) LoopStop(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
	var err error

	err = m.clipboardConn.Close()
	if err != nil {
		return &emptypb.Empty{}, err
	}

	err = m.storageConn.Close()
	if err != nil {
		return &emptypb.Empty{}, err
	}

	err = m.whisperConn.Close()
	if err != nil {
		return &emptypb.Empty{}, err
	}

	err = m.keyboardConn.Close()
	if err != nil {
		return &emptypb.Empty{}, err
	}

	err = m.processConn.Close()
	if err != nil {
		return &emptypb.Empty{}, err
	}

	err = m.filesystemConn.Close()
	if err != nil {
		return &emptypb.Empty{}, err
	}

	err = m.windowConn.Close()
	if err != nil {
		return &emptypb.Empty{}, err
	}

	err = m.Impl.LoopStop()
	return &emptypb.Empty{}, err
}
