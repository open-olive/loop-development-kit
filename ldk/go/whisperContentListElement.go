package ldk

import (
	"fmt"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type WhisperContentListElement interface {
	Type() WhisperContentListElementType
	ToProto() (*proto.WhisperListElement, error)
}

func whisperContentListElementFromProto(p *proto.WhisperListElement) (WhisperContentListElement, error) {
	switch elementContainer := p.ElementOneof.(type) {
	case *proto.WhisperListElement_Pair_:
		highlight, err := WhisperContentListElementPairHighlightFromProto(elementContainer.Pair.Highlight)
		if err != nil {
			return nil, err
		}

		return &WhisperContentListElementPair{
			Key:       elementContainer.Pair.Key,
			Value:     elementContainer.Pair.Value,
			Order:     p.Order,
			Extra:     p.Extra,
			Copyable:  elementContainer.Pair.Copyable,
			Highlight: highlight,
		}, nil
	case *proto.WhisperListElement_Alert_:
		highlight, err := WhisperContentListElementAlertHighlightFromProto(elementContainer.Alert.Highlight)
		if err != nil {
			return nil, err
		}

		return &WhisperContentListElementAlert{
			Body:      elementContainer.Alert.Body,
			Highlight: highlight,
		}, nil
	default:
		return nil, fmt.Errorf("element had unexpected type %T", elementContainer)
	}
}
