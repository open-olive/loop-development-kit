package ldk

import (
	"time"

	"github.com/golang/protobuf/ptypes"
	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

type WhisperContentFormOutputTime struct {
	Value time.Time `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputTime) Type() WhisperContentFormType {
	return WhisperContentFormTypeTime
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputTime) ToProto() (*proto.WhisperFormOutput, error) {
	value, err := ptypes.TimestampProto(fc.Value)
	if err != nil {
		return nil, err
	}

	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Time_{
			Time: &proto.WhisperFormOutput_Time{
				Value: value,
			},
		},
	}, nil
}
