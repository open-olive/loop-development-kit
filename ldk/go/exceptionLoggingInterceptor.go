package ldk

import (
	"context"
	"regexp"

	"google.golang.org/grpc"
)

type ExceptionLoggingInterceptor struct {
	logger          *Logger
	interceptedConn *grpc.ClientConn
}

func (eli *ExceptionLoggingInterceptor) Invoke(ctx context.Context, method string, args interface{}, reply interface{}, opts ...grpc.CallOption) error {
	err := eli.interceptedConn.Invoke(ctx, method, args, reply, opts...)
	if err != nil {
		eli.logError(method, err)
	}

	return err
}

func (eli *ExceptionLoggingInterceptor) NewStream(ctx context.Context, desc *grpc.StreamDesc, method string, opts ...grpc.CallOption) (grpc.ClientStream, error) {
	stream, err := eli.interceptedConn.NewStream(ctx, desc, method, opts...)
	if err != nil {
		eli.logError(method, err)
	}

	return stream, err
}

func (eli *ExceptionLoggingInterceptor) logError(fullMethodPath string, err error) {
	service, method := extractContext(fullMethodPath)
	eli.logger.Error("Client exception", "error", err, "service", service, "method", method)
}

func extractContext(path string) (service string, method string) {
	matches := findNamedMatches(path)
	return matches["service"], matches["method"]
}

var pathRegex = regexp.MustCompile(`^/proto\.(?P<service>\w+)/(?P<method>\w+)$`)

func findNamedMatches(str string) map[string]string {
	match := pathRegex.FindStringSubmatch(str)

	results := map[string]string{}
	for i, name := range match {
		results[pathRegex.SubexpNames()[i]] = name
	}
	return results
}
