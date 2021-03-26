package ldk

import (
	"encoding/json"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

// WhisperContentFormInputSelect defines a dropdown menu selection field in a form
type WhisperContentFormInputSelect struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Options  []string     `json:"options"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputSelect) Type() WhisperContentFormType {
	return WhisperContentFormTypeSelect
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputSelect) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Select_{
			Select: &proto.WhisperFormInput_Select{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Options: fc.Options,
				Order:   fc.Order,
			},
		},
	}, nil
}

func (fc *WhisperContentFormInputSelect) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentFormInputSelect
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*fc),
		Type: string(fc.Type()),
	})
}
