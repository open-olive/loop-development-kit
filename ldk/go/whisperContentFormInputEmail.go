package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

// WhisperContentFormInputEmail defines an email field in a form
type WhisperContentFormInputEmail struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Value    string       `json:"value"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputEmail) Type() WhisperContentFormType {
	return WhisperContentFormTypeEmail
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputEmail) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Email_{
			Email: &proto.WhisperFormInput_Email{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
				Order:   fc.Order,
			},
		},
	}, nil
}
