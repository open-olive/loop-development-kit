package ldk

import (
	"fmt"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

const (
	WhisperContentListElementTypePair WhisperContentListElementType = "pair"
)

// WhisperContentListElementPair defines a key value pair element for a list whisper
type WhisperContentListElementPair struct {
	Copyable  bool                                   `json:"copyable"`
	Extra     bool                                   `json:"extra"`
	Highlight WhisperContentListElementPairHighlight `json:"highlight"`
	Key       string                                 `json:"key"`
	Order     uint32                                 `json:"order"`
	Value     string                                 `json:"value"`
}

// Type returns the type of field for this form element
func (e *WhisperContentListElementPair) Type() WhisperContentListElementType {
	return WhisperContentListElementTypePair
}

// ToProto returns a protobuf representation of the object
func (e *WhisperContentListElementPair) ToProto() (*proto.WhisperListElement, error) {
	highlight, err := e.Highlight.ToProto()
	if err != nil {
		return nil, fmt.Errorf("failed to encode highlight option: %w", err)
	}

	return &proto.WhisperListElement{
		Order: e.Order,
		Extra: e.Extra,
		ElementOneof: &proto.WhisperListElement_Pair_{
			Pair: &proto.WhisperListElement_Pair{
				Key:       e.Key,
				Value:     e.Value,
				Highlight: highlight,
				Copyable:  e.Copyable,
			},
		},
	}, nil
}
