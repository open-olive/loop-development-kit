package ldk

import (
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type WhisperContentListElementAlertHighlight int

const (
	WhisperContentListElementAlertHighlightNone WhisperContentListElementAlertHighlight = iota
	WhisperContentListElementAlertHighlightGreen
	WhisperContentListElementAlertHighlightRed
)

func (h WhisperContentListElementAlertHighlight) ToProto() (proto.WhisperListElement_Alert_Highlight, error) {
	switch h {
	case WhisperContentListElementAlertHighlightNone:
		return proto.WhisperListElement_Alert_NONE, nil
	case WhisperContentListElementAlertHighlightGreen:
		return proto.WhisperListElement_Alert_GREEN, nil
	case WhisperContentListElementAlertHighlightRed:
		return proto.WhisperListElement_Alert_RED, nil
	default:
		return proto.WhisperListElement_Alert_NONE, fmt.Errorf("unexpected highlight option %d", h)
	}
}

func WhisperContentListElementAlertHighlightFromProto(h proto.WhisperListElement_Alert_Highlight) (WhisperContentListElementAlertHighlight, error) {
	switch h {
	case proto.WhisperListElement_Alert_NONE:
		return WhisperContentListElementAlertHighlightNone, nil
	case proto.WhisperListElement_Alert_GREEN:
		return WhisperContentListElementAlertHighlightGreen, nil
	case proto.WhisperListElement_Alert_RED:
		return WhisperContentListElementAlertHighlightRed, nil
	default:
		return WhisperContentListElementAlertHighlightNone, fmt.Errorf("unexpected highlight option %d", h)
	}
}
