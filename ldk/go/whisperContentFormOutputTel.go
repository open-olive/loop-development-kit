package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/v2/proto"

type WhisperContentFormOutputTel struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputTel) Type() WhisperContentFormType {
	return WhisperContentFormTypeTel
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputTel) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Tel_{
			Tel: &proto.WhisperFormOutput_Tel{
				Value: fc.Value,
			},
		},
	}, nil
}
