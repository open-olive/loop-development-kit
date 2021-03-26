package ldk

import (
	"encoding/json"
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

const (
	WhisperContentListElementTypePair WhisperContentListElementType = "pair"
)

// WhisperContentListElementPair defines a key value pair element for a list whisper
type WhisperContentListElementPair struct {
	Copyable bool                           `json:"copyable"`
	Extra    bool                           `json:"extra"`
	Label    string                         `json:"label"`
	Order    uint32                         `json:"order"`
	Style    WhisperContentListElementStyle `json:"style"`
	Value    string                         `json:"value"`
}

// Type returns the type of field for this form element
func (e *WhisperContentListElementPair) Type() WhisperContentListElementType {
	return WhisperContentListElementTypePair
}

// ToProto returns a protobuf representation of the object
func (e *WhisperContentListElementPair) ToProto() (*proto.WhisperListElement, error) {
	style, err := e.Style.ToProto()
	if err != nil {
		return nil, fmt.Errorf("failed to encode style option: %w", err)
	}

	return &proto.WhisperListElement{
		Order: e.Order,
		Extra: e.Extra,
		ElementOneof: &proto.WhisperListElement_Pair_{
			Pair: &proto.WhisperListElement_Pair{
				Copyable: e.Copyable,
				Label:    e.Label,
				Style:    style,
				Value:    e.Value,
			},
		},
	}, nil
}

func (e *WhisperContentListElementPair) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentListElementPair
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*e),
		Type: string(e.Type()),
	})
}
