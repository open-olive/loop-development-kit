package ldk

import (
	"context"
	"fmt"

	"github.com/hashicorp/go-multierror"
	"github.com/hashicorp/go-plugin"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
)

// LoopClient is used by the controller plugin host to facilitate host initiated communication with controller plugins
type LoopClient struct {
	broker *plugin.GRPCBroker
	client proto.LoopClient
	s      *grpc.Server
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (m *LoopClient) LoopStart(ctx context.Context, host Sidekick, session *Session) error {
	// setup service servers
	clipboardHostServer := &ClipboardServer{Impl: host.Clipboard()}
	cursorHostServer := &CursorServer{Impl: host.Cursor()}
	filesystemHostServer := &FilesystemServer{Impl: host.Filesystem()}
	keyboardHostServer := &KeyboardServer{Impl: host.Keyboard()}
	networkHostServer := &NetworkServer{Impl: host.Network()}
	processHostServer := &ProcessServer{Impl: host.Process()}
	storageHostServer := &StorageServer{Impl: host.Storage()}
	uiHostServer := &UIServer{Impl: host.UI()}
	whisperHostServer := &WhisperServer{Impl: host.Whisper()}
	windowHostServer := &WindowServer{Impl: host.Window()}

	brokerID := m.broker.NextId()

	readyChan := make(chan bool)

	serverFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterClipboardServer(m.s, clipboardHostServer)
		proto.RegisterCursorServer(m.s, cursorHostServer)
		proto.RegisterFilesystemServer(m.s, filesystemHostServer)
		proto.RegisterKeyboardServer(m.s, keyboardHostServer)
		proto.RegisterNetworkServer(m.s, networkHostServer)
		proto.RegisterProcessServer(m.s, processHostServer)
		proto.RegisterStorageServer(m.s, storageHostServer)
		proto.RegisterUIServer(m.s, uiHostServer)
		proto.RegisterWhisperServer(m.s, whisperHostServer)
		proto.RegisterWindowServer(m.s, windowHostServer)
		readyChan <- true
		return m.s
	}

	go m.broker.AcceptAndServe(brokerID, serverFunc)

	select {
	case <-ctx.Done():
		return nil
	case <-readyChan:
	}

	serviceHosts := &proto.ServiceHosts{
		HostBrokerId: brokerID,
	}
	_, err := m.client.LoopStart(ctx, &proto.LoopStartRequest{
		ServiceHosts: serviceHosts,
		Session:      session.ToProto(),
	})
	if err != nil {
		fmt.Println("loopClient.go ERROR FOLLOWS")
		fmt.Println(err)
	}
	return err
}

// LoopStop is called by the host when the plugin is stopped
func (m *LoopClient) LoopStop(ctx context.Context) error {
	var multiErr error

	_, err := m.client.LoopStop(ctx, &emptypb.Empty{})
	if err != nil {
		multiErr = multierror.Append(multiErr, err)
	}

	m.s.Stop()

	return multiErr
}
