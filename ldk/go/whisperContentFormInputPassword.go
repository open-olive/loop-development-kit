package ldk

import (
	"encoding/json"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// WhisperContentFormInputPassword defines a password field in a form
type WhisperContentFormInputPassword struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputPassword) Type() WhisperContentFormType {
	return WhisperContentFormTypePassword
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputPassword) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Password_{
			Password: &proto.WhisperFormInput_Password{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Order:   fc.Order,
			},
		},
	}, nil
}

func (fc *WhisperContentFormInputPassword) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentFormInputPassword
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*fc),
		Type: string(fc.Type()),
	})
}
