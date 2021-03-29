package ldk

import (
	"encoding/json"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

const (
	WhisperContentDisambiguationElementTypeOption WhisperContentDisambiguationElementType = "option"
)

// WhisperContentDisambiguationElementOption defines an option the user can select
type WhisperContentDisambiguationElementOption struct {
	Label    string       `json:"label"`
	Order    uint32       `json:"order"`
	OnChange func(string) `json:"-"`
}

// Type returns the type of field for this form element
func (e *WhisperContentDisambiguationElementOption) Type() WhisperContentDisambiguationElementType {
	return WhisperContentDisambiguationElementTypeOption
}

// ToProto returns a protobuf representation of the object
func (e *WhisperContentDisambiguationElementOption) ToProto() (*proto.WhisperDisambiguationElement, error) {
	return &proto.WhisperDisambiguationElement{
		Order: e.Order,
		ElementOneof: &proto.WhisperDisambiguationElement_Option_{
			Option: &proto.WhisperDisambiguationElement_Option{
				Label: e.Label,
			},
		},
	}, nil
}

func (e *WhisperContentDisambiguationElementOption) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentDisambiguationElementOption
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*e),
		Type: string(e.Type()),
	})
}
