package ldk

import (
	"context"
	"errors"
	"io"

	"github.com/open-olive/loop-development-kit-go/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// ClipboardClient is used by loops to facilitate communication with the clipboard service
type ClipboardClient struct {
	client proto.ClipboardClient
}

// Read is used by the loop to get the current clipboard text
func (c *ClipboardClient) Read() (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	resp, err := c.client.ClipboardRead(ctx, &emptypb.Empty{})
	if err != nil {
		return "", err
	}

	return resp.Text, nil
}

// Listen is used by the loop to establish a stream for handling clipboard changes
func (c *ClipboardClient) Listen(ctx context.Context, handler ReadListenHandler) error {
	stream, err := c.client.ClipboardReadStream(ctx, &emptypb.Empty{})
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
func (c *ClipboardClient) Write(text string) error {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	_, err := c.client.ClipboardWrite(ctx, &proto.ClipboardWriteRequest{
		Text: text,
	})
	if err != nil {
		return err
	}

	return nil
}
