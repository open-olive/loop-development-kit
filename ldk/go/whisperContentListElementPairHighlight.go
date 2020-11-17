package ldk

import (
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type WhisperContentListElementPairHighlight int

const (
	WhisperContentListElementPairHighlightNone WhisperContentListElementPairHighlight = iota
	WhisperContentListElementPairHighlightYellow
)

func (h WhisperContentListElementPairHighlight) ToProto() (proto.WhisperListElement_Pair_Highlight, error) {
	switch h {
	case WhisperContentListElementPairHighlightNone:
		return proto.WhisperListElement_Pair_NONE, nil
	case WhisperContentListElementPairHighlightYellow:
		return proto.WhisperListElement_Pair_YELLOW, nil
	default:
		return proto.WhisperListElement_Pair_NONE, fmt.Errorf("unexpected highlight option %d", h)
	}
}

func WhisperContentListElementPairHighlightFromProto(h proto.WhisperListElement_Pair_Highlight) (WhisperContentListElementPairHighlight, error) {
	switch h {
	case proto.WhisperListElement_Pair_NONE:
		return WhisperContentListElementPairHighlightNone, nil
	case proto.WhisperListElement_Pair_YELLOW:
		return WhisperContentListElementPairHighlightYellow, nil
	default:
		return WhisperContentListElementPairHighlightNone, fmt.Errorf("unexpected highlight option %d", h)
	}
}
