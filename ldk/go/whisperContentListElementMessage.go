package ldk

import (
	"encoding/json"
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

const (
	WhisperContentListElementTypeMessage WhisperContentListElementType = "message"
)

// WhisperContentListElementMessage defines an alert element for a list whisper
type WhisperContentListElementMessage struct {
	Align  WhisperContentListElementAlign `json:"align"`
	Body   string                         `json:"string"`
	Extra  bool                           `json:"extra"`
	Header string                         `json:"header"`
	Order  uint32                         `json:"order"`
	Style  WhisperContentListElementStyle `json:"style"`
}

// Type returns the type of field for this form element
func (e *WhisperContentListElementMessage) Type() WhisperContentListElementType {
	return WhisperContentListElementTypeMessage
}

// ToProto returns a protobuf representation of the object
func (e *WhisperContentListElementMessage) ToProto() (*proto.WhisperListElement, error) {
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
		ElementOneof: &proto.WhisperListElement_Message_{
			Message: &proto.WhisperListElement_Message{
				Align:  align,
				Body:   e.Body,
				Header: e.Header,
				Style:  style,
			},
		},
	}, nil
}

func (e *WhisperContentListElementMessage) MarshalJSON() ([]byte, error) {
	// temp type needed to prevent infinite recursion
	type temp WhisperContentListElementMessage
	return json.Marshal(struct {
		temp
		Type string `json:"type"`
	}{
		temp: temp(*e),
		Type: string(e.Type()),
	})
}
