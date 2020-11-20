package ldk

import (
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

const (
	WhisperContentListElementTypeDivider WhisperContentListElementType = "divider"
)

// WhisperContentListElementDivider defines a divider element for a list whisper
type WhisperContentListElementDivider struct {
	Extra bool                           `json:"extra"`
	Order uint32                         `json:"order"`
	Style WhisperContentListElementStyle `json:"style"`
}

// Type returns the type of field for this form element
func (e *WhisperContentListElementDivider) Type() WhisperContentListElementType {
	return WhisperContentListElementTypeDivider
}

// ToProto returns a protobuf representation of the object
func (e *WhisperContentListElementDivider) ToProto() (*proto.WhisperListElement, error) {
	style, err := e.Style.ToProto()
	if err != nil {
		return nil, fmt.Errorf("failed to encode style option: %w", err)
	}

	return &proto.WhisperListElement{
		Order: e.Order,
		Extra: e.Extra,
		ElementOneof: &proto.WhisperListElement_Divider_{
			Divider: &proto.WhisperListElement_Divider{
				Style: style,
			},
		},
	}, nil
}
