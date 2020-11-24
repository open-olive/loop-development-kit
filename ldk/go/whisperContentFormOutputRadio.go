package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

type WhisperContentFormOutputRadio struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputRadio) Type() WhisperContentFormType {
	return WhisperContentFormTypeRadio
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputRadio) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Radio_{
			Radio: &proto.WhisperFormOutput_Radio{
				Value: fc.Value,
			},
		},
	}, nil
}
