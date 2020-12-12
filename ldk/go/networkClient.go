package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
	structpb "google.golang.org/protobuf/types/known/structpb"
)

// NetworkClient is the client used by the NetworkService
type NetworkClient struct {
	client  proto.NetworkClient
	session *Session
}

// HTTPResponse is the structure received from HttpRequest
type HTTPResponse struct {
	ResponseCode int
	Data         []byte
	Headers      map[string]*structpb.ListValue
}

// HTTPRequest is the structure received from HttpRequest
type HTTPRequest struct {
	URL     string
	Method  string
	Body    []byte
	Headers map[string]string
}

func (n *NetworkClient) HTTPRequest(ctx context.Context, req *HTTPRequest) (*HTTPResponse, error) {
	resp, err := n.client.HTTPRequest(ctx, &proto.HTTPRequestMsg{
		Session: n.session.ToProto(),
		Url:     req.URL,
		Method:  req.Method,
		Body:    req.Body,
		Headers: req.Headers,
	})

	if err != nil {
		return nil, err
	}

	return &HTTPResponse{
		ResponseCode: int(resp.ResponseCode),
		Data:         resp.Data,
		Headers:      resp.Headers,
	}, err
}
