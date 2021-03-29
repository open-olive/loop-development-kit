package ldk

import (
	"encoding/json"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

// WhisperContentFormInputTel defines a telephone field in a form
type WhisperContentFormInputTel struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Pattern  string       `json:"pattern"`
	Value    string       `json:"value"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputTel) Type() WhisperContentFormType {
	return WhisperContentFormTypeTel
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputTel) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Tel_{
			Tel: &proto.WhisperFormInput_Tel{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
				Order:   fc.Order,
			},
		},
	}, nil
}

func (fc *WhisperContentFormInputTel) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentFormInputTel
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*fc),
		Type: string(fc.Type()),
	})
}
