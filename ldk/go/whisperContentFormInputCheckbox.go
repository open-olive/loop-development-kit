package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

// WhisperContentFormInputCheckbox defines a checkbox field in a form
type WhisperContentFormInputCheckbox struct {
	Label    string     `json:"label"`
	Tooltip  string     `json:"tooltip"`
	Value    bool       `json:"value"`
	OnChange func(bool) `json:"-"`
	Order    uint32     `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputCheckbox) Type() WhisperContentFormType {
	return WhisperContentFormTypeCheckbox
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputCheckbox) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Checkbox_{
			Checkbox: &proto.WhisperFormInput_Checkbox{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
			},
		},
	}, nil
}
