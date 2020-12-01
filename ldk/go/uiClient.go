package ldk

import (
	"context"
	"errors"
	"io"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// UIClient is used to hook into UI events such as listening to search controls.
type UIClient struct {
	client  proto.UIClient
	session *Session
}

// ListenSearchbar allows you to listen to searchbar events.
func (u *UIClient) ListenSearchbar(ctx context.Context, handler ListenSearchHandler) error {
	msg := &proto.SearchbarStreamRequest{Session: u.session.ToProto()}
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
				message := "Error with SearchbarStream"
				if resp != nil {
					message = resp.Text
				}
				handler(message, err)
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

// ListenGlobalSearch allows you to listen to global search (omnibar) events.
func (u *UIClient) ListenGlobalSearch(ctx context.Context, handler ListenSearchHandler) error {
	msg := &proto.GlobalSearchStreamRequest{Session: u.session.ToProto()}
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
				message := "Error with GlobalSearchStream"
				if resp != nil {
					message = resp.Text
				}
				handler(message, err)
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
