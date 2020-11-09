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
	conn   *grpc.ClientConn
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
	}
	println("[INFO] loopServer.go - LoopStart complete")
	return &emptypb.Empty{}, m.Impl.LoopStart(
		sidekickClient,
	)
}

// LoopStop is called by the host when the plugin is stopped
func (m *LoopServer) LoopStop(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {

	// close service connection
	if err := m.conn.Close(); err != nil {
		return &emptypb.Empty{}, err
	}

	err := m.Impl.LoopStop()
	return &emptypb.Empty{}, err
}
