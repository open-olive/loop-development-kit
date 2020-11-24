package ldk

import (
	"encoding/json"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// WhisperContentFormInputNumber defines a number field in a form
type WhisperContentFormInputNumber struct {
	Label    string        `json:"label"`
	Tooltip  string        `json:"tooltip"`
	Min      float32       `json:"min"`
	Max      float32       `json:"max"`
	Value    float32       `json:"value"`
	OnChange func(float32) `json:"-"`
	Order    uint32        `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputNumber) Type() WhisperContentFormType {
	return WhisperContentFormTypeNumber
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputNumber) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Number_{
			Number: &proto.WhisperFormInput_Number{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
				Min:     fc.Min,
				Max:     fc.Max,
				Order:   fc.Order,
			},
		},
	}, nil
}

func (fc *WhisperContentFormInputNumber) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentFormInputNumber
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*fc),
		Type: string(fc.Type()),
	})
}
