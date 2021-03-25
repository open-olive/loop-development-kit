package ldk

import (
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/v2/proto"
)

type WhisperContentDisambiguationElement interface {
	MarshalJSON() ([]byte, error)
	ToProto() (*proto.WhisperDisambiguationElement, error)
	Type() WhisperContentDisambiguationElementType
}

func whisperContentDisambiguationElementFromProto(p *proto.WhisperDisambiguationElement) (WhisperContentDisambiguationElement, error) {
	switch elementContainer := p.ElementOneof.(type) {
	case *proto.WhisperDisambiguationElement_Option_:
		return &WhisperContentDisambiguationElementOption{
			Label: elementContainer.Option.Label,
			Order: p.Order,
		}, nil
	case *proto.WhisperDisambiguationElement_Text_:
		return &WhisperContentDisambiguationElementText{
			Body:  elementContainer.Text.Body,
			Order: p.Order,
		}, nil
	default:
		return nil, fmt.Errorf("element had unexpected type %T", elementContainer)
	}
}
