package ldk

import (
	"context"
	"errors"
	"io"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type CursorClient struct {
	client  proto.CursorClient
	session proto.Session
}

func (c *CursorClient) Position() (CursorPosition, error) {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	resp, err := c.client.CursorPosition(ctx, &proto.CursorPositionRequest{Session: &c.session})

	if err != nil {
		return CursorPosition{}, err
	}
	return CursorPosition{
		X:      int(resp.X),
		Y:      int(resp.Y),
		Screen: 0,
	}, nil
}

func (c *CursorClient) ListenPosition(ctx context.Context, handler ListenPositionHandler) error {
	cursorReadStreamClient, err := c.client.CursorPositionStream(ctx, &proto.CursorPositionStreamRequest{Session: &c.session})
	if err != nil {
		return err
	}
	go func() {
		for {
			resp, err := cursorReadStreamClient.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				handler(CursorPosition{}, err)
			}
			if resp.GetError() != "" {
				err = errors.New(resp.GetError())
			}
			handler(CursorPosition{
				X:      int(resp.X),
				Y:      int(resp.Y),
				Screen: 0,
			}, err)
		}
	}()

	return nil
}
