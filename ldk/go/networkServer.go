package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type NetworkServer struct {
	Impl NetworkService
}

func (ns *NetworkServer) HTTPRequest(ctx context.Context, req *proto.HTTPRequestMsg) (*proto.HTTPResponseMsg, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	resp, err := ns.Impl.HTTPRequest(
		context.WithValue(ctx, Session{}, session),
		&HTTPRequest{
			URL:    req.Url,
			Method: req.Method,
			Body:   req.Body,
		},
	)
	if err != nil {
		return nil, err
	}

	return &proto.HTTPResponseMsg{
		ResponseCode: uint32(resp.ResponseCode),
		Data:         resp.Data,
	}, nil

}
