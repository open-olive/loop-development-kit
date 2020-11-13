package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// NetworkClient is the client used by the NetworkService
type NetworkClient struct {
	client  proto.NetworkClient
	session *Session
}

// HTTPResponse is the structure recieved from HttpRequest
type HTTPResponse struct {
	ResponseCode int
	Data         []byte
}

// HTTPRequest is the structure recieved from HttpRequest
type HTTPRequest struct {
	URL    string
	Method string
	Body   []byte
}

func (n *NetworkClient) HTTPRequest(ctx context.Context, req *HTTPRequest) (*HTTPResponse, error) {
	resp, err := n.client.HTTPRequest(ctx, &proto.HTTPRequestMsg{
		Session: n.session.ToProto(),
		Url:     req.URL,
		Method:  req.Method,
		Body:    req.Body,
	})

	if err != nil {
		return nil, err
	}

	return &HTTPResponse{
		ResponseCode: int(resp.ResponseCode),
		Data:         resp.Data,
	}, err
}
