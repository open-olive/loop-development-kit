package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
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
	Headers      map[string][]string
}

// HTTPRequest is the structure received from HttpRequest
type HTTPRequest struct {
	URL       string
	Method    string
	Body      []byte
	Headers   map[string][]string
	TimeoutMs *int
}

func (n *NetworkClient) HTTPRequest(ctx context.Context, req *HTTPRequest) (*HTTPResponse, error) {
	reqHeaders := make(map[string]*proto.HTTPHeader)

	for name, values := range req.Headers {
		reqHeaders[name] = &proto.HTTPHeader{
			Values: values,
		}
	}

	resp, err := n.client.HTTPRequest(ctx, &proto.HTTPRequestMsg{
		Session: n.session.ToProto(),
		Url:     req.URL,
		Method:  req.Method,
		Body:    req.Body,
		Headers: reqHeaders,
	})
	if err != nil {
		return nil, err
	}

	respHeaders := make(map[string][]string)

	for name, values := range resp.Headers {
		respHeaders[name] = values.Values
	}

	return &HTTPResponse{
		ResponseCode: int(resp.ResponseCode),
		Data:         resp.Data,
		Headers:      respHeaders,
	}, err
}
