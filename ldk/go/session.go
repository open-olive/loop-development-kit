package ldk

import (
	"errors"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type Session struct {
	LoopID string `json:"loopId"`
	Token  string `json:"-"`
}

func NewSessionFromProto(session *proto.Session) (*Session, error) {
	if session == nil {
		return nil, errors.New("proto session is nil pointer")
	}

	return &Session{
		LoopID: session.LoopID,
		Token:  session.Token,
	}, nil
}

func (s *Session) ToProto() *proto.Session {
	return &proto.Session{
		LoopID: s.LoopID,
		Token:  s.Token,
	}
}
