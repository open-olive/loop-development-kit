package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// StorageClient is used by loops to make storage service requests
type StorageClient struct {
	client  proto.StorageClient
	session *Session
}

// Delete is used by loops to delete a storage entry
func (s *StorageClient) Delete(ctx context.Context, key string) error {
	_, err := s.client.StorageDelete(ctx, &proto.StorageDeleteRequest{
		Key:     key,
		Session: s.session.ToProto(),
	})
	return err
}

// Exists is used by loops to check if a key exists in storage
func (s *StorageClient) Exists(ctx context.Context, key string) (bool, error) {
	resp, err := s.client.StorageExists(ctx, &proto.StorageExistsRequest{
		Key:     key,
		Session: s.session.ToProto(),
	})
	if err != nil {
		return false, err
	}

	return resp.Exists, nil
}

// Read is used by loops to get the value of an entry
func (s *StorageClient) Read(ctx context.Context, key string) (string, error) {
	resp, err := s.client.StorageRead(ctx, &proto.StorageReadRequest{
		Key:     key,
		Session: s.session.ToProto(),
	})
	if err != nil {
		return "", err
	}

	return resp.Value, nil
}

// Write is used by plugins to set an entry
func (s *StorageClient) Write(ctx context.Context, key, value string) error {
	_, err := s.client.StorageWrite(ctx, &proto.StorageWriteRequest{
		Key:     key,
		Value:   value,
		Session: s.session.ToProto(),
	})
	return err
}
