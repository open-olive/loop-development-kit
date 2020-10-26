package ldk

import (
	"context"
	"fmt"

	"github.com/golang/protobuf/ptypes/empty"
	"github.com/open-olive/loop-development-kit-go/proto"
)

type WindowServer struct {
	Impl WindowService
}

func (w *WindowServer) Active(ctx context.Context, empty *empty.Empty) (*proto.ActiveWindowResponse, error) {
	resp, err := w.Impl.ActiveWindow()

	if err != nil {
		return nil, err
	}

	return &proto.ActiveWindowResponse{
		Window: convertWindowInfoToProto(resp),
	}, nil
}

func (w *WindowServer) ActiveStream(empty *empty.Empty, server proto.Window_ActiveStreamServer) error {
	handler := func(wi WindowInfo, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}

		if err := server.Send(&proto.ActiveWindowStreamResponse{
			Window: convertWindowInfoToProto(wi),
			Error:  errText,
		}); err != nil {
			fmt.Println("error => ", err.Error())
		}
	}

	go func() {
		err := w.Impl.ListenActiveWindow(server.Context(), handler)
		if err != nil {
			fmt.Println("error => ", err.Error())
		}
	}()
	<-server.Context().Done()
	return nil
}

func (w *WindowServer) State(ctx context.Context, empty *empty.Empty) (*proto.WindowStateResponse, error) {
	resp, err := w.Impl.State()
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

func (w *WindowServer) StateStream(empty *empty.Empty, server proto.Window_StateStreamServer) error {
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
		err := w.Impl.ListenState(server.Context(), handler)
		if err != nil {
			fmt.Println("error => ", err.Error())
		}
	}()

	<-server.Context().Done()
	return nil
}
