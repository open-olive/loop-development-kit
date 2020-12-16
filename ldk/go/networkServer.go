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

	reqHeaders := make(map[string][]string)

	for name, values := range req.Headers {
		header := make([]string, len(values.Values))
		for index, value := range values.Values {
			header[index] = value
		}
		reqHeaders[name] = header
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
		header := make([]string, len(values))
		for index, value := range values {
			header[index] = value
		}
		respHeaders[name] = &proto.HTTPHeader{
			Values: header,
		}
	}

	return &proto.HTTPResponseMsg{
		ResponseCode: uint32(resp.ResponseCode),
		Data:         resp.Data,
		Headers:      respHeaders,
	}, nil

}
