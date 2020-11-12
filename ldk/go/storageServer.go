package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// StorageServer is used by the host to receive storage requests
type StorageServer struct {
	Impl StorageService
}

// Delete is used by loops to delete a storage entry
func (m *StorageServer) StorageDelete(ctx context.Context, req *proto.StorageDeleteRequest) (*emptypb.Empty, error) {
	err := m.Impl.Delete(
		context.WithValue(ctx, Session{}, NewSessionFromProto(req.Session)),
		req.Key,
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

// Exists is used by loops to check if a key exists in storage
func (m *StorageServer) StorageExists(ctx context.Context, req *proto.StorageExistsRequest) (*proto.StorageExistsResponse, error) {
	exists, err := m.Impl.Exists(
		context.WithValue(ctx, Session{}, NewSessionFromProto(req.Session)),
		req.Key,
	)
	if err != nil {
		return nil, err
	}

	return &proto.StorageExistsResponse{
		Exists: exists,
	}, nil
}

// Read is used by loops to get the value of an entry
func (m *StorageServer) StorageRead(ctx context.Context, req *proto.StorageReadRequest) (*proto.StorageReadResponse, error) {
	value, err := m.Impl.Read(
		context.WithValue(ctx, Session{}, NewSessionFromProto(req.Session)),
		req.Key,
	)
	if err != nil {
		return nil, err
	}

	return &proto.StorageReadResponse{
		Value: value,
	}, nil
}

// Write is used by loops to set an entry
func (m *StorageServer) StorageWrite(ctx context.Context, req *proto.StorageWriteRequest) (*emptypb.Empty, error) {
	err := m.Impl.Write(
		context.WithValue(ctx, Session{}, NewSessionFromProto(req.Session)),
		req.Key,
		req.Value,
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, err
}
