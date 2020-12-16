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

// HTTPResponse is the structure received from HttpRequest
type HTTPResponse struct {
	ResponseCode int
	Data         []byte
	Headers      map[string][]string
}

// HTTPRequest is the structure received from HttpRequest
type HTTPRequest struct {
	URL     string
	Method  string
	Body    []byte
	Headers map[string][]string
}

func (n *NetworkClient) HTTPRequest(ctx context.Context, req *HTTPRequest) (*HTTPResponse, error) {
	reqHeaders := make(map[string]*proto.HTTPHeader)

	for name, values := range req.Headers {
		header := make([]string, len(values))
		for index, value := range values {
			header[index] = value
		}
		reqHeaders[name] = &proto.HTTPHeader{
			Values: header,
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
		header := make([]string, len(values.Values))
		for index, value := range values.Values {
			header[index] = value
		}
		respHeaders[name] = header
	}

	return &HTTPResponse{
		ResponseCode: int(resp.ResponseCode),
		Data:         resp.Data,
		Headers:      respHeaders,
	}, err
}
