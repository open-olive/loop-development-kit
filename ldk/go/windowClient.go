package ldk

import (
	"context"
	"errors"
	"io"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

type WindowClient struct {
	client  proto.WindowClient
	session *Session
}

func (w *WindowClient) ActiveWindow(ctx context.Context) (WindowInfo, error) {
	resp, err := w.client.WindowActiveWindow(ctx, &proto.WindowActiveWindowRequest{
		Session: w.session.ToProto(),
	})
	if err != nil {
		return WindowInfo{}, err
	}

	return WindowInfo{
		Title:  resp.Window.GetTitle(),
		Path:   resp.Window.GetPath(),
		PID:    int(resp.Window.GetPid()),
		X:      int(resp.Window.GetX()),
		Y:      int(resp.Window.GetY()),
		Width:  int(resp.Window.GetWidth()),
		Height: int(resp.Window.GetHeight()),
	}, nil
}

func (w *WindowClient) ListenActiveWindow(ctx context.Context, handler ListenActiveWindowHandler) error {
	stream, err := w.client.WindowActiveWindowStream(ctx, &proto.WindowActiveWindowStreamRequest{
		Session: w.session.ToProto(),
	})
	if err != nil {
		return err
	}

	go func() {
		for {
			resp, err := stream.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				handler(WindowInfo{}, err)
				return
			}

			if resp.GetError() != "" {
				err = errors.New(resp.GetError())
			}
			handler(WindowInfo{
				Title:  resp.Window.GetTitle(),
				Path:   resp.Window.GetPath(),
				PID:    int(resp.Window.GetPid()),
				X:      int(resp.Window.GetX()),
				Y:      int(resp.Window.GetY()),
				Width:  int(resp.Window.GetWidth()),
				Height: int(resp.Window.GetHeight()),
			}, err)
		}
	}()

	return nil

}

func (w *WindowClient) State(ctx context.Context) ([]WindowInfo, error) {
	resp, err := w.client.WindowState(ctx, &proto.WindowStateRequest{
		Session: w.session.ToProto(),
	})

	if err != nil {
		return nil, err
	}

	infos := make([]WindowInfo, len(resp.Window))
	for _, w := range resp.Window {
		infos = append(infos, WindowInfo{
			Title:  w.GetTitle(),
			Path:   w.GetPath(),
			PID:    int(w.GetPid()),
			X:      int(w.GetX()),
			Y:      int(w.GetY()),
			Width:  int(w.GetWidth()),
			Height: int(w.GetHeight()),
		})
	}
	return infos, nil
}

func (w *WindowClient) ListenState(ctx context.Context, handler ListenWindowStateHandler) error {
	stream, err := w.client.WindowStateStream(ctx, &proto.WindowStateStreamRequest{
		Session: w.session.ToProto(),
	})
	if err != nil {
		return err
	}

	go func() {
		for {
			resp, err := stream.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				handler(WindowEvent{}, err)
				return
			}

			if resp.GetError() != "" {
				err = errors.New(resp.GetError())
			}
			we := WindowEvent{
				Action: protoWindowActionToAction(resp.GetAction()),
				Window: WindowInfo{
					Title:  resp.Window.GetTitle(),
					Path:   resp.Window.GetPath(),
					PID:    int(resp.Window.GetPid()),
					X:      int(resp.Window.GetX()),
					Y:      int(resp.Window.GetY()),
					Width:  int(resp.Window.GetWidth()),
					Height: int(resp.Window.GetHeight()),
				},
			}

			handler(we, err)
		}
	}()

	return nil
}
