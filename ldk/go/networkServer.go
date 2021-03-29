package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

type NetworkServer struct {
	Impl NetworkService
}

func (ns *NetworkServer) HTTPRequest(ctx context.Context, req *proto.HTTPRequestMsg) (*proto.HTTPResponseMsg, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	reqHeaders := make(map[string][]string)

	for name, values := range req.Headers {
		reqHeaders[name] = values.Values
	}

	resp, err := ns.Impl.HTTPRequest(
		context.WithValue(ctx, Session{}, session),
		&HTTPRequest{
			URL:     req.Url,
			Method:  req.Method,
			Body:    req.Body,
			Headers: reqHeaders,
		},
	)
	if err != nil {
		return nil, err
	}

	respHeaders := make(map[string]*proto.HTTPHeader)

	for name, values := range resp.Headers {
		respHeaders[name] = &proto.HTTPHeader{
			Values: values,
		}
	}

	return &proto.HTTPResponseMsg{
		ResponseCode: uint32(resp.ResponseCode),
		Data:         resp.Data,
		Headers:      respHeaders,
	}, nil

}
