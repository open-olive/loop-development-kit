package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// StorageClient is used by the controller plugin to facilitate plugin initiated communication with the host
type StorageClient struct {
	client  proto.StorageClient
	session proto.Session
}

// StorageDelete is used by plugins to delete a storage entry
func (m *StorageClient) StorageDelete(key string) error {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	_, err := m.client.StorageDelete(ctx, &proto.StorageDeleteRequest{
		Key:     key,
		Session: &m.session,
	})
	return err
}

// StorageDeleteAll is used by plugins to delete all storage entries
func (m *StorageClient) StorageDeleteAll() error {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	_, err := m.client.StorageDeleteAll(ctx, &proto.StorageDeleteAllRequest{
		Session: &m.session,
	})
	return err
}

// StorageHasKey is used by plugins to check if a key exists in storage
func (m *StorageClient) StorageHasKey(key string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	resp, err := m.client.StorageHasKey(ctx, &proto.StorageHasKeyRequest{
		Key:     key,
		Session: &m.session,
	})
	if err != nil {
		return false, err
	}

	return resp.HasKey, nil
}

// StorageKeys is used by plugins to get a list of keys for all entries
func (m *StorageClient) StorageKeys() ([]string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	resp, err := m.client.StorageKeys(ctx, &proto.StorageKeysRequest{Session: &m.session})
	if err != nil {
		return nil, err
	}

	return resp.Keys, nil
}

// StorageRead is used by plugins to get the value of an entry
func (m *StorageClient) StorageRead(key string) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	resp, err := m.client.StorageRead(ctx, &proto.StorageReadRequest{
		Key:     key,
		Session: &m.session,
	})
	if err != nil {
		return "", err
	}

	return resp.Value, nil
}

// StorageReadAll is used by plugins to get a map of all entries
func (m *StorageClient) StorageReadAll() (map[string]string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	resp, err := m.client.StorageReadAll(ctx, &proto.StorageReadAllRequest{
		Session: &m.session,
	})
	if err != nil {
		return nil, err
	}

	entries := make(map[string]string, len(resp.Entries))
	for respKey, respValue := range resp.Entries {
		entries[respKey] = respValue
	}

	return entries, nil
}

// StorageWrite is used by plugins to set an entry
func (m *StorageClient) StorageWrite(key, value string) error {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	_, err := m.client.StorageWrite(ctx, &proto.StorageWriteRequest{
		Key:     key,
		Value:   value,
		Session: &m.session,
	})
	return err
}
