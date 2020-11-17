package ldk

import (
	"fmt"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type WhisperContentListElementPairHighlight int

const (
	WhisperContentListElementPairNone WhisperContentListElementPairHighlight = iota
	WhisperContentListElementPairYellow
)

func (h WhisperContentListElementPairHighlight) ToProto() (proto.WhisperListElement_Pair_Highlight, error) {
	switch h {
	case WhisperContentListElementPairNone:
		return proto.WhisperListElement_Pair_NONE, nil
	case WhisperContentListElementPairYellow:
		return proto.WhisperListElement_Pair_YELLOW, nil
	default:
		return proto.WhisperListElement_Pair_NONE, fmt.Errorf("unexpected highlight option %d", h)
	}
}

func WhisperContentListElementPairHighlightFromProto(h proto.WhisperListElement_Pair_Highlight) (WhisperContentListElementPairHighlight, error) {
	switch h {
	case proto.WhisperListElement_Pair_NONE:
		return WhisperContentListElementPairNone, nil
	case proto.WhisperListElement_Pair_YELLOW:
		return WhisperContentListElementPairYellow, nil
	default:
		return WhisperContentListElementPairNone, fmt.Errorf("unexpected highlight option %d", h)
	}
}
