package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

type WhisperContentFormOutputEmail struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputEmail) Type() WhisperContentFormType {
	return WhisperContentFormTypeEmail
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputEmail) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Email_{
			Email: &proto.WhisperFormOutput_Email{
				Value: fc.Value,
			},
		},
	}, nil
}
