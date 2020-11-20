package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

// WhisperContentFormInputMarkdown defines a markdown field in a form
type WhisperContentFormInputMarkdown struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Value    string       `json:"value"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputMarkdown) Type() WhisperContentFormType {
	return WhisperContentFormTypeMarkdown
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputMarkdown) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Markdown_{
			Markdown: &proto.WhisperFormInput_Markdown{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
				Order:   fc.Order,
			},
		},
	}, nil
}
