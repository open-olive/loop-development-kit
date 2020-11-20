package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

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
