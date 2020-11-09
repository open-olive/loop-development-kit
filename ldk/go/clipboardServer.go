package ldk

import (
	"context"
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// ClipboardServer is used by sidekick to process clipboard communication with a loop
type ClipboardServer struct {
	Authority Authority
	Impl      ClipboardService
}

// ClipboardRead is used by plugins to get the value of an entry
func (m *ClipboardServer) ClipboardRead(_ context.Context, req *proto.ClipboardReadRequest) (*proto.ClipboardReadResponse, error) {
	session := NewSessionFromProto(req.Session)
	if err := m.Authority.ValidateSession(session); err != nil {
		return nil, err
	}

	value, err := m.Impl.Read()
	if err != nil {
		return nil, err
	}

	return &proto.ClipboardReadResponse{
		Text: value,
	}, nil
}

// ClipboardReadStream is used by plugins to get the value of an entry
func (m *ClipboardServer) ClipboardReadStream(req *proto.ClipboardReadStreamRequest, stream proto.Clipboard_ClipboardReadStreamServer) error {
	session := NewSessionFromProto(req.Session)
	if err := m.Authority.ValidateSession(session); err != nil {
		return err
	}

	handler := func(text string, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}
		if e := stream.Send(&proto.ClipboardReadStreamResponse{
			Error: errText,
			Text:  text,
		}); e != nil {
			// This should only happen if the context was cancelled for some reason and the stream shuts down.
			fmt.Println("error: ldk.ClipboardServer.ClipbardReadStream -> stream.Send:", e)
		}
	}

	go func() {
		err := m.Impl.Listen(stream.Context(), handler)
		// TODO: move this to a real logger once we move this into sidekick
		if err != nil {
			fmt.Println("error: ldk.ClipboardServer.ClipbardReadStream -> Listen:", err)
		}
	}()

	// don't exit this method until context is cancelled
	// if you do, the handler called above that tries to call `Send` will fail as the context will be cancelled due to leaving method scope
	<-stream.Context().Done()
	return nil
}

// ClipboardWrite is used by plugins to set an entry
func (m *ClipboardServer) ClipboardWrite(_ context.Context, req *proto.ClipboardWriteRequest) (*emptypb.Empty, error) {
	session := NewSessionFromProto(req.Session)
	if err := m.Authority.ValidateSession(session); err != nil {
		return nil, err
	}

	err := m.Impl.Write(req.Text)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}
