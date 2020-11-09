package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

type Session struct {
	LoopID string `json:"loopId"`
	Token  string `json:"-"`
}

func NewSessionFromProto(session *proto.Session) *Session {
	return &Session{
		LoopID: session.LoopID,
		Token:  session.Token,
	}
}

func (s *Session) ToProto() *proto.Session {
	return &proto.Session{
		LoopID: s.LoopID,
		Token:  s.Token,
	}
}
