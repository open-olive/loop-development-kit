package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/v2/proto"

type WhisperContentFormOutputSelect struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputSelect) Type() WhisperContentFormType {
	return WhisperContentFormTypeSelect
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputSelect) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Select_{
			Select: &proto.WhisperFormOutput_Select{
				Value: fc.Value,
			},
		},
	}, nil
}
