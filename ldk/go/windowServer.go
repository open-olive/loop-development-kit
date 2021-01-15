package ldk

import (
	"context"
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type WindowServer struct {
	Authority Authority
	Impl      WindowService
}

func (w *WindowServer) WindowActiveWindow(ctx context.Context, req *proto.WindowActiveWindowRequest) (*proto.WindowActiveWindowResponse, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	resp, err := w.Impl.ActiveWindow(
		context.WithValue(ctx, Session{}, session),
	)
	if err != nil {
		return nil, err
	}

	return &proto.WindowActiveWindowResponse{
		Window: convertWindowInfoToProto(resp),
	}, nil
}

func (w *WindowServer) WindowActiveWindowStream(req *proto.WindowActiveWindowStreamRequest, stream proto.Window_WindowActiveWindowStreamServer) error {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return err
	}

	handler := func(wi WindowInfo, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}

		if err := stream.Send(&proto.WindowActiveWindowStreamResponse{
			Window: convertWindowInfoToProto(wi),
			Error:  errText,
		}); err != nil {
			fmt.Println("error => ", err.Error())
		}
	}

	go func() {
		err := w.Impl.ListenActiveWindow(
			context.WithValue(stream.Context(), Session{}, session),
			handler,
		)
		if err != nil {
			fmt.Println("error => ", err.Error())
		}
	}()
	<-stream.Context().Done()
	return nil
}

func (w *WindowServer) WindowState(ctx context.Context, req *proto.WindowStateRequest) (*proto.WindowStateResponse, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	resp, err := w.Impl.State(
		context.WithValue(ctx, Session{}, session),
	)
	if err != nil {
		return nil, err
	}

	windowInfos := make([]*proto.WindowInfo, len(resp))
	for _, wi := range resp {
		windowInfos = append(windowInfos, convertWindowInfoToProto(wi))
	}

	return &proto.WindowStateResponse{
		Window: windowInfos,
	}, nil
}

func (w *WindowServer) WindowStateStream(req *proto.WindowStateStreamRequest, server proto.Window_WindowStateStreamServer) error {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return err
	}

	handler := func(we WindowEvent, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}

		if err := server.Send(&proto.WindowStateStreamResponse{
			Action: convertWindowActionToProtoAction(we.Action),
			Error:  errText,
			Window: convertWindowInfoToProto(we.Window),
		}); err != nil {
			fmt.Println("error => ", err.Error())
		}
	}

	go func() {
		err := w.Impl.ListenState(
			context.WithValue(server.Context(), Session{}, session),
			handler,
		)
		if err != nil {
			fmt.Println("error => ", err.Error())
		}
	}()

	<-server.Context().Done()
	return nil
}
