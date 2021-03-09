package ldk

import (
	"context"
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type CursorServer struct {
	Impl CursorService
}

func (c *CursorServer) CursorPosition(ctx context.Context, req *proto.CursorPositionRequest) (*proto.CursorPositionResponse, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	value, err := c.Impl.Position(
		context.WithValue(ctx, Session{}, session),
	)
	if err != nil {
		return nil, err
	}
	return &proto.CursorPositionResponse{
		X:      int32(value.X),
		Y:      int32(value.Y),
	}, nil
}

func (c *CursorServer) CursorPositionStream(req *proto.CursorPositionStreamRequest, stream proto.Cursor_CursorPositionStreamServer) error {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return err
	}

	handler := func(msg CursorPosition, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}
		if e := stream.Send(&proto.CursorPositionStreamResponse{
			X:      int32(msg.X),
			Y:      int32(msg.Y),
			Error:  errText,
		}); e != nil {
			fmt.Println("error: ldk.CursorServer.CursorPositionStream -> stream.Send:", e)
		}
	}

	go func() {
		err := c.Impl.ListenPosition(
			context.WithValue(stream.Context(), Session{}, session),
			handler,
		)
		if err != nil {
			fmt.Println("error: ldk.CursorServer.CursorPositionStream -> Listen:", err)
		}
	}()

	<-stream.Context().Done()
	return nil
}
