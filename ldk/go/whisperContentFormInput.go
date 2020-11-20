package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

type WhisperContentFormInput interface {
	MarshalJSON() ([]byte, error)
	ToProto() (*proto.WhisperFormInput, error)
	Type() WhisperContentFormType
}
