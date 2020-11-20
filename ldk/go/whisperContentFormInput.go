package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

type WhisperContentFormInput interface {
	Type() WhisperContentFormType
	ToProto() (*proto.WhisperFormInput, error)
}
