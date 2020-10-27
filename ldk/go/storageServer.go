package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// StorageServer is used by the controller plugin host to receive plugin initiated communication
type StorageServer struct {
	Impl StorageService
}

// StorageDelete is used by plugins to delete a storage entry
func (m *StorageServer) StorageDelete(ctx context.Context, req *proto.StorageDeleteRequest) (*emptypb.Empty, error) {
	err := m.Impl.StorageDelete(req.Key)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

// StorageDeleteAll is used by plugins to delete all storage entries
func (m *StorageServer) StorageDeleteAll(ctx context.Context, req *proto.StorageDeleteAllRequest) (*emptypb.Empty, error) {
	err := m.Impl.StorageDeleteAll()
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

// StorageHasKey is used by plugins to check if a key exists in storage
func (m *StorageServer) StorageHasKey(ctx context.Context, req *proto.StorageHasKeyRequest) (*proto.StorageHasKeyResponse, error) {
	hasKey, err := m.Impl.StorageHasKey(req.Key)
	if err != nil {
		return nil, err
	}

	return &proto.StorageHasKeyResponse{
		HasKey: hasKey,
	}, nil
}

// StorageKeys is used by plugins to get a list of keys for all entries
func (m *StorageServer) StorageKeys(ctx context.Context, req *proto.StorageKeysRequest) (*proto.StorageKeysResponse, error) {
	keys, err := m.Impl.StorageKeys()
	if err != nil {
		return nil, err
	}

	return &proto.StorageKeysResponse{
		Keys: keys,
	}, nil
}

// StorageRead is used by plugins to get the value of an entry
func (m *StorageServer) StorageRead(ctx context.Context, req *proto.StorageReadRequest) (*proto.StorageReadResponse, error) {
	value, err := m.Impl.StorageRead(req.Key)
	if err != nil {
		return nil, err
	}

	return &proto.StorageReadResponse{
		Value: value,
	}, nil
}

// StorageReadAll is used by plugins to get a map of all entries
func (m *StorageServer) StorageReadAll(ctx context.Context, req *proto.StorageReadAllRequest) (*proto.StorageReadAllResponse, error) {
	entries, err := m.Impl.StorageReadAll()
	if err != nil {
		return nil, err
	}

	return &proto.StorageReadAllResponse{
		Entries: entries,
	}, nil
}

// StorageWrite is used by plugins to set an entry
func (m *StorageServer) StorageWrite(ctx context.Context, req *proto.StorageWriteRequest) (*emptypb.Empty, error) {
	err := m.Impl.StorageWrite(
		req.Key,
		req.Value,
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, err
}
