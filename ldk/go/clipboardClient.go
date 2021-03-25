package ldk

import (
	"context"
	"errors"
	"io"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// ClipboardClient is used by loops to facilitate communication with the clipboard service
type ClipboardClient struct {
	client  proto.ClipboardClient
	session *Session
}

// Read is used by the loop to get the current clipboard text
func (c *ClipboardClient) Read(ctx context.Context) (string, error) {
	resp, err := c.client.ClipboardRead(ctx, &proto.ClipboardReadRequest{
		Session: c.session.ToProto(),
	})
	if err != nil {
		return "", err
	}

	return resp.Text, nil
}

// Listen is used by the loop to establish a stream for handling clipboard changes
func (c *ClipboardClient) Listen(ctx context.Context, handler ReadListenHandler) error {
	stream, err := c.client.ClipboardReadStream(ctx, &proto.ClipboardReadStreamRequest{
		Session: c.session.ToProto(),
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
				handler("", err)
				return
			}

			if resp.GetError() != "" {
				err = errors.New(resp.GetError())
			}
			handler(resp.GetText(), err)
		}
	}()

	return nil
}

// TODO: RG - why do we have 2 implementation of Listen? Another one is in the Sidekick (grpcService.go)!
func (c *ClipboardClient) ListenWithLockConfiguration(ctx context.Context, includeOliveHelpTraffic bool, handler ReadListenHandler) error {
	stream, err := c.client.ClipboardReadStream(ctx, &proto.ClipboardReadStreamRequest{
		Session: c.session.ToProto(),
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
				handler("", err)
				return
			}

			if resp.GetError() != "" {
				err = errors.New(resp.GetError())
			}
			handler(resp.GetText(), err)
		}
	}()

	return nil
}

// Write is used by the loop to write text to the clipboard
func (c *ClipboardClient) Write(ctx context.Context, text string) error {
	_, err := c.client.ClipboardWrite(ctx, &proto.ClipboardWriteRequest{
		Session: c.session.ToProto(),
		Text:    text,
	})
	if err != nil {
		return err
	}

	return nil
}
