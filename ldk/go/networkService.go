package ldk

import (
	"context"
)

type NetworkService interface {
	HTTPRequest(ctx context.Context, req *HTTPRequest) (*HTTPResponse, error)
}
