package ldk

import (
	"context"
	"errors"
	"io"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type UIClient struct {
	client  proto.UIClient
	session LoopSession
}

func (u *UIClient) ListenSearchbar(ctx context.Context, handler ListenSearchHandler) error {
	msg := &proto.SearchbarStreamRequest{Session: u.session.toProto()}
	client, err := u.client.SearchbarStream(ctx, msg)
	if err != nil {
		return err
	}

	go func() {
		for {
			resp, err := client.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				handler(resp.Text, err)
				return
			}
			if resp.GetError() != "" {
				err = errors.New(resp.GetError())
			}
			handler(resp.Text, err)
		}
	}()

	return nil

}

func (u *UIClient) ListenGlobalSearch(ctx context.Context, handler ListenSearchHandler) error {
	msg := &proto.GlobalSearchStreamRequest{Session: u.session.toProto()}
	client, err := u.client.GlobalSearchStream(ctx, msg)
	if err != nil {
		return err
	}

	go func() {
		for {
			resp, err := client.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				handler(resp.Text, err)
				return
			}
			if resp.GetError() != "" {
				err = errors.New(resp.GetError())
			}
			handler(resp.Text, err)
		}
	}()
	return nil
}
