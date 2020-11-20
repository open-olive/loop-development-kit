package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

type WhisperContentFormOutputNumber struct {
	Value float32 `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputNumber) Type() WhisperContentFormType {
	return WhisperContentFormTypeNumber
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputNumber) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Number_{
			Number: &proto.WhisperFormOutput_Number{
				Value: fc.Value,
			},
		},
	}, nil
}
