package ldk

import (
	"fmt"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type WhisperContentListElementAlertHighlight int

const (
	WhisperContentListElementAlertNone WhisperContentListElementAlertHighlight = iota
	WhisperContentListElementAlertGreen
	WhisperContentListElementAlertRed
)

func (h WhisperContentListElementAlertHighlight) ToProto() (proto.WhisperListElement_Alert_Highlight, error) {
	switch h {
	case WhisperContentListElementAlertNone:
		return proto.WhisperListElement_Alert_NONE, nil
	case WhisperContentListElementAlertGreen:
		return proto.WhisperListElement_Alert_GREEN, nil
	case WhisperContentListElementAlertRed:
		return proto.WhisperListElement_Alert_RED, nil
	default:
		return proto.WhisperListElement_Alert_NONE, fmt.Errorf("unexpected highlight option %d", h)
	}
}

func WhisperContentListElementAlertHighlightFromProto(h proto.WhisperListElement_Alert_Highlight) (WhisperContentListElementAlertHighlight, error) {
	switch h {
	case proto.WhisperListElement_Alert_NONE:
		return WhisperContentListElementAlertNone, nil
	case proto.WhisperListElement_Alert_GREEN:
		return WhisperContentListElementAlertGreen, nil
	case proto.WhisperListElement_Alert_RED:
		return WhisperContentListElementAlertRed, nil
	default:
		return WhisperContentListElementAlertNone, fmt.Errorf("unexpected highlight option %d", h)
	}
}
