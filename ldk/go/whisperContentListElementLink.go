package ldk

import (
	"encoding/json"
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

const (
	WhisperContentListElementTypeLink WhisperContentListElementType = "link"
)

// WhisperContentListElementLink defines a link element for a list whisper
type WhisperContentListElementLink struct {
	Align WhisperContentListElementAlign `json:"align"`
	Extra bool                           `json:"extra"`
	Href  string                         `json:"href"`
	Order uint32                         `json:"order"`
	Style WhisperContentListElementStyle `json:"style"`
	Text  string                         `json:"text"`
}

// Type returns the type of field for this form element
func (e *WhisperContentListElementLink) Type() WhisperContentListElementType {
	return WhisperContentListElementTypeLink
}

// ToProto returns a protobuf representation of the object
func (e *WhisperContentListElementLink) ToProto() (*proto.WhisperListElement, error) {
	align, err := e.Align.ToProto()
	if err != nil {
		return nil, fmt.Errorf("failed to encode align option: %w", err)
	}

	style, err := e.Style.ToProto()
	if err != nil {
		return nil, fmt.Errorf("failed to encode style option: %w", err)
	}

	return &proto.WhisperListElement{
		Order: e.Order,
		Extra: e.Extra,
		ElementOneof: &proto.WhisperListElement_Link_{
			Link: &proto.WhisperListElement_Link{
				Align: align,
				Href: e.Href,
				Style: style,
				Text: e.Text,
			},
		},
	}, nil
}

func (e *WhisperContentListElementLink) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentListElementLink
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*e),
		Type: string(e.Type()),
	})
}