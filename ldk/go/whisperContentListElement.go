package ldk

import (
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type WhisperContentListElement interface {
	MarshalJSON() ([]byte, error)
	ToProto() (*proto.WhisperListElement, error)
	Type() WhisperContentListElementType
}

func whisperContentListElementFromProto(p *proto.WhisperListElement) (WhisperContentListElement, error) {
	switch elementContainer := p.ElementOneof.(type) {
	case *proto.WhisperListElement_Pair_:
		style, err := WhisperContentListElementStyleFromProto(elementContainer.Pair.Style)
		if err != nil {
			return nil, err
		}

		return &WhisperContentListElementPair{
			Copyable: elementContainer.Pair.Copyable,
			Extra:    p.Extra,
			Label:    elementContainer.Pair.Label,
			Order:    p.Order,
			Style:    style,
			Value:    elementContainer.Pair.Value,
		}, nil
	case *proto.WhisperListElement_Message_:
		align, err := WhisperContentListElementAlignFromProto(elementContainer.Message.Align)
		if err != nil {
			return nil, err
		}

		style, err := WhisperContentListElementStyleFromProto(elementContainer.Message.Style)
		if err != nil {
			return nil, err
		}

		return &WhisperContentListElementMessage{
			Align:  align,
			Body:   elementContainer.Message.Body,
			Extra:  p.Extra,
			Header: elementContainer.Message.Header,
			Order:  p.Order,
			Style:  style,
		}, nil
	case *proto.WhisperListElement_Link_:
		style, err := WhisperContentListElementStyleFromProto(elementContainer.Link.Style)
		if err != nil {
			return nil, err
		}

		return &WhisperContentListElementPair{
			Extra:    p.Extra,
			Href:     elementContainer.Link.Href,
			Order:    p.Order,
			Style:    style,
			Text:     elementContainer.Link.Text,
		}, nil
	case *proto.WhisperListElement_Divider_:
		style, err := WhisperContentListElementStyleFromProto(elementContainer.Divider.Style)
		if err != nil {
			return nil, err
		}

		return &WhisperContentListElementDivider{
			Extra: p.Extra,
			Order: p.Order,
			Style: style,
		}, nil
	default:
		return nil, fmt.Errorf("element had unexpected type %T", elementContainer)
	}
}
