package ldk

import (
	"encoding/json"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

const (
	WhisperContentDisambiguationElementTypeText WhisperContentDisambiguationElementType = "text"
)

// WhisperContentDisambiguationElementText defines a text element for a disambiguation whisper
type WhisperContentDisambiguationElementText struct {
	Body  string `json:"body"` // Markdown syntax to support different header sizes
	Order uint32 `json:"order"`
}

// Type returns the type of field for this form element
func (e *WhisperContentDisambiguationElementText) Type() WhisperContentDisambiguationElementType {
	return WhisperContentDisambiguationElementTypeText
}

// ToProto returns a protobuf representation of the object
func (e *WhisperContentDisambiguationElementText) ToProto() (*proto.WhisperDisambiguationElement, error) {
	return &proto.WhisperDisambiguationElement{
		Order: e.Order,
		ElementOneof: &proto.WhisperDisambiguationElement_Text_{
			Text: &proto.WhisperDisambiguationElement_Text{
				Body: e.Body,
			},
		},
	}, nil
}

func (e *WhisperContentDisambiguationElementText) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentDisambiguationElementText
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*e),
		Type: string(e.Type()),
	})
}
