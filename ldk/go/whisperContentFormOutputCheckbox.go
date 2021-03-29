package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/v2/proto"

type WhisperContentFormOutputCheckbox struct {
	Value bool `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputCheckbox) Type() WhisperContentFormType {
	return WhisperContentFormTypeCheckbox
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputCheckbox) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Checkbox_{
			Checkbox: &proto.WhisperFormOutput_Checkbox{
				Value: fc.Value,
			},
		},
	}, nil
}
