package ldktest

import (
	"context"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

type NetworkService struct {
	HTTPRequestf func(context.Context, *ldk.HTTPRequest) (*ldk.HTTPResponse, error)
}

func (f *NetworkService) HTTPRequest(ctx context.Context, req *ldk.HTTPRequest) (*ldk.HTTPResponse, error) {
	return f.HTTPRequestf(ctx, req)
}
