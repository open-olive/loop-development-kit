package ldk

import (
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

const (
	WhisperContentListElementTypeAlert WhisperContentListElementType = "alert"
)

// WhisperContentListElementAlert defines an alert element for a list whisper
type WhisperContentListElementAlert struct {
	Body      string                                  `json:"string"`
	Extra     bool                                    `json:"extra"`
	Highlight WhisperContentListElementAlertHighlight `json:"highlight"`
	Order     uint32                                  `json:"order"`
}

// Type returns the type of field for this form element
func (e *WhisperContentListElementAlert) Type() WhisperContentListElementType {
	return WhisperContentListElementTypeAlert
}

// ToProto returns a protobuf representation of the object
func (e *WhisperContentListElementAlert) ToProto() (*proto.WhisperListElement, error) {
	highlight, err := e.Highlight.ToProto()
	if err != nil {
		return nil, fmt.Errorf("failed to encode highlight option: %w", err)
	}

	return &proto.WhisperListElement{
		Order: e.Order,
		Extra: e.Extra,
		ElementOneof: &proto.WhisperListElement_Alert_{
			Alert: &proto.WhisperListElement_Alert{
				Body:      e.Body,
				Highlight: highlight,
			},
		},
	}, nil
}
