package ldk

import (
	"encoding/json"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

// WhisperContentFormInputRadio defines a radio button selection field in a form
type WhisperContentFormInputRadio struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Options  []string     `json:"options"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputRadio) Type() WhisperContentFormType {
	return WhisperContentFormTypeRadio
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputRadio) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Radio_{
			Radio: &proto.WhisperFormInput_Radio{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Options: fc.Options,
				Order:   fc.Order,
			},
		},
	}, nil
}

func (fc *WhisperContentFormInputRadio) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentFormInputRadio
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*fc),
		Type: string(fc.Type()),
	})
}
