package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

type WhisperContentFormOutputText struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputText) Type() WhisperContentFormType {
	return WhisperContentFormTypeText
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputText) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Text_{
			Text: &proto.WhisperFormOutput_Text{
				Value: fc.Value,
			},
		},
	}, nil
}
