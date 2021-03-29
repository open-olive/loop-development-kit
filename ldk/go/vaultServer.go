package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// VaultServer is used by the host to receive vault vault requests
type VaultServer struct {
	Impl VaultService
}

// Delete is used by loops to delete a vault entry
func (m *VaultServer) VaultDelete(ctx context.Context, req *proto.VaultDeleteRequest) (*emptypb.Empty, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	err = m.Impl.Delete(
		context.WithValue(ctx, Session{}, session),
		req.Key,
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

// Exists is used by loops to check if a key exists in the vault
func (m *VaultServer) VaultExists(ctx context.Context, req *proto.VaultExistsRequest) (*proto.VaultExistsResponse, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	exists, err := m.Impl.Exists(
		context.WithValue(ctx, Session{}, session),
		req.Key,
	)
	if err != nil {
		return nil, err
	}

	return &proto.VaultExistsResponse{
		Exists: exists,
	}, nil
}

// Read is used by loops to get the value of an entry
func (m *VaultServer) VaultRead(ctx context.Context, req *proto.VaultReadRequest) (*proto.VaultReadResponse, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	value, err := m.Impl.Read(
		context.WithValue(ctx, Session{}, session),
		req.Key,
	)
	if err != nil {
		return nil, err
	}

	return &proto.VaultReadResponse{
		Value: value,
	}, nil
}

// Write is used by loops to set an entry
func (m *VaultServer) VaultWrite(ctx context.Context, req *proto.VaultWriteRequest) (*emptypb.Empty, error) {
	session, err := NewSessionFromProto(req.Session)
	if err != nil {
		return nil, err
	}

	err = m.Impl.Write(
		context.WithValue(ctx, Session{}, session),
		req.Key,
		req.Value,
	)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, err
}
