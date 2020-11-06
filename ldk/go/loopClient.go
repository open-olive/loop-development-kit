package ldk

import (
	"context"
	"fmt"
	"time"

	"github.com/hashicorp/go-plugin"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
)

const grpcTimeout = 40 * time.Second

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

	// setup storage server
	storageHostServer := &StorageServer{
		Impl: host.Storage(),
	}

	// setup clipboard server
	clipboardHostServer := &ClipboardServer{
		Impl: host.Clipboard(),
	}

	//setup keyboard server
	keyboardHostServer := &KeyboardServer{
		Impl: host.Keyboard(),
	}

	processHostServer := &ProcessServer{
		Impl: host.Process(),
	}

	cursorHostServer := &CursorServer{
		Impl: host.Cursor(),
	}

	filesystemHostServer := &FilesystemServer{
		Impl: host.Filesystem(),
	}

	//whisperServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
	//	m.s = grpc.NewServer(opts...)
	//	proto.RegisterWhisperServer(m.s, whisperHostServer)
	//	fmt.Println(m.s.GetServiceInfo())
	//	return m.s
	//}
	//
	//whisperBrokerID := m.broker.NextId()
	//go m.broker.AcceptAndServe(whisperBrokerID, whisperServerFunc)
	//
	//
	//storageServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
	//	m.s = grpc.NewServer(opts...)
	//	proto.RegisterStorageServer(m.s, storageHostServer)
	//	return m.s
	//}
	//
	//storageBrokerID := m.broker.NextId()
	//go m.broker.AcceptAndServe(storageBrokerID, storageServerFunc)
	//
	//
	//clipboardServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
	//	m.s = grpc.NewServer(opts...)
	//	proto.RegisterClipboardServer(m.s, clipboardHostServer)
	//	return m.s
	//}
	//
	//clipboardBrokerID := m.broker.NextId()
	//go m.broker.AcceptAndServe(clipboardBrokerID, clipboardServerFunc)
	//
	//
	//keyboardServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
	//	m.s = grpc.NewServer(opts...)
	//	proto.RegisterKeyboardServer(m.s, keyboardHostServer)
	//	return m.s
	//}
	//
	//keyboardBrokerID := m.broker.NextId()
	//go m.broker.AcceptAndServe(keyboardBrokerID, keyboardServerFunc)
	//
	//
	//processServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
	//	m.s = grpc.NewServer(opts...)
	//	proto.RegisterProcessServer(m.s, processHostServer)
	//	return m.s
	//}
	//
	//processBrokerID := m.broker.NextId()
	//go m.broker.AcceptAndServe(processBrokerID, processServerFunc)
	//
	//
	//cursorServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
	//	m.s = grpc.NewServer(opts...)
	//	proto.RegisterCursorServer(m.s, cursorHostServer)
	//	return m.s
	//}
	//
	//cursorBrokerID := m.broker.NextId()
	//go m.broker.AcceptAndServe(cursorBrokerID, cursorServerFunc)
	//
	//filesystemServerFunc := func(opts []grpc.ServerOption) *grpc.Server {
	//	m.s = grpc.NewServer(opts...)
	//	proto.RegisterFilesystemServer(m.s, filesystemHostServer)
	//	return m.s
	//}
	//
	//filesystemBrokerID := m.broker.NextId()

	brokerId := m.broker.NextId()

	serverFunc := func(opts []grpc.ServerOption) *grpc.Server {
		m.s = grpc.NewServer(opts...)
		proto.RegisterFilesystemServer(m.s, filesystemHostServer)
		proto.RegisterCursorServer(m.s, cursorHostServer)
		proto.RegisterProcessServer(m.s, processHostServer)
		proto.RegisterKeyboardServer(m.s, keyboardHostServer)
		proto.RegisterClipboardServer(m.s, clipboardHostServer)
		proto.RegisterStorageServer(m.s, storageHostServer)
		proto.RegisterWhisperServer(m.s, whisperHostServer)
		fmt.Println(m.s.GetServiceInfo())
		return m.s
	}

	go m.broker.AcceptAndServe(brokerId, serverFunc)
	serviceHosts := &proto.ServiceHosts{
		HostClipboard:  brokerId,
		HostCursor:     brokerId,
		HostFilesystem: brokerId,
		HostKeyboard:   brokerId,
		HostProcess:    brokerId,
		HostStorage:    brokerId,
		HostWhisper:    brokerId,
	}
	fmt.Println(serviceHosts)
	_, err := m.client.LoopStart(ctx, &proto.LoopStartRequest{
		ServiceHosts: serviceHosts,
		// TODO: Define Session here
		Session: &proto.Session{
			LoopID: "LOOP_ID",
			Token:  "TOKEN",
		},
	})
	fmt.Println("START COMPLETE")
	if err != nil {
		fmt.Println("RECEIVED ERROR")
		fmt.Println(err)
	}

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
