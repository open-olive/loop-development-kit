package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/v2/proto"

type WhisperContentFormOutputPassword struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputPassword) Type() WhisperContentFormType {
	return WhisperContentFormTypePassword
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputPassword) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Password_{
			Password: &proto.WhisperFormOutput_Password{
				Value: fc.Value,
			},
		},
	}, nil
}
