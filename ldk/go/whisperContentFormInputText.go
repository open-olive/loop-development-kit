package ldk

import (
	"encoding/json"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// WhisperContentFormInputText defines a text field in a form
type WhisperContentFormInputText struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Value    string       `json:"value"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputText) Type() WhisperContentFormType {
	return WhisperContentFormTypeText
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputText) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Text_{
			Text: &proto.WhisperFormInput_Text{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
				Order:   fc.Order,
			},
		},
	}, nil
}

func (fc *WhisperContentFormInputText) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentFormInputText
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*fc),
		Type: string(fc.Type()),
	})
}
