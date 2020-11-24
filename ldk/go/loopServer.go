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
	conn   *grpc.ClientConn
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (m *LoopServer) LoopStart(_ context.Context, req *proto.LoopStartRequest) (*emptypb.Empty, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	hosts := req.ServiceHosts

	m.conn, err = m.broker.Dial(hosts.HostBrokerId)
	if err != nil {
		println("[ERROR] loopServer.go - conn Error")
		println("[ERROR]" + err.Error())
		return &emptypb.Empty{}, err
	}

	sidekickClient := &SidekickClient{
		storage: &StorageClient{
			client:  proto.NewStorageClient(m.conn),
			session: session,
		},
		whisper: &WhisperClient{
			client:  proto.NewWhisperClient(m.conn),
			session: session,
		},
		clipboard: &ClipboardClient{
			client:  proto.NewClipboardClient(m.conn),
			session: session,
		},
		keyboard: &KeyboardClient{
			client:  proto.NewKeyboardClient(m.conn),
			session: session,
		},
		process: &ProcessClient{
			client:  proto.NewProcessClient(m.conn),
			session: session,
		},
		cursor: &CursorClient{
			client:  proto.NewCursorClient(m.conn),
			session: session,
		},
		filesystem: &FilesystemClient{
			client:  proto.NewFilesystemClient(m.conn),
			session: session,
		},
		ui: &UIClient{
			client:  proto.NewUIClient(m.conn),
			session: session,
		},
		network: &NetworkClient{
			client:  proto.NewNetworkClient(m.conn),
			session: session,
		},
		window: &WindowClient{
			client:  proto.NewWindowClient(m.conn),
			session: session,
		},
	}
	println("[INFO] loopServer.go - LoopStart complete")
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

	// close service connection
	if err := m.conn.Close(); err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	return &emptypb.Empty{}, multiErr
}
