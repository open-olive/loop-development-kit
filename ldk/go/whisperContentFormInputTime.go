package ldk

import (
	"encoding/json"
	"time"

	"github.com/golang/protobuf/ptypes"
	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

// WhisperContentFormInputTime defines a time field in a form
type WhisperContentFormInputTime struct {
	Label    string          `json:"label"`
	Tooltip  string          `json:"tooltip"`
	Value    time.Time       `json:"value"`
	OnChange func(time.Time) `json:"-"`
	Order    uint32          `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputTime) Type() WhisperContentFormType {
	return WhisperContentFormTypeTime
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputTime) ToProto() (*proto.WhisperFormInput, error) {
	value, err := ptypes.TimestampProto(fc.Value)
	if err != nil {
		return nil, err
	}

	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Time_{
			Time: &proto.WhisperFormInput_Time{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   value,
				Order:   fc.Order,
			},
		},
	}, nil
}

func (fc *WhisperContentFormInputTime) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentFormInputTime
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*fc),
		Type: string(fc.Type()),
	})
}
