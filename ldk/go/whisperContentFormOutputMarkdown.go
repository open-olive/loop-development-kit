package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

type WhisperContentFormOutputMarkdown struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputMarkdown) Type() WhisperContentFormType {
	return WhisperContentFormTypeMarkdown
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputMarkdown) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Markdown_{
			Markdown: &proto.WhisperFormOutput_Markdown{
				Value: fc.Value,
			},
		},
	}, nil
}
